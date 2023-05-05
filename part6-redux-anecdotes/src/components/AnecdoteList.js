import { useSelector, useDispatch } from 'react-redux'
import {vote, updateAnecdote, intialiseAnecdotes} from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'
import { useEffect } from 'react'



const AnecdoteList = () => {
  const anecdotes = useSelector(({anecdotes, filter}) => {
    if (filter === '') return anecdotes
    return anecdotes.filter(anec => anec.content.includes(filter))
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(intialiseAnecdotes())
  }, [dispatch])

  const voteFor = (anec) => {
    console.log('vote', anec.id)
    dispatch(updateAnecdote(anec))
    dispatch(setMessage(`Voted for ${anec.content}`, 4))
  }

    return (
        <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteFor(anecdote)}>vote</button>
          </div>
        </div>
      )}
        </>
    )
}

export default AnecdoteList