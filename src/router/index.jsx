import { Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/home'
import { PostPage } from '@/pages/products/index.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<PostPage />} />
      <Route path='/post' element={<HomePage />} />
      <Route
        path='*'
        element={
          <div className='text-2xl p-4 text-red-500'>404 - Page Not Found</div>
        }
      />
    </Routes>
  )
}
