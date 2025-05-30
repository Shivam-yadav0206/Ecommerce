"use client";

import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import { Trash2, Plus, Search, Filter } from "lucide-react";
import axiosInstance from "@/api/axios";
import SideLayout from "@/components/layout/SideLayout";
import { fallbackImage } from "@/lib/utils";


export default function Order() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [myOrder, setMyOrder] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "text-green-600 bg-green-50";
      case "Stock Out":
        return "text-red-600 bg-red-50";
      case "Low Stock":
        return "text-orange-600 bg-orange-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axiosInstance.get("/order");
        setMyOrder(response?.data);
        setFilteredOrders(response?.data); // Initially show all
      } catch (error) {
        console.log(error.message);
      }
    };
    getOrders();
  }, []);

  useEffect(() => {
    let filtered = myOrder;

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((order) => order.status === filterStatus);
    }

    // Filter by search term
    if (searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter((order) =>
        order.order?.some((item) =>
          item.name.toLowerCase().includes(lowerSearch)
        )
      );
    }

    setFilteredOrders(filtered);
  }, [searchTerm, filterStatus, myOrder]);

  return (
    <MainLayout>
      <SideLayout>
        <div className="bg-white dark:bg-gray-800 dark:text-slate-200 rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6">
            My Orders
          </h2>

          {/* Search and Filter */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-slate-500 p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600 dark:text-slate-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-slate-200"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter
                  className="text-slate-400 dark:text-slate-500"
                  size={20}
                />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-slate-200">
                  {[
                    "all",
                    "pending",
                    "processing",
                    "shipped",
                    "delivered",
                    "completed",
                    "cancelled",
                    "out for delivery",
                  ].map((status) => (
                    <option key={status} value={status}>
                      {status === "all"
                        ? "All Status"
                        : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Empty State */}
          {filteredOrders.length === 0 ? (
            <div className="text-center text-slate-600 dark:text-slate-400 py-10">
              No matching orders found.
            </div>
          ) : (
            filteredOrders.map((orders, idx) => (
              <div
                key={orders?.id ?? idx}
                className="border border-slate-200 rounded-lg p-6 dark:text-slate-200 dark:hover:bg-gray-700 hover:bg-slate-50 transition-colors">
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 pb-4 border-b border-slate-200">
                  <div className="mb-2 md:mb-0">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                        Order #{orders?.id}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          orders?.status
                        )}`}>
                        {orders?.status}
                      </span>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      <p>
                        Ordered on:{" "}
                        {new Date(orders?.date).toLocaleDateString()}
                      </p>
                      <p>Delivery to: {orders?.deliveryAddress}</p>
                      <p className="font-medium text-slate-800 dark:text-slate-200">
                        Total: ${orders?.totalAmount?.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-end">
                    <button
                      title="Track your order"
                      className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded text-sm transition-colors">
                      Track Order
                    </button>
                    {orders?.status === "Delivered" && (
                      <button
                        title="Download your invoice"
                        className="border border-slate-300 hover:bg-slate-50 dark:hover:bg-gray-600 text-slate-700 dark:text-slate-300 font-medium py-2 px-4 rounded text-sm transition-colors">
                        Download Invoice
                      </button>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-800 dark:text-slate-200 text-sm">
                    Items in this order ({orders?.order?.length ?? 0})
                  </h4>
                  <div className="grid gap-4">
                    {orders?.order?.map((item, idx) => (
                      <div
                        key={item?.id ?? idx}
                        className="flex items-start gap-4 p-4 dark:text-slate-200 dark:bg-gray-800 bg-gray-50 rounded-lg">
                        <Image
                          width={40}
                          height={40}
                          src={item.imageUrl || fallbackImage}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <h5 className="font-medium text-slate-800 dark:text-slate-200 mb-1">
                            {item.name}
                          </h5>
                          <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                            <span>Quantity: {item.quantity}</span>
                            <span>Price: ${item.price.toFixed(2)}</span>
                            <span className="font-medium text-slate-800 dark:text-slate-200">
                              Subtotal: $
                              {(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 flex-shrink-0">
                          {orders?.status === "Delivered" && (
                            <button
                              title="Rate and review this product"
                              className="text-blue-600 hover:text-blue-700 dark:hover:text-blue-400 text-sm font-medium border border-blue-200 hover:border-blue-300 px-3 py-1 rounded transition-colors">
                              Rate & Review
                            </button>
                          )}
                          <button
                            title="Buy this product again"
                            className="text-slate-600 dark:text-slate-300 hover:text-slate-700 dark:hover:text-white text-sm font-medium border border-slate-200 hover:border-slate-300 dark:hover:border-gray-500 px-3 py-1 rounded transition-colors">
                            Buy Again
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-gray-600">
                  <div className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-400">
                    <span>
                      {orders?.order?.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}{" "}
                      items
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Order Total: ${orders?.totalAmount?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </SideLayout>
    </MainLayout>
  );
}

{
  /* <section className="py-6 md:py-10 bg-gray-50 dark:bg-gray-900">
  <div className="container mx-auto px-4">
    <div className="text-center">
      <h2 className="text-2xl md:text-3xl font-semibold uppercase mb-2 text-gray-800 dark:text-gray-100">
        Wishlist
      </h2>
      <div className="flex items-center justify-center mt-4">
        <div className="w-16 h-[3px] bg-primary"></div>
      </div>
    </div>
  </div>
</section> */
}
