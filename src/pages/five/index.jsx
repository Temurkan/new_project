import React from "react";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/product-services";
import { useUpdateProduct } from "@/hooks/update-optimistic";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function FivePage() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: productService.getAllProducts,
  });

  const updateMutation = useUpdateProduct();

  const handlePriceIncrease = (product) => {
    const updatedData = {
      id: product.id,
      title: product.title,
      price: Number(product.price) + 10,
      description: product.description,
      images: product.images,
      categoryId: product.category?.id || 1,
    };

    updateMutation.mutate(updatedData);
  };

  if (isLoading)
    return (
      <div className="p-10 text-center text-2xl font-bold">Loading...</div>
    );

  return (
    <div className="container mx-auto p-6 pt-24">
      <h1 className="text-3xl font-bold mb-8">Optimistic Updates Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 12).map((product) => (
          <Card
            key={product.id}
            className="flex flex-col h-full overflow-hidden transition-all hover:shadow-xl"
          >
            <div className="h-48 overflow-hidden bg-muted flex items-center justify-center">
              <img
                src={product.images?.[0]}
                alt={product.title}
                className="object-cover w-full h-full"
              />
            </div>

            <CardHeader className="p-4">
              <CardTitle className="text-lg line-clamp-1">
                {product.title}
              </CardTitle>
              <Badge variant="secondary" className="w-fit">
                ID: {product.id}
              </Badge>
            </CardHeader>

            <CardContent className="p-4 grow">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground uppercase">
                  Current Price
                </span>
                <span className="text-2xl font-bold text-primary">
                  ${product.price}
                </span>
              </div>
            </CardContent>

            <CardFooter className="p-4 bg-muted/50 flex gap-2">
              <Button
                className="w-full"
                onClick={() => handlePriceIncrease(product)}
                disabled={
                  updateMutation.isPending &&
                  updateMutation.variables?.id === product.id
                }
              >
                {updateMutation.isPending &&
                updateMutation.variables?.id === product.id
                  ? "Updating..."
                  : "+$10 Increase"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
