import { useState, useEffect } from 'react'
import { instance } from '@/lib/axios.js'
import CardProduct from '@/components/card/index.jsx'

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])

  const getProducts = async () => {
    const prods = await instance.get('/products')
    const usrs = await instance.get('/users')

    setProducts(Array.isArray(prods.data) ? prods.data : [])
    setUsers(Array.isArray(usrs.data) ? usrs.data : [])
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className='space-y-6 pt-24 px-3'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {products.map((prod) => (
          <CardProduct key={prod.id} product={prod} />
        ))}
      </div>

      <h2 className='text-xl font-bold pt-6'>Users</h2>
      <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2'>
        {users.map((user) => (
          <li key={user.id} className='bg-gray-200 p-2 rounded'>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
