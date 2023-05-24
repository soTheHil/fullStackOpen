import axios from 'axios'
const baseUrl = '/api/comments'

const create = async (id, comment) => {
  const res = await axios.post(`${baseUrl}/${id}`, { content: comment })
  return res.data
}

export default { create }