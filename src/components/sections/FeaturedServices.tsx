"use client";

import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

const services = [
  {
    icon: <Truck className="w-6 h-6 text-primary" />,
    title: "Free Shipping",
    description: "Orders over $100",
  },
  {
    icon: <RotateCcw className="w-6 h-6 text-primary" />,
    title: "Money Back",
    description: "Within 30 days",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: "Secure Payment",
    description: "Secured payment",
  },
  {
    icon: <Headphones className="w-6 h-6 text-primary" />,
    title: "Online Support",
    description: "Support 24/7",
  },
];

export default function FeaturedServices() {
  return (
    <section className="py-8 bg-card border-t border-b border-border/40">
      <div className="container-custom">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {service.icon}
              </div>
              <div>
                <h3 className="font-medium text-sm md:text-base">{service?.title}</h3>
                <p className="text-muted-foreground text-xs">{service?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
