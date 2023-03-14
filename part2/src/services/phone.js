import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
      return axios
            .get(baseUrl)
            .then(response => response.data)
}

const create = (obj) => {
    const request = axios.post(baseUrl, obj)
    return request.then(response => response.data)
}

const test = () => {
    console.log('test works')
}

const remove = (id) => {
   const request = axios.delete(`${baseUrl}/${id}`)
   return request//.then(r => r.data)
}

const update = (id, obj) => {
   const request = axios.put(`${baseUrl}/${id}`, obj)
   return request.then(response => response.data)
}

const Notification = ({message, style}) => {
    if (message == null) return null;
    return (
        <div className={style}>
            {message}
        </div>
    )
}


export {getAll, create, update, remove, test, Notification}