import { useEffect, useState } from 'react'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import BlogsView from './components/BlogsView'
import UsersView from './components/UsersView'
import User from './components/User'
import { getUsers } from './services/users'
import Blog from './components/Blog'
import {
  Route,
  Routes,
  useMatch,
  Link
} from 'react-router-dom'

const App = () => {
  const [users, setUsers] = useState([])
  const blogs = useSelector(state => state.blogs)
  const message = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const match = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')

  const selectedUser = match
    ? users.find(u => u.id === match.params.id)
    : null

  const selectedBlog = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null

  console.log(selectedUser, 'SELECTED USER')
  console.log(selectedBlog, 'SEL BLOG')

  const style = {
    backgroundColor: 'green',
    padding: '10'
  }

  const linkStyle = {
    margin:6
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    getUsers()
      .then(data => {
        setUsers(data)
        console.log(data, 'USER DATA')
      })
  }, [blogs])

  useEffect(() => {
    const loggedJSON = window.localStorage.getItem('loggedInUser')
    if (loggedJSON) {
      const user = JSON.parse(loggedJSON)
      dispatch(setUser(user))
      console.log(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    dispatch(setUser(null))
    window.localStorage.clear()
  }

  if (!user) {
    return (
      <LoginForm style={style} />
    )
  }

  return (
    <div>
      {message && <p style={style}>{ message }</p>}
      <h2>blogs</h2>
      <Link to="/" style={linkStyle}>blogs</Link>
      <Link to="/users" style={linkStyle}>users</Link>
      <span>{user.name} is logged in</span>
      <button onClick={handleLogout}>logout</button>
      <Routes>
        <Route path="/users/:id" element={<User user={ selectedUser } />} />
        <Route path="/users" element={<UsersView users={users} />} />
        <Route path="/" element={<BlogsView blogs={blogs} />} />
        <Route path="/blogs/:id" element={<Blog blog={selectedBlog} />} />
      </Routes>

    </div>
  )
}

export default App
