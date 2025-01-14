import { MapPin } from "lucide-react";

import { CreditCard } from "lucide-react";

import { Order } from "../../types/order";

import { Key, useEffect, useState } from "react";
import { TabType } from "../../types/order";
import { Package } from "lucide-react";
import { AddressFormData, PaymentFormData } from "../../lib/zod";
import PaymentMethodForm from "../../components/main/forms/payment-details-form";
import AddressForm from "../../components/main/forms/address-form";
import api from "../../lib/axios";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<TabType>("orders");
  const [orders, setOrders] = useState<Order[]>([])
  const [addresses, setAddresses] = useState<AddressFormData[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentFormData[]>([])
  const [showOrderDetails, setShowOrderDetails] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try{
        const response = await api.get("/public/orders/customer/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    }

    const fetchAddresses = async () => {
      try{
        const response = await api.get("/customers/users/my-info/addresses", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        setAddresses(response.data);
      } catch (error) {
        console.error("Failed to fetch addresses", error);
      }
    }

    const fetchPaymentMethods = async () => {
      try{
        const response = await api.get("/customers/users/my-info/payment-methods", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        setPaymentMethods(response.data);
      } catch (error) {
        console.error("Failed to fetch payment methods", error);
      }
    }

    fetchOrders();
    fetchAddresses();
    fetchPaymentMethods();
  }, []);

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

  const toggleOrderDetails = (orderId: string) => {
    setShowOrderDetails((prev) => (prev === orderId ? null : orderId))
  }

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
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold">Order #{order.id}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div>
                          <p className="text-sm text-gray-600">Status: {order.status}</p>
                          <p className="text-sm text-gray-600">Total: ${order.total.toFixed(2)}</p>
                        </div>
                        <button className="text-sm text-blue-600 hover:text-blue-700" onClick={() => toggleOrderDetails(order.id)}>
                          View Details
                        </button>
                      </div>
                      {showOrderDetails === order.id && (
                        <div className="mt-4">
                          <h3 className="text-lg font-semibold">Items</h3>
                          <ul className="divide-y">
                            {order.orderItems?.map((orderItem) => (
                              <li key={orderItem.id} className="flex justify-between items-center py-2">
                                <div>
                                  <p className="font-semibold">{orderItem.product.name}</p>
                                  <p className="text-sm text-gray-600">Quantity: {orderItem.quantity}</p>
                                </div>
                                <p className="font-semibold">${orderItem.product.price.toFixed(2)}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
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
                        {paymentMethods.map((paymentMethod) => (
                          <div key={paymentMethod.cardNumber}>
                            <p className="font-medium">Card Number: {paymentMethod.cardNumber}</p>
                            <p className="text-sm text-gray-600">Cardholder: {paymentMethod.cardHolderName}</p>
                            <p className="text-sm text-gray-600">Expires: {paymentMethod.expireDate}</p>
                          </div>    
                        ))}
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
                      {addresses.map((address) => (
                        <div key={address.addressLine1}>
                          <p className="font-medium">{address.addressLine1}</p>
                          <p className="text-sm text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
                          <p className="text-sm text-gray-600">{address.country}</p>
                        </div>
                      ))}
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
