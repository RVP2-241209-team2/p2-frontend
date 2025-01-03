import { Product } from "../lib/types";

// Generate mock products
export const mockProducts: Product[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: 19.99 + i,
  image: `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop&q=80`,
  category: `Category ${Math.floor(i / 10) + 1}`,
}));