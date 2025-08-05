"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { clearCart } from "@/store/cartSlice";
import { clearUser } from "@/store/userSlice";
import { clearWishlist } from "@/store/wishlistSlice";
import axiosInstance from "@/api/axios";
import Image from "next/image";
import {
  User,
  MapPin,
  ShoppingCart,
  Heart,
  Gift,
  Bell,
  Settings,
  Power,
  Package,
} from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";

interface SideLayoutProps {
  children: ReactNode;
}

export default function SideLayout({ children }: SideLayoutProps) {
  const dispatch = useDispatch();
  const lastSegment = usePathname().split("/").filter(Boolean).pop();

  const name = useSelector((state: RootState) => state?.user?.user?.name || "");
  const email = useSelector(
    (state: RootState) => state?.user?.user?.email || ""
  );
    const avatar = useSelector(
      (state: RootState) => state?.user?.user?.avatar || ""
    );

  

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout");
      delete axiosInstance.defaults.headers.common["Authorization"];
      localStorage.removeItem("authToken"); 

      dispatch(clearUser());
      dispatch(clearCart());
      dispatch(clearWishlist());

      window.location.replace("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };


  const sidebarItems = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "order", label: "My Orders", icon: Package },
    { id: "address", label: "Manage Addresses", icon: MapPin },
    { id: "cart", label: "My Cart", icon: ShoppingCart },
    { id: "wishlist", label: "My Wishlist", icon: Heart },
    { id: "coupons", label: "My Coupons", icon: Gift },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Account Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-200 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-slate-300 dark:border-gray-700 p-6 flex flex-col">
              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-300 dark:border-gray-700">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  {/* <User size={28} className="text-blue-600" /> */}
                  <Image src={avatar} height={28} width={28} alt="User Image" />
                </div>
                <div className="truncate">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                    {name || "Guest User"}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm truncate">
                    {email || "No email"}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col space-y-1 flex-1">
                {sidebarItems.map(({ id, label, icon: Icon }) => {
                  const isActive = lastSegment === id;
                  const isDisabled = id === "coupons" || id === "notifications";

                  return isDisabled ? (
                    // Render as a disabled div
                    <div
                      key={id}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-gray-400 dark:text-gray-500 cursor-not-allowed bg-gray-100 dark:bg-gray-800 opacity-60">
                      <Icon size={18} />
                      <span className="truncate">{label}</span>
                    </div>
                  ) : (
                    // Normal clickable link
                    <Link
                      key={id}
                      href={`/${id}`}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                        isActive
                          ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-800 hover:text-slate-900 dark:hover:text-white"
                      }`}>
                      <Icon size={18} />
                      <span className="truncate">{label}</span>
                    </Link>
                  );
                })}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-2 mt-auto rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-700 dark:text-red-400 dark:hover:text-red-200 transition-colors duration-150">
                  <Power size={18} />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}

/*   

interface Address {
  id: number;
  type: string;
  name: string;
  address: string;
  phone: string;
  pincode: string;
  isDefault: boolean;
}

interface Order {
  id: string;
  productName: string;
  date: string;
  status: "Delivered" | "Shipped" | "Processing" | "Cancelled";
  price: number;
  image: string;
}

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "text-green-600 bg-green-50";
      case "Shipped":
        return "text-blue-600 bg-blue-50";
      case "Processing":
        return "text-yellow-600 bg-yellow-50";
      case "Cancelled":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };


    const [addresses] = useState<Address[]>([
    {
      id: 1,
      type: "Home",
      name: "John Doe",
      address:
        "123 Main Street, Apartment 4B, Downtown Area, New York, NY 10001",
      phone: "+91 9876543210",
      pincode: "10001",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      name: "John Doe",
      address:
        "456 Business Plaza, Floor 15, Corporate District, New York, NY 10002",
      phone: "+91 9876543210",
      pincode: "10002",
      isDefault: false,
    },
  ]);

  const [orders] = useState<Order[]>([
    {
      id: "ORD001",
      productName: "Samsung Galaxy S24 Ultra (256GB)",
      date: "2024-01-15",
      status: "Delivered",
      price: 1199,
      image: "/api/placeholder/80/80",
    },
    {
      id: "ORD002",
      productName: "Sony WH-1000XM5 Headphones",
      date: "2024-01-10",
      status: "Shipped",
      price: 399,
      image: "/api/placeholder/80/80",
    },
    {
      id: "ORD003",
      productName: 'MacBook Pro 14" M3',
      date: "2024-01-05",
      status: "Processing",
      price: 1999,
      image: "/api/placeholder/80/80",
    },
  ]);



const renderProfileContent = () => {
  switch (activeTab) {
    case "profile":
      return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-800">
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
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              {editMode ? (
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              ) : (
                <p className="text-slate-800 py-2">{userInfo.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              {editMode ? (
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              ) : (
                <p className="text-slate-800 py-2">{userInfo.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone Number
              </label>
              {editMode ? (
                <input
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              ) : (
                <p className="text-slate-800 py-2">{userInfo.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Gender
              </label>
              {editMode ? (
                <select
                  value={userInfo.gender}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, gender: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="text-slate-800 py-2">{userInfo.gender}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Date of Birth
              </label>
              {editMode ? (
                <input
                  type="date"
                  value={userInfo.dateOfBirth}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      dateOfBirth: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              ) : (
                <p className="text-slate-800 py-2">
                  {new Date(userInfo.dateOfBirth).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>
      );

    case "orders":
      return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            My Orders
          </h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-slate-200 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-slate-800">
                        {order.productName}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      Order ID: {order.id}
                    </p>
                    <p className="text-sm text-slate-600 mb-2">
                      Ordered on: {new Date(order.date).toLocaleDateString()}
                    </p>
                    <p className="font-semibold text-slate-800">
                      ${order.price}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded text-sm transition-colors">
                    Track Order
                  </button>
                  {order.status === "Delivered" && (
                    <button className="border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-2 px-4 rounded text-sm transition-colors">
                      Rate Product
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "addresses":
      return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-800">
              Manage Addresses
            </h2>
            <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded text-sm transition-colors flex items-center gap-2">
              <Plus size={16} />
              Add New Address
            </button>
          </div>
          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="border border-slate-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-800">
                      {address.type}
                    </span>
                    {address.isDefault && (
                      <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Delete
                    </button>
                  </div>
                </div>
                <p className="font-medium text-slate-800 mb-1">
                  {address.name}
                </p>
                <p className="text-slate-600 text-sm mb-2">{address.address}</p>
                <p className="text-slate-600 text-sm">Phone: {address.phone}</p>
                <p className="text-slate-600 text-sm">
                  Pincode: {address.pincode}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 text-center">
          <p className="text-slate-600">This section is under development.</p>
        </div>
      );
  }
};








*/
