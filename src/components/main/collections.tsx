import { Product } from "../../types/product";

export default function CollectionsSection({
  products,
}: {
  products: Product[];
}) {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Featured Collections
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {["Smartphones", "Laptops", "Fragrances"].map((collection) => (
          <div
            key={collection}
            className="group relative overflow-hidden rounded-lg aspect-[3/4]"
          >
            <img
              src={
                products.find(
                  (p) => p.category.toLowerCase() === collection.toLowerCase()
                )?.thumbnail
              }
              alt={collection}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">{collection}</h3>
                <button className="text-sm underline">View Collection</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
