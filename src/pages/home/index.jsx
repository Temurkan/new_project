import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import CardProduct from "@/components/card";
import { instance } from "@/lib/axios";

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
  images: z.string().url(),
});

export default function HomePage() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [submitting, setSubmitting] = React.useState(false);

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

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes] = await Promise.all([
        instance.get("/products"),
        instance.get("/categories"),
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
    } catch (error) {
      toast.error("Error loading data");
    } finally {
      setLoading(false);
    }
  };
  const getProducts = async () => {
    try {
      setLoading(true);
      const { data } = await instance.get("/products");
      setProducts(data);
    } catch (error) {
      toast.error("Error loading products");
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (payload) => {
    try {
      setSubmitting(true);
      await instance.post("/products", payload);

      toast.success("Product created successfully!");
      form.reset();

      await getProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating product");
    } finally {
      setSubmitting(false);
    }
  };

  React.useEffect(() => {
    getProducts();
    fetchData();
  }, []);

  async function onSubmit(data) {
    const payload = {
      title: data.title,
      price: Number(data.price),
      description: data.description,
      categoryId: Number(data.categoryId),
      images: [data.images],
    };

    await createProduct(payload);
  }

  if (loading) return <p>Loading...</p>;

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
                      <Input {...field} />
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
                      <FieldLabel>Product image</FieldLabel>
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
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Choose a category...</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name} (ID: {cat.id})
                          </option>
                        ))}
                      </select>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                      <FieldDescription>
                        Select a category from the list instead of typing an ID.
                      </FieldDescription>
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
                      <FieldDescription>
                        Brief description of the product.
                      </FieldDescription>
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

                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit"}
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
