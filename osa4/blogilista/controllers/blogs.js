const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if(!request.body._doc.title || !request.body._doc.url)
    response.status(400).json(blog)
  
  else
  {
    await blog.save()
    response.status(201).json(blog)
  }
})

module.exports = blogsRouter