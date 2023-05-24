import { useQuery } from "@apollo/client"
import { useState, useEffect } from "react"
import { ALL_BOOKS, BOOK_BY_GENRE } from "../queries"

const Books = ({selectedGenre, setGenre}) => {
  
  const query = useQuery(ALL_BOOKS)
  if(query.loading) return null
  const books = query.data.allBooks
  const genres = ['horror','agile','patterns','Fun','War', 'Fantasy']

  return (
    <div>
      <h2>books</h2>
      {selectedGenre && <p>In genre <strong>{selectedGenre}</strong></p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => {
            if (!selectedGenre) return (
              <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
              </tr>
            )
            return a.genres.includes(selectedGenre) ?
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
              </tr>
              : null
})}
        </tbody>
      </table>
      <div>
        {
          genres.map((genre, i) => 
            <button key={i}
              onClick={() => {
                setGenre(genre)
                //query.refetch({genre})
              }}>
              {genre}
            </button>
            )
        }
        <button onClick={() => {
          setGenre(null)
          //query.refetch({genre: null})
        }}>
          All genres
        </button>
      </div>
    </div>
  )
}

export default Books
