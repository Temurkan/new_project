import { instance } from '@/lib/axios.js'

export const productService = {
  getAllProducts: async () => {
    return await instance.get('/products')
  },
}
