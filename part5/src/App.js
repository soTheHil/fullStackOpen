import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a,b) => b.likes - a.likes)
      setBlogs( blogs )
    }
    )
  }, [])

  useEffect(() => {
    const loggedJSON = window.localStorage.getItem('loggedInUser')
    if (loggedJSON) {
      const user = JSON.parse(loggedJSON)
      setUser(user)
      console.log(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUser(user)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    }
    catch(err) {
      setMessage('The credentials are incorrect')
      setTimeout(() => {
        setMessage(null)
      },5000)
      console.log('The credentials are incorrect')
      console.log(err)
    }

  }

  const blogFormRef = useRef()

  if (!user) {
    return (
      <div>
        <Notification message={message}/>
        <h2>Log into application</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username:
            <input
              type="text"
              value={username}
              id="username"
              name="Username"
              onChange={ ({ target }) => setUsername(target.value) }
            />
          </div>
          <div>
            Password:
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={ ({ target }) => setPassword(target.value) }
            />
          </div>
          <button id="login-button" type="submit">Login</button>
        </form>
      </div>
    )
  }

  const handleLogout =() => {
    setUser(null)
    window.localStorage.clear()
  }

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(newBlog)
    returnedBlog.user = user
    console.log(returnedBlog)
    setBlogs(blogs.concat(returnedBlog))
    const { title, author } = returnedBlog
    setMessage(`New blog: "${title}" by ${author}`)
    setTimeout(() => {
      setMessage(null)
    },5000)
  }

  const updateLikes = async (blog) => {
    const newObject =
    {
      likes: blog.likes + 1
    }
    const data = await blogService.update(blog.id, newObject)
    const newBlogs = [...blogs]
    const updatedBlog = newBlogs.find(b => b.id === data.id)
    updatedBlog.likes = data.likes
    setBlogs(newBlogs)
    console.log(data, 'update likes')
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        const res = await blogService.remove(blog.id)
        const newBlogs = blogs.filter(b => b.id !== blog.id)
        setBlogs(newBlogs)
        setMessage(`Removed blog ${blog.title} by ${blog.author}`)
        setTimeout(() => {
          setMessage(null)
        },5000)
        console.log(res)
      }
      catch(err) {
        console.log(err.response.data.error)
        setMessage(err.response.data.error)
        setTimeout(() => {
          setMessage(null)
        },5000)
      }
    }
  }

  return (
    <div>
      <Notification message={message}/>
      <h2>blogs</h2>
      <p>{ user.name} is logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={updateLikes}
          removeBlog={removeBlog}
        />
      )}
    </div>
  )
}

export default App