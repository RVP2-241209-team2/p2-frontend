import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { toast } from "sonner";
import { NewProduct, newProductSchema } from "../../lib/zod";
import axios from "axios";
import api from "../../lib/axios";
import { ImageUpload } from "./image-upload";


const NewProductForm = () => {
  const [uploadedFile, setUploadedFile] = useState<{
    url: string;
    key: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<NewProduct>({
    resolver: zodResolver(newProductSchema),
    defaultValues: JSON.parse(
      localStorage.getItem("newProductForm") ??
        JSON.stringify({
          name: "",
          price: 0,
          description: "",
          images: [],
          quantity: 0,
        })
    ),
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem("newProductForm", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  async function onSubmit(data: NewProduct) {
    console.log("Submit attempted with data:", data); // Debug log
    console.log("Current form values:", form.getValues()); // Debug log
    console.log("Current uploadedFile:", uploadedFile); // Debug log
    try {
      if (!form.getValues("images")) {
        toast.error("Please upload an image first!");
        return;
      }

      const productData = {
        name: data.name,
        description: data.description,
        price: data.price,
        quantity: data.quantity,
        images: form.getValues("images"),
      };

      const response = await api.post("/public/v1/products", productData);

      console.log("Response:", {
        status: response.status,
        data: response.data,
        headers: response.headers,
      });

      if (response.status === 200) {
        toast.success("Product created successfully!");
        form.reset();
        setUploadedFile(null);
        localStorage.removeItem("newProductForm");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      console.error("Product creation failed:", error); // Detailed error logging

      if (axios.isAxiosError(error)) {
        console.log(error);
        
        const errorMessage =
          error.response?.data ||
          error.response?.data?.message||
          error.response?.data?.error ||
          error.message ||
          "Failed to create product";
        toast.error(errorMessage);
        console.error("Server error details:", error.response?.data); // Add logging
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex gap-2">
        <div className="flex-1">
          <p className="text-sm font-medium tracking-wide text-center">
            Product Name
          </p>
          <input
            type="text"
            {...form.register("name")}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium tracking-wide text-center">Price</p>
          <input
            type="number"
            step="0.01"
            min="0"
            {...form.register("price", { valueAsNumber: true })}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium tracking-wide text-center">
            Quantity
          </p>
          <input
            type="number"
            min="1"
            {...form.register("quantity", { valueAsNumber: true })}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>
      </div>
      <div className="flex gap-2 justify-between">
        {/* <div className="flex flex-col gap-2">
          <p className="text-sm font-medium tracking-wide text-center">
            Tags
          </p>
          <select
            {...form.register("tags")}
            className="w-full rounded-md border border-gray-300 p-2"
          >
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>
        </div> */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium tracking-wide text-center">
            Images
          </p>
          <ImageUpload
            images={form.watch("images") || []}
            onChange={(images) => {
              form.setValue("images", images, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              });
            }}
            maxImages={5}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium tracking-wide text-center">
          Description
        </p>
        <textarea
          {...form.register("description")}
          className="w-full rounded-md border border-gray-300 p-2"
        />
      </div>
      {Object.keys(form.formState.errors).length > 0 && (
        <div className="p-3 rounded bg-red-50 border border-red-200">
          <p className="font-medium text-red-800 mb-1">
            Please fix the following errors:
          </p>
          <ul className="list-disc list-inside text-sm text-red-600">
            {Object.entries(form.formState.errors).map(([field, error]) => (
              <li key={field} className="capitalize">
                {error?.message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700"
      >
        Submit New Product
      </button>
    </form>
  );
};

export default NewProductForm;
