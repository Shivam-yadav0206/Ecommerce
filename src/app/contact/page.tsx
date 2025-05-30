"use client";

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Headphones,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";

interface ContactMethod {
  id: string;
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  value: string;
  action: string;
}

interface SocialLink {
  id: string;
  icon: React.ComponentType<any>;
  name: string;
  url: string;
  color: string;
}

const contactMethods: ContactMethod[] = [
  {
    id: "email",
    icon: Mail,
    title: "Email Support",
    description: "Get help with orders, returns, and technical questions",
    value: "support@electronicsstore.com",
    action: "Send Email",
  },
  {
    id: "phone",
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our customer service team",
    value: "+1 (555) 123-4567",
    action: "Call Now",
  },
  {
    id: "chat",
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team in real-time",
    value: "Available 24/7",
    action: "Start Chat",
  },
  {
    id: "support",
    icon: Headphones,
    title: "Technical Support",
    description: "Get help with product setup and troubleshooting",
    value: "tech@electronicsstore.com",
    action: "Get Help",
  },
];

const socialLinks: SocialLink[] = [
  {
    id: "facebook",
    icon: Facebook,
    name: "Facebook",
    url: "#",
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    id: "twitter",
    icon: Twitter,
    name: "Twitter",
    url: "#",
    color: "bg-sky-500 hover:bg-sky-600",
  },
  {
    id: "instagram",
    icon: Instagram,
    name: "Instagram",
    url: "#",
    color: "bg-pink-500 hover:bg-pink-600",
  },
  {
    id: "linkedin",
    icon: Linkedin,
    name: "LinkedIn",
    url: "#",
    color: "bg-blue-700 hover:bg-blue-800",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      category: "general",
    });
    setIsSubmitting(false);

    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100/30 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-100/50 dark:bg-gray-700/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-50/40 dark:bg-blue-900/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 dark:bg-blue-600 rounded-full mb-6 shadow-lg dark:shadow-2xl">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Contact
              <span className="block text-blue-600 dark:text-blue-400">Us</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Have questions about our electronics? Need help with an order? Our
              customer support team is here to help you every step of the way.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-2xl">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Send us a message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-300"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-300">
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Support</option>
                      <option value="technical">Technical Support</option>
                      <option value="returns">Returns & Exchanges</option>
                      <option value="warranty">Warranty Claims</option>
                      <option value="partnership">Business Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-300"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-300 resize-none"
                      placeholder="Please describe your question or concern in detail..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center px-6 py-4 bg-blue-500 dark:bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Contact Methods */}
              <div className="space-y-6">
                {contactMethods.map((method) => {
                  const IconComponent = method.icon;

                  return (
                    <div
                      key={method.id}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-2xl hover:shadow-blue-100 dark:hover:shadow-blue-900/20 hover:border-blue-200 dark:hover:border-blue-600 transition-all duration-300 group">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-blue-500 dark:bg-blue-600 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {method.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                            {method.description}
                          </p>
                          <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                            {method.value}
                          </p>
                          <button className="text-sm text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-300">
                            {method.action} →
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Business Hours */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Business Hours
                  </h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Monday - Friday:
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      9:00 AM - 8:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Saturday:
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      10:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Sunday:
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      12:00 PM - 5:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">
                      Live Chat:
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      24/7 Available
                    </span>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Visit Our Store
                  </h3>
                </div>
                <div className="text-gray-600 dark:text-gray-300 mb-4">
                  <p>123 Electronics Avenue</p>
                  <p>Tech District, CA 90210</p>
                  <p>United States</p>
                </div>
                <button className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-300">
                  Get Directions →
                </button>
              </div>

              {/* Social Media */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3 mb-4">
                  <Globe className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Follow Us
                  </h3>
                </div>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;

                    return (
                      <a
                        key={social.id}
                        href={social.url}
                        className={`p-3 ${social.color} text-white rounded-lg transition-all duration-300 hover:scale-110 shadow-md`}
                        aria-label={social.name}>
                        <IconComponent className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
