import { useState } from "react";
import { useEffect } from "react";
import { useProducts } from "../../hooks/useProducts";
import { Product } from "../../types/product";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductsPage() {
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
    <>
      <div className="text-center p-10">
        <h1 className="font-bold text-6xl mb-4">Products</h1>
      </div>

      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {products?.map((product) => (
          <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <a href="#">
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
                  <Link to={`/products/${product.id}`} className="ml-auto">
                    <ShoppingCart />
                  </Link>
                </div>
              </div>
            </a>
          </div>
        ))}
      </section>
    </>
  );
}
