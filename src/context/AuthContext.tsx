import { createContext, ReactNode, useContext, useState } from "react";
import { LoginSchema, RegisterSchema } from "../lib/zod";
import axios from "axios";
import { toast } from "sonner";
import { AuthContextType, AuthState } from "../types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children}: {children: ReactNode}) {

    const[auth, setAuth] = useState<AuthState>(() => {
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");
        return{
            token,
            user: userStr ? JSON.parse(userStr) : null
        }
    })

    const login = async (values: LoginSchema) => {
        await axios.post("http://localhost:1234/auth/login", {
            withCredentials:true,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: values.username,
                password: values.password,
            })
        })
        .then((response) => {
            setAuth({
                token: response.data.token,
                user: response.data.user,
            })
    
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
    
        })
        .catch((error) => {
            toast.error("Failed to login!")
            console.error(error)
        })
    }

    const register = async (values: RegisterSchema) => {
        await axios.post("http://localhost:1234/auth/register", {
            withCredentials:true,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(values)
        })
        .then(() => {
        })
        .catch((error) => {
            toast.error("Failed to register!")
            console.error(error)
        })
    }

    const logout = () => {
        setAuth({token: null, user: null})
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    }

    return(
        <AuthContext.Provider value={{...auth, login, register, logout, isAuthenticated: !!auth.token}}> {children} </AuthContext.Provider>
    )
}

export const useAuth = () : AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}