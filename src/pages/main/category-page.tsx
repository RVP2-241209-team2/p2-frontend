import { Link, useParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { useEffect, useState } from "react";
import { Product } from "../../types/product";
import { ShoppingCart } from "lucide-react";

export default function CategoryPage() {
  const { slug } = useParams();
  const { loading, error, fetchProductsByCategory } = useProducts();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      if (slug) {
        const response = await fetchProductsByCategory(slug);
        if (response) {
          setProducts(response.products);
        }
      }
    };
    loadProducts();
  }, [slug, fetchProductsByCategory]);

  const categoryName = slug
    ? slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error.message}</div>;
  }

  const backgroundImage = products.length > 0 ? products[0].thumbnail : "";

  return (
    <>
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center p-20">
          <h1 className="font-bold text-6xl mb-4 text-white">{categoryName}</h1>
          <p className="text-gray-200 text-xl">
            Explore our collection of {categoryName.toLowerCase()}
          </p>
        </div>
      </div>

      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {products.map((product) => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          >
            <div className="flex flex-col items-center justify-center">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-80 w-72 object-cover rounded-t-xl"
              />
              <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">
                  {product.category}
                </span>
                <p className="text-lg font-bold text-black truncate block capitalize">
                  {product.title}
                </p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">
                    $
                    {(
                      product.price *
                      (1 - product.discountPercentage / 100)
                    ).toFixed(2)}
                  </p>
                  <del>
                    <p className="text-sm text-gray-600 cursor-auto ml-2">
                      ${product.price}
                    </p>
                  </del>
                  <div className="ml-auto">
                    <ShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
