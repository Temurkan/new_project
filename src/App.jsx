import { BrowserRouter } from 'react-router-dom'
import AppRoutes from '@/router'
import { Toaster } from 'sonner'

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
