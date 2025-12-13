'use client'

import { useState } from 'react'
import { HeartIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
  CardContent,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

const CardProduct = ({ product }) => {
  const [liked, setLiked] = useState(false)

  return (
    <div className='relative max-w-xs rounded-xl shadow-lg h-full flex flex-col'>
      {/* Верхняя часть — картинка */}
      <div className='flex-1 flex items-center justify-center'>
        <img
          src={
            product.images[0] ||
            'https://cdn.shadcnstudio.com/ss-assets/components/card/image-11.png?width=300&format=auto'
          }
          alt={product.title}
          className='w-3/4 object-contain rounded-md'
        />
      </div>

      {/* Нижняя часть — контент карточки */}
      <Card className='border-none shadow-none flex flex-col justify-end'>
        <CardHeader>
          <CardTitle className='line-clamp-1'>{product.title}</CardTitle>
          <CardDescription className='flex flex-wrap gap-2'>
            {product.sizes?.map((size) => (
              <Badge key={size} variant='outline' className='rounded-sm'>
                {size}
              </Badge>
            ))}
            {product.color && (
              <Badge variant='outline' className='rounded-sm'>
                {product.color}
              </Badge>
            )}
          </CardDescription>
        </CardHeader>

        <CardFooter className='justify-between gap-3 flex-wrap'>
          <div className='flex flex-col'>
            <span className='text-sm font-medium uppercase'>Price</span>
            <span className='text-xl font-semibold'>${product.price}</span>
          </div>
          <Button size='lg'>Add to cart</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CardProduct
