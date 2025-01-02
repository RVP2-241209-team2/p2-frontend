
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Package, DollarSign, Users, ArrowUpRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, icon }: StatCardProps) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <span className="text-gray-500 text-sm">{title}</span>
      <div className="p-2 bg-amber-100 rounded-lg">{icon}</div>
    </div>
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-2xl font-bold">{value}</h3>
        <div className="flex items-center gap-1 text-green-600 text-sm">
          <ArrowUpRight size={16} />
          <span>{change}</span>
        </div>
      </div>
    </div>
  </div>
);

const RecentProducts = () => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <h2 className="text-lg font-semibold mb-4">Recent Products</h2>
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
            <div>
              <h3 className="font-medium">Product {i}</h3>
              <p className="text-sm text-gray-500">${(19.99 * i).toFixed(2)}</p>
            </div>
          </div>
          <Link
            to={`/admin/products/${i}`}
            className="text-amber-600 hover:text-amber-700 text-sm font-medium"
          >
            Edit
          </Link>
        </div>
      ))}
    </div>
  </div>
);

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
        <RecentProducts />
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/admin/products/new"
              className="block w-full text-center bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors"
            >
              Add New Product
            </Link>
            <button className="block w-full text-center border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              View All Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
