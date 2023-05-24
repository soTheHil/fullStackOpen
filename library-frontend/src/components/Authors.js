import { useState } from "react"
import { EDIT_BOOK, ALL_AUTHORS } from "../queries"
import { useMutation } from "@apollo/client"
import Select from 'react-select';
const Authors = ({ query }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null);

  const [editAuthor] = useMutation(EDIT_BOOK, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  if (query.loading) return null

  const authors = query.data.allAuthors

  const options = authors.map(a => ({ value: a.name, label: a.name }))

  const submit = (e) => {
    e.preventDefault()
    editAuthor({variables: {name: selectedOption.value, setBornTo: born}})
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
           <Select
        onChange={setSelectedOption}
        options={options}
        />
          <div>
            born:
             <input
              type="number"
              name="born"
            value={born}
            onChange={({target}) => setBorn(parseInt(target.value))}
          />
        </div>
         

          <button>update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
