import { createContext, ReactNode, useContext, useState } from "react";
import { AuthContextType, AuthState } from "../lib/types";
import { useNavigate } from "react-router-dom";
import { LoginSchema, RegisterSchema } from "../lib/zod";

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children}: {children: ReactNode}) {
  const navigate = useNavigate();

  const[auth, setAuth] = useState<AuthState>(() => {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      return{
          token,
          user: userStr ? JSON.parse(userStr) : null
      }
  })

  const login = async (values: LoginSchema) => {
      try {
          const response = await fetch("http://localhost:1234/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              username: values.username,
              password: values.password,
            })
          })
    
          if (!response.ok) {
            const contentType = response.headers.get("content-type");
            let errorMessage;
    
            if (contentType && contentType.includes("application/json")) {
              const error = await response.json();
              errorMessage = error.message;
            } else {
              errorMessage = await response.text();
            }
    
            throw new Error(errorMessage);
          }
    
          const data = await response.json();
    
          setAuth({
              token: data.token,
              user: data.user,
          });
    
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
    
          navigate("/");
      } catch (error) {
          console.error("Login failed", error);
          throw error;
      }
  }

  const register = async (values: RegisterSchema) => {
    try{
      const response = await fetch("http://localhost:1234/auth/register", {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(values)
      })
      if (!response.ok){
        const contentType = response.headers.get("content-type")
        let errorMessage;

        if (contentType && contentType.includes("application/json")){
          const error = await response.json()
          errorMessage = error.message
        } else{
          errorMessage = await response.text()
        }
        throw new Error(errorMessage)
      }
      navigate("/login")
    } catch (error){
      console.error("Register failed, error")
      throw error
    }
  }

  const logout = () => {
      setAuth({token: null, user: null})
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      navigate("/login")
  }

  return(
    <AuthContext.Provider value={{...auth, login, register, logout, isAuthenticated: !!auth.token}} >{children}</AuthContext.Provider>
  )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}