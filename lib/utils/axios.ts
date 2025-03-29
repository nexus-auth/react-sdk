import Axios from 'axios'

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  validateStatus: (status) => status < 500,
  withCredentials: true
})
