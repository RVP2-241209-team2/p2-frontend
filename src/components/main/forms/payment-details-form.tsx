import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentFormData, paymentSchema } from "../../../lib/zod";
import { useForm } from "react-hook-form";
import { Address } from "../../../pages/main/checkout-page";

interface PaymentMethodFormProps {
  onSubmit: (data: PaymentFormData) => void;
  addresses: Address[]
}

export default function PaymentMethodForm({
  onSubmit,
  addresses
}: PaymentMethodFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardHolderName: "",
      cardNumber: "",
      expireDate: "",
      addressId: "",
    },
  });

  const handleFormSubmit = (data: PaymentFormData) => {
    onSubmit(data); // Call the parent onSubmit handler
    reset(); // Reset all form fields to default values
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Card Holder Name
        </label>
        <input
          {...register("cardHolderName")}
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          placeholder="Name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Card Number
        </label>
        <input
          {...register("cardNumber")}
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          placeholder="1234 5678 9012 3456"
        />
        {errors.cardNumber && (
          <p className="mt-1 text-sm text-red-600">
            {errors.cardNumber.message}
          </p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expiry Date
          </label>
          <input
            {...register("expireDate")}
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="MM/YY"
          />
          {errors.expireDate && (
            <p className="mt-1 text-sm text-red-600">
              {errors.expireDate.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="addressId" className="block text-sm font-medium text-gray-700 mb-1">
            Billing Address
          </label>
          <select
            {...register("addressId")}
            id="addressId"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="" disabled selected>
              -- Select Billing Address --
            </option>
            {addresses.map((address) => (
              <option key={address.id} value={address.id}>
                {address.addressLine1}
              </option>
            ))}
          </select>
          {errors.addressId && (
            <p className="mt-1 text-sm text-red-600">{errors.addressId.message}</p>
          )}
        </div>
        
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CVC
          </label>
          <input
            {...register("cvc")}
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="123"
          />
          {errors.cvc && (
            <p className="mt-1 text-sm text-red-600">{errors.cvc.message}</p>
          )}
        </div> */}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700 transition"
      >
        Add Payment Method
      </button>
    </form>
  );
}
