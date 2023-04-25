import { useState } from 'react'

const Blog = ({ blog, updateLikes, removeBlog }) => {
  const [show, setShow] = useState(false)

  const toggleShow = () => setShow(!show)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const min = () => (
    <div style = {blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button onClick={toggleShow}>Show</button>
    </div>
  )

  const max = () => (
    <div style = {blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button onClick={toggleShow}>Hide</button>
      <br/>
      <a href="#">{blog.url}</a>
      <br/>
    likes: {blog.likes}
      <button onClick={() => updateLikes(blog)}>
      like
      </button>
      <br/>
      {blog.user.name}
      <br/>
      <button onClick={() => removeBlog(blog)}>remove</button>
    </div>
  )

  return (
    <>
      {show ? max() : min()}
    </>
  )

}

export default Blog