import { useState, useEffect } from 'react'
import axios from 'axios'
import {getAll, create, remove, update, test, Notification} from './services/phone.js'
import './index.css'
const App = () => {
  //state
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredNames, setFilter] = useState([])
  const [message, setMessage] = useState(null)
  const [messageStyle, setMessageStyle] = useState('error')

  //event handlers
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  //adds to list
  const addPerson = (event) => {
    event.preventDefault()
    let newPerson = null
    const result = persons.find(person => person.name === newName)
    //person already in list
    if (result) {
      if (window.confirm(`Change ${result.name}'s number`)) {
        newPerson = {
          name:result.name,
          number:newNumber
        }
        const request = update(result.id, newPerson)
        request.then(obj => {
          setPersons(persons.map(person => person.id !== result.id ? person : obj))
        })
        //catch error - person does not exist/ removed from server
        .catch(error => {
          setMessage(`${newPerson.name} was already deleted`)
          setMessageStyle('error')
          setTimeout(() => {
            setMessage(null)
          },5000)
          setPersons(persons.filter(person => person.id !== result.id))
        })
        console.log(request, 'request')
      }
      setNewName('')
      setNewNumber('')
      return
    }
    //default add person to list
    newPerson = {
      name: newName,
      number: newNumber
    }
    setNewName('')
    setNewNumber('')
    const returnedPerson = create(newPerson)
    returnedPerson.then(data => {
      setPersons(persons.concat(data))
    })
    //success notification 
    setMessage(`Added ${newPerson.name}`)
    setMessageStyle('notification')
    setTimeout(() => {
      setMessage(null)
    }, 5000);
  }

  const filter =(event) => {
    const name = event.target.value
    if (name === '') {
        setFilter([])
        return
    }
    const length = name.length
    const newFilter = persons.filter(person => {
        const sub = person.name.substring(0, length)
        return sub.toLowerCase() === name.toLowerCase()
    })
    setFilter(newFilter)
  }

  const removePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}`)) {
      remove(id)
      .then(response => {
        console.log(response.data, 'remove - response data')
      })
      .catch(error => {
        setMessage(`${person.name} was already deleted`)
        setMessageStyle('error')
        setTimeout(() => {
          setMessage(null)
        },5000)
      })
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  useEffect(() => {
    const request = getAll()
    console.log(request, 'promise')
    request.then(data => setPersons(data))
  },[])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} style={messageStyle} />
      <div>
        filter: <input onChange={filter}/>
      </div>
      <h2>Add New</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
            number: <input
                     value={newNumber} 
                     onChange={(event) => setNewNumber(event.target.value)} 
                     />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person => 
          <div key={person.id}>
              <p >
                {person.name} {person.number}
                <button onClick={() => removePerson(person.id)}>Delete</button>
                </p>
          </div>
            )
      }
      <h2>Filter</h2>
      <div>
        {
          filteredNames.map(person => 
            <p key={person.name}>
              {person.name} {person.number}
            </p>)
        }
      </div>
    </div>
  )
}

export default App