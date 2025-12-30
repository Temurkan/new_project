import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

import { productService } from "@/services/product-services";
import { useCreateProduct } from "@/hooks/mutations/create-product";

import CardProduct from "@/components/cardp";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

const formSchema = z.object({
  title: z.string().min(5).max(32),
  price: z.string().min(1),
  description: z.string().min(20).max(100),
  categoryId: z.string().min(1),
  images: z.string().url(),
});

export default function FourPage() {
  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: productService.getAllProducts,
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: productService.getCategories,
  });

  const createProductMutation = useCreateProduct();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: "",
      description: "",
      categoryId: "",
      images: "",
    },
  });

  async function onSubmit(data) {
    const payload = {
      title: data.title,
      price: Number(data.price),
      description: data.description,
      categoryId: Number(data.categoryId),
      images: [data.images],
    };

    createProductMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Product created successfully!");
        form.reset();
      },
      onError: (error) => {
        const errorMessage =
          error.response?.data?.message || "Error creating product";
        toast.error(
          Array.isArray(errorMessage) ? errorMessage[0] : errorMessage
        );
      },
    });
  }

  if (productsLoading || categoriesLoading)
    return <div className="p-10 text-center text-xl">Loading data...</div>;

  if (productsError)
    return (
      <div className="p-10 text-center text-red-500">
        Error loading products
      </div>
    );

  return (
    <div className="space-y-6 pt-24 px-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map((prod) => (
          <CardProduct key={prod.id} product={prod} />
        ))}
      </div>

      <div className="flex justify-center p-3">
        <Card className="w-[600px]">
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Product title</FieldLabel>
                      <Input {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="price"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Product price</FieldLabel>
                      <Input {...field} type="number" />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="images"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Product image URL</FieldLabel>
                      <Input {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="categoryId"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Category</FieldLabel>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
                      >
                        <option value="">Choose a category...</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="description"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Description</FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea {...field} rows={4} />
                        <InputGroupAddon align="block-end">
                          <InputGroupText>
                            {field.value.length}/100
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                  >
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    disabled={createProductMutation.isPending}
                  >
                    {createProductMutation.isPending
                      ? "Submitting..."
                      : "Submit"}
                  </Button>
                </div>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
