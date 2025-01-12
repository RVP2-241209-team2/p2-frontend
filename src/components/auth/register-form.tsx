import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchema } from "../../lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

export default function RegisterForm() {
  const { register } = useAuth();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      role: "CUSTOMER",
    },
  });

  async function onSubmit(data: RegisterSchema) {
    try {
      console.log("register submitted ...", data);
      await register(data);
      toast.success("Registration successful!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Registration failed!");
      }
      console.error(error);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 w-full max-w-md mx-auto"
    >
      {/* First Name and Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            {...form.register("firstName")}
            className="rounded-md border border-gray-300 p-2"
            placeholder="John"
          />
          {form.formState.errors.firstName && (
            <p className="text-sm text-red-500">
              {form.formState.errors.firstName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            {...form.register("lastName")}
            className="rounded-md border border-gray-300 p-2"
            placeholder="Doe"
          />
          {form.formState.errors.lastName && (
            <p className="text-sm text-red-500">
              {form.formState.errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      {/* Username and Account Type */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            {...form.register("username")}
            className="rounded-md border border-gray-300 p-2"
            placeholder="johndoe"
          />
          {form.formState.errors.username && (
            <p className="text-sm text-red-500">
              {form.formState.errors.username.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Account Type
          </label>
          <select
            {...form.register("role")}
            className="rounded-md border border-gray-300 p-2"
          >
            <option value="CUSTOMER">Customer</option>
            <option value="STORE_OWNER">Store Owner</option>
          </select>
          {form.formState.errors.role && (
            <p className="text-sm text-red-500">
              {form.formState.errors.role.message}
            </p>
          )}
        </div>
      </div>

      {/* Email and Phone */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...form.register("email")}
            className="rounded-md border border-gray-300 p-2"
            placeholder="john@example.com"
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            {...form.register("phoneNumber")}
            className="rounded-md border border-gray-300 p-2"
            placeholder="1234567890"
          />
          {form.formState.errors.phoneNumber && (
            <p className="text-sm text-red-500">
              {form.formState.errors.phoneNumber.message}
            </p>
          )}
        </div>
      </div>

      {/* Password and Confirm Password */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            {...form.register("password")}
            className="rounded-md border border-gray-300 p-2"
            placeholder="••••••••"
          />
          {form.formState.errors.password && (
            <p className="text-sm text-red-500">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            {...form.register("confirmPassword")}
            className="rounded-md border border-gray-300 p-2"
            placeholder="••••••••"
          />
          {form.formState.errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors mt-6"
      >
        Register
      </button>
    </form>
  );
}
