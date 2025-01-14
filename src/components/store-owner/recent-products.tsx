import { Link } from "react-router-dom";


const RecentProducts = () => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <h2 className="text-lg font-semibold mb-4">Recent Products</h2>
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between py-2 border-b last:border-0"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
            <div>
              <h3 className="font-medium">Product {i}</h3>
              <p className="text-sm text-gray-500">${(19.99 * i).toFixed(2)}</p>
            </div>
          </div>
          <Link
            to={`/store-owner/products/${i}`}
            className="text-amber-600 hover:text-amber-700 text-sm font-medium"
          >
            Edit
          </Link>
        </div>
      ))}
    </div>
  </div>
);

export default RecentProducts;
