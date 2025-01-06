import { useEffect, useState } from "react";

import { Product } from "../../types/product";

import HeroSection from "../../components/main/hero";
import CollectionsSection from "../../components/main/collections";
import { useProducts } from "../../hooks/useProducts";

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
      {/* hero section */}
      <HeroSection />

      {/* Collections Section */}
      <CollectionsSection products={products} />

      {/* Product Lists */}
      {/* <div className="flex flex-col w-full mx-auto ">
        <p className="text-2xl font-bold py-4">Featured</p>
        {listItems(featured)}
      </div>
      <div className="flex flex-col w-full mx-auto">
        <p className="text-2xl font-bold py-4">Popular</p>
        {listItems(popular)}
      </div>
      <div className="flex flex-col w-full mx-auto">
        <p className="text-2xl font-bold py-4">For You</p>
        {listItems(forYou)}
      </div> */}
    </div>
  );
}
