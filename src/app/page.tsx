// app/page.tsx or components/pages/Home.tsx
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeed } from "@/store/feedSlice";
import { RootState, AppDispatch } from "../store/store";
import MainLayout from "@/components/layout/MainLayout";
import HeroCarousel from "@/components/sections/HeroCarousel";
import FeaturedServices from "@/components/sections/FeaturedServices";
import CategoriesSection from "@/components/sections/CategoriesSection";
import ProductsSection from "@/components/sections/ProductsSection";
import PromoBanners from "@/components/sections/PromoBanners";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const { offers, smartPhones, notebooks, loading, error } = useSelector(
    (state: RootState) => state.feed
  );

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  return (
    <MainLayout>
      <HeroCarousel />
      <FeaturedServices />

      <ProductsSection
        title="Offers"
        type="offers"
        products={offers}
        loading={loading}
      />
      <PromoBanners />
      <ProductsSection
        title="Notebooks"
        type="notebooks"
        products={notebooks}
        loading={loading}
      />
      <ProductsSection
        title="Smartphones"
        type="smartphones"
        products={smartPhones}
        loading={loading}
      />
      <PromoBanners />
      <CategoriesSection />
    </MainLayout>
  );
}
