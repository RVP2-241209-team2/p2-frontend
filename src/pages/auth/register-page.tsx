import { Link } from "react-router-dom";
import RegisterForm from "../../components/auth/register-form";

export default function RegisterPage() {
  return (
    <>
    <h1 className="text-center text-3xl font-bold">Register for Shoply</h1>
    <div className="space-y-5">
      <div className="flex items-center gap-3 mt-5">
        <div className="h-px flex-1 bg-gray-500"/>
        <span className="text-gray-400"> Registration </span>
        <div className="h-px flex-1 bg-gray-500"/>
      </div>
      <RegisterForm/>
      <div className="flex justify-center gap-2">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline"> Login </Link>
      </div>
    </div>
    </>
  )
}
