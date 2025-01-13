import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import { Product } from "../../types/product";
import { ImageUpload } from "../../components/store-owner/image-upload";
import { toast } from "sonner";
import api from "../../lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { editProductSchema } from "../../lib/zod";

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, fetchProductById } = useProducts();
  const [saving, setSaving] = useState(false);

  const form = useForm<Product>({
    resolver: zodResolver(editProductSchema),
  });

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        const data = await fetchProductById(id);
        if (data) {
          form.reset(data);
        }
      }
    };
    loadProduct();
  }, [id, fetchProductById, form.reset]);

  // todo handleDeleteProduct

  async function handleSubmit(data: Product) {
    console.log("Submitting edit with data:", data);
    setSaving(true);
    try {
      // Validate that at least one image exists
      if (!data.images || data.images.length === 0) {
        toast.error("Please upload at least one image!");
        return;
      }

      // Prepare the product data
      const productData = {
        // id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        // quantity: data.quantity,
        images: data.images,
        // todo: put tags in backend api and use those
        // tags: data.tags || [],
      };

      // Make the API call to update the product
      const response = await api.put(
        `/public/v1/products/${data.id}`,
        productData
      );

      if (response.status === 200) {
        toast.success("Product updated successfully!");
        // Reset form state
        form.reset(response.data);
        // Optionally redirect to products page
        navigate("/store-owner/products", { replace: true });
      }
    } catch (error) {
      console.error("Product update failed:", error);

      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to update product";
        toast.error(errorMessage);
        console.error("Server error details:", error.response?.data);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!form.watch("name")) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
        </div>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Basic Information
            </h2>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Name
              </label>
              <input
                {...form.register("name")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                {...form.register("description")}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {form.formState.errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    {...form.register("price", { valueAsNumber: true })}
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Quantity
                </label>
                <input
                  {...form.register("quantity", { valueAsNumber: true })}
                  type="number"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Images</h2>
            <ImageUpload
              images={form.watch("images") || []}
              onChange={(images) => form.setValue("images", images)}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving || !form.formState.isDirty}
              className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
