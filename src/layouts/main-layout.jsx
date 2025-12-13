import Nav from '@/components/navbar/index.jsx'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  )
}
