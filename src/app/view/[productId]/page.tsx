"use client";

import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import { useParams } from "next/navigation";
import axiosInstance from "@/api/axios";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import Reviews from "../../../components/ui/Reviews";
import PostReviews from "@/components/ui/PostReviews";
import { addItem } from "@/store/cartSlice";
import { toast, Toaster } from "sonner";

export default function ProductView() {
  const [mainImage, setMainImage] = useState(
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
  );
  const [productdetails, setProductDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const thumbnails = [
    "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8aGVhZHBob25lfGVufDB8MHx8fDE3MjEzMDM2OTB8MA&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1496957961599-e35b69ef5d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1528148343865-51218c4a13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
  ];

  const isAuthenticated = useSelector(
    (state: RootState) => state?.user?.isAuthenticated
  );

  const params = useParams();
  const productId = params.productId;
  //console.log(productId);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await axiosInstance.get(`/view/${productId}`);
        setProductDetails(response?.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (productId) getDetails();
  }, [productId]);
  

const handleAddCart = async () => {
  // ✅ Check authentication
  if (!isAuthenticated) {
    toast.error("You need to login to add items to the cart.");
    return;
  }

  if (!productdetails?.product) {
    toast.error("Product details not available.");
    return;
  }

  const product = productdetails.product;

  try {
    const res = await axiosInstance.post("/cart/addItem", {
      itemId: product._id,
      newQuantity: 1,
    });

    // ✅ Show success toast
    toast.success(`${product.name} added to cart successfully.`);

    // ✅ Dispatch Redux without productId in details (fixing TS error)
    dispatch(
      addItem({
        productId: product._id,
        quantity,
        details: {
          _id: product._id,
          name: product.name,
          rating: product.rating?.average || 0,
          specs: product.specs || {},
          price: product.price,
          stock: product.stock || 0,
          imageUrls: product.imageUrls || [],
        },
      })
    );

    console.log("Item added to cart successfully:", res.data);
  } catch (error) {
    console.error(
      "Error adding to cart:",
      error.response?.data || error.message
    );
    toast.error("Failed to add item to cart. Please try again.");
  }
};




  return (
    <MainLayout>
      <Toaster />

      <div className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Product Images */}
            <div className="md:w-1/2">
              <div className="relative w-full aspect-[4/3] rounded-xl shadow-lg overflow-hidden bg-white dark:bg-gray-800">
                <Image
                  src={mainImage}
                  alt="Product"
                  fill
                  className="object-contain"
                  id="mainImage"
                />
              </div>
              <div className="flex gap-4 mt-6 justify-center overflow-x-auto">
                {thumbnails.map((src, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(src)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-opacity duration-300
                ${
                  mainImage === src
                    ? "border-indigo-600 opacity-100"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
                    aria-label={`Thumbnail ${index + 1}`}
                    type="button">
                    <Image
                      src={src}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 flex flex-col justify-start">
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                {productdetails?.product?.name}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                SKU: WH1000XM4
              </p>

              <div className="flex items-baseline space-x-4 mb-6">
                <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  ${productdetails?.product?.price}
                </span>
                <span className="text-gray-400 line-through dark:text-gray-600">
                  ${productdetails?.product?.price}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-yellow-400"
                      aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006
                  5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527
                  1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354
                  7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273
                  -4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434
                  2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                <span className="ml-3 text-gray-700 dark:text-gray-300">
                  {productdetails?.product?.rating?.average} (
                  {productdetails?.product?.rating?.count} reviews)
                </span>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                {productdetails?.product?.description}
              </p>

              {/* Color Options */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Color:
                </h3>
                <div className="flex space-x-4">
                  {/* You can replace with dynamic colors */}
                  <button
                    type="button"
                    className="w-9 h-9 rounded-full bg-black ring-1 ring-black ring-offset-1 ring-offset-white dark:ring-offset-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    aria-label="Black color option"
                  />
                  <button
                    type="button"
                    className="w-9 h-9 rounded-full bg-gray-300 ring-1 ring-gray-300 ring-offset-1 ring-offset-white dark:ring-offset-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    aria-label="Gray color option"
                  />
                  <button
                    type="button"
                    className="w-9 h-9 rounded-full bg-blue-600 ring-1 ring-blue-600 ring-offset-1 ring-offset-white dark:ring-offset-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    aria-label="Blue color option"
                  />
                </div>
              </div>

              {/* Quantity Input */}
              <div className="mb-8 max-w-xs">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min={1}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value)))
                  }
                  className="w-20 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm p-2 text-center text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>

              {/* Add to Cart Button */}
              <div>
                <button
                  type="button"
                  disabled={!isAuthenticated}
                  onClick={handleAddCart}
                  className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-700 text-white px-6 py-3 rounded-md shadow-md transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75h1.5l1.5 9h11.25l1.5-9H21M5.25 6.75L6.75 3h10.5l1.5 3.75M6.75 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.25 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                    />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isAuthenticated && (
        <PostReviews rating={productdetails?.product?.rating} />
      )}

      <Reviews reviews={productdetails?.reviews} />
    </MainLayout>
  );
}
