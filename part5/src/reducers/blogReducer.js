import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  initialState: [],
  name: 'blogs',
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      return state.map(b => b.id !== action.payload.id ? b : action.payload)
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(blogs))
  }
}

export const updateLikes = (blog) => {
  return async dispatch => {
    const updatedObject = { likes: blog.likes + 1 }
    const returnedBlog = await blogService.update(blog.id, updatedObject)
    const updatedBlog = { ...blog, likes: returnedBlog.likes }
    dispatch(updateBlog(updatedBlog))
  }
}

export const { setBlogs, updateBlog } = blogSlice.actions
export default blogSlice.reducer