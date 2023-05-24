import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";
import { useNavigate } from "react-router-dom";

const LoginForm = ({setToken}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [login, result] = useMutation(LOGIN)

    const navigate = useNavigate()

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('user-token', token)
            navigate('/books')
        }
    }, [result.data]) //eslint-disable-line

    const submit = async (event) => {
        event.preventDefault()
        login({ variables: { username, password } })
        setPassword('')
        setUsername('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    Username:
                  <input
                    type="string"
                    value={username}
                    onChange={({target}) => setUsername(target.value)}
                  />
                </div>
                <div>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginForm