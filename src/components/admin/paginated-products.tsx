import { useEffect, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductTableRow from "./product-table-row";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductsResponse } from "../../types/product";

const ITEMS_PER_PAGE = 5;

const PaginatedProducts = ({
  itemsPerPage = ITEMS_PER_PAGE,
}: {
  itemsPerPage?: number;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<ProductsResponse | null>(null);
  const { loading, error, fetchProducts } = useProducts();

  useEffect(() => {
    const loadProducts = async () => {
      const skip = (currentPage - 1) * itemsPerPage;
      const data = await fetchProducts(skip, itemsPerPage);
      setProducts(data);
    };

    loadProducts();
  }, [currentPage, itemsPerPage, fetchProducts]);

  const totalPages = products ? Math.ceil(products.total / itemsPerPage) : 0;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return <ProductsSkeleton />;
  }
  if (error) {
    return (
      <div className="flex justify-center items-center">
        <AlertCircle className="w-5 h-5" />
        {error.message}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Recent Products</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {products?.products.map((product) => (
              <ProductTableRow key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t">
        <p className="text-sm text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, products?.total ?? 0)} of{" "}
          {products?.total ?? 0} products
        </p>
        <div className="flex gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductsSkeleton = () => (
  <div className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
    <div className="h-7 w-40 bg-gray-200 rounded mb-4" />
    <div className="overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="px-6 py-3">Product</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="border-b last:border-0">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-24 bg-gray-200 rounded" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-16 bg-gray-200 rounded" />
              </td>
              <td className="px-6 py-4 text-right">
                <div className="h-4 w-12 bg-gray-200 rounded ml-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="flex items-center justify-between mt-4 pt-4 border-t">
      <div className="h-4 w-48 bg-gray-200 rounded" />
      <div className="flex gap-2">
        <div className="w-9 h-9 bg-gray-200 rounded-lg" />
        <div className="w-9 h-9 bg-gray-200 rounded-lg" />
      </div>
    </div>
  </div>
);

export default PaginatedProducts;
