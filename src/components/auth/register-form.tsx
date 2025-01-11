import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchema } from "../../lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
    const { register } = useAuth()
    const navigate = useNavigate()

    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues:{
            username: "",
            password: "",
            confirmPassword: "",
            role: "SHOPPER"
        }
    })

    async function onSubmit(data: RegisterSchema) {
        try{
            console.log("register submitted ...", data)
            await register(data)
            toast.success("Registration successful!")
            navigate("/login")
        } catch(error){
            toast.error("Registration failed!")
            console.error(error)
        }
    }

    return(
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6"> 
            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium tracking-wide text-center">
                    username
                </p>
                <input type="text" {...form.register("username")} className="w-80 rounded-md border border-gray-300 p-2 mx-auto" />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium tracking-wide text-center">
                    password
                </p>
                <input type="password" {...form.register("password")} className="w-80 rounded-md border border-gray-300 p-2 mx-auto"/>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium tracking-wide text-center">
                    confirm password
                </p>
                <input type="password" {...form.register("confirmPassword")} className="w-80 rounded-md border border-gray-300 p-2 mx-auto"/>
            </div>
            <div className="flex justify-center">
            <button type="submit" className="w-80 rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700"> Register </button>
            </div>
        </form>
    )
}