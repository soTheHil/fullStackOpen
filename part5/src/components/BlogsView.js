
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useRef } from 'react'
import blogService from '../services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { setBlogs } from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
const BlogsView = ({ blogs }) => {
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(newBlog)
    returnedBlog.user = user
    console.log(returnedBlog)
    dispatch(setBlogs(blogs.concat(returnedBlog)))
    const { title, author } = returnedBlog
    dispatch(setMessage(`New blog: "${title}" by ${author}`))
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }


  return (
    <div>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      <ul>
        {blogs.map((blog) =>
          <li key={blog.id} style={blogStyle}>
            <Link  to={`/blogs/${blog.id}`}>{ blog.title}</Link>
          </li>
        )}
      </ul>

    </div>
  )
}
{/* <Blog
          key={blog.id}
          blog={blog}
          removeBlog={removeBlog}
        /> */}
export default BlogsView