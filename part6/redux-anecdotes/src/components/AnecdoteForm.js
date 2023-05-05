import { useDispatch } from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import { changeMessage, removeMessage } from '../reducers/notificationReducer'
import { useState } from 'react'
import anecService from '../services/anecdote'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const [myTimeout, setTime] = useState(null)
    const addAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(changeMessage(`Created ${content}`))
        clearTimeout(myTimeout)
        setTime(setTimeout( () => { dispatch(removeMessage()) }, 2000))
      }

    return (
    <>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
        </form>
    </>
    )
}

export default AnecdoteForm