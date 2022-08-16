const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Pasianssin salat',
    author: 'Jouko Poukama',
    url: 'www.silmankaanto.com',
    likes: 32
  },
  {
    title: 'Kissakala ja kalakissa',
    author: 'Pauli Kunnas',
    url: 'www.iltasatu.fi',
    likes: 923
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

describe('GET return the right amount of blogs as json', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
      const response = await api.get('/api/blogs')
    
      expect(response.body).toHaveLength(initialBlogs.length)
  })
})

//--------------------------------------------------------------------------

describe('POST functions correctly', () => {

  const postObject = new Blog(
    {
      title: 'Postataan',
      author: 'Pos Taa',
      url: 'www.posti.fi',
      likes: 123
    }
  )

  const postObjectNullLikes = new Blog(
    {
      title: 'Postataan',
      author: 'Pos Taa',
      url: 'www.posti.fi'
    }
  )
  
  const postObjectNoTitle = new Blog(
    {
      author: 'Pos Taa',
      url: 'www.posti.fi',
      likes: 123
    }
  )

  const postObjectNoUrl = new Blog(
    {
      title: 'Postataan',
      author: 'Pos Taa',
      likes: 123
    }
  )

  test('Posting a blog increases the amount of blogs by one', async () => {
    let response = await api.get('/api/blogs')
    blogsBeforePost = response.body.length

    await api
      .post('/api/blogs')
      .send(postObject)
      .expect(201)
      
    response = await api.get('/api/blogs')
    blogsAfterPost = response.body.length

    expect(blogsAfterPost - 1 == blogsBeforePost)
  })

  test('null likes equals 0 likes', async () => {
    await api
      .post('/api/blogs')
      .send(postObjectNullLikes)
      
    const response = await api.get('/api/blogs')

    expect(response.body[2].likes).toBe(0)
  })

  test('No title or url leads to 400 Bad Request', async () => {
    await api
      .post('/api/blogs')
      .send(postObjectNoTitle)
      .expect(400)

    await api
      .post('/api/blogs')
      .send(postObjectNoUrl)
      .expect(400)
  })
})

describe('DELETE functions correctly', () => {
  test('deleting the first blog on the list', async () =>{
    let blogs = await Blog.find({})
    const id = blogs[0]._id.toString()
    
    await api
      .delete('/api/blogs/' + id)
      .expect(204)

      blogs = await Blog.find({})
      amountAfter = blogs.length

    expect(initialBlogs.length - amountAfter).toBe(1)
  })
})


afterAll(() => {
  mongoose.connection.close()
})