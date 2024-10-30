const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert/strict')
const Blog = require('../models/blog')
const User = require('../models/user')
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

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('each blog post has a unique id property', async () => {
  const response = await api.get('/api/blogs')
  const ids = response.body.map(blog => blog.id)

  const uniqueIds = new Set(ids)
  assert.strictEqual(uniqueIds.size, ids.length)
})

describe('creation of a blog', () => {

  test('a valid blog can be added', async () => {
    const users = await User.find({})
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      user: users[0]._id
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
    const users = await User.find({})
    const newBlog = {
      title: 'Missing Likes Property',
      author: 'author',
      url: 'http://nolikes.com',
      user: users[0]._id
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
    const users = await User.find({})
    const newBlog = {
      author: 'Author Missing Title',
      url: 'http://author-missing.com',
      likes: 10,
      user: users[0]._id
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('fails with status code 400 if url is missing', async () => {
    const users = await User.find({})
    const newBlog = {
      title: 'Missing URL',
      author: 'Author Missing URL',
      likes: 10,
      user: users[0]._id
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('updating of a blog', () => {
  test('blog\'s likes can be updated ', async () => {

    const blogsAtBeggining = await Blog.find({})

    const blogToUpdate = {
      title: blogsAtBeggining[0].title,
      author: blogsAtBeggining[0].author,
      url: blogsAtBeggining[0].url,
      likes: blogsAtBeggining[0].likes+1
    }

    const response = await api
      .put(`/api/blogs/${blogsAtBeggining[0].id}`)
      .send(blogToUpdate)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(response.body.likes, blogToUpdate.likes)


    const blogsAtEnd = await Blog.find({})
    const updatedBlog = blogsAtEnd.find(blog => blog.id === response.body.id)
    console.log(updatedBlog)
    assert.deepStrictEqual(updatedBlog.likes, blogToUpdate.likes)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

    const title = blogsAtEnd.map(r => r.title)
    assert(!title.includes(blogToDelete.title))
  })
})

after(async () => {
  await mongoose.connection.close()
})