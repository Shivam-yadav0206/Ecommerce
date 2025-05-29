"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "@/api/axios";
import { setUser, clearUser } from "@/store/userSlice";
import { clearWishlist, setWishlistFromIds } from "@/store/wishlistSlice";
import { clearCart, setCart } from "@/store/cartSlice";
import { usePathname } from "next/navigation";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
