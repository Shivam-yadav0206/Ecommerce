"use client";

import { ProductProps } from "@/components/ui/product-card";
import ProductCard from "@/components/ui/product-card";
import SectionHeading from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "../ui/navigator-buttons";
import Image from "next/image";

interface ProductsSectionProps {
  title: string;
  subtitle?: string;
  type: "offers" | "notebooks" | "smartphones";
  products: ProductProps[];
  // loading: boolean;
}

export default function ProductsSection({
  title,
  subtitle,
  type,
  products,
}: ProductsSectionProps) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const renderProductsSlider = (
    productList = products,
    sliderSettings = settings
  ) => (
    <Slider {...sliderSettings}>
      {productList?.map((product) => (
        <div key={product?._id} className="p-2">
          <ProductCard {...product} />
        </div>
      ))}
    </Slider>
  );
  const categorySliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };
  

  const renderOffersSection = () => (
    <div className="mt-8 px-4 relative group">{renderProductsSlider()}</div>
  );

  const renderCategorySection = () => {
    const bannerImage =
      type === "notebooks"
        ? "https://ext.same-assets.com/1178165585/1373120662.jpeg"
        : "https://ext.same-assets.com/2534487281/3694175178.jpeg";

    const bannerTitle = type === "notebooks" ? "Notebooks" : "Smartphones";
    const bannerSubtitle =
      type === "notebooks"
        ? "Choose your laptop now!"
        : "Choose your smartphone now!";

    return (
      <div className="mt-8">
        <div className="mb-8 relative overflow-hidden rounded-lg">
          <div className="relative w-full h-[200px]">
            <Image
              src={bannerImage}
              alt={bannerTitle}
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
            <div className="px-8">
              <h3 className="text-white text-2xl font-bold mb-2">
                {bannerTitle}
              </h3>
              <p className="text-white/80 mb-4">{bannerSubtitle}</p>
              <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 text-sm">
                Show more
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6 px-4">
          {/* Left Banner Card */}
          <div className="w-[24%] hidden sm:block">
            <Card className="group overflow-hidden border border-border/40 h-full flex flex-col rounded-r-none">
              <div className="relative w-full h-full overflow-hidden group">
                <div className="relative w-full h-full">
                  <Image
                    src={
                      type === "notebooks"
                        ? "https://media.istockphoto.com/id/490393916/photo/business-mans-hands-typing-on-laptop.jpg?s=612x612&w=0&k=20&c=gPEKowVP8_m96akpOTj9878HqvRO7w1xLrp60kkn6nA="
                        : "https://images.pexels.com/photos/1786433/pexels-photo-1786433.jpeg"
                    }
                    alt="Banner"
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                  <div className="p-6 md:p-8">
                    <h3 className="text-white text-2xl font-bold mb-2">
                      {title}
                    </h3>
                    <p className="text-white/80 text-sm md:text-base mb-4">
                      {`Choose the ideal ${title} for you!`}
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="bg-transparent border-white text-white hover:bg-white hover:text-foreground">
                      <Link href={`/category/${type}`}>Show more</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Product Slider */}
          <div className="w-[76%] relative group">
            {renderProductsSlider(products, categorySliderSettings)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-12">
      <div className="container-custom">
        <SectionHeading title={title} subtitle={subtitle} />
        {type === "offers" ? renderOffersSection() : renderCategorySection()}
      </div>
    </section>
  );
}
