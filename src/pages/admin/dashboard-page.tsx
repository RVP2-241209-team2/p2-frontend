import { Link } from "react-router-dom";
import { BarChart3, Package, DollarSign, Users } from "lucide-react";
import NewProductForm from "../../components/admin/new-product-form";
import StatCard from "../../components/admin/stat-card";
import PaginatedProducts from "../../components/admin/paginated-products";

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 text-lg">
          Welcome back! Here's what's happening with your store.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* TODO: replace with actual stats */}
        <StatCard
          title="Total Revenue"
          value="$4,890"
          change="+12.5% from last month"
          icon={<DollarSign className="text-green-600" />}
        />
        <StatCard
          title="Products"
          value="45"
          change="+3 new this month"
          icon={<Package className="text-blue-600" />}
        />
        <StatCard
          title="Customers"
          value="1,234"
          change="+8.1% from last month"
          icon={<Users className="text-purple-600" />}
        />
        <StatCard
          title="Avg. Order Value"
          value="$108"
          change="+5.4% from last month"
          icon={<BarChart3 className="text-amber-600" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaginatedProducts />
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {/* New Product Form and action */}
            <NewProductForm />
          </div>
          {/* Other actions */}

          <Link
            to="/admin/orders"
            className="block w-full text-center bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors"
          >
            View All Orders
          </Link>
          <Link
            to="/admin/users"
            className="block w-full text-center bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Manage Users
          </Link>
        </div>
      </div>
    </div>
  );
}
