import { updateLikes } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import commentService from '../services/comments'
import { setBlogs } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Blog = ({ blog }) => {
  const [comment, setComment] = useState('')
  const [blogComments, setComments] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blogs = useSelector(state => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        const res = await blogService.remove(blog.id)
        navigate('/')
        const newBlogs = blogs.filter((b) => b.id !== blog.id)
        dispatch(setBlogs(newBlogs))
        dispatch(setMessage(`Removed blog ${blog.title} by ${blog.author}`))
        console.log(res)
      } catch (err) {
        console.log(err.response.data.error)
        dispatch(setMessage(err.response.data.error))
      }
    }
  }

  useEffect(() => {
    if (blog === undefined) return
    blogService.find(blog.id)
      .then(b => {
        setComments(b.comments)
      })
  }, [blog])

  const addComment = async () => {
    const returnedComment = await commentService.create(blog.id, comment)
    setComments(blogComments.concat(returnedComment))
    setComment('')
  }

  if (blog === undefined) return null

  const max = () => (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <br />
      <a href="#">{blog.url}</a>
      <br />
      likes: {blog.likes}
      <button onClick={() => dispatch(updateLikes(blog))}>like</button>
      <br />
      {blog.user.name}
      <br />
      <button onClick={() => removeBlog(blog)}>remove</button>
      <h3>Comments</h3>
      <input type="text" value={ comment } onChange={e => setComment(e.target.value)}/>
      <button onClick={addComment}>Add Comment</button>
      <ul>
        {
          blogComments.length !== 0
            ? blogComments.map(c =>
              <li key={c.id}>{ c.content }</li>
            )
            : null
        }
      </ul>

    </div>
  )

  return max()
}

export default Blog
