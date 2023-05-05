import { createSlice } from "@reduxjs/toolkit"
import anecService from '../services/anecdote'

const anecSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const newAnec = action.payload
      const newState = state.map(anec => anec.id !== newAnec.id ? anec : newAnec)
      return newState.sort((a1, a2) => a2.votes - a1.votes)
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const {addAnecdote, vote, setAnecdotes} = anecSlice.actions

export const intialiseAnecdotes = () => {
  return async dispatch => {
    const anecs = await anecService.getAll()
    dispatch(setAnecdotes(anecs))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnec = await anecService.createNew(content)
    dispatch(addAnecdote(newAnec))
  }
}

export const updateAnecdote = (anec) => {
  return async dispatch => {
    const newAnec = await anecService.updateVote(anec)
    dispatch(vote(newAnec))
  }
}

export default anecSlice.reducer