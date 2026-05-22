"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/components/language-provider";

interface Service {
  id: number;
  title_ro: string;
  title_en: string;
  title_ru: string;
  description_ro: string;
  description_en: string;
  description_ru: string;
  price: string;
  duration: string;
  image: string;
  order: number;
}

export default function ServicesPage() {
  const { t, language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = (service: Service) => {
    if (language === "ro") return service.title_ro;
    if (language === "ru") return service.title_ru;
    return service.title_en;
  };

  const getDescription = (service: Service) => {
    if (language === "ro") return service.description_ro;
    if (language === "ru") return service.description_ru;
    return service.description_en;
  };

  const getStartingFrom = () => {
    if (language === "ro") return "Începând de la";
    if (language === "ru") return "Начиная с";
    return "Starting from";
  };

  if (loading) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            {t.services.title}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={getTitle(service)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-3xl font-serif text-primary">
                          {String(service.id).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {getTitle(service)}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {getDescription(service)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">
                      {getStartingFrom()}
                    </span>
                    <span className="text-primary font-semibold text-xl">{service.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
