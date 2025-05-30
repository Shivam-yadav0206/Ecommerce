"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import axiosInstance from "@/api/axios";
import { setUser, clearUser } from "@/store/userSlice";
import { setCart, clearCart } from "@/store/cartSlice";
import { setWishlistFromIds, clearWishlist } from "@/store/wishlistSlice";
import Loader from "@/components/common/Loader";

// ✅ Move this outside the component to avoid redefinition and hook warning
const protectedRoutes = [
  "/profile",
  "/cart",
  "/wishlist",
  "/routes",
  "/order",
  "/address",
  "/settings",
];

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: RootState) => state?.user?.isAuthenticated || false
  );

  const [rehydrating, setRehydrating] = useState(true);

  useEffect(() => {
    const rehydrateUser = async () => {
      try {
        const response = await axiosInstance.get("/profile/view/");
        const user = response?.data || null;

        if (user) {
          dispatch(
            setUser({
              _id: user._id,
              name: user.name,
              email: user.email,
              avatar: user.avatar,
              role: user.role,
              age: user.age,
              gender: user.gender,
              googleId: null,
              addresses: user.addresses,
            })
          );

          dispatch(
            setWishlistFromIds(
              user?.wishlist?.map(
                (item: { product: string }) => item.product
              ) || []
            )
          );

          dispatch(
            setCart(
              user?.cart?.map(
                (item: { product: string; quantity: number }) => ({
                  productId: item.product,
                  quantity: item.quantity,
                })
              ) || []
            )
          );
        } else {
          dispatch(clearUser());
          dispatch(clearCart());
          dispatch(clearWishlist());
        }
      } catch {
        dispatch(clearUser());
        dispatch(clearCart());
        dispatch(clearWishlist());
      } finally {
        setRehydrating(false);
      }
    };

    rehydrateUser();
  }, [dispatch]);

  useEffect(() => {
    if (!rehydrating) {
      const isProtected =
        protectedRoutes.includes(pathname) ||
        protectedRoutes.some((route) => pathname.startsWith(route + "/"));

      if (!isAuthenticated && isProtected) {
        router.replace("/");
      }
    }
  }, [pathname, isAuthenticated, rehydrating, router]);

  if (rehydrating) {
    return <Loader />;
  }

  return <>{children}</>;
}
