import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
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

  if(user === null)
  return (
    <div>
      <Notification message={message}/>
      <LoginForm 
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    </div>
  )

  const sortBlogs = (blog1, blog2) => {
    return -(blog1.likes - blog2.likes)
  }

  return (
    <div>
      <Notification message={message}/> 
      <h2>Blogs</h2>
      <h3>{user.name} is logged in</h3>
        <NewBlogForm
          user={user}
          addBlog={addBlog}
          newBlogTitle={newBlogTitle}
          newBlogUrl={newBlogUrl}
          newBlogAuthor={newBlogAuthor}
          handleTitleChange={handleTitleChange}
          handleUrlChange={handleUrlChange}
          handleAuthorChange={handleAuthorChange}
        />
        <button onClick={handleLogout}>logout</button>
      <div>
        {blogs.sort(sortBlogs).map(blog => 
          <Blog
          key={blog.id}
          blog={blog}/>
        )}
      </div>
    </div>
  )
}

export default App