import { instance } from '@/lib/axios.js'
import { useState } from 'react'
import { useEffect } from 'react'

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const getProducts = async () => {
    const prods = await instance.get('/products')
    const usrs = await instance.get('/users')

    console.log('PRODUCTS:', prods.data)
    console.log('USERS:', usrs.data)

    setProducts(Array.isArray(prods.data) ? prods.data : [])

    setUsers(Array.isArray(usrs.data) ? usrs.data : [])
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
        {Array.isArray(users) &&
          users.map((user) => (
            <li className='bg-gray-200 flex flex-col' key={user.id}>
              {user.name}
            </li>
          ))}
      </ul>
    </div>
  )
}
