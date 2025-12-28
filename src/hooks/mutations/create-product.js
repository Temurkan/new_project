import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/product-services";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productService.create,
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries(["products"]);

      const previous = queryClient.getQueryData(["products"]);

      queryClient.setQueryData(["products"], (old = []) => [
        { ...newProduct, id: Date.now() },
        ...old,
      ]);

      return { previous };
    },
    onError: (_err, _newProduct, ctx) => {
      queryClient.setQueryData(["products"], ctx.previous);
    },
    onSuccess: (createdProduct) => {
      queryClient.setQueryData(["products"], (old = []) =>
        old.map((p) => (p.id === createdProduct.id ? createdProduct : p))
      );
    },
  });
};
