"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import MainLayout from "../layout/MainLayout";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Logo from "./Logo";
import {
  ShoppingCart,
  Heart,
  Search,
  Menu,
  User,
  X,
  LogIn,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/store/searchSlice"; 
import axiosInstance from "@/api/axios";
import { clearUser } from "@/store/userSlice";
import { clearCart } from "@/store/cartSlice";
import { clearWishlist } from "@/store/wishlistSlice";
import { useTheme } from "../layout/ThemeProvider";


type HeaderProps = {
  setLoginOpen: (open: boolean) => void;
};



export default function Header({ setLoginOpen }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const name = useSelector((state: RootState) => state?.user?.user?.name);
  const dispatch = useDispatch();
  const router = useRouter()
  const { theme, toggleTheme } = useTheme();
  const cartItem = useSelector((state: RootState) => state?.cart?.items);
  const wishItem = useSelector(
    (state: RootState) => state?.wishlist?.items
  );
  console.log("cartItems: ", cartItem)
  console.log("wishItems: ", wishItem);
  const cartItemCount = useSelector(
    (state: RootState) => state?.cart?.items?.length
  );
  const wishItemCount = useSelector(
    (state: RootState) => state?.wishlist?.items?.length
  );
  // Access isAuthenticated boolean
  const isAuthenticated = useSelector(
    (state: RootState) => state?.user?.isAuthenticated
  );

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/logout");

      dispatch(clearUser());
      dispatch(clearCart());
      dispatch(clearWishlist());
      window.location.href = "/";
    } catch (error) {
      console.log("Some Error has occured" + error.message);
    }
  };

  return (
    <MainLayout>
      <header className="bg-card shadow-sm sticky top-0 z-50">
        {/* Top Bar */}
        <div className="bg-primary/10 py-1.5 hidden md:block">
          <div className="container-custom flex justify-between items-center text-sm">
            <div>
              <a
                href="mailto:megabyte@example.com"
                className="text-muted-foreground hover:text-foreground mr-4">
                megabyte@example.com
              </a>
              <a
                href="tel:+5422841234567"
                className="text-muted-foreground hover:text-foreground">
                (+54) 2284-123456789
              </a>
            </div>
            <div className="flex gap-2 items-center">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-instagram"
                  viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-facebook"
                  viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-twitter-x"
                  viewBox="0 0 16 16">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-youtube"
                  viewBox="0 0 16 16">
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container-custom py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Sheet>
                <SheetTrigger asChild className="md:hidden mr-2">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] sm:w-[350px]">
                  <div className="py-4">
                    <Logo />
                    <nav className="mt-6">
                      {/* Mobile Navigation */}
                      <ul className="space-y-3">
                        <li>
                          <Link
                            href="/"
                            className="block py-2 hover:text-primary">
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/desktops"
                            className="block py-2 hover:text-primary">
                            Desktops
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/notebooks"
                            className="block py-2 hover:text-primary">
                            Notebooks
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/smartphones"
                            className="block py-2 hover:text-primary">
                            Smartphones
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/faq"
                            className="block py-2 hover:text-primary">
                            FAQ's
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/contact-us"
                            className="block py-2 hover:text-primary">
                            Contact Us
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
              <Logo />
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-xl mx-6">
              <div className="relative w-full">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full pr-10 rounded-full bg-muted/50"
                  onChange={(e) => {
                    dispatch(setSearchQuery(e.target.value));
                  }}
                />
                <button className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-muted-foreground">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Mobile Search Icon */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}>
                {isSearchOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </Button>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-1">
              <div className="hidden md:block">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  onClick={() => setLoginOpen(true)}>
                  <div className="flex items-center gap-1.5">
                    <User className="h-5 w-5" />
                    <span className="hidden lg:inline-block">
                      {isAuthenticated ? name : "LogIn"}
                    </span>
                  </div>
                </Button>
              </div>

              {isAuthenticated && (
                <div className="flex gap-0.5">
                  <div
                    className="hidden md:block relative group"
                    onMouseLeave={() => {}}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-0.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-700">
                      {/* <span className="hidden lg:inline-block">{name}</span> */}
                      <ChevronDown className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
                    </Button>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-gray-700 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="py-1">
                        {/* Profile */}
                        <Link
                          //onClick={() => handleMenuItemClick("profile")}
                          href={"/profile"}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          <User className="h-4 w-4 mr-3" />
                          Profile
                        </Link>

                        {/* Cart */}
                        <Link
                          href={"/cart"}
                          // onClick={() => handleMenuItemClick("cart")}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          <ShoppingCart className="h-4 w-4 mr-3" />
                          Cart
                        </Link>

                        {/* Wishlist */}
                        <Link
                          href={"/wishlist"}
                          //onClick={() => handleMenuItemClick("wishlist")}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          <Heart className="h-4 w-4 mr-3" />
                          Wishlist
                        </Link>

                        {/* Divider */}
                        <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>

                        {/* Logout */}
                        <button
                          onClick={() => handleLogout()}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                          <LogOut className="h-4 w-4 mr-3" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Button variant="ghost" size="icon" asChild>
                  <button
                    onClick={() => {
                      if (isAuthenticated) {
                        router.push("/wishlist");
                      } else {
                        setLoginOpen(true);
                      }
                    }}
                    className="relative flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-sky-400/70 transition-colors">
                    <Heart className="h-4 w-4 " />
                    <span className="absolute -top-1 -right-1 bg-primary text-xs text-primary-foreground w-4 h-4 flex items-center justify-center rounded-full">
                      {typeof wishItemCount === "number" ? wishItemCount : 0}
                    </span>
                  </button>
                </Button>
              </div>
              <div>
                <Button variant="ghost" size="icon" asChild>
                  <button
                    onClick={() => {
                      if (isAuthenticated) {
                        router.push("/cart");
                      } else {
                        setLoginOpen(true);
                      }
                    }}
                    className="relative flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-sky-400/70 transition-colors">
                    <ShoppingCart className="h-4 w-4 " />
                    <span className="absolute -top-1 -right-1 bg-primary text-xs text-primary-foreground w-4 h-4 flex items-center justify-center rounded-full">
                      {typeof cartItemCount === "number" ? cartItemCount : 0}
                    </span>
                  </button>
                </Button>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                className="font-medium text-gray-800 dark:text-neutral-200 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-800 focus:outline-none">
                <span className="group inline-flex justify-center items-center w-9 h-9">
                  {theme === "light" ? (
                    // Moon icon for switching to dark
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                    </svg>
                  ) : (
                    // Sun icon for switching to light
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2" />
                      <path d="M12 20v2" />
                      <path d="m4.93 4.93 1.41 1.41" />
                      <path d="m17.66 17.66 1.41 1.41" />
                      <path d="M2 12h2" />
                      <path d="M20 12h2" />
                      <path d="m6.34 17.66-1.41 1.41" />
                      <path d="m19.07 4.93-1.41 1.41" />
                    </svg>
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Search (Expanded) */}
          {isSearchOpen && (
            <div className="mt-3 md:hidden">
              <div className="relative w-full">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full pr-10 rounded-full bg-muted/50"
                />
                <button className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-muted-foreground">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="bg-primary/5 border-t border-b border-border hidden md:block">
          <div className="container-custom">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-3 gap-6 p-6 w-[800px]">
                      <div>
                        <h3 className="text-sm font-medium mb-2">
                          PC Components
                        </h3>
                        <ul className="space-y-1.5">
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Motherboards
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Processors
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              RAM Memory
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Video Cards
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Power Supplies
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Hard Drives
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              SSD Disk
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Computer Cases
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">
                          Peripherals
                        </h3>
                        <ul className="space-y-1.5">
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Keyboards
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Mice
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Microphones
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Webcams
                            </Link>
                          </li>
                        </ul>

                        <h3 className="text-sm font-medium mt-4 mb-2">
                          Computers
                        </h3>
                        <ul className="space-y-1.5">
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Desktops
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Notebooks
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Gaming</h3>
                        <ul className="space-y-1.5">
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Consoles
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Games
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Accessories
                            </Link>
                          </li>
                        </ul>

                        <h3 className="text-sm font-medium mt-4 mb-2">
                          Software
                        </h3>
                        <ul className="space-y-1.5">
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Operating Systems
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Office Packages
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Antivirus
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    Pages
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-3 gap-6 p-6 w-[700px]">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Main Pages</h3>
                        <ul className="space-y-1.5">
                          <li>
                            <Link
                              href="/about-us"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              About Us
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/wishlist"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Wishlist
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/shopping-cart"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Shopping Cart
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/product-details"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Product Details
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/checkout"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Checkout
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">
                          Account Pages
                        </h3>
                        <ul className="space-y-1.5">
                          <li>
                            <Link
                              href="/my-account"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              My Account
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/login"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Login
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/sign-up"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Sign Up
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/forgot-password"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Forgot Password
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">
                          Support & Policy
                        </h3>
                        <ul className="space-y-1.5">
                          <li>
                            <Link
                              href="/error404"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Error 404
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/privacy-policy"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Privacy Policy
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/terms-and-conditions"
                              className="text-sm text-muted-foreground hover:text-foreground">
                              Terms & Conditions
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/desktops" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}>
                      Desktops
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/notebooks" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}>
                      Notebooks
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/smartphones" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}>
                      Smartphones
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/faq" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}>
                      FAQ's
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contact-us" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}>
                      Contact Us
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </nav>
      </header>
    </MainLayout>
  );
}
