"use client";

import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
//import { Trash2, Plus, Search, Filter } from "lucide-react";
import axiosInstance from "@/api/axios";
import { useDispatch } from "react-redux";
//import { updateCartItemDetails } from "@/store/cartSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { setWishlistCache, setWishlistFromIds } from "@/store/wishlistSlice";
import SideLayout from "@/components/layout/SideLayout";
import {
  User,
  Edit3,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  Gift,
  Heart,
  ShoppingBag,
  Bell,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Star,
  Package,
  Search,
  Filter,
} from "lucide-react";
import { Avatar } from "@radix-ui/react-avatar";
import { setUser } from "@/store/userSlice";
const products = [
  {
    id: 1,
    name: "Stylish table lamp",
    image: "/api/placeholder/60/60",
    unitPrice: 155,
    originalPrice: 259,
    stockStatus: "In Stock",
  },
  {
    id: 2,
    name: "White energy bulb",
    image: "/api/placeholder/60/60",
    unitPrice: 59,
    originalPrice: 85,
    stockStatus: "Stock Out",
  },
  {
    id: 3,
    name: "Stylish LED bulb",
    image: "/api/placeholder/60/60",
    unitPrice: 99,
    stockStatus: "In Stock",
  },
  {
    id: 4,
    name: "Modern ceiling light",
    image: "/api/placeholder/60/60",
    unitPrice: 249,
    originalPrice: 320,
    stockStatus: "Low Stock",
  },
];

interface Product {
  id: number;
  name: string;
  image: string;
  unitPrice: number;
  originalPrice?: number;
  stockStatus: "In Stock" | "Stock Out" | "Low Stock";
}

const initialUserInfo = {
  name: "",
  age: "",
  gender: "",
  avatar: "",
  email: "",
};

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const reduxUser = useSelector((state: RootState) => state.user.user);
  const [userInfo, setUserInfo] = useState(reduxUser); // local editable state
  const dispatch = useDispatch();

  // Sync redux user to local state on first render or when reduxUser updates
  useEffect(() => {
    setUserInfo(reduxUser);
  }, [reduxUser]);

  const handleSaveProfile = async () => {
    const response = await axiosInstance.patch("/profile/edit", {
      name: userInfo?.name,
      gender: userInfo?.gender,
      avatar: userInfo?.avatar,
      age: userInfo?.age,
    });

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
        addresses: response.data.addresses ?? [],
      })
    );
    setEditMode(false);
  };
  return (
    <MainLayout>
      {/* Page Header */}
      <SideLayout>
        <div className="bg-white dark:bg-gray-900 dark:text-slate-50 rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-50">
              Personal Information
            </h2>

            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded text-sm transition-colors flex items-center gap-2">
                <Edit3 size={16} />
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSaveProfile}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded text-sm transition-colors">
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-2 px-4 rounded text-sm transition-colors">
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Full Name
              </label>
              {editMode ? (
                <input
                  type="text"
                  value={userInfo?.name || ""}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              ) : (
                <p className="text-slate-800 dark:text-slate-50 py-2">
                  {userInfo?.name}
                </p>
              )}
            </div>

            {/* Email (read-only) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <p className="text-slate-800 dark:text-slate-50 py-2">
                {userInfo?.email}
              </p>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Gender
              </label>
              {editMode ? (
                <select
                  value={userInfo?.gender || ""}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, gender: e.target.value })
                  }
                  className="w-full px-3 py-2 dark:text-slate-50 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="text-slate-800 dark:text-slate-50 py-2">
                  {userInfo?.gender}
                </p>
              )}
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Age
              </label>
              {editMode ? (
                <input
                  type="number"
                  value={userInfo?.age || ""}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, age: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              ) : (
                <p className="text-slate-800 dark:text-slate-50 py-2">
                  {userInfo?.age}
                </p>
              )}
            </div>

            {/* Avatar URL */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-50 mb-2">
                Avatar
              </label>
              {editMode ? (
                <input
                  type="url"
                  value={userInfo?.avatar || ""}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, avatar: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              ) : (
                <p className="text-slate-800 dark:text-slate-50 py-2">
                  {userInfo?.avatar}
                </p>
              )}
            </div>
          </div>
        </div>
      </SideLayout>
    </MainLayout>
  );
}

{
  /* <section className="py-6 md:py-10 bg-gray-50 dark:bg-gray-900">
  <div className="container mx-auto px-4">
    <div className="text-center">
      <h2 className="text-2xl md:text-3xl font-semibold uppercase mb-2 text-gray-800 dark:text-gray-100">
        Wishlist
      </h2>
      <div className="flex items-center justify-center mt-4">
        <div className="w-16 h-[3px] bg-primary"></div>
      </div>
    </div>
  </div>
</section>; */
}

{
  /* Main Content */
}

// "use client"

// import React, { useState } from "react";
// import {
//   User,
//   Edit3,
//   MapPin,
//   Phone,
//   Mail,
//   Calendar,
//   CreditCard,
//   Gift,
//   Heart,
//   ShoppingBag,
//   Bell,
//   Settings,
//   LogOut,
//   Plus,
//   Trash2,
//   Star,
//   Package,
// } from "lucide-react";

