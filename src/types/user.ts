export interface User {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  role: "ADMIN" | "STORE_OWNER" | "CUSTOMER";
}
