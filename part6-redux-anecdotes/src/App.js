import { useSelector, useDispatch } from 'react-redux'
import {vote, createAnecdote} from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/filter'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
    <h2>Anecdotes</h2>
    <Notification />
    <Filter />
    <AnecdoteList />
    <AnecdoteForm />
    </div>
  )
}

export default App