// interface Address {
//   id: number;
//   type: string;
//   name: string;
//   address: string;
//   phone: string;
//   pincode: string;
//   isDefault: boolean;
// }

// interface Order {
//   id: string;
//   productName: string;
//   date: string;
//   status: "Delivered" | "Shipped" | "Processing" | "Cancelled";
//   price: number;
//   image: string;
// }

// const ProfilePage: React.FC = () => {
//   const [activeTab, setActiveTab] = useState("profile");
//   const [editMode, setEditMode] = useState(false);

//   const [userInfo, setUserInfo] = useState({
//     name: "John Doe",
//     email: "john.doe@example.com",
//     phone: "+91 9876543210",
//     gender: "Male",
//     dateOfBirth: "1990-05-15",
//   });

//   const [addresses] = useState<Address[]>([
//     {
//       id: 1,
//       type: "Home",
//       name: "John Doe",
//       address:
//         "123 Main Street, Apartment 4B, Downtown Area, New York, NY 10001",
//       phone: "+91 9876543210",
//       pincode: "10001",
//       isDefault: true,
//     },
//     {
//       id: 2,
//       type: "Work",
//       name: "John Doe",
//       address:
//         "456 Business Plaza, Floor 15, Corporate District, New York, NY 10002",
//       phone: "+91 9876543210",
//       pincode: "10002",
//       isDefault: false,
//     },
//   ]);

//   const [orders] = useState<Order[]>([
//     {
//       id: "ORD001",
//       productName: "Samsung Galaxy S24 Ultra (256GB)",
//       date: "2024-01-15",
//       status: "Delivered",
//       price: 1199,
//       image: "/api/placeholder/80/80",
//     },
//     {
//       id: "ORD002",
//       productName: "Sony WH-1000XM5 Headphones",
//       date: "2024-01-10",
//       status: "Shipped",
//       price: 399,
//       image: "/api/placeholder/80/80",
//     },
//     {
//       id: "ORD003",
//       productName: 'MacBook Pro 14" M3',
//       date: "2024-01-05",
//       status: "Processing",
//       price: 1999,
//       image: "/api/placeholder/80/80",
//     },
//   ]);

//   const sidebarItems = [
//     { id: "profile", label: "My Profile", icon: User },
//     { id: "orders", label: "My Orders", icon: Package },
//     { id: "addresses", label: "Manage Addresses", icon: MapPin },
//     { id: "cards", label: "Saved Cards", icon: CreditCard },
//     { id: "wishlist", label: "My Wishlist", icon: Heart },
//     { id: "coupons", label: "My Coupons", icon: Gift },
//     { id: "notifications", label: "Notifications", icon: Bell },
//     { id: "settings", label: "Account Settings", icon: Settings },
//   ];

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "Delivered":
//         return "text-green-600 bg-green-50";
//       case "Shipped":
//         return "text-blue-600 bg-blue-50";
//       case "Processing":
//         return "text-yellow-600 bg-yellow-50";
//       case "Cancelled":
//         return "text-red-600 bg-red-50";
//       default:
//         return "text-gray-600 bg-gray-50";
//     }
//   };

//   const handleSaveProfile = () => {
//     setEditMode(false);
//     // Save logic here
//   };

//   const renderProfileContent = () => {
//     switch (activeTab) {
//       case "profile":
//         return (
//           <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-semibold text-slate-800">
//                 Personal Information
//               </h2>
//               {!editMode ? (
//                 <button
//                   onClick={() => setEditMode(true)}
//                   className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded text-sm transition-colors flex items-center gap-2">
//                   <Edit3 size={16} />
//                   Edit
//                 </button>
//               ) : (
//                 <div className="flex gap-2">
//                   <button
//                     onClick={handleSaveProfile}
//                     className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded text-sm transition-colors">
//                     Save
//                   </button>
//                   <button
//                     onClick={() => setEditMode(false)}
//                     className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-2 px-4 rounded text-sm transition-colors">
//                     Cancel
//                   </button>
//                 </div>
//               )}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Full Name
//                 </label>
//                 {editMode ? (
//                   <input
//                     type="text"
//                     value={userInfo.name}
//                     onChange={(e) =>
//                       setUserInfo({ ...userInfo, name: e.target.value })
//                     }
//                     className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                   />
//                 ) : (
//                   <p className="text-slate-800 py-2">{userInfo.name}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Email Address
//                 </label>
//                 {editMode ? (
//                   <input
//                     type="email"
//                     value={userInfo.email}
//                     onChange={(e) =>
//                       setUserInfo({ ...userInfo, email: e.target.value })
//                     }
//                     className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                   />
//                 ) : (
//                   <p className="text-slate-800 py-2">{userInfo.email}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Phone Number
//                 </label>
//                 {editMode ? (
//                   <input
//                     type="tel"
//                     value={userInfo.phone}
//                     onChange={(e) =>
//                       setUserInfo({ ...userInfo, phone: e.target.value })
//                     }
//                     className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                   />
//                 ) : (
//                   <p className="text-slate-800 py-2">{userInfo.phone}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Gender
//                 </label>
//                 {editMode ? (
//                   <select
//                     value={userInfo.gender}
//                     onChange={(e) =>
//                       setUserInfo({ ...userInfo, gender: e.target.value })
//                     }
//                     className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 ) : (
//                   <p className="text-slate-800 py-2">{userInfo.gender}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Date of Birth
//                 </label>
//                 {editMode ? (
//                   <input
//                     type="date"
//                     value={userInfo.dateOfBirth}
//                     onChange={(e) =>
//                       setUserInfo({ ...userInfo, dateOfBirth: e.target.value })
//                     }
//                     className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                   />
//                 ) : (
//                   <p className="text-slate-800 py-2">
//                     {new Date(userInfo.dateOfBirth).toLocaleDateString()}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         );

