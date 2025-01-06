import { useEffect, useState } from "react";

import { Product } from "../../types/product";

import HeroSection from "../../components/main/hero";
import CollectionsSection from "../../components/main/collections";
import { useProducts } from "../../hooks/useProducts";
import ProductList from "../../components/main/product-list";

export default function HomePage() {
  const { loading, error, fetchProducts } = useProducts();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const response = await fetchProducts();
      if (response) {
        console.log(response.products);
        setProducts(response.products);
      }
    };
    loadProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error.message}</div>;
  }

  return (
    <div className="bg-white p-4">
      <HeroSection />
      <CollectionsSection products={products} />
      <ProductList products={products} />
    </div>
  );
}
