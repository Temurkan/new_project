import { Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/home'
import { PostPage } from '@/pages/products/index.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/post' element={<PostPage />} />
      <Route
        path='*'
        element={
          <div className='text-2xl p-4 text-red-500'>404 - Page Not Found</div>
        }
      />
    </Routes>
  )
}
