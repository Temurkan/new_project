import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import CardProduct from "@/components/card/index.jsx";
import { useProducts, useCreateProduct } from "@/hooks/queries/products.js";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  images: z.string().url("Image must be a valid URL"),
});

export default function HomePage() {
  const { data = [], isLoading, isError, error } = useProducts();
  const mutation = useCreateProduct();

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

    mutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Product created successfully!");
        form.reset();
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Error creating product");
      },
    });
  }

  if (isLoading) return <p>...Loading</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <div className="space-y-6 pt-24 px-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {data.map((prod) => (
          <CardProduct key={prod.id} product={prod} />
        ))}
      </div>
      <div className="flex justify-center items-center p-3">
        <Card className="w-[600px]">
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="title">Product title</FieldLabel>
                      <Input
                        {...field}
                        id="title"
                        placeholder="Classic Comfort Fit Joggers"
                      />
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
                      <FieldLabel htmlFor="price">Product price</FieldLabel>
                      <Input {...field} id="price" placeholder="24" />
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
                      <FieldLabel htmlFor="images">Product image</FieldLabel>
                      <Input
                        {...field}
                        id="images"
                        placeholder="https://example.com/image.jpg"
                      />
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
                      <FieldLabel htmlFor="categoryId">Category id</FieldLabel>
                      <Input {...field} id="categoryId" placeholder="1" />
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
                      <FieldLabel htmlFor="description">Description</FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          id="description"
                          rows={4}
                          className="min-h-24 resize-none"
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText className="tabular-nums">
                            {field.value.length}/100
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      <FieldDescription>
                        Brief description of the product.
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button
              type="submit"
              form="form-rhf-demo"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Submitting..." : "Submit"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
