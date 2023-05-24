import { useState } from 'react'
import { useSelector } from 'react-redux'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { setMessage } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

const LoginForm = ({ style }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const message = useSelector(state => state.notification)
  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      dispatch(setUser(user))
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (err) {
      dispatch(setMessage('The credentials are incorrect'))
      console.log('The credentials are incorrect')
      console.log(err)
    }
  }

  return (
    <div>
      {message && <p style={style}>{ message }</p>}
      <h2>Log into application</h2>
      <form onSubmit={handleLogin}>
        <div>
            Username:
          <input
            type="text"
            value={username}
            id="username"
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            Password:
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
            Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm