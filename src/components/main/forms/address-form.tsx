import { useForm } from "react-hook-form";
import { AddressFormData, addressSchema } from "../../../lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddressFormProps {
  onSubmit: (data: AddressFormData) => void;
}

export default function AddressForm({ onSubmit }: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address Label
        </label>
        <input
          {...register("label")}
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          placeholder="Home, Work, etc."
        />
        {errors.label && (
          <p className="mt-1 text-sm text-red-600">{errors.label.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Street Address
        </label>
        <input
          {...register("street")}
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          placeholder="123 Main St"
        />
        {errors.street && (
          <p className="mt-1 text-sm text-red-600">{errors.street.message}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            {...register("city")}
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="New York"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <input
            {...register("state")}
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="NY"
          />
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ZIP Code
        </label>
        <input
          {...register("zipCode")}
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          placeholder="10001"
        />
        {errors.zipCode && (
          <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700 transition"
      >
        Add Address
      </button>
    </form>
  );
}
