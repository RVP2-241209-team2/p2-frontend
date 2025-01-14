import { Key } from "react";

export type TabType = "orders" | "payment" | "address";

export interface Order {
  id: string;
  date: string;
  total: number;
  status: "delivered" | "processing" | "shipped";
  orderItems: {
    id: Key | null | undefined;
    product: any; name: string; quantity: number; price: number 
}[];
}