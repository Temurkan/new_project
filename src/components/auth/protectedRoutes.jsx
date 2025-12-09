import { useAuthStore } from '@/store/useAuthStore.js'
import { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const ProtectedRoutes = () => {
  const { isAuthenticated, checkAuth } = useAuthStore()
  const location = useLocation()
  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  const token = localStorage.getItem('access_token')
  if (!token && !isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }
  return <Outlet />
}
