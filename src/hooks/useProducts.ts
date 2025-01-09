import { useState, useCallback } from "react";
import { Product, ProductsResponse } from "../types/product";
import { ApiError, ApiResponse } from "../types/api";

// Define the structure of our cache
interface ProductCache {
  allProducts: ProductsResponse | null;
  singleProducts: Record<number, Product>;
  categories: string[] | null;
}

// Initialize the cache outside the hook for persistence
const productCache: ProductCache = {
  allProducts: null,
  singleProducts: {},
  categories: null,
};

// TODO: Load More functionality
export const useProducts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  // Helper function to handle API responses
  const handleApiResponse = async <T>(
    response: Response
  ): Promise<ApiResponse<T>> => {
    if (!response.ok) {
      const error: ApiError = {
        message: `API Error: ${response.statusText}`,
        status: response.status,
      };
      return { data: null, error };
    }

    try {
      const data = await response.json();
      return { data, error: null };
    } catch (err) {
      const error: ApiError = {
        message: err instanceof Error ? err.message : "Unknown error occurred",
      };
      return { data: null, error };
    }
  };

  const fetchProducts = useCallback(
    async (skip = 0, limit = 30): Promise<ProductsResponse | null> => {
      // Return cached data if available and requesting first page
      if (productCache.allProducts && skip === 0) {
        return productCache.allProducts;
      }

      setLoading(true);
      setError(null);

      try {
        const url =
          limit === 0
            ? `https://dummyjson.com/products?skip=${skip}`
            : `https://dummyjson.com/products?skip=${skip}&limit=${limit}`;

        const response = await fetch(url);

        const { data, error } = await handleApiResponse<ProductsResponse>(
          response
        );

        if (error) {
          setError(error);
          return null;
        }

        // Cache only the initial full product list
        if (skip === 0 && data) {
          productCache.allProducts = data;
        }

        return data;
      } catch (err) {
        const error: ApiError = {
          message:
            err instanceof Error ? err.message : "Failed to fetch products",
        };
        setError(error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Fetch a single product by ID
  const fetchProductById = useCallback(
    async (productId: number): Promise<Product | null> => {
      // Return cached product if available
      if (productCache.singleProducts[productId]) {
        return productCache.singleProducts[productId];
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://dummyjson.com/products/${productId}`
        );
        const { data, error } = await handleApiResponse<Product>(response);

        if (error) {
          setError(error);
          return null;
        }

        if (data) {
          // Cache the product
          productCache.singleProducts[productId] = data;
        }

        return data;
      } catch (err) {
        const error: ApiError = {
          message:
            err instanceof Error ? err.message : "Failed to fetch product",
        };
        setError(error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Fetch products by category
  const fetchProductsByCategory = useCallback(
    async (category: string): Promise<ProductsResponse | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://dummyjson.com/products/category/${encodeURIComponent(
            category
          )}`
        );

        const { data, error } = await handleApiResponse<ProductsResponse>(
          response
        );

        if (error) {
          setError(error);
          return null;
        }

        return data;
      } catch (err) {
        const error: ApiError = {
          message:
            err instanceof Error
              ? err.message
              : "Failed to fetch products for category",
        };
        setError(error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Fetch all categories
  const fetchCategories = useCallback(async (): Promise<string[] | null> => {
    // Return cached categories if available
    if (productCache.categories) {
      return productCache.categories;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://dummyjson.com/products/categories");
      const { data, error } = await handleApiResponse<string[]>(response);

      if (error) {
        setError(error);
        return null;
      }

      if (data) {
        // Cache the categories
        productCache.categories = data;
      }

      return data;
    } catch (err) {
      const error: ApiError = {
        message:
          err instanceof Error ? err.message : "Failed to fetch categories",
      };
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear cache (useful for refreshing data)
  const clearCache = useCallback((): void => {
    productCache.allProducts = null;
    productCache.singleProducts = {};
    productCache.categories = null;
  }, []);

  return {
    loading,
    error,
    fetchProducts,
    fetchProductById,
    fetchProductsByCategory,
    fetchCategories,
    clearCache,
  };
};
