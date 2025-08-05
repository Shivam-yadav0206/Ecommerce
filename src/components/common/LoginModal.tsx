"use client";
import { useState, useEffect } from "react";
import { Lock, User, Mail, Eye, EyeOff } from "lucide-react";
import axiosInstance from "@/api/axios";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../../store/userSlice";
import { setWishlistFromIds } from "@/store/wishlistSlice";
import { setCart } from "@/store/cartSlice";
import { Toaster, toast } from "sonner";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const initialCredentials = {
  name: "",
  email: "testthree@gmail.com",
  password: "Pass@0000",
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [credentials, setCredentials] = useState(initialCredentials);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/login", {
        email: credentials.email,
        password: credentials.password,
      });

      // Check for success (usually HTTP 200) and required user data presence
      if (response.status === 200 && response.data?._id) {
        toast.success(`Welcome back ${response.data.name}`);
        dispatch(
          setUser({
            _id: response.data._id,
            name: response.data.name,
            email: response.data.email,
            avatar: response.data.avatar,
            role: response.data.role,
            age: response.data.age,
            gender: response.data.gender,
            googleId: null,
            addresses: response.data.addresses
          })
        );
        
        // ✅ Fixing wishlist mapping
        dispatch(
          setWishlistFromIds(
            response?.data?.wishlist?.map(
              (item: { product: string }) => item.product
            ) || []
          )
        );

        // ✅ Fixing cart mapping
        dispatch(
          setCart(
            response?.data?.cart?.map(
              (item: { product: string; quantity: number }) => ({
                productId: item.product,
                quantity: item.quantity,
              })
            ) || []
          )
        );
      } else {
        // Login failed: maybe notify user or clear auth state
        dispatch(clearUser());
      }
      setIsLoading(false);
      onClose()
    } catch (error) {
      // API error or network issue: clear auth state or notify user
      dispatch(clearUser());
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/signup", {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      });

      // Check for success (usually HTTP 200) and required user data presence
      if (response.status === 201 && response.data?._id) {
        toast.success("New account created ✅💛");
      } else {
        // Login failed: maybe notify user or clear auth state
      }
      setIsLoading(false);
    } catch (error) {
      // API error or network issue: clear auth state or notify user
      toast.error("Some Error occurred");
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flex flex-col items-center">
      <Toaster />

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
          <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg relative w-full max-w-md overflow-hidden">
            {/* Close button */}
            <button
              onClick={() => {
                onClose();
                setCredentials(initialCredentials);
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 z-10">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 1L1 15M1 1L15 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Background design */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-bl-full opacity-10" />

            {/* Content */}
            <div className="p-6 pt-10">
              <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-1">
                {isLoginTab ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-sm text-center text-gray-500 mb-6">
                {isLoginTab
                  ? "Sign in to your account"
                  : "Register a new account"}
              </p>

              {/* Tabs */}
              <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1 mb-6">
                <button
                  onClick={() => {
                    setIsLoginTab(true);
                    setCredentials(initialCredentials);
                  }}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
                    isLoginTab
                      ? "bg-white dark:bg-gray-800 shadow text-blue-600"
                      : "text-gray-500 hover:text-gray-800"
                  }`}>
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsLoginTab(false);
                    setCredentials(initialCredentials);
                  }}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
                    !isLoginTab
                      ? "bg-white dark:bg-gray-800 shadow text-blue-600"
                      : "text-gray-500 hover:text-gray-800"
                  }`}>
                  Register
                </button>
              </div>

              {/* Form */}
              <div className="flex flex-col gap-4 mt-2">
                {/* Username/Email */}
                {!isLoginTab && (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={credentials?.name}
                      onChange={(e) =>
                        setCredentials((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Name"
                    />
                  </div>
                )}

                {/* Email for Register */}

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={credentials.email}
                    onChange={(e) =>
                      setCredentials((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Email Address"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={credentials?.password} // ← This is the missing piece
                    onChange={(e) =>
                      setCredentials((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-800">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Remember Me + Forgot Password */}
                {isLoginTab && (
                  <div className="flex items-center justify-between mt-1">
                    <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        className="mr-2 w-4 h-4"
                      />
                      Remember me
                    </label>
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:underline dark:text-blue-500">
                      Forgot Password?
                    </a>
                  </div>
                )}

                {/* Submit */}
                <button
                  onClick={() => (isLoginTab ? handleSignIn() : handleSignUp())}
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition w-full flex items-center justify-center">
                  {isLoginTab ? "Sign In" : "Sign Up"}
                  {isLoading && (
                    <svg
                      aria-hidden={true}
                      role="status"
                      className="ml-1 inline w-5 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                </button>

                {/* Social Login */}
                <div className="mt-4">
                  <div className="relative flex items-center justify-center">
                    <hr className="w-full border-gray-300" />
                    <span className="absolute bg-white dark:bg-gray-800 px-2 text-sm text-gray-500">
                      or continue with
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {["G", "F", "X"].map((icon, idx) => {
                      const isDisabled = icon === "F" || icon === "X"; // disable F and X
                      return (
                        <button
                          key={idx}
                          disabled={isDisabled}
                          className={`flex justify-center items-center py-2 px-4 border rounded-lg transition 
          ${
            isDisabled
              ? "border-gray-300 bg-gray-200 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600"
              : "border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white"
          }`}>
                          {icon}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Close Button */}
            <div className="px-6 pb-6">
              <button
                onClick={onClose}
                className="mt-4 text-sm text-gray-500 hover:text-gray-700 underline w-full text-center">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// "use client";
// import { useEffect, useState } from "react";

// interface LoginModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
//   const [isLoginTab, setIsLoginTab] = useState(true);

//   useEffect(() => {
//     const handleEsc = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };
//     if (isOpen) document.addEventListener("keydown", handleEsc);
//     return () => document.removeEventListener("keydown", handleEsc);
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
//       <div
//         className={`bg-white dark:bg-gray-800 shadow-lg rounded-xl relative w-full max-w-md transition-all duration-300 ease-in-out ${
//           isLoginTab ? "py-8" : "py-12"
//         } px-6`}>
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl">
//           ✕
//         </button>

//         {/* Tabs */}
//         <div className="flex justify-center mb-4 mt-4">
//           <button
//             onClick={() => setIsLoginTab(true)}
//             className={`px-4 py-1 text-sm font-medium ${
//               isLoginTab
//                 ? "border-b-2 border-gray-900 text-gray-900"
//                 : "text-gray-500"
//             }`}>
//             Login
//           </button>
//           <button
//             onClick={() => setIsLoginTab(false)}
//             className={`px-4 py-1 text-sm font-medium ${
//               !isLoginTab
//                 ? "border-b-2 border-gray-900 text-gray-900"
//                 : "text-gray-500"
//             }`}>
//             Signup
//           </button>
//         </div>

//         {/* Form */}
//         <form className="flex flex-col gap-4 mt-2">
//           <input
//             type="text"
//             id="username"
//             className="bg-gray-100 rounded px-3 py-2 text-sm focus:outline-none"
//             placeholder="Username"
//           />

//           {!isLoginTab && (
//             <input
//               type="email"
//               id="email"
//               className="bg-gray-100 rounded px-3 py-2 text-sm focus:outline-none"
//               placeholder="Email"
//             />
//           )}

//           <input
//             type="password"
//             id="password"
//             className="bg-gray-100 rounded px-3 py-2 text-sm focus:outline-none"
//             placeholder="Password"
//           />

//           <button
//             type="submit"
//             className="bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium py-2 rounded transition">
//             {isLoginTab ? "Login" : "Signup"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
