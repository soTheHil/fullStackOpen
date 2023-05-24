import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('blog', () => {
  let container
  let blog
  const like = jest.fn()

  beforeEach(() => {
    blog = {
      author: 'BRO',
      title: 'Meppo returns',
      url: 'www.kd.com',
      likes: 5,
      user: {
        name: 'Boh Ry Cho',
      },
    }

    container = render(<Blog blog={blog} updateLikes={like} />).container
  })

  test('renders blog author and title', () => {
    const div = container.querySelector('.blog')

    //const element = screen.getByText(blog.title+  ' ' + blog.author)
    expect(div).toHaveTextContent(blog.title + ' ' + blog.author)
  })

  test('renders url and likes', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Show')
    await user.click(button)

    const element = await screen.getByText('likes: 5', { exact: false })
    expect(element).toBeDefined()


  })

  test('like button', async () => {
    const user = userEvent.setup()

    const button = screen.getByText('Show')
    await user.click(button)

    const likeBtn = screen.getByText('like')
    screen.debug(likeBtn)
    await user.click(likeBtn)
    await user.click(likeBtn)
    expect(like.mock.calls).toHaveLength(2)
  })
})
