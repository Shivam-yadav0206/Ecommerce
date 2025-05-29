import React, { useState } from "react";
import { usePathname } from "next/navigation";
import axiosInstance from "@/api/axios";
import { toast, Toaster } from "sonner";
const PostReviews = ({ rating }) => {
  const pathName = usePathname().split("/").filter(Boolean).pop();

  const [formData, setFormData] = useState({
    productId: pathName,
    rating: null,
    comment: "",
  });

  const [imageUrls, setImageUrls] = useState([""]);

  const handleImageUrlChange = (index, value) => {
    const updated = [...imageUrls];
    updated[index] = value;
    setImageUrls(updated);
  };

  const addImageUrlField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const removeImageUrlField = (index) => {
    const updated = [...imageUrls];
    updated.splice(index, 1);
    setImageUrls(updated);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const payload = {
        productId: formData.productId,
        rating: formData.rating,
        comment: formData.comment,
        imageUrl: [
          "https://techcrunch.com/wp-content/uploads/2022/07/CMC_1589.jpg?resize=2048,1365",
          "https://techcrunch.com/wp-content/uploads/2022/07/CMC_1592.jpg?resize=2048,1365",
        ],
        // imageUrl: imageUrls.filter((url) => url.trim() !== ""),
      };
      if (
        !payload.productId ||
        !payload.rating ||
        !payload.comment ||
        payload.comment === ""
      ) {
          toast.error("Review is invalid, add rating(star)")
        }
        console.log(payload.rating)
        const res = await axiosInstance.post("/review/add", payload);
        console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

    return (
        <>
            <Toaster />
        <section className="bg-white dark:bg-gray-900 py-10 px-6 antialiased">
          <div className="max-w-6xl mx-auto">
            <header className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Customer Reviews
              </h2>
              <div className="flex items-center gap-2">
                {Array(Math.round(rating?.average || 0))
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {rating?.average?.toFixed(1) || "0.0"} ({rating?.count}{" "}
                  reviews)
                </span>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Review Form */}
              <form
                onSubmit={handleSubmit}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow space-y-5">
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Write Your Review
                  </h3>

                  <div className="flex mb-6 justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <label
                        key={star}
                        title={`${star} Star`}
                        className={`cursor-pointer text-3xl transition-transform hover:scale-110 ${
                          formData.rating >= star
                            ? "text-yellow-400"
                            : "text-white"
                        }`}>
                        ★
                        <input
                          type="radio"
                          value={star}
                          name="rating"
                          onChange={() =>
                            setFormData((prev) => ({ ...prev, rating: star }))
                          }
                          className="hidden"
                          
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <textarea
                  required
                  rows={4}
                  value={formData.comment}
                  placeholder="Write your review..."
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      comment: e.target.value,
                    }))
                  }
                  className="w-full rounded border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />

                {imageUrls.map((url, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={url}
                      onChange={(e) =>
                        handleImageUrlChange(index, e.target.value)
                      }
                      className="flex-1 rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100"
                    />
                    {imageUrls.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageUrlField(index)}
                        className="text-red-500 hover:underline text-sm">
                        Remove
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addImageUrlField}
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  + Add another image
                </button>

                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded transition">
                  Submit Review
                </button>

                {/* <p className="text-center text-sm text-blue-600 dark:text-blue-400">
              <a href="/user" className="hover:underline">
                Login to Post Review
              </a>
            </p> */}
              </form>

              {/* Rating Breakdown */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-5">
                  Rating Overview
                </h3>
                {[5, 4, 3, 2, 1].map((star) => {
                  const percent = [55, 25, 12, 5, 3][5 - star];
                  return (
                    <div key={star} className="flex items-center mb-3">
                      <span className="w-6 text-sm text-gray-700 dark:text-gray-300">
                        {star} ★
                      </span>
                      <div className="flex-1 mx-3 h-3 bg-gray-300 rounded-full dark:bg-gray-700 overflow-hidden">
                        <div
                          className="h-3 bg-yellow-400 rounded-full"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="w-10 text-right text-sm text-gray-500 dark:text-gray-400">
                        {percent}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </>
    );
};

export default PostReviews;
