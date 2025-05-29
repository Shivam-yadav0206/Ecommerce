"use client";

import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import HeroCarousel from "@/components/sections/HeroCarousel";
import FeaturedServices from "@/components/sections/FeaturedServices";
import ProductsSection from "@/components/sections/ProductsSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import PromoBanners from "@/components/sections/PromoBanners";
import axiosInstance from "@/api/axios";
import { Input } from "@/components/ui/input";
import SectionHeading from "@/components/ui/section-heading";
import { ProductProps } from "@/components/ui/product-card";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function Home() {
  const [products, setProducts] = useState({
    offers: [],
    smartPhones: [],
    notebooks: [],
  });
  

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axiosInstance.get("/feed");
  //       setProducts(res.data);
  //     } catch (error) {
  //       console.error("Error fetching products:", error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);


  // const query = useSelector((state: RootState) => state?.search?.query);
  // const [filteredOffers, setFilteredOffers] = useState<ProductProps[]>([]);
  // const [filteredNotebooks, setFilteredNotebooks] = useState<ProductProps[]>(
  //   []
  // );
  // const [filteredSmartPhones, setFilteredSmartPhones] = useState<
  //   ProductProps[]
  // >([]);
  // useEffect(() => {
  //   if (!query) {
  //     // Clear filtered results on empty query
  //     setFilteredOffers([]);
  //     setFilteredNotebooks([]);
  //     setFilteredSmartPhones([]);
  //     return;
  //   }

  //   const lowerQuery = query.toLowerCase();

  //   const filterProducts = (list: ProductProps[]) =>
  //     list.filter((product) => {
  //       const nameMatch = product.name?.toLowerCase().includes(lowerQuery);
  //       const descMatch = product.description
  //         ?.toLowerCase()
  //         .includes(lowerQuery);
  //       const tagsMatch = product.tags?.some((tag) =>
  //         tag.toLowerCase().includes(lowerQuery)
  //       );
  //       return nameMatch || descMatch || tagsMatch;
  //     });

  //   setFilteredOffers(filterProducts(products.offers));
  //   setFilteredNotebooks(filterProducts(products.notebooks));
  //   setFilteredSmartPhones(filterProducts(products.smartPhones));
  // }, [query, products]);

  return (
    <MainLayout>
      <HeroCarousel />
      <FeaturedServices />

      {/* Offers Section */}
      <ProductsSection
        title="Offers"
        type="offers"
        products={products.offers}
      />

      {/* Promo Banners */}
      <PromoBanners />

      {/* Notebooks Section */}
      <ProductsSection
        title="Notebooks"
        type="notebooks"
        products={products?.notebooks}
      />

      {/* Smartphones Section */}
      <ProductsSection
        title="Smartphones"
        type="smartphones"
        products={products?.smartPhones}
      />

      <CategoriesSection />
    </MainLayout>
  );
}
