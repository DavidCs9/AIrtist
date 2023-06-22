import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/v1/users'

export const register = async credentials => {
  const res = await axios.post(baseUrl, credentials)
  return res.data
}
