import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('add form', async  () => {
  const addBlog = jest.fn()
  const user = userEvent.setup()
  render(<BlogForm addBlog={addBlog}/>)

  const createBtn = screen.getByText('create')
  const inputs = screen.getAllByRole('textbox')

  await user.type(inputs[0], 'New Blog')
  await user.click(createBtn)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('New Blog')
})