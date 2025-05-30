"use client";

import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Package,
  Truck,
  Shield,
  CreditCard,
} from "lucide-react";
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: "shipping" | "returns" | "products" | "payment" | "warranty";
}

const faqData: FAQItem[] = [
  {
    id: 1,
    category: "shipping",
    question: "What is your shipping policy?",
    answer:
      "We offer free shipping on orders over $50. Standard shipping takes 3-5 business days, while express shipping delivers in 1-2 business days. We ship to all major cities and provide tracking information for all orders.",
  },
  {
    id: 2,
    category: "returns",
    question: "Can I return electronics if I'm not satisfied?",
    answer:
      "Yes! We offer a 30-day return policy for all electronics. Items must be in original condition with all accessories and packaging. Gaming consoles, smartphones, and laptops can be returned within 14 days if opened.",
  },
  {
    id: 3,
    category: "products",
    question: "Are your products genuine and new?",
    answer:
      "Absolutely! We only sell 100% authentic, brand-new electronics from authorized distributors. All products come with original manufacturer warranties and official documentation.",
  },
  {
    id: 4,
    category: "warranty",
    question: "What warranty do you provide on electronics?",
    answer:
      "All products come with manufacturer warranty: Smartphones (1 year), Laptops (1-2 years), Gaming Consoles (1 year), TVs (1-3 years), Smartwatches (1 year). We also offer extended warranty options.",
  },
  {
    id: 5,
    category: "payment",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and bank transfers. We also offer EMI options for purchases above $200 with 0% interest on select products.",
  },
  {
    id: 6,
    category: "products",
    question: "Do you offer gaming console bundles?",
    answer:
      "Yes! We have exclusive bundles for PS5, Xbox Series X/S, and Nintendo Switch that include games, controllers, and accessories at discounted prices. Bundle deals are updated regularly.",
  },
  {
    id: 7,
    category: "shipping",
    question: "Do you offer same-day delivery?",
    answer:
      "Same-day delivery is available in select metro cities for orders placed before 2 PM. This service is available for smartphones, smartwatches, and accessories under 5kg.",
  },
  {
    id: 8,
    category: "products",
    question: "Can I pre-order upcoming electronics?",
    answer:
      "Yes! We accept pre-orders for upcoming releases like new iPhone models, gaming consoles, and flagship smartphones. Pre-order customers get priority shipping and exclusive launch day delivery.",
  },
  {
    id: 9,
    category: "returns",
    question: "How do I track my return or exchange?",
    answer:
      "Once you initiate a return through your account, you'll receive a tracking number. Returns are processed within 5-7 business days, and refunds are issued to the original payment method.",
  },
  {
    id: 10,
    category: "warranty",
    question: "What if my device has issues after warranty expires?",
    answer:
      "We offer post-warranty repair services through our certified service centers. We also provide trade-in options where you can exchange your old device for credit towards a new purchase.",
  },
];

const categoryIcons = {
  shipping: Truck,
  returns: Package,
  products: Shield,
  payment: CreditCard,
  warranty: Shield,
};

const categoryColors = {
  shipping: "bg-blue-500 dark:bg-blue-600",
  returns: "bg-green-500 dark:bg-green-600",
  products: "bg-purple-500 dark:bg-purple-600",
  payment: "bg-orange-500 dark:bg-orange-600",
  warranty: "bg-indigo-500 dark:bg-indigo-600",
};

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFAQs =
    selectedCategory === "all"
      ? faqData
      : faqData.filter((item) => item.category === selectedCategory);

  const categories = [
    { key: "all", label: "All Questions", count: faqData.length },
    {
      key: "products",
      label: "Products",
      count: faqData.filter((f) => f.category === "products").length,
    },
    {
      key: "shipping",
      label: "Shipping",
      count: faqData.filter((f) => f.category === "shipping").length,
    },
    {
      key: "returns",
      label: "Returns",
      count: faqData.filter((f) => f.category === "returns").length,
    },
    {
      key: "warranty",
      label: "Warranty",
      count: faqData.filter((f) => f.category === "warranty").length,
    },
    {
      key: "payment",
      label: "Payment",
      count: faqData.filter((f) => f.category === "payment").length,
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Background decorations - subtle for light mode */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100/30 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-100/50 dark:bg-gray-700/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50/40 dark:bg-blue-900/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 dark:bg-blue-600 rounded-full mb-6 shadow-lg dark:shadow-2xl">
              <HelpCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Electronics Store
              <span className="block text-blue-600 dark:text-blue-400">
                FAQ
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about buying gaming consoles,
              smartphones, laptops, TVs, smartwatches, and tech accessories from
              our store.
            </p>
          </div>

          {/* Category filters */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.key
                      ? "bg-blue-500 dark:bg-blue-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                  } border border-gray-200 dark:border-gray-700`}>
                  {category.label}
                  <span className="ml-2 px-2 py-1 bg-white/20 dark:bg-black/20 rounded-full text-xs">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {filteredFAQs.map((item) => {
                const IconComponent = categoryIcons[item.category];
                const isOpen = openItems.includes(item.id);

                return (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-2xl hover:shadow-blue-100 dark:hover:shadow-blue-900/20 hover:border-blue-200 dark:hover:border-blue-600">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full p-8 text-left flex items-center justify-between group">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-3 rounded-full ${
                            categoryColors[item.category]
                          } shadow-md`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 pr-4">
                          {item.question}
                        </h3>
                      </div>
                      <div className="flex-shrink-0">
                        {isOpen ? (
                          <ChevronUp className="w-6 h-6 text-blue-500 dark:text-blue-400 transition-transform duration-300" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-all duration-300" />
                        )}
                      </div>
                    </button>

                    <div
                      className={`transition-all duration-500 ease-in-out ${
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}>
                      <div className="px-8 pb-8">
                        <div className="pl-16">
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact section */}
          <div className="mt-20 text-center">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-12 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Still have questions?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Our customer support team is here to help you with any questions
                about our electronics, shipping, or returns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-blue-500 dark:bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-600 dark:hover:bg-blue-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Contact Support
                </button>
                <button className="px-8 py-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-full border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300">
                  Live Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
