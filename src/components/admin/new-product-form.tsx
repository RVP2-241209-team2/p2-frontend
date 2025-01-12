import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CATEGORIES } from "../../lib/constants";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { mockGetPresignedUrl, mockUploadToS3 } from "../../lib/mock-s3";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { NewProduct, newProductSchema } from "../../lib/zod";

const NewProductForm = () => {
  const [uploadedFile, setUploadedFile] = useState<{
    url: string;
    key: string;
  } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<NewProduct>({
    resolver: zodResolver(newProductSchema),
    defaultValues: JSON.parse(
      localStorage.getItem("newProductForm") ??
        JSON.stringify({
          name: "",
          price: 0,
          description: "",
          category: "",
          image: "",
        })
    ),
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem("newProductForm", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      const { presignedUrl, finalImageUrl, key } = await mockGetPresignedUrl(
        file.name,
        file.type
      );

      await mockUploadToS3(presignedUrl, file);

      setUploadedFile({ url: finalImageUrl, key });

      form.setValue("image", key);
    } catch (e) {
      console.error("Upload failed:", e);
    } finally {
      setIsUploading(false);
    }
  };

  async function onSubmit(data: NewProduct) {
    // TODO: submit new product to api
    try {
      // mock api request
      await new Promise<void>((resolve) =>
        setTimeout(() => {
          console.log(data);
          resolve();
        }, 1000)
      );
      // clear mock persistence
      localStorage.removeItem("newProductForm");
      // reset form
      setUploadedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      form.reset({
        name: "",
        price: 0,
        description: "",
        category: "",
        image: "",
      });
      toast.success("Product created successfully");
    } catch (error) {
      toast.error("Failed to create product");
      console.error(error);
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
      </div>
      <div className="flex gap-2 justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium tracking-wide text-center">
            Category
          </p>
          <select
            {...form.register("category")}
            className="w-full rounded-md border border-gray-300 p-2"
          >
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div className="relative flex flex-col gap-2">
          <p className="text-sm font-medium tracking-wide text-center">
            Image Upload
          </p>
          {!uploadedFile && (
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
              className="w-full rounded-md border border-gray-300 p-2"
            />
          )}
          {isUploading && (
            <p className="text-sm text-gray-500">Uploading image...</p>
          )}
          {form.watch("image") && (
            <p className="text-sm text-green-600">
              Image uploaded successfully! URL: {form.watch("image")}
            </p>
          )}
          {uploadedFile && (
            <div
              onClick={() => setUploadedFile(null)}
              className="absolute top-0 right-0 cursor-pointer"
            >
              <X className="w-5 h-5 text-red-500" />
            </div>
          )}
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

      <button
        type="submit"
        disabled={isUploading}
        className="w-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700"
      >
        {isUploading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            <span>Uploading...</span>
          </div>
        ) : (
          "Submit New Product"
        )}
      </button>
    </form>
  );
};

export default NewProductForm;
