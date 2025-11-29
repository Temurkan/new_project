import { Button } from '@/components/ui/button'
import { instance } from '@/lib/axios.js'
import { useState } from 'react'
import { useEffect } from 'react'

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const getProducts = async () => {
    const prods = await instance.get('/products')
    const users = await instance.get('/users')
    setProducts(prods)
    setUsers(users)
  }
  useEffect(() => {
    getProducts()
  }, [])
  return (
    <div className='space-y-3'>
      <ul className='grid grid-cols-10 gap-1'>
        {products.map((prod) => (
          <li className='bg-gray-200 flex flex-col' key={prod.id}>
            <span className='font-semibold'>Product:{prod.title}</span>

            <span>Price:{prod.price}$</span>
          </li>
        ))}
      </ul>
      <ul className='grid grid-cols-10 gap-1'>
        {users.map((user) => (
          <li className='bg-gray-400 ' key={user.id}>
            <div className='font-semibold'>User:{user.name}</div>
            <div>Role:{user.role}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
