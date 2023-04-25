import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    addBlog(newBlog)
    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input
            id='title'
            type='text'
            name='Title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type="text"
            name="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type="text"
            name="URL"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm