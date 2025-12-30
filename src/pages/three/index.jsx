import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useProducts } from "@/hooks/queries/products";
import CardProduct from "@/components/card";

export default function ThreePage() {
  const queryClient = useQueryClient();

  const { data: products = [], isLoading, isError, error } = useProducts();

  const createProduct = async (payload) => {
    try {
      setSubmitting(true);
      await instance.post("/products", payload);

      toast.success("Product created successfully!");
      form.reset();

      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating product");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <div className="space-y-6 pt-24 px-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map((prod) => (
          <CardProduct key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
}
