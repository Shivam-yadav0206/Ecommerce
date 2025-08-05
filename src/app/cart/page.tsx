"use client";

import { useState, useEffect, useCallback } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import axiosInstance from "@/api/axios";
import { removeItem, updateCartItemDetails } from "@/store/cartSlice";
import SideLayout from "@/components/layout/SideLayout";
import { fallbackImage } from "@/lib/utils";
import { removeFromWishlist } from "@/store/wishlistSlice";

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

  const [totalPrice, setTotal] = useState(0);
  

  const cachedCartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  // ✅ Memoized version of getCartItems to avoid re-creating on every render
  const getCartItems = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/cart/viewItems");

      const items = response.data;
      setCartItems(items);
      const total = items.reduce((sum, item) => {
        const price = item?.price ?? 0;
        return sum + price;
      }, 0);

      setTotal(total);

      items.forEach((item: ProductDetails) => {
        dispatch(updateCartItemDetails(item));
      });
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  }, [dispatch]);

  //console.log(cartItems);

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
    if (couponCode.trim().toLowerCase() === "save50") {
      setCouponApplied(true);
    } else {
      alert("Invalid coupon code");
    }
  };

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

const handleRemove = async (id: string) => {
  try {
    const removedItem = cartItems.find((item) => item.details?._id === id);

    if (!removedItem) return;

    await axiosInstance.post("/cart/removeItem", { itemId: id });

    // ✅ Update Redux
    dispatch(removeItem(id));

    // ✅ Update local state
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.details?._id !== id)
    );

    // ✅ Subtract price of the removed item from total
    const removedPrice = removedItem?.details?.price ?? 0;
    setTotal((prevTotal) => prevTotal - removedPrice);
  } catch (error) {
    console.log(error.message);
  }
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
                          Array.isArray(item?.details?.imageUrls) &&
                          item?.details?.imageUrls?.[0]
                            ? item?.details?.imageUrls[0]
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
                          {item?.details?.name || "Product Name"}
                        </h1>

                        {item?.details?.specs ? (
                          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                            {Object.entries(item?.details?.specs).map(
                              ([key, value]) =>
                                key.toLowerCase() === "color" ? null : (
                                  <div
                                    key={key}
                                    className="text-gray-600 dark:text-gray-300 text-sm">
                                    <span className="font-medium capitalize">
                                      {key.replace(/([A-Z])/g, " $1")}:
                                    </span>{" "}
                                    <span className="ml-1">
                                      {value as string}
                                    </span>
                                  </div>
                                )
                            )}
                          </div>
                        ) : (
                          <p className="text-gray-600 dark:text-gray-300 mt-2 leading-relaxed transition-all duration-300">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Voluptate explicabo, placeat incidunt quae
                            eligendi esse nihil, fugit animi maxime, perferendis
                            commodi repudiandae ad quos magnam
                          </p>
                        )}
                      </div>

                      <div className="bg-slate-100 dark:bg-gray-700 p-5 transition-all duration-300">
                        <div className="sm:flex sm:justify-between">
                          <div>
                            <div className="text-md text-gray-700 dark:text-gray-300">
                              <span className="text-gray-900 dark:text-gray-100 font-bold">
                                ${item?.details?.price}
                              </span>{" "}
                              {/* from Dhaka */}
                            </div>
                            <div className="flex items-center mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => {
                                  const full =
                                    i <
                                    Math.floor(item?.details?.rating?.average);
                                  const half =
                                    i < item?.details?.rating?.average &&
                                    i >=
                                      Math.floor(
                                        item?.details?.rating?.average
                                      );

                                  return (
                                    <svg
                                      key={i}
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                      className={`w-4 h-4 ${
                                        full
                                          ? "text-amber-500"
                                          : half
                                          ? "text-amber-200"
                                          : "text-gray-300"
                                      }`}>
                                      <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  );
                                })}
                              </div>
                              <div className="text-gray-600 dark:text-gray-400 ml-2 text-sm md:text-base">
                                {item.details?.rating?.count || 0} reviews
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemove(item?.details?._id)}
                            className="mt-3 sm:mt-0 py-2 px-5 md:py-2 md:px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 font-medium text-white rounded-lg shadow-md transition-all duration-300">
                            Remove
                          </button>
                        </div>
                        <div className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
                          Lorem ipsum dolor sit amet consectetur, adipisicing
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
                          {/* ₹{totalPrice} */}
                          ${totalPrice}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600 dark:text-gray-300">
                        <span>Bag Discount</span>
                        <span className="text-green-600 dark:text-green-400">
                          -₹{couponApplied? totalPrice/2  :  0}
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
                          ₹{(couponApplied && totalPrice !== 0)? totalPrice/2 : totalPrice}
                        </span>
                      </div>
                      {cartSummary.discount > 0 && (
                        <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded text-center text-green-700 dark:text-green-400 text-sm font-medium">
                          You save ₹{totalPrice !== 0 ? totalPrice/2 : 0} on this
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
                            SAVE50 applied successfully!
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
                    {/* <span className="text-xs text-gray-500 dark:text-gray-400">
                      *For faster delivery, select AVAILABLE products
                    </span> */}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      *Use Coupon SAVE50 to get 50% off on selected items.
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
