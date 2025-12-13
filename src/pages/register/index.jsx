import { useAuthStore } from '@/store/useAuthStore.js'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
export default function RegisterPage() {
  const navigate = useNavigate()
  const { register, loading, error } = useAuthStore()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await register(formData)
    if (success) {
      alert('Successfully registered!')
      navigate('/login')
    }
  }

  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor='name'>Full Name</FieldLabel>
                  <Input
                    id='name'
                    type='text'
                    name='name'
                    placeholder='John Doe'
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor='email'>Email</FieldLabel>
                  <Input
                    id='email'
                    type='email'
                    name='email'
                    placeholder='m@example.com'
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor='password'>Password</FieldLabel>
                  <Input
                    id='password'
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                </Field>

                <FieldGroup>
                  <Field>
                    <Button type='submit' disabled={loading}>
                      {loading ? 'Creating' : 'Create account'}
                    </Button>
                    <Button variant='outline' type='button'>
                      Sign up with Google
                    </Button>
                    <FieldDescription className='px-6 text-center'>
                      Already have an account?
                      <Link className='text-gray-900' to={'/login'}>
                        Sign up
                      </Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
