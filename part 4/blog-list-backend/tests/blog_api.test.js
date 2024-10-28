const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert/strict')
const Blog = require('../models/blog')
const helper = require('./test_helper')




beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

const api = supertest(app)

test.only('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test.only('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('each blog post has a unique id property', async () => {
  const response = await api.get('/api/blogs')
  const ids = response.body.map(blog => blog.id)

  const uniqueIds = new Set(ids)
  assert.strictEqual(uniqueIds.size, ids.length)
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const title = blogsAtEnd.map(b => b.title)

  assert(title.includes('Canonical string reduction'))
})


test('if likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'Missing Likes Property',
    author: 'author',
    url: 'http://nolikes.com',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)

  const blogsAtEnd = await Blog.find({})
  const savedBlog = blogsAtEnd.find(blog => blog.title.includes('Missing Likes Property'))
  assert.strictEqual(savedBlog.likes, 0)
})

test('fails with status code 400 if title is missing', async () => {
  const newBlog = {
    author: 'Author Missing Title',
    url: 'http://author-missing.com',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('fails with status code 400 if url is missing', async () => {
  const newBlog = {
    title: 'Missing URL',
    author: 'Author Missing URL',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

after(async () => {
  await mongoose.connection.close()
})