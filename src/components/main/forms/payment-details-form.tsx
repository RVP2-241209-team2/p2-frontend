import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentFormData, paymentSchema } from "../../../lib/zod";
import { useForm } from "react-hook-form";

interface PaymentMethodFormProps {
  onSubmit: (data: PaymentFormData) => void;
}

export default function PaymentMethodForm({
  onSubmit,
}: PaymentMethodFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
