"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Trash2, Edit } from "lucide-react";
import type { RootState } from "../../store/store";
import axiosInstance from "@/api/axios";
import { toast, Toaster } from "sonner";

const Reviews = ({ reviews }) => {
  const userId = useSelector((state: RootState) => state?.user?.user?._id);

  const [editingReview, setEditingReview] = useState(null);
  const [editForm, setEditForm] = useState({
    rating: 5,
    comment: "",
    imageUrl: [""],
  });

  const handleDelete = async (reviewId) => {
    try {
      await axiosInstance.post("/review/delete", { reviewId });
      toast.success("Review deleted");
      // Reload or refetch reviews here if needed
    } catch (error) {
      toast.error("Some error occurred");
      console.error(error.message);
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review._id);
    setEditForm({
      rating: review.rating,
      comment: review.comment,
      imageUrl: review.imageUrl || [],
    });
  };

  const submitEdit = async () => {
    try {
      await axiosInstance.post("/review/edit", {
        reviewId: editingReview,
        ...editForm,
      });
      toast.success("Review updated");
      setEditingReview(null);
      // Reload or update local state here if needed
    } catch (err) {
      toast.error("Failed to update review");
      console.error(err);
    }
  };

  return (
    <>
      <Toaster />
      <section className="bg-white dark:bg-gray-900 py-12 md:py-20 antialiased">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 2xl:px-0">
          <div className="space-y-8">
            {reviews?.map((review) => (
              <div
                key={review._id}
                className="flex flex-col sm:flex-row gap-6 sm:gap-8 p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 shadow-sm hover:scale-[1.02] hover:shadow-lg transition-transform duration-300 ease-in-out">
                {/* Left Panel */}
                <div className="flex-shrink-0 w-full sm:w-48 md:w-64 flex flex-col items-start space-y-4">
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 text-yellow-400 dark:text-yellow-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>
                    ))}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white truncate max-w-[15rem]">
                      {review.user?.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(review.createdAt).toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 font-medium">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                      />
                    </svg>
                    <span>Verified purchase</span>
                  </div>
                </div>

                {/* Right Side Content */}
                <div className="flex-1 flex flex-col justify-between space-y-6">
                  {/* Edit/Delete Icons */}
                  {userId === review.user?._id && (
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(review)}
                        className="text-sky-500 hover:text-sky-700 transition"
                        title="Edit your review">
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Delete your review">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  )}

                  {/* Editable or Static Comment */}
                  {editingReview === review._id ? (
                    <div className="space-y-3">
                      <textarea
                        className="w-full p-2 border rounded-md text-black"
                        value={editForm.comment}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            comment: e.target.value,
                          }))
                        }
                      />
                      <input
                        type="number"
                        min={1}
                        max={5}
                        className="p-2 border rounded-md w-20 text-black"
                        value={editForm.rating}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            rating: Number(e.target.value),
                          }))
                        }
                      />
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md text-black"
                        placeholder="Image URLs (comma-separated)"
                        value={editForm.imageUrl.join(", ")}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            imageUrl: e.target.value
                              .split(",")
                              .map((url) => url.trim()),
                          }))
                        }
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={submitEdit}
                          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                          Save
                        </button>
                        <button
                          onClick={() => setEditingReview(null)}
                          className="px-4 py-1 bg-gray-500 text-white rounded hover:bg-gray-600">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                      {review.comment}
                    </p>
                  )}

                  {/* Images */}
                  {review.imageUrl && review.imageUrl.length > 0 && (
                    <div className="flex gap-4 overflow-x-auto no-scrollbar max-w-full">
                      {review.imageUrl.map((src, i) => (
                        <div
                          key={i}
                          className="relative h-28 w-28 rounded-lg overflow-hidden flex-shrink-0 shadow-md hover:scale-105 transition-transform duration-300">
                          <Image
                            src={src}
                            alt={`Review image ${i + 1}`}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Reviews;
