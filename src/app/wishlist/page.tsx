"use client";

import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import { Trash2, Plus, Search, Filter } from "lucide-react";
import axiosInstance from "@/api/axios";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { removeFromWishlist, setWishlistCache } from "@/store/wishlistSlice";
import SideLayout from "@/components/layout/SideLayout";
import { addItem } from "@/store/cartSlice";

interface Product {
  _id: string;
  name: string | null;
  rating: { average: number; count: number } | null;
  specs: Record<string, string> | null;
  price: number | null;
  stock: number | null;
  imageUrls?: string[] | null;
}

export default function Wishlist() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  const cachedWishlistItems = useSelector(
    (state: RootState) => state?.wishlist?.items
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // Show cached data instantly
    if (cachedWishlistItems.length > 0) {
      setWishlistItems(cachedWishlistItems);
    }

    // Always fetch fresh data
    const getWishlistItems = async () => {
      try {
        const response = await axiosInstance.get("wish/viewItems");
        const fetchedItems: Product[] = response?.data?.data || [];

        // Only update Redux store if items have changed
        const hasChanged =
          JSON.stringify(fetchedItems) !== JSON.stringify(cachedWishlistItems);

        if (hasChanged) {
          dispatch(setWishlistCache(fetchedItems));
          setWishlistItems(fetchedItems);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist items:", error);
      }
    };

    getWishlistItems();
  }, [dispatch,cachedWishlistItems]); // Runs once on mount

  const getStatusString = (stock: number): string => {
    return stock === 0 ? "Stock Out" : stock < 10 ? "Low Stock" : "In Stock";
  };

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

  const addToCart = async ({
    _id,
    name,
    rating,
    specs,
    price,
    imageUrls = [], // default to empty array if undefined
  }: {
    _id: string;
    name: string | null;
    rating: { average: number; count: number } | null;
    specs: Record<string, string> | null;
    price: number | null;
    imageUrls?: string[] | null;
  }) => {
    try {
      await axiosInstance.post("/cart/addItem", {
        itemId: _id,
        newQuantity: 1,
      });

      dispatch(
        addItem({
          productId: _id,
          quantity: 1,
          details: {
            _id,
            name,
            rating,
            specs,
            price,
            stock: 13,
            imageUrls: imageUrls || [],
          },
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const removeProduct = async (productId: string) => {
    try {
      await axiosInstance.post("wish/removeItem", { itemId: productId });
      dispatch(removeFromWishlist(productId));
      setWishlistItems((prev) => prev.filter((item) => item._id !== productId));
    } catch (error) {
      console.log(error.message);
    }
  };

  const filteredWishlistItems = wishlistItems.filter((product) => {
    const statusString = getStatusString(product.stock);
    const matchesSearch = product.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || filterStatus === statusString;
    return matchesSearch && matchesFilter;
  });

  return (
    <MainLayout>
      <SideLayout>
        <div className="w-full m-auto">
          <div className="min-h-screen bg-base-200">
            <div className="max-w-7xl mx-auto">
              {/* Search and Filter */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-slate-500 p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600"
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="text-slate-400" size={20} />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200">
                      <option value="all">All Status</option>
                      <option value="In Stock">In Stock</option>
                      <option value="Stock Out">Stock Out</option>
                      <option value="Low Stock">Low Stock</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Product List */}
              <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-4 md:p-6 bg-slate-50 border-b border-slate-200 font-semibold text-slate-700 text-sm md:text-base">
                  <div className="col-span-5">Product Name</div>
                  <div className="col-span-2 text-center">Unit Price</div>
                  <div className="col-span-2 text-center">Stock Status</div>
                  <div className="col-span-3 text-center">Action</div>
                </div>

                {/* Product Items */}
                <div className="divide-y divide-slate-200">
                  {filteredWishlistItems.map((product) => {
                    const statusString = getStatusString(product.stock);

                    return (
                      <div
                        key={product?._id}
                        className="grid grid-cols-12 gap-4 p-4 md:p-6 hover:bg-slate-200 transition-colors duration-200 items-center">
                        {/* Product Name */}
                        <div className="col-span-5 flex items-center gap-2 md:gap-4">
                          <div className="w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg md:rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                            <div className="w-6 h-6 md:w-12 md:h-12 bg-slate-400 rounded-full opacity-50"></div>
                          </div>
                          <div className="min-w-0">
                            <h3 className="dark:text-slate-200 font-semibold text-slate-800 text-sm md:text-lg truncate">
                              {product?.name}
                            </h3>
                          </div>
                        </div>

                        {/* Unit Price */}
                        <div className="col-span-2 text-center">
                          <div className="flex flex-col items-center gap-1">
                            {product?.price && (
                              <span className="text-slate-400 dark:text-slate-200 line-through text-xs md:text-sm">
                                ${product?.price}
                              </span>
                            )}
                            <span className="font-bold dark:text-white text-slate-800 text-sm md:text-lg">
                              ${product?.price}
                            </span>
                          </div>
                        </div>

                        {/* Stock Status */}
                        <div className="col-span-2 text-center">
                          <span
                            className={`inline-block px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ${getStatusColor(
                              statusString
                            )}`}>
                            {statusString}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="col-span-3 flex items-center justify-center gap-1 md:gap-2">
                          <button
                            onClick={() => addToCart({...product})}
                            disabled={statusString === "Stock Out"}
                            className={`px-2 md:px-3 py-1 md:py-1.5 rounded-md text-xs md:text-sm font-medium transition-colors duration-200 ${
                              statusString === "Stock Out"
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                                : "bg-blue-600 hover:bg-blue-700 text-white border border-blue-600"
                            }`}>
                            Add to Cart
                          </button>
                          <button
                            onClick={() => removeProduct(product?._id)}
                            className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors duration-200">
                            <Trash2 size={14} className="md:w-4 md:h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* No results */}
                {filteredWishlistItems.length === 0 && (
                  <div className="p-12 text-center">
                    <div className="text-slate-400 text-lg mb-2">
                      No products found
                    </div>
                    <p className="text-slate-500">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SideLayout>
    </MainLayout>
  );
}
