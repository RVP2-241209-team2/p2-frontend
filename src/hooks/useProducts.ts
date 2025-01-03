import { useEffect, useState } from "react";
import { Product } from "../lib/types";
import { mockProducts } from "../utils/mockData";

interface UseProductsResult {
  products: Product[];
  totalItems: number;
  loading: boolean;
  error: string | null;
}

interface ProductsResponse {
  products: Product[];
  total: number;
}

async function getProducts(
  page: number,
  limit: number
): Promise<ProductsResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    products: mockProducts.slice(startIndex, endIndex),
    total: mockProducts.length,
  };
}

export function useProducts(page: number, limit: number): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts(page, limit);
        setProducts(data.products);
        setTotalItems(data.total);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit]);

  return { products, totalItems, loading, error };
}
