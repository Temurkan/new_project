import { instance } from "@/lib/axios.js";

export const productService = {
  async getAllProducts() {
    const res = await instance.get("/products");
    return res.data;
  },
  async createProduct(data) {
    const res = await instance.post("/products", data);
    return res.data;
  },
};
