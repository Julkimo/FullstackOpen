import { useState } from 'react'
import blogServices from '../services/blogs'

const Blog = ({ blog, user }) => {

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
    // eslint-disable-next-line eqeqeq
    if(user.name === blog.user.name) {
      return (
        <div>
          <button onClick={handleDelete}>
            delete
          </button>
        </div>
      )
    }
  }


  return(
    <div>
      <div style={hideWhenVisible}>
        {blog.title} by {blog.author}
        <button onClick={() => setLoginVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          ::::::::::::::::::::::::::::::::::::
        </div>
        Title: {blog.title} *** {blog.author}
        <button onClick={() => setLoginVisible(false)}>hide</button>
        <div>
            Url: {blog.url}
        </div>
        <div>
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
    </div>
  )
}

export default Blog