import { useState, useCallback } from "react";
import api from "../lib/axios";
import { ApiError } from "../types/api";
import { Collection, Product } from "../types/product";

interface ProductCache {
  allProducts: Product[] | null;
  singleProducts: Record<string, Product>;
}

const productCache: ProductCache = {
  allProducts: null,
  singleProducts: {},
};

export const useProducts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchProducts = useCallback(async (): Promise<Product[] | null> => {
    if (productCache.allProducts) {
      return productCache.allProducts;
    }

    setLoading(true);
    setError(null);

    try {
      const { data } = await api.get<Product[]>("/public/v1/products");
      productCache.allProducts = data;
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
  }, []);

  const fetchProductById = useCallback(
    async (productId: string): Promise<Product | null> => {
      if (productCache.singleProducts[productId]) {
        return productCache.singleProducts[productId];
      }

      setLoading(true);
      setError(null);

      try {
        const { data } = await api.get<Product>(
          `/public/v1/products/${productId}`
        );
        productCache.singleProducts[productId] = data;
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

  const searchProducts = useCallback(
    async (name: string): Promise<Product[] | null> => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await api.get<Product[]>(
          "/public/v1/products/search",
          {
            params: { name },
          }
        );
        return data;
      } catch (err) {
        const error: ApiError = {
          message:
            err instanceof Error ? err.message : "Failed to search products",
        };
        setError(error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getProductsByTag = useCallback(
    async (tag: string): Promise<Product[] | null> => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await api.get<Product[]>(
          `/public/v1/products/tag/${encodeURIComponent(tag)}`
        );
        return data;
      } catch (err) {
        const error: ApiError = {
          message:
            err instanceof Error
              ? err.message
              : "Failed to fetch products by tag",
        };
        setError(error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getCollections = useCallback(async (): Promise<Collection[] | null> => {
    setLoading(true);
    setError(null);

    try {
      const products = await fetchProducts();

      if (!products) {
        return null;
      }

      // Get all unique tags
      const uniqueTags = Array.from(
        new Set(products.flatMap((product) => product.tags))
      );

      // Create a collection for each unique tag
      const collections = uniqueTags.map((tag) => {
        const productsWithTag = products.filter((product) =>
          product.tags.includes(tag)
        );

        return {
          name: tag,
          thumbnail: productsWithTag[0]?.images[0] || "",
          slug: tag.toLowerCase().replace(/\s+/g, "-"),
          count: productsWithTag.length,
        };
      });

      return collections;
    } catch (err) {
      const error: ApiError = {
        message:
          err instanceof Error ? err.message : "Failed to get collections",
      };
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchProducts]);

  const clearCache = useCallback((): void => {
    productCache.allProducts = null;
    productCache.singleProducts = {};
  }, []);

  return {
    loading,
    error,
    fetchProducts,
    fetchProductById,
    searchProducts,
    getProductsByTag,
    getCollections,
    clearCache,
  };
};
