export type TabType = "orders" | "payment" | "address";

export interface Order {
  id: string;
  date: string;
  total: number;
  status: "delivered" | "processing" | "shipped";
  items: { name: string; quantity: number; price: number }[];
}