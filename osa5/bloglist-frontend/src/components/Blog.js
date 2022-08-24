import { useState } from 'react'
import blogServices from '../services/blogs'

const Blog = ({ blog }) => {

  const [loginVisible, setLoginVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  const handleLike = async () => {
    setLikes(likes + 1)

    const blogObject = {
      user: blog.user.id,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    await blogServices.update(blog.id, blogObject)
  }

  const handleDelete = async () => {
    if(window.confirm('Remove blog: ' + blog.title))
    {
      console.log('In handleDelete')
      await blogServices.remove(blog.id, blog)
    }
  }

  const DeleteButton = () => {
      return (
        <div>
          <button onClick={handleDelete}>
            delete
          </button>
        </div>
      )
  }

  return(
    <li className='blog'>
      <div style={hideWhenVisible}>
        {blog.title} by {blog.author}
        <button onClick={() => setLoginVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible} className='title'>
        <div>
          ::::::::::::::::::::::::::::::::::::
        </div>
        Title: {blog.title} *** {blog.author}
        <button onClick={() => setLoginVisible(false)}>hide</button>
        <div className='url'>
            Url: {blog.url}
        </div>
        <div className='likes'>
            Likes: {likes}
          <button onClick={handleLike}> like </button>
        </div>
        <div>
            OP: {blog.user.name}
        </div>
        <DeleteButton />
        <div>
        ::::::::::::::::::::::::::::::::::::
        </div>
      </div>
    </li>
  )
}

export default Blog