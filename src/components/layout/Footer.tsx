"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Logo from "./Logo";
import { MapPin, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";


const brandLogos = [
  { url: "https://ext.same-assets.com/1954587930/1557121987.png", alt: "Asrock" },
  { url: "https://ext.same-assets.com/1018560572/401035809.png", alt: "Corsair" },
  { url: "https://ext.same-assets.com/1467283983/3554802169.png", alt: "Gigabyte" },
  { url: "https://ext.same-assets.com/975375463/4068892167.png", alt: "Intel" },
  { url: "https://ext.same-assets.com/1265897054/4217844827.png", alt: "Lenovo" },
  { url: "https://ext.same-assets.com/1154162898/2410726660.png", alt: "MSI" },
  { url: "https://ext.same-assets.com/3288220579/2258478668.png", alt: "Philips" },
  { url: "https://ext.same-assets.com/612650228/3476689122.png", alt: "Samsung" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1c2a3e] text-white">
      {/* Brand Logos */}
      <div className="container-custom py-8">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-6 items-center">
          {brandLogos.map((brand, index) => (
            <div key={index} className="flex justify-center">
              <Image
                src={brand.url}
                alt={brand.alt}
                height={32} // match your h-8 class (8 * 4px = 32px)
                width={50}
                className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                priority={index < 4} // optionally preload first few images for faster LCP
              />
            </div>
          ))}
        </div>
      </div>

      <Separator className="opacity-10" />

      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Company Info */}
          <div className="md:col-span-4">
            <div className="flex flex-col gap-4">
              <Logo variant="footer" />
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <Mail size={18} className="mt-0.5 text-primary/80" />
                <a
                  href="mailto:megabyte@example.com"
                  className="hover:text-primary">
                  megabyte@example.com
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <Phone size={18} className="mt-0.5 text-primary/80" />
                <a href="tel:+5422841234567" className="hover:text-primary">
                  (+54) 2284-123456789
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <MapPin size={18} className="mt-0.5 text-primary/80" />
                <span>Colon 1234, Olavarra</span>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div className="md:col-span-3">
            <h4 className="font-semibold text-white mb-4">Useful Links</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/new-products" className="hover:text-primary">
                  New Products
                </Link>
              </li>
              <li>
                <Link href="/best-sales" className="hover:text-primary">
                  Best Sales
                </Link>
              </li>
              <li>
                <Link href="/secure-payment" className="hover:text-primary">
                  Secure Payment
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="hover:text-primary">
                  Delivery
                </Link>
              </li>
              <li>
                <Link href="/legal-notice" className="hover:text-primary">
                  Legal Notice
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/stores" className="hover:text-primary">
                  Stores
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-5">
            <h4 className="font-semibold text-white mb-4">
              Be the first to know it
            </h4>
            <p className="text-sm text-slate-300 mb-4">
              Subscribe to receive updates on our store and special offers
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border-white/10 text-white focus-visible:ring-primary"
              />
              <Button type="submit" variant="secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-send"
                  viewBox="0 0 16 16">
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                </svg>
              </Button>
            </div>

            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="bg-white/10 hover:bg-primary w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-instagram"
                  viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                </svg>
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-primary w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-facebook"
                  viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-primary w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-twitter-x"
                  viewBox="0 0 16 16">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Separator className="opacity-10" />

      {/* Copyright */}
      <div className="container-custom py-4 text-center text-sm text-slate-400">
        <p>© 2025 Megabyte. All rights reserved</p>
      </div>
    </footer>
  );
}
