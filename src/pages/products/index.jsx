'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { instance } from '@/lib/axios'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group'

const formSchema = z.object({
  title: z.string().min(5).max(32),
  price: z.string().min(1),
  description: z.string().min(20).max(100),
  categoryId: z.string().min(1),
  images: z.string().url('Image must be a valid URL'),
})

export function PostPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      price: '',
      description: '',
      categoryId: '',
      images: '',
    },
  })

  async function onSubmit(data) {
    try {
      const payload = {
        title: data.title,
        price: Number(data.price),
        description: data.description,
        categoryId: Number(data.categoryId),
        images: [data.images], // <-- строку превращаем в массив
      }

      const res = await instance.post('/products', payload)

      toast('Product created successfully!', {
        description: (
          <pre className='bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4'>
            <code>{JSON.stringify(res, null, 2)}</code>
          </pre>
        ),
        position: 'bottom-right',
      })
    } catch (error) {
      toast('Error creating product!', {
        description: error.message,
        position: 'bottom-right',
      })
    }
  }

  return (
    <div className='flex justify-center items-center p-3'>
      <Card className='w-[600px]'>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form id='form-rhf-demo' onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name='title'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='form-rhf-demo-title'>
                      Product title
                    </FieldLabel>
                    <Input
                      {...field}
                      id='form-rhf-demo-title'
                      aria-invalid={fieldState.invalid}
                      placeholder='Classic Comfort Fit Joggers'
                      autoComplete='off'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name='price'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='form-rhf-demo-title'>
                      Product price
                    </FieldLabel>
                    <Input
                      {...field}
                      id='form-rhf-demo-price'
                      aria-invalid={fieldState.invalid}
                      placeholder='24'
                      autoComplete='off'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name='images'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='form-rhf-demo-images'>
                      Product image
                    </FieldLabel>
                    <Input
                      {...field}
                      id='form-rhf-demo-images'
                      aria-invalid={fieldState.invalid}
                      placeholder='image'
                      autoComplete='off'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name='categoryId'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='form-rhf-demo-category-id'>
                      Category id
                    </FieldLabel>
                    <Input
                      {...field}
                      id='form-rhf-demo-category-id'
                      aria-invalid={fieldState.invalid}
                      placeholder='1'
                      autoComplete='off'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name='description'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='form-rhf-demo-description'>
                      Description
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id='form-rhf-demo-description'
                        placeholder="I'm having an issue with the login button on mobile."
                        rows={6}
                        className='min-h-24 resize-none'
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align='block-end'>
                        <InputGroupText className='tabular-nums'>
                          {field.value.length}/100 characters
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription>
                      Include steps to reproduce, expected behavior, and what
                      actually happened.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation='horizontal'>
            <Button
              type='button'
              variant='outline'
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type='submit' form='form-rhf-demo'>
              Submit
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
