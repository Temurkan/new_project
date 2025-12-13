import { createBrowserRouter } from 'react-router-dom'
import HomePage from '@/pages/home'
import { PostPage } from '@/pages/products'
import AuthLayout from '@/layouts/auth-layout'
import { ProtectedRoutes } from '@/components/auth/protectedRoutes'
import MainLayout from '@/layouts/main-layout'
import LoginPage from '@/pages/login'
import NotFoundPage from '@/pages/notfound'
import RegisterPage from '@/pages/register'

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/',
            element: <HomePage />,
          },
          {
            path: '/post',
            element: <PostPage />,
          },
        ],
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])

export default router
