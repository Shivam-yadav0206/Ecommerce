"use client";

import Link from "next/link";
import SectionHeading from "@/components/ui/section-heading";

const categories = [
  { name: "Video Cards", href: "/category/video-cards" },
  { name: "Power Supplies", href: "/category/power-supplies" },
  { name: "Motherboard", href: "/category/motherboard" },
  { name: "Processors", href: "/category/processors" },
  { name: "Memory Ram", href: "/category/memory-ram" },
  { name: "Hard Drives", href: "/category/hard-drives" },
  { name: "SSD", href: "/category/ssd" },
  { name: "Cases", href: "/category/cases" },
  { name: "Keyboards", href: "/category/keyboards" },
  { name: "Mice", href: "/category/mice" },
  { name: "Monitors", href: "/category/monitors" },
  { name: "Printers", href: "/category/printers" },
  { name: "Notebooks", href: "/category/notebooks" },
  { name: "Phones", href: "/category/phones" },
  { name: "Tablets", href: "/category/tablets" },
  { name: "Consoles", href: "/category/consoles" },
];

export default function CategoriesSection() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container-custom">
        <SectionHeading title="Categories" />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category?.href}
              className="bg-card hover:bg-primary/5 border border-border/40 p-4 rounded-md transition-colors text-center flex items-center justify-center h-16"
            >
              <span className="font-medium">{category?.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
