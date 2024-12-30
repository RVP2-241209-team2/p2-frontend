import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "../../lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
//import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
    //const { login } = useAuth()
    
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })
    
    /*async function onSubmit(data: LoginSchema){
        try{
            await login(data);
        } catch (error){
            console.error("Login failed", error)
        }
    }*/

    return(
        <form /*onSubmit={form.handleSubmit(onSubmit)}*/ className="space-y-8"> 
            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium tracking-wide text-center">
                    username
                </p>
                <input type="text" {...form.register("username")} className="w-full rounded-md border border-gray-300 p-2" />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium tracking-wide text-center">
                    password
                </p>
                <input type="password" {...form.register("password")} className="w-full rounded-md border border-gray-300 p-2"/>
            </div>
            <button type="submit" className="w-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700"> Login </button>
        </form>
    )
}


