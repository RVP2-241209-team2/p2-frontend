import { Product } from "../../types/product";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CollectionsSection({
  products,
}: {
  products: Product[];
}) {
  // Get unique categories and their first product
  const collections = Array.from(new Set(products.map((p) => p.category))).map(
    (category) => ({
      name: category,
      thumbnail: products.find((p) => p.category === category)?.thumbnail || "",
      slug: category.toLowerCase().replace(/\s+/g, "-"),
      count: products.filter((p) => p.category === category).length,
    })
  );

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
        <p className="text-gray-600 max-w-2xl">
          Explore our wide range of products across different categories
        </p>
      </div>

      {/* Scrollable container */}
      <div className="relative">
        <div className="flex overflow-x-auto gap-6 px-4 pb-4 snap-x snap-mandatory scrollbar-hide">
          {collections.map((collection) => (
            <Link
              key={collection.name}
              to={`/products/category/${collection.slug}`}
              className="group flex-none w-[280px] snap-start"
            >
              <div className="relative rounded-2xl overflow-hidden bg-gray-100">
                {/* Fixed aspect ratio container */}
                <div className="h-[320px] w-[280px]">
                  <img
                    src={collection.thumbnail}
                    alt={`${collection.name} Collection`}
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1">
                      {collection.name}
                    </h3>
                    <p className="text-sm text-white/80 mb-2">
                      {collection.count} Products
                    </p>
                    <div className="flex items-center text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                      <span>Browse Collection</span>
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
