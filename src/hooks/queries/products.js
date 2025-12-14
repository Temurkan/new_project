import { productService } from '@/services/product-services.js'
import { useQuery } from '@tanstack/react-query'

export const useProducts = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getAllProducts,
  })
  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  }
}
