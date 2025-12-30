"use client";

import { useState } from "react";
import { HeartIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useUpdateProduct } from "@/hooks/products-hooks";

const CardProduct = ({ product }) => {
  const updateMutation = useUpdateProduct();

  const handleUpdate = () => {
    updateMutation.mutate({
      id: product.id,
      title: product.title,
      price: Number(product.price) + 10,
      description: product.description,
      images: product.images,
    });
  };

  return (
    <div className="relative max-w-xs rounded-xl shadow-lg h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <img
          src={product.images?.[0] || "https://via.placeholder.com/150"}
          alt={product.title}
          className="w-3/4 object-contain rounded-md"
        />
      </div>

      <Card className="border-none shadow-none flex flex-col justify-end">
        <CardHeader>
          <CardTitle className="line-clamp-1">{product.title}</CardTitle>
        </CardHeader>

        <CardFooter className="justify-between gap-3 flex-wrap">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase">
              Price
            </span>
            <span className="text-xl font-semibold">${product.price}</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleUpdate}
              disabled={updateMutation.isPending}
            >
              +10$
            </Button>
            <Button size="sm">Cart</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardProduct;
