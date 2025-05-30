import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fallbackImage =
  "https://cdn.shopify.com/s/files/1/0070/7032/articles/ecommerce_20tools_a767d3aa-6d44-4784-9703-0f7cf69ecd5a.png?v=1738869114";

type TailwindColorClass = {
  name: string;
  hex: string;
};

const tailwindColors: TailwindColorClass[] = [
  { name: "bg-red-500", hex: "#ef4444" },
  { name: "bg-blue-500", hex: "#3b82f6" },
  { name: "bg-green-500", hex: "#22c55e" },
  { name: "bg-yellow-500", hex: "#eab308" },
  { name: "bg-purple-500", hex: "#a855f7" },
  { name: "bg-pink-500", hex: "#ec4899" },
  { name: "bg-orange-500", hex: "#f97316" },
  { name: "bg-gray-500", hex: "#6b7280" },
  { name: "bg-black", hex: "#000000" },
  { name: "bg-white", hex: "#ffffff" },
];

function hexToRgb(hex: string) {
  const parsed = hex.replace("#", "");
  const bigint = parseInt(parsed, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function colorDistance(c1: any, c2: any) {
  return Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
      Math.pow(c1.g - c2.g, 2) +
      Math.pow(c1.b - c2.b, 2)
  );
}

export function getClosestTailwindClass(hex: string): string {
  const inputRgb = hexToRgb(hex);

  let closest = tailwindColors[0];
  let minDistance = Number.MAX_VALUE;

  for (const color of tailwindColors) {
    const rgb = hexToRgb(color.hex);
    const distance = colorDistance(inputRgb, rgb);
    if (distance < minDistance) {
      minDistance = distance;
      closest = color;
    }
  }

  return closest.name;
}
