"use client";

import { useState, useEffect, useCallback } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import axiosInstance from "@/api/axios";
import { updateCartItemDetails } from "@/store/cartSlice";
import SideLayout from "@/components/layout/SideLayout";
import { fallbackImage } from "@/lib/utils";

interface ProductDetails {
  _id: string;
  name: string | null;
  rating: { average: number; count: number } | null;
  specs: Record<string, string> | null;
  price: number | null;
  stock: number | null;
  imageUrls?: string[] | null;
}

export default function Cart() {
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  const cachedCartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  // ✅ Memoized version of getCartItems to avoid re-creating on every render
  const getCartItems = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/cart/viewItems");

      const items = response.data;
      setCartItems(items);

      items.forEach((item: ProductDetails) => {
        dispatch(updateCartItemDetails(item));
      });
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  }, [dispatch]);

  // ✅ Effect to load cart data on mount or cache change
  useEffect(() => {
    const hasHydratedCart =
      cachedCartItems.length > 0 &&
      cachedCartItems.every((item) => item.details?.name);

    if (hasHydratedCart) {
      setCartItems(cachedCartItems);
    } else {
      getCartItems();
    }
  }, [cachedCartItems, getCartItems]);

  const applyCoupon = () => {
    if (couponCode.trim().toLowerCase() === "save10") {
      setCouponApplied(true);
    } else {
      alert("Invalid coupon code");
    }
  };

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const cartSummary = {
    subtotal: 3999,
    discount: couponApplied ? 400 : 0,
    delivery: 0,
    tax: 80,
    total: couponApplied ? 3679 : 4079,
  };

  return (
    <MainLayout>
      <SideLayout>
        {/* Page Header */}

        {/* <section className="py-6 md:py-10 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-semibold uppercase mb-2 text-gray-800 dark:text-gray-100">
                Cart
              </h2>
              <div className="flex items-center justify-center mt-4">
                <div className="w-16 h-[3px] bg-primary"></div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Main Content */}
        <div className="w-full">
          <div className="mx-auto">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Wishlist Items Column */}
              <div className="w-full lg:w-2/3 flex flex-col">
                {cartItems.map((item, idx) => (
                  <article
                    key={idx}
                    className="flex flex-col md:flex-row shadow-lg mx-auto rounded-2xl overflow-hidden mb-6 group cursor-pointer transform transition-all duration-300 hover:-translate-y-1 border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="md:w-1/3 lg:w-1/4">
                      <Image
                        className="w-full h-60 md:h-full object-cover"
                        src={
                          Array.isArray(item?.imageUrls) && item?.imageUrls?.[0]
                            ? item.imageUrls[0]
                            : fallbackImage
                        }
                        alt="The Magnificent Bogra"
                        width={300}
                        height={400}
                      />
                    </div>
                    <div className="md:w-2/3 lg:w-3/4 flex flex-col">
                      <div className="p-5 flex-grow">
                        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100 transition-all duration-300">
                          {item.details?.name || "Product Name"}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-2 leading-relaxed transition-all duration-300">
                          Located in Rajshahi Division, Bogra is one of the
                          oldest and most fascinating towns in Bangladesh
                        </p>
                      </div>
                      <div className="bg-slate-100 dark:bg-gray-700 p-5 transition-all duration-300">
                        <div className="sm:flex sm:justify-between">
                          <div>
                            <div className="text-md text-gray-700 dark:text-gray-300">
                              <span className="text-gray-900 dark:text-gray-100 font-bold">
                                196 km
                              </span>{" "}
                              from Dhaka
                            </div>
                            <div className="flex items-center mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className="w-4 h-4 mx-px fill-current text-yellow-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 14 14">
                                    <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z" />
                                  </svg>
                                ))}
                              </div>
                              <div className="text-gray-600 dark:text-gray-400 ml-2 text-sm md:text-base">
                                {item.details?.rating?.count || 0} reviews
                              </div>
                            </div>
                          </div>
                          <button className="mt-3 sm:mt-0 py-2 px-5 md:py-2 md:px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 font-medium text-white rounded-lg shadow-md transition-all duration-300">
                            Book Ticket
                          </button>
                        </div>
                        <div className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
                          *Places to visit: Mahasthangarh, Vasu Bihar &amp; Momo
                          Inn
                        </div>
                      </div>
                    </div>
                  </article>
                ))}

                {cartItems.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p>Add more items to your wishlist to see them here</p>
                  </div>
                )}
              </div>

              {/* Order Summary Column */}
              <div className="w-full lg:w-1/3">
                <div className="sticky top-20 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden transition-all duration-300">
                  {/* Bill Summary Header */}
                  <div className="px-4 py-4 border-b border-slate-200 dark:border-gray-700 bg-slate-100 dark:bg-gray-750">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      Order Summary
                    </h2>
                  </div>

                  {/* Bill Details */}
                  <div className="px-4 py-4">
                    <div className="flex flex-col space-y-3 text-sm">
                      <div className="flex justify-between text-gray-600 dark:text-gray-300">
                        <span>Bag Total</span>
                        <span className="text-gray-800 dark:text-gray-100">
                          ₹{cartSummary.subtotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600 dark:text-gray-300">
                        <span>Bag Discount</span>
                        <span className="text-green-600 dark:text-green-400">
                          -₹{cartSummary.discount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600 dark:text-gray-300">
                        <span>Delivery</span>
                        {cartSummary.delivery === 0 ? (
                          <span className="text-green-600 dark:text-green-400">
                            FREE
                          </span>
                        ) : (
                          <span className="text-gray-800 dark:text-gray-100">
                            ₹{cartSummary.delivery.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between text-gray-600 dark:text-gray-300">
                        <span>Tax</span>
                        <span className="text-gray-800 dark:text-gray-100">
                          ₹{cartSummary.tax.toFixed(2)}
                        </span>
                      </div>
                      <div className="pt-3 mt-2 border-t border-slate-200 dark:border-gray-700 flex justify-between items-center font-semibold">
                        <span className="text-gray-800 dark:text-gray-100">
                          Order Total
                        </span>
                        <span className="text-gray-900 dark:text-white text-lg font-bold">
                          ₹{cartSummary.total.toFixed(2)}
                        </span>
                      </div>
                      {cartSummary.discount > 0 && (
                        <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded text-center text-green-700 dark:text-green-400 text-sm font-medium">
                          You save ₹{cartSummary.discount.toFixed(2)} on this
                          order
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Coupon Section */}
                  <div className="px-4 py-4 border-t border-slate-200 dark:border-gray-700">
                    <div className="flex flex-col space-y-2">
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={toggleDetails}>
                        <span className="font-medium text-gray-800 dark:text-gray-100">
                          Apply Coupon
                        </span>
                        <button className="text-blue-600 dark:text-blue-400 h-6 w-6 flex items-center justify-center">
                          {isOpen ? "−" : "+"}
                        </button>
                      </div>

                      {isOpen && (
                        <div className="flex mt-2 transition-all duration-300">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Enter coupon code"
                            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <button
                            onClick={applyCoupon}
                            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-r text-sm transition-colors">
                            APPLY
                          </button>
                        </div>
                      )}

                      {couponApplied && (
                        <div className="flex justify-between items-center bg-green-50 dark:bg-green-900/20 p-2 rounded mt-2">
                          <span className="text-green-700 dark:text-green-400 text-sm">
                            SAVE10 applied successfully!
                          </span>
                          <button
                            onClick={() => {
                              setCouponApplied(false);
                              setCouponCode("");
                            }}
                            className="text-red-600 dark:text-red-400 text-sm font-medium">
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Delivery and Payment Options */}
                  <div className="px-4 py-3 border-t border-slate-200 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      *For faster delivery, select AVAILABLE products
                    </span>
                  </div>

                  {/* Proceed to Checkout Button */}
                  <div className="px-4 py-4 border-t border-slate-200 dark:border-gray-700">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-3 px-4 rounded transition-all duration-300">
                      PROCEED TO SHIPPING
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SideLayout>
    </MainLayout>
  );
}
