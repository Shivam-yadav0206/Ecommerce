"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";


export default function PromoBanners() {
  return (
    <section className="py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Notebooks Banner */}
          <div className="relative overflow-hidden rounded-lg h-[220px]">
            <Image
              src="https://ext.same-assets.com/1148245071/2770080375.jpeg"
              alt="Notebooks"
              height={220}
              width={80}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="p-6 md:p-8">
                <h3 className="text-white text-2xl font-bold mb-2">
                  Notebooks
                </h3>
                <p className="text-white/80 text-sm md:text-base mb-4">
                  Choose the ideal laptop for you!
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-foreground">
                  <Link href="/category/notebooks">Show more</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Desktops Banner */}
          <div className="relative overflow-hidden rounded-lg h-[220px]">
            <div className="relative w-full h-full">
              <Image
                src="https://ext.same-assets.com/2277566175/2957354709.jpeg"
                alt="Desktops"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="p-6 md:p-8">
                <h3 className="text-white text-2xl font-bold mb-2">Desktops</h3>
                <p className="text-white/80 text-sm md:text-base mb-4">
                  Build your PC at the best price!
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-foreground">
                  <Link href="/category/desktops">Show more</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
