import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/product-services";
import { toast } from "sonner";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productService.update,

    onMutate: async (newInfo) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });
      const previousProducts = queryClient.getQueryData(["products"]);

      queryClient.setQueryData(["products"], (old = []) =>
        old.map((p) => (p.id === newInfo.id ? { ...p, ...newInfo } : p))
      );

      return { previousProducts };
    },

    onError: (err, newInfo, context) => {
      queryClient.setQueryData(["products"], context.previousProducts);
      toast.error("Ошибка сервера (500). Проверьте данные запроса.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
