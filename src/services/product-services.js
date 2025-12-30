import { instance } from "@/lib/axios.js";

export const productService = {
  getAllProducts: async () => {
    const res = await instance.get("/products");
    return res.data;
  },
  getCategories: async () => {
    const res = await instance.get("/categories");
    return res.data;
  },

  create: async (data) => {
    const res = await instance.post("/products", data);
    return res.data;
  },

  update: async ({ id, ...payload }) => {
    const res = await instance.put(`/products/${id}`, payload);
    return res.data;
  },

  delete: async (id) => {
    const res = await instance.delete(`/products/${id}`);
    return res.data;
  },
};
