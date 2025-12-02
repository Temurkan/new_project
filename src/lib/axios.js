import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (config) => {
    return config.data
  },
  async (error) => {
    const originalReq = error.config
    if (
      error.response &&
      error.response.status === 401 &&
      !originalReq._retry
    ) {
      originalReq._retry = true
      try {
        const refreshToken = localStorage.getItem('refresh_token')
        if (!refreshToken) {
          throw new Error('Refresh token is not exist')
        }
        const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
          refreshToken: refreshToken,
        })

        const { access_token, refresh_token } = response.data
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)

        originalReq.headers.Authorization = `Bearer ${access_token}`
        return instance(originalReq)
      } catch (refreshError) {
        console.log('Session expired. Please login again')
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user_data')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }
  }
)
