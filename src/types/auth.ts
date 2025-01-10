import { LoginSchema, RegisterSchema } from "../lib/zod";

export interface User {
    id: string;
    username: string;
    role: "SHOPPER" | "MANAGER";
}

export interface AuthState {
    user: User | null;
    token: string | null;
}

export interface AuthContextType extends AuthState {
    login: (values: LoginSchema) => Promise<void>;
    register: (values: RegisterSchema) => Promise<void>
    logout: () => void;
    isAuthenticated: boolean;
}