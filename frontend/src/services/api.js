import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const checkSystemHealth = async () => {
  const response = await api.get('/')
  return response.data
}

export const callAuthService = async () => {
  const response = await api.get('/auth/')
  return response.data
}

export const callUserService = async () => {
  const response = await api.get('/users/')
  return response.data
}

export const callProductService = async () => {
  const response = await api.get('/products/')
  return response.data
}

export const generateLoad = async (service = 'auth') => {
  const response = await api.get(`/${service}/load`)
  return response.data
}

export const getUsers = async () => {
  const response = await api.get('/users/users')
  return response.data
}

export const getProducts = async () => {
  const response = await api.get('/products/products')
  return response.data
}

export default api
