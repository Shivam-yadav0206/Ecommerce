"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image: "https://ext.same-assets.com/832677302/3598787251.jpeg",
    title: "INTRODUCING INTEL 10TH GEN",
    subtitle: "Powerful processors for your gaming and productivity needs",
    link: "/category/processors",
  },
  {
    id: 2,
    image: "https://ext.same-assets.com/2225228698/4194161654.jpeg",
    title: "ARMED PC GAMER",
    subtitle: "Choose your PC and play!",
    link: "/category/gaming",
    ctaText: "Shop now",
  },
  {
    id: 3,
    image: "https://ext.same-assets.com/3186231500/4042552187.jpeg",
    title: "THE LATEST SMARTPHONES",
    subtitle: "Find the perfect smartphone for your needs",
    link: "/category/smartphones",
  },
];

export default function HeroCarousel() {
  return (
    
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative overflow-hidden min-h-[320px] md:min-h-[480px]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill // makes image cover the parent container, like absolute inset-0 w-full h-full
                  style={{ objectFit: "cover" }}
                  priority // optional, if you want this image to be preloaded for better LCP
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                  <div className="container-custom">
                    <div className="max-w-xl text-white px-4 md:px-0">
                      <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
                        {slide.title}
                      </h1>
                      <p className="text-white/80 text-lg md:text-xl mb-6">
                        {slide.subtitle}
                      </p>
                      {slide.ctaText && (
                        <Button
                          asChild
                          size="lg"
                          className="rounded-none bg-primary hover:bg-primary/90">
                          <Link href={slide.link}>{slide.ctaText}</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>

      {/* Carousel indicators */}
      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className="w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white/70"
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
