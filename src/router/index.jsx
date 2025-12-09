import { createBrowserRouter } from 'react-router-dom'
import HomePage from '@/pages/home'
import { PostPage } from '@/pages/products'
import AuthLayout from '@/layouts/auth-layout.jsx'
import { ProtectedRoutes } from '@/components/auth/protectedRoutes.jsx'
import MainLayout from '@/layouts/main-layout.jsx'
import LoginPage from '@/pages/login/index.jsx'
import NotFoundPage from '@/pages/notfound/index.jsx'

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [{ path: '/login', element: <LoginPage /> }],
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
