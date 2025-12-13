import { instance } from '@/lib/axios.js'

export const authService = {
  login: async (credentials) => {
    return await instance.post('/auth/login', credentials)
  },
  logout: async () => {
    return ''
  },
  register: async (data) => {
    return await instance.post('/users', data)
  },
  get: async () => {
    return await instance.get('/auth/profile')
  },
}
