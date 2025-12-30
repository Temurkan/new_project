import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/product-services.js";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: productService.getAllProducts,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productService.update,
    onMutate: async (updatedProduct) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });
      const previousProducts = queryClient.getQueryData(["products"]);

      queryClient.setQueryData(["products"], (old = []) =>
        old.map((p) =>
          p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p
        )
      );

      return { previousProducts };
    },
    onError: (err, updatedProduct, context) => {
      queryClient.setQueryData(["products"], context.previousProducts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
