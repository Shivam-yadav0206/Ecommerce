"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, X } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import SideLayout from "@/components/layout/SideLayout";
import { RootState } from "@/store/store";
import axiosInstance from "@/api/axios";
import { setUser } from "@/store/userSlice";

interface Address {
  id: number;
  type: string;
  name: string;
  address: string;
  phone: string;
  pincode: string;
  isDefault: boolean;
}

const Address = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  // Modal open state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New address form state
  const [newAddress, setNewAddress] = useState<
    Omit<Address, "id" | "isDefault">
  >({
    type: "",
    name: "",
    address: "",
    phone: "",
    pincode: "",
  });

  useEffect(() => {
    setAddresses(user?.addresses || []);
  }, [user]);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );
    if (!confirmed) return;

    try {
      setLoadingId(id);

      const res = await axiosInstance.patch("/remove/address", { id });

      if (res.data && Array.isArray(res.data.addresses)) {
        const updatedAddresses: Address[] = res.data.addresses;
        setAddresses(updatedAddresses);

        if (user) {
          const updatedUser = {
            ...user,
            addresses: updatedAddresses,
          };
          //dispatch(setUser(updatedUser));
        }
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      console.error("Failed to delete address:", error);
      alert("Failed to delete address. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  // Handle input changes in the Add Address form
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit to add new address
  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields (simple example)
    if (
      !newAddress.type ||
      !newAddress.name ||
      !newAddress.address ||
      !newAddress.phone ||
      !newAddress.pincode
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Optionally add loading state here
      const res = await axiosInstance.post("/add/address", newAddress);

      if (res.data && Array.isArray(res.data.addresses)) {
        const updatedAddresses: Address[] = res.data.addresses;
        setAddresses(updatedAddresses);

        if (user) {
          const updatedUser = {
            ...user,
            addresses: updatedAddresses,
          };
          //dispatch(setUser(updatedUser));
        }

        setIsModalOpen(false);
        setNewAddress({
          type: "",
          name: "",
          address: "",
          phone: "",
          pincode: "",
        });
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      console.error("Failed to add address:", error);
      alert("Failed to add address. Please try again.");
    }
  };

  return (
    <MainLayout>
      <SideLayout>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-slate-200 dark:border-gray-700 p-6 transition-colors">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
              Manage Addresses
            </h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded text-sm transition-all duration-200 ease-in-out flex items-center gap-2 shadow-sm hover:shadow-md">
              <Plus size={16} />
              Add New Address
            </button>
          </div>

          <div className="space-y-4">
            {addresses.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No addresses found.
              </p>
            )}

            {addresses.map((address) => (
              <div
                key={address.id}
                className="border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900 rounded-lg p-4 transition-colors duration-200">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-800 dark:text-white">
                      {address.type}
                    </span>
                    {address.isDefault && (
                      <span className="bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium transition-colors"
                      disabled={loadingId === address.id}>
                      {loadingId === address.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
                <p className="font-medium text-slate-800 dark:text-white mb-1">
                  {address.name}
                </p>
                <p className="text-slate-600 dark:text-gray-300 text-sm mb-2">
                  {address.address}
                </p>
                <p className="text-slate-600 dark:text-gray-300 text-sm">
                  Phone: {address.phone}
                </p>
                <p className="text-slate-600 dark:text-gray-300 text-sm">
                  Pincode: {address.pincode}
                </p>
              </div>
            ))}
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition-opacity">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative shadow-lg transition-all duration-200">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-colors">
                  <X size={20} />
                </button>
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                  Add New Address
                </h3>
                <form onSubmit={handleAddAddress} className="space-y-4">
                  {/* Input Fields */}
                  {[
                    {
                      label: "Type",
                      name: "type",
                      type: "select",
                      options: ["Home", "Work", "Other"],
                    },
                    { label: "Name", name: "name", type: "text" },
                    { label: "Address", name: "address", type: "text" },
                    {
                      label: "Phone",
                      name: "phone",
                      type: "tel",
                      pattern: "[0-9]{10}",
                      title: "Please enter a 10-digit phone number",
                    },
                    {
                      label: "Pincode",
                      name: "pincode",
                      type: "text",
                      pattern: "[0-9]{6}",
                      title: "Please enter a 6-digit pincode",
                    },
                  ].map((field, idx) => (
                    <div key={idx}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {field.label}
                      </label>
                      {field.type === "select" ? (
                        <select
                          name={field.name}
                          value={newAddress[field.name]}
                          onChange={handleInputChange}
                          required
                          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded px-3 py-2 transition-all">
                          <option value="">
                            Select {field.label.toLowerCase()}
                          </option>
                          {field.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={newAddress[field.name]}
                          onChange={handleInputChange}
                          required
                          pattern={field.pattern}
                          title={field.title}
                          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded px-3 py-2 transition-all"
                        />
                      )}
                    </div>
                  ))}

                  <div className="flex justify-end gap-2 mt-6">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white transition-colors">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
                      Add Address
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </SideLayout>
    </MainLayout>
  );
};

export default Address;
