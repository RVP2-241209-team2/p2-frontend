export type UserRole = "ADMIN" | "STORE_OWNER" | "CUSTOMER";

export interface User {
  id: string; // UUID comes as string from backend
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  role: UserRole;
}

// For creating/updating users
export interface UserFormData extends Omit<User, "id"> {
  id?: string;
}
