import axios from 'axios'

const baseUrl = 'https://airstist-backend.onrender.com/api/v1/users'

export const register = async credentials => {
  const res = await axios.post(baseUrl, credentials)
  return res.data
}
