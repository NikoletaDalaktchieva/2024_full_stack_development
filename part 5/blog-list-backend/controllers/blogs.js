const Blog = require('../models/blog')
const blogRouter = require('express').Router()
require('express-async-errors')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', '-blogs')
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const user = request.user

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.put('/:id', async (request, response) => {
  const body = { ...request.body, id: request.params.id }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, {
    new: true,
  }).populate('user', '-blogs')
  response.status(201).json(updatedBlog)
})

blogRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    const user = request.user
    if (blog.user.toString() !== user._id.toString()) {
      return response.status(401).json({ error: 'Unauthorized' })
    }

    await Blog.findByIdAndDelete(blog.id)
    response.status(204).end()
  }
)

module.exports = blogRouter
