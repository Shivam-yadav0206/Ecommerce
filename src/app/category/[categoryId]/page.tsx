"use client";

import axiosInstance from "@/api/axios";
import MainLayout from "@/components/layout/MainLayout";
import ProductCard from "@/components/ui/product-card";
import SectionHeading from "@/components/ui/section-heading";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ProductProps {
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


export default function CategoryPage() {
  const catId = useParams()?.categoryId;
  const [products, setProducts] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState({name: "", description : ""})
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axiosInstance.get(`/feed/${catId}`);
        setProducts(res?.data?.data);
        setCategoryDetails(res?.data?.category)
        // console.log(res?.data)
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [catId]);
  return (
    <MainLayout>
      <section className="py-12">
        <div className="container-custom">
          <SectionHeading title={categoryDetails?.name} subtitle={categoryDetails?.description} />
          <div>
            {products && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product: ProductProps) => (
                  <div key={product._id}>
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>
            ) : (
              <div>No products found.</div>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
