import axios from 'axios'
const baseUrl = '/api/users'

const getUsers = async () => {
  const res = await axios.get(baseUrl)
  console.log(res)
  return res.data
}

export { getUsers }