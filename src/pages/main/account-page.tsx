import { MapPin } from "lucide-react";

import { CreditCard } from "lucide-react";

import { Order } from "../../types/order";

import axios from "axios"; 

import { useEffect, useState } from "react";
import { TabType } from "../../types/order";
import { Package } from "lucide-react";
import { AddressFormData, PaymentFormData } from "../../lib/zod";
import PaymentMethodForm from "../../components/main/forms/payment-details-form";
import AddressForm from "../../components/main/forms/address-form";
import { User } from "../../types/users";
import { Address } from "./checkout-page";

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
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

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [payLoading, setPayLoading] = useState<boolean>(true);
  const [addressLoading, setAddressLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const userId = user?.id;
  const baseUrl = import.meta.env.VITE_API_URL;


  // fetch all addresses
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`${baseUrl}/customers/users/my-info/addresses`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
    });
      setAddresses(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching addresses");
    } finally {
      setAddressLoading(false);
    }
  };
  useEffect(() => {
    fetchAddresses();
  }, [userId]);

  //fetch all payment methods
  const fetchPayMethods = async () => {
    try {
      const response = await axios.get(`${baseUrl}/customers/users/my-info/payment-methods`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
    });
      setPaymentMethods(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching addresses");
    } finally {
      setPayLoading(false);
    }
  };
  useEffect(() => {
    fetchPayMethods();
  }, [userId]);

  // console.log(user)
  // console.log(addresses);
  // console.log(paymentMethods);

  const tabs = [
    { id: "orders", label: "Past Orders", icon: Package },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "address", label: "Addresses", icon: MapPin },
  ] as const;

  
  // Handle payment method addition
  const handlePaymentSubmit = async (data: PaymentFormData) => {
    console.log("Payment form submitted:", data);
    try {
      const response = await axios.post(`${baseUrl}/customers/users/my-info/payment-methods`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      fetchPayMethods();
    } catch (error) {
      console.error("Failed to add payment method:", error);
      throw error; // Re-throw the error to handle it in the calling function
    }
    
  };

   // Remove Payment Methods
   const removePaymentMethods = async (id: string) => {
    try {
      const response = await axios.delete(`${baseUrl}/customers/users/my-info/payment-methods/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );

      fetchPayMethods();
    } catch (error) {
      console.error("Failed to add delete payment method:", error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  }

  // Handle address addition
  const handleAddressSubmit = async (data: AddressFormData) => {
    console.log("Address form submitted:", data);

    try {
      const response = await axios.post(`${baseUrl}/customers/users/my-info/addresses`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      fetchAddresses();
    } catch (error) {
      console.error("Failed to add address:", error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  };

  // Remove Address
  const removeAddress = async (id: string) => {
    try {
      const response = await axios.delete(`${baseUrl}/customers/users/my-info/addresses/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );

      console.log(response.data);
  
      fetchAddresses();
    } catch (error) {
      console.error("Failed to add delete address:", error);
      throw error; // Re-throw the error to handle it in the calling function
    }
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
                {payLoading && <h1 className="text-center">Loading...</h1>}
                <div className="px-6 py-4 border-b">
                  <h2 className="text-xl font-semibold">Payment Methods</h2>
                </div>
                <div className="p-6">
                  {/* Existing Cards */}
                  {
                    paymentMethods.map(paymentMethod => {
                      return <div key={paymentMethod.id} className="space-y-4 mb-8">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-8 bg-gray-100 rounded" />
                            <div>
                              <p className="font-medium">•••• •••• •••• {paymentMethod.cardNumber.slice(-4)}</p>
                              <p className="font-medium">{paymentMethod.cardHolderName}</p>
                              <p className="text-sm text-gray-500">Expire: {paymentMethod.expireDate}</p>
                            </div>
                          </div>
                          <button onClick={() => removePaymentMethods(paymentMethod.id)} className="text-sm text-red-600 hover:text-red-700">
                            Remove
                          </button>
                        </div>
                      </div>
                    })
                  }
                  
                    

                  {/* Add New Card Form */}
                  <PaymentMethodForm addresses={addresses} onSubmit={handlePaymentSubmit} />
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "address" && (
              <div className="bg-white rounded-lg shadow">
                {addressLoading && <h1 className="text-center">Loading...</h1>}
                <div className="px-6 py-4 border-b">
                  <h2 className="text-xl font-semibold">Addresses</h2>
                </div>
                <div className="p-6">
                  {/* Existing Addresses */}
                  <div className="space-y-4 mb-8">
                    {
                      addresses.map((address) => {
                        return <div key={address.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{address?.recipientName}</p>
                            <p className="text-sm text-gray-600">
                              {address.addressLine1}
                            </p>
                            <p className="text-sm text-gray-600">
                              {address.addressLine2}
                            </p>
                            <p className="text-sm text-gray-600">
                              {address.city}
                            </p>
                            <p className="text-sm text-gray-600">
                              {address.state}
                            </p>
                            <p className="text-sm text-gray-600">
                              {address.zipCode}
                            </p>
                            <p className="text-sm text-gray-600">
                              {address.country}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <button className="text-sm text-blue-600 hover:text-blue-700">
                              Edit
                            </button>
                            <button onClick={(() => removeAddress(address.id))} className="text-sm text-red-600 hover:text-red-700">
                              Remove
                            </button>
                          </div>
                        </div>
                      })
                    }
                    
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