//       case "orders":
//         return (
//           <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
//             <h2 className="text-xl font-semibold text-slate-800 mb-6">
//               My Orders
//             </h2>
//             <div className="space-y-4">
//               {orders.map((order) => (
//                 <div
//                   key={order.id}
//                   className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
//                   <div className="flex items-start gap-4">
//                     <div className="w-20 h-20 bg-slate-200 rounded-lg flex-shrink-0"></div>
//                     <div className="flex-1">
//                       <div className="flex justify-between items-start mb-2">
//                         <h3 className="font-medium text-slate-800">
//                           {order.productName}
//                         </h3>
//                         <span
//                           className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
//                             order.status
//                           )}`}>
//                           {order.status}
//                         </span>
//                       </div>
//                       <p className="text-sm text-slate-600 mb-2">
//                         Order ID: {order.id}
//                       </p>
//                       <p className="text-sm text-slate-600 mb-2">
//                         Ordered on: {new Date(order.date).toLocaleDateString()}
//                       </p>
//                       <p className="font-semibold text-slate-800">
//                         ${order.price}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex gap-2 mt-4">
//                     <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded text-sm transition-colors">
//                       Track Order
//                     </button>
//                     {order.status === "Delivered" && (
//                       <button className="border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-2 px-4 rounded text-sm transition-colors">
//                         Rate Product
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       case "addresses":
//         return (
//           <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-semibold text-slate-800">
//                 Manage Addresses
//               </h2>
//               <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded text-sm transition-colors flex items-center gap-2">
//                 <Plus size={16} />
//                 Add New Address
//               </button>
//             </div>
//             <div className="space-y-4">
//               {addresses.map((address) => (
//                 <div
//                   key={address.id}
//                   className="border border-slate-200 rounded-lg p-4">
//                   <div className="flex justify-between items-start mb-3">
//                     <div className="flex items-center gap-2">
//                       <span className="font-medium text-slate-800">
//                         {address.type}
//                       </span>
//                       {address.isDefault && (
//                         <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
//                           Default
//                         </span>
//                       )}
//                     </div>
//                     <div className="flex gap-2">
//                       <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
//                         Edit
//                       </button>
//                       <button className="text-red-600 hover:text-red-700 text-sm font-medium">
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                   <p className="font-medium text-slate-800 mb-1">
//                     {address.name}
//                   </p>
//                   <p className="text-slate-600 text-sm mb-2">
//                     {address.address}
//                   </p>
//                   <p className="text-slate-600 text-sm">
//                     Phone: {address.phone}
//                   </p>
//                   <p className="text-slate-600 text-sm">
//                     Pincode: {address.pincode}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       default:
//         return (
//           <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 text-center">
//             <p className="text-slate-600">This section is under development.</p>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-100">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b border-slate-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center gap-4">
//               <h1 className="text-2xl font-bold text-blue-600">ShopMart</h1>
//             </div>
//             <div className="flex items-center gap-4">
//               <button className="text-slate-600 hover:text-slate-800 transition-colors">
//                 <Bell size={20} />
//               </button>
//               <button className="flex items-center gap-2 text-slate-600 hover:text-red-600 transition-colors">
//                 <LogOut size={20} />
//                 <span className="hidden sm:inline">Logout</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Sidebar */}
//           <div className="lg:w-80 flex-shrink-0">
//             <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
//               {/* Profile Header */}
//               <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200">
//                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
//                   <User size={24} className="text-blue-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-slate-800">
//                     {userInfo.name}
//                   </h3>
//                   <p className="text-slate-600 text-sm">{userInfo.email}</p>
//                 </div>
//               </div>

//               {/* Navigation */}
//               <nav className="space-y-2">
//                 {sidebarItems.map((item) => (
//                   <button
//                     key={item.id}
//                     onClick={() => setActiveTab(item.id)}
//                     className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
//                       activeTab === item.id
//                         ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
//                         : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
//                     }`}>
//                     <item.icon size={18} />
//                     <span className="font-medium">{item.label}</span>
//                   </button>
//                 ))}
//               </nav>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="flex-1">{renderProfileContent()}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
