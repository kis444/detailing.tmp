"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { useEffect, useState } from "react";

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

export function ServicesPreview() {
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
      // Arătăm doar primele 3 servicii (ordonate după order)
      const sorted = [...data].sort((a, b) => a.order - b.order);
      setServices(sorted.slice(0, 3));
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

  if (loading) {
    return (
      <section className="py-20 lg:py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-muted-foreground mt-4">Loading services...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.services.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <div className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 h-full">
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
                          {String(service.order).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
                    <span className="text-primary font-semibold text-lg">{service.price}</span>
                    <Link href="/services" className="text-primary hover:text-primary/80 transition-colors">
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.4} className="text-center mt-12">
          <Link href="/services">
            <Button variant="outline" className="border-border hover:bg-card hover:border-primary transition-transform hover:scale-105">
              {t.services.viewAll}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
