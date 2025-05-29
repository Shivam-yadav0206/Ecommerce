"use client"
import { ReactNode, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import LoginModal from "../common/LoginModal";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isLoginOpen, setLoginOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      <Header setLoginOpen={setLoginOpen} />
      <main className="flex-grow">{children}</main>
      <Footer />

      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}
