import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "../../lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
//import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

export default function LoginForm() {
    //const { login } = useAuth()
    
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })
    
    async function onSubmit(data: LoginSchema){
        try{
            await new Promise<void>((resolve) =>
                setTimeout(() => {
                    console.log(data)
                    resolve()
                }, 1000))
            toast.success("Login successful!")
        } catch (error){
            toast.error("Failed to login!")
            console.error(error)
        }
    }

    return(
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> 
            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium tracking-wide text-center">
                    username
                </p>
                <input type="text" {...form.register("username")} className="w-80 rounded-md border border-gray-300 p-2 mx-auto"/>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium tracking-wide text-center">
                    password
                </p>
                <input type="password" {...form.register("password")} className="w-80 rounded-md border border-gray-300 p-2 mx-auto"/>
            </div>
            <div className="flex justify-center">
            <button type="submit" className="w-60 rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700"> Login </button>
            </div>
        </form>
    )
}


