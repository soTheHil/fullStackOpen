import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/Login'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import {
  Route,
  Routes,
  Link,
  Navigate
} from 'react-router-dom'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, BOOK_BY_GENRE } from './queries'

const App = () => {
  const [selectedGenre, setGenre] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const result = useQuery(ALL_AUTHORS)
  // console.log(result)
  // console.log('haha reset')
  // console.log(token, 'token')
  const style = {
        margin: 5
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data, 'Book added yay')
      window.alert('Book added')
      const addedBook = data.data.bookAdded
      client.cache.updateQuery({ query: ALL_BOOKS }, ({allBooks}) => {
        return {
          allBooks: allBooks.concat(addedBook)
        }
      })
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    setToken(localStorage.getItem('user-token'))
  }, [])
  
  return (
    <div>
      <div>
        <Link style={style} to="/authors">authors</Link>
        <Link style={style} to="/books">books</Link>
        {token && <Link style={style} to="/addBook">add book</Link>}
        {
          !token ?
            <Link style={style} to="/">login</Link> :
            <button onClick={logout}>logout</button>
        }
      </div>
      
      <Routes>
        <Route path="/authors" element={<Authors query={result} />} />
        <Route path="/books"
          element={<Books selectedGenre={selectedGenre } setGenre={setGenre} />} />
        <Route path="/" element={<LoginForm setToken={setToken} />} />
        <Route path="/addBook" element={<NewBook />} />
      </Routes>

      
    </div>
  )
}

export default App
