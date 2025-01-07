import { Link } from "react-router-dom";
import { Product } from "../../types/product";

interface ProductTableRowProps {
  product: Product;
}

const ProductTableRow = ({ product }: ProductTableRowProps) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <span className="font-sm">
            {product.title.length > 12
              ? product.title.slice(0, 12) + "..."
              : product.title}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-gray-600">{product.category}</td>
      <td className="px-6 py-4 text-gray-600">${product.price.toFixed(2)}</td>
      <td className="px-6 py-4 text-right">
        <Link
          to={`/admin/products/${product.id}`}
          className="text-amber-600 hover:text-amber-700 font-medium"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
};

export default ProductTableRow;
