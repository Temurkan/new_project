import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuthStore } from '@/store/useAuthStore.js'
import { useEffect } from 'react'
import { instance } from '@/lib/axios.js'

export default function LoginPage() {
  const [users, setUsers] = useState([])
  const [sloading, setsLoading] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      setsLoading(true)
      try {
        const response = await instance.get('/users') // GET всех пользователей
        setUsers(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Failed to fetch users', error)
      } finally {
        setsLoading(false)
      }
    }

    fetchUsers()
  }, [])
  const navigate = useNavigate()
  const { login, loading, error } = useAuthStore()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await login({
      email: formData.email,
      password: formData.password,
    })
    if (success) {
      console.log('LOGIN OK')
      navigate('/')
    }
  }

  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <div className='flex flex-col gap-6'>
          <Card>
            <CardHeader>
              {error && (
                <div className='p-3 mb-3 text-sm text-red-600 bg-red-100 rounded-md'>
                  {error}
                </div>
              )}

              <CardTitle>Login to your account</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor='email'>Email</FieldLabel>
                    <Input
                      id='email'
                      type='email'
                      name='email'
                      placeholder='tem@gmail.com'
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Field>
                  <Field>
                    <div className='flex items-center'>
                      <FieldLabel htmlFor='password'>Password</FieldLabel>
                      <Link
                        to='/forgot-password'
                        className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id='password'
                      type='password'
                      name='password'
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </Field>
                  <Field>
                    <Button type='submit' disabled={loading}>
                      {loading ? 'Loading' : 'Login'}
                    </Button>
                    <Button variant='outline' type='button'>
                      Login with Google
                    </Button>
                    <FieldDescription className='text-center'>
                      Don&apos;t have an account?{' '}
                      <Link className='text-gray-900' to={'/register'}>
                        Sign up
                      </Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
