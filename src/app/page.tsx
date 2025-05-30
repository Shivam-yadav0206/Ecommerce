"use client";

import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import HeroCarousel from "@/components/sections/HeroCarousel";
import FeaturedServices from "@/components/sections/FeaturedServices";
import CategoriesSection from "@/components/sections/CategoriesSection";
import ProductsSection from "@/components/sections/ProductsSection";
import PromoBanners from "@/components/sections/PromoBanners";
import axiosInstance from "@/api/axios";


export default function Home() {
  const [products, setProducts] = useState({ offers: [], smartPhones: [], notebooks: [] });
  
  useEffect(() => {
    const getProducts = async () => {
      const res = await axiosInstance.get("/feed")
      setProducts(res?.data)
    }
    getProducts()
  },[])

  return (
    <MainLayout>
      <HeroCarousel />
      <FeaturedServices />

      <ProductsSection
        title="Offers"
        type="offers"
        products={products?.offers}
      />
      <PromoBanners />
      <ProductsSection
        title="Notebooks"
        type="notebooks"
        products={products?.notebooks}
      />
      <ProductsSection
        title="Smartphones"
        type="smartphones"
        products={products?.smartPhones}
      />
      <PromoBanners />
      <CategoriesSection />
    </MainLayout>
  );
}