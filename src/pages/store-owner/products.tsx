import { useEffect, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { Product } from "../../types/product";
import { ProductCard } from "../../components/store-owner/product-card";
import { Filter, Loader2 } from "lucide-react";
import { SearchBar } from "../../components/shared/search-bar";

export default function StoreOwnerProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedTag, setSelectedTag] = useState<string>("");
  // const [tags, setTags] = useState<string[]>([]);
  const { loading, error, fetchProducts, searchProducts } = useProducts();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const fetchedProducts = await fetchProducts();
    if (fetchedProducts) {
      setProducts(fetchedProducts);
      // Extract unique tags
      // const uniqueTags = Array.from(
      //   new Set(fetchedProducts.flatMap((p) => p.tags))
      // );
      // setTags(uniqueTags);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      const searchResults = await searchProducts(searchTerm);
      if (searchResults) {
        setProducts(searchResults);
      }
    } else {
      loadProducts();
    }
  };

  // const handleTagFilter = async (tag: string) => {
  //   if (tag === selectedTag) {
  //     setSelectedTag("");
  //     loadProducts();
  //   } else {
  //     setSelectedTag(tag);
  //     const taggedProducts = await getProductsByTag(tag);
  //     if (taggedProducts) {
  //       setProducts(taggedProducts);
  //     }
  //   }
  // };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shoply Products</h1>
          <div className="w-96">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              onSearch={handleSearch}
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-700">Filter by tag:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagFilter(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                  ${
                    selectedTag === tag
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                {tag}
              </button>
            ))} */}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
