"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { getClosestTailwindClass } from "@/lib/utils";
import { fallbackImage } from "@/lib/utils";
import { useDispatch } from "react-redux";
import axiosInstance from "@/api/axios";
import { addItem } from "@/store/cartSlice";
import { addToWishlist } from "@/store/wishlistSlice";

export interface ProductProps {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageSrc: string;
  category: string;
  inStock?: boolean;
  discount?: number;
  color?: string;
  sizes?: string[];
  imageUrls?: string[];
  rating?: {
    average: number;
    count: number;
  };
  specs?: Record<string, string>;
}

export default function ProductCard({
  _id,
  name,
  description,
  price,
  rating,
  imageUrls,
  category,
  inStock = true,
  
  specs ,
  sizes = [],
}: ProductProps) {
  const discount = Math.floor(Math.random() * 30) + 1;
  const colorsArray = specs?.color?.split(",");
  const sizeArray = specs?.size?.split(",");
  const oldPrice = price / (1 - discount / 100);
  const dispatch = useDispatch()
 // console.log(color);

  // console.log(colorsArray)
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const handleAddCart = async () => {
    try {
      const res = await axiosInstance.post("/cart/addItem", {
        itemId: _id,
        newQuantity: 1,
      });
      dispatch(addItem({productId: _id,
      quantity: 1,
      details: {
        _id,
        name,
        rating,
        specs,
        price,
        stock: 13,
        imageUrls
      }
    }))
    } catch (error) {
      console.log(error.message)
    }
  }
  const handleAddWishlist = async () => {
    try {
      const res = await axiosInstance.post("/wish/additem", {
        itemId: _id,
      });
      dispatch(
        addToWishlist({
            _id,
            name,
            rating,
            specs,
            price,
            stock: 13,
            imageUrls,
          })
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Card className="group overflow-hidden border border-border/40 h-full flex flex-col">
      <div className="relative">
        {/* Discount Badge */}
        {discount && (
          <Badge className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground">
            {discount}% Off
          </Badge>
        )}

        {/* In Stock Badge */}
        {inStock && (
          <Badge className="absolute top-2 right-2 z-10 bg-success text-success-foreground lowercase">
            instock
          </Badge>
        )}

        {/* Product Image */}
        <div className="overflow-hidden relative aspect-[4/3]">
          <Image
            src={
              Array.isArray(imageUrls) && imageUrls[0]
                ? imageUrls[0]
                : fallbackImage
            }
            alt={name}
            width={100}
            height={100}
            className="object-cover w-full h-full transition-transform duration-300 "
          />

          {/* Quick Action Buttons - Show on Hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button
              onClick={handleAddWishlist}
              size="icon"
              variant="secondary"
              className="rounded-full">
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleAddCart}
              size="icon"
              variant="secondary"
              className="rounded-full">
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full"
              asChild>
              <Link href={`/view/${_id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="pt-4 flex-grow">
        {/* Star Rating */}
        <div className="flex mb-1.5">
          {[...Array(5)].map((_, i) => {
            const full = i < Math.floor(rating?.average);
            const half =
              i < rating?.average && i >= Math.floor(rating?.average);

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
          {
            <p className="text-xs text-black ml-1">
              {" "}
              ({rating?.count} Ratings)
            </p>
          }
        </div>

        {/* Product Title */}
        <Link href={`/view/${_id}`} className="block">
          <h3 className="font-medium mb-1.5 hover:text-primary transition-colors text-sm md:text-base">
            {name}
          </h3>
        </Link>

        {/* Product Description - Short Version */}
        <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
          {description}
        </p>

        {/* Color Options */}
        {colorsArray?.length > 0 && (
          <div className="mb-2">
            <div className="flex gap-1 mt-1">
              {colorsArray?.map((color) => (
                <button
                  key={color}
                  className={`w-5 h-5 rounded-full ${getClosestTailwindClass(
                    color
                  )}  ${
                    selectedColor === color
                      ? "ring-2 ring-primary ring-offset-2"
                      : ""
                  }`}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Size Options */}
        {sizes?.length > 0 && (
          <div className="mb-2">
            <div className="flex flex-wrap gap-1 mt-1">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`py-0.5 px-2 text-xs border rounded-md ${
                    selectedSize === size
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border bg-background"
                  }`}
                  onClick={() => setSelectedSize(size)}>
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex-row-reverse justify-between items-center pt-0 pb-4">
        {/* Price */}
        <div className="text-right">
          <div className="font-semibold text-base md:text-lg">
            ${price?.toFixed(2)}
          </div>
          {oldPrice && (
            <div className="text-muted-foreground line-through text-xs">
              ${oldPrice?.toFixed(2)}
            </div>
          )}
        </div>

        {/* View Details Button */}
        <Button variant="outline" size="sm" asChild>
          <Link href={`/view/${_id}`}>View details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
