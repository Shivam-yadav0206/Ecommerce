"use client";

import Link from "next/link";
import { useTheme } from "next-themes";

interface LogoProps {
  variant?: "default" | "footer";
}

export default function Logo({ variant = "default" }: LogoProps) {
  const { theme } = useTheme() ?? { theme: "light" };

  // Use different logo based on the placement and theme
  const logoUrl = variant === "footer"
    ? "https://ext.same-assets.com/2765702815/750713228.png"  // Footer logo
    : "https://ext.same-assets.com/4183427180/52350043.png";  // Header logo

  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex items-center">
        <span className="bg-primary text-primary-foreground text-xs px-1.5 py-1 font-semibold">MB</span>
        <span className="font-semibold text-xl text-foreground">Megabyte</span>
      </div>
    </Link>
  );
}
