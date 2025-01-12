import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import api from "../lib/axios-temp";
import {
  LoginSchema,
  RegisterSchema,
  loginSchema,
  registerSchema,
} from "../lib/zod";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  role: "ADMIN" | "STORE_OWNER" | "CUSTOMER";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginSchema) => Promise<void>;
  register: (userData: RegisterSchema) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (credentials: LoginSchema) => {
    try {
      loginSchema.parse(credentials);

      const { data } = await api.post("/auth/login", credentials);

      setUser(data);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (userData: RegisterSchema) => {
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registerData } = userData;
      if (!confirmPassword || confirmPassword !== userData.password) {
        throw new Error("Passwords do not match");
      }

      // Validate the complete form data first
      registerSchema.parse(userData);

      const { data } = await api.post("/users/v1/register", registerData);

      // After successful registration, automatically log in
      await login({
        username: userData.username,
        password: userData.password,
      });

      return data;
    } catch (error: any) {
      console.error("Registration error:", {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers,
          data: error.config?.data,
        },
      });
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
