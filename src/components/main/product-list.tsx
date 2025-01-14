import { ChevronLeft, ChevronRight, Star, TrendingUp } from "lucide-react";
import { Product } from "../../types/product";
import { useState } from "react";
import { Link } from "react-router-dom";
interface ProductListProps {
  products: Product[];
}

type TabType = "suggested" | "trending";

export default function ProductList({ products }: ProductListProps) {
  const [activeTab, setActiveTab] = useState<TabType>("suggested");
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 4;

  const tabs = [
    { id: "suggested", label: "Suggested For You", icon: Star },
    { id: "trending", label: "Trending Now", icon: TrendingUp },
  ] as const;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveTab(id);
                  setCurrentPage(0);
                }}
                className={`flex items-center gap-2 pb-4 px-1 border-b-2 transition-colors ${
                  activeTab === id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon
                  className={
                    activeTab === id ? "text-blue-500" : "text-gray-400"
                  }
                />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex gap-6">
          {visibleProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group w-1/2 md:w-1/3 lg:w-1/4" // 2 items on mobile, 3 on medium+
            >
              <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full border border-gray-100 hover:border-gray-200 transition-colors">
                <div className="aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-medium line-clamp-1">{product.name}</h3>

                  {activeTab === "trending" ? (
                    <p className="text-gray-600 mt-2 line-clamp-2">
                      {product.description}
                    </p>
                  ) : (
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-gray-900 font-medium">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">
                        {/** todo: reviews */}
                        {/* {product.reviews.length} */}
                      </span>
                    </div>
                    {activeTab === "suggested" && (
                      <span className="text-sm text-gray-500">
                        {product.quantity} left
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
