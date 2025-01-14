import { MapPin } from "lucide-react";

import { CreditCard } from "lucide-react";

import { Order } from "../../types/order";

import { useState } from "react";
import { TabType } from "../../types/order";
import { Package } from "lucide-react";
import { AddressFormData, PaymentFormData } from "../../lib/zod";
import PaymentMethodForm from "../../components/main/forms/payment-details-form";
import AddressForm from "../../components/main/forms/address-form";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<TabType>("orders");
  const [orders] = useState<Order[]>([
    {
      id: "ORD-123",
      date: "2024-03-15",
      total: 129.99,
      status: "delivered",
      items: [
        { name: "Product 1", quantity: 2, price: 49.99 },
        { name: "Product 2", quantity: 1, price: 30.01 },
      ],
    },
  ]);

  const tabs = [
    { id: "orders", label: "Past Orders", icon: Package },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "address", label: "Addresses", icon: MapPin },
  ] as const;

  const handlePaymentSubmit = (data: PaymentFormData) => {
    console.log("Payment form submitted:", data);
    // Handle payment method addition
  };

  const handleAddressSubmit = (data: AddressFormData) => {
    console.log("Address form submitted:", data);
    // Handle address addition
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === id
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-xl font-semibold">Order History</h2>
                </div>
                <div className="divide-y">
                  {orders.map((order) => (
                    <div key={order.id} className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ${order.total.toFixed(2)}
                          </p>
                          <p
                            className={`text-sm ${
                              order.status === "delivered"
                                ? "text-green-600"
                                : "text-blue-600"
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between text-sm text-gray-600"
                          >
                            <span>
                              {item.quantity}x {item.name}
                            </span>
                            <span>${item.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Methods Tab */}
            {activeTab === "payment" && (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-xl font-semibold">Payment Methods</h2>
                </div>
                <div className="p-6">
                  {/* Existing Cards */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-gray-100 rounded" />
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-500">Expires 12/24</p>
                        </div>
                      </div>
                      <button className="text-sm text-red-600 hover:text-red-700">
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Add New Card Form */}
                  <PaymentMethodForm onSubmit={handlePaymentSubmit} />
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "address" && (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-xl font-semibold">Addresses</h2>
                </div>
                <div className="p-6">
                  {/* Existing Addresses */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Home</p>
                        <p className="text-sm text-gray-600">
                          123 Main St, Apt 4B
                        </p>
                        <p className="text-sm text-gray-600">
                          New York, NY 10001
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button className="text-sm text-blue-600 hover:text-blue-700">
                          Edit
                        </button>
                        <button className="text-sm text-red-600 hover:text-red-700">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Add New Address Form */}
                  <AddressForm onSubmit={handleAddressSubmit} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
