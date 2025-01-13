import { Link } from "react-router-dom";
import { Product } from "../../types/product";
import { Package, Tag } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/store-owner/products/${product.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
    >
      <div className="relative h-48 overflow-hidden">
        {product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium">
          ${product.price.toFixed(2)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">
              {product.tags.slice(0, 2).join(", ")}
              {product.tags.length > 2 && "..."}
            </span>
          </div>
          <span
            className={`text-sm font-medium ${
              product.quantity > 10
                ? "text-green-600"
                : product.quantity > 0
                ? "text-orange-600"
                : "text-red-600"
            }`}
          >
            {product.quantity > 10
              ? "In quantity"
              : product.quantity > 0
              ? "Low quantity"
              : "Out of quantity"}
          </span>
        </div>
      </div>
    </Link>
  );
}
