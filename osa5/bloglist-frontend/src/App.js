import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 4000)

    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    // eslint-disable-next-line no-restricted-globals
    location.reload()
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: 0,
      user: user.id

    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(returnedBlog.title + ' by ' + returnedBlog.author + ' created')
        setTimeout(() => {
          setMessage(null)
        }, 4000)
        setEmptyBlog()
      })
  }

  const setEmptyBlog = () => {
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }

  const loginForm = () => (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>   
  )

  const blogForm = () => (
    <div>
      <h2>Blogs</h2>
      <h3>{user.name} is logged in</h3>
      <form onSubmit={addBlog}>
        <div>
          <>title: </>
          <input
            value={newBlogTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <>author: </>
          <input
            value={newBlogAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        
        <div>
          <>url:  </>
          <input
            value={newBlogUrl}
            onChange={handleUrlChange}
          />
        </div><button type="submit">create</button>
      </form> 
      <button onClick={handleLogout}>logout</button> 

<div>
-------------------------------------------------------------
</div>

      <div>
      {blogs.map(blog => 
          <Blog
            key={blog.id}
            blog={blog}/>
          )}
      </div>
    </div>
  )

  return (
    <div>
      <Notification message={message}/>
      {user === null && loginForm()}
      {user !== null && blogForm()}
    </div>
  )
}

export default App
