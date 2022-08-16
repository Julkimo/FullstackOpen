const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { info } = require('../utils/logger')


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

blogsRouter.delete('/:id', async (request, response) => {
  info(request.params.id)
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
 /*
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
      .then(() => {
          response.status(204).end()
      })
      .catch(error => next(error))
})
*/
module.exports = blogsRouter