// name, price, description, category, image

import { useForm } from "react-hook-form";
import { NewProduct, newProductSchema } from "../../lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CATEGORIES } from "../../lib/constants";

const NewProductForm = () => {
  const form = useForm<NewProduct>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      category: "",
      image: "",
    },
  });

  async function onSubmit(data: NewProduct) {
    // TODO: submit new product
    try {
      await setTimeout(() => {
        console.log(data);
      }, 1000);
    } catch (error) {
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
            {...form.register("price")}
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
              <option value={c.slug}>{c.label}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium tracking-wide text-center">
            Image Upload {/** TODO: Image Upload */}
          </p>
          <input
            type="text"
            {...form.register("image")}
            className="w-full rounded-md border border-gray-300 p-2"
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
