import { zodResolver } from "@hookform/resolvers/zod";
import { AddressFormData, addressSchema } from "../../../lib/zod";
import { useForm } from "react-hook-form";

interface AddressFormProps {
  onSubmit: (data: AddressFormData) => void;
}

export default function AddressForm({ onSubmit }: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      recipientName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      type: "SHIPPING"
    },
  });

  const handleFormSubmit = (data: AddressFormData) => {
    onSubmit(data); // Call the parent onSubmit
    reset(); // Reset the form fields to default values
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Recipient Name
        </label>
        <input
          {...register("recipientName")}
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          placeholder="Your Name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address Label
        </label>
        <input
          {...register("addressLine1")}
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          placeholder="Home, Work, etc."
        />
        {errors.addressLine1 && (
          <p className="mt-1 text-sm text-red-600">{errors.addressLine1.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Street Address
        </label>
        <input
          {...register("addressLine2")}
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          placeholder="123 Main St"
        />
        {errors.addressLine2 && (
          <p className="mt-1 text-sm text-red-600">{errors.addressLine2.message}</p>
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
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Country
      </label>
      <input
        {...register("country")}
        type="text"
        className="w-full border border-gray-300 rounded-lg px-4 py-2"
        placeholder="USA"
      />

      <div>
        <label htmlFor="addressType" className="block text-sm font-medium text-gray-700 mb-1">
          Billing Address
        </label>
        <select
          {...register("type")}
          id="addressType"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="BILLING" selected>
            BILLING
          </option>
          <option value="SHIPPING">
            SHIPPING
          </option>
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
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
