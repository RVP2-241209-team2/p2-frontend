import { LoginSchema, RegisterSchema } from "../lib/zod";
import { User } from "./users";

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface AuthContextType extends AuthState {
  login: (values: LoginSchema) => Promise<void>;
  register: (values: RegisterSchema) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface RegisterData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: User["role"];
}
