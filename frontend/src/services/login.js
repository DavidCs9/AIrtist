import axios from 'axios'

const baseUrl = 'https://airstist-backend.onrender.com/api/v1/login'

export const login = async credentials => {
  const res = await axios.post(baseUrl, credentials)
  return res.data
}
