import { instance } from '@/lib/axios.js'

export const authService = {
  login: async (username, password) => {
    return instance.post('/auth/login', { username, password })
  },
  logout: async () => {
    return ''
  },
  register: async () => {
    return instance.post('/', data)
  },
  getProfile: async () => {
    return instance.get('/auth/profile')
  },
}
