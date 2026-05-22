"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

interface Testimonial {
  id: number;
  name: string;
  content_ro: string;
  content_en: string;
  content_ru: string;
  rating: number;
  image: string;
  order: number;
}

export function Testimonials() {
  const { t, language } = useLanguage();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const getContent = (item: Testimonial) => {
    if (language === "ro") return item.content_ro;
    if (language === "ru") return item.content_ru;
    return item.content_en;
  };

  if (loading) {
    return (
      <section className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground mt-4">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.testimonials.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.testimonials.subtitle}
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 h-full">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">
                  &ldquo;{getContent(testimonial)}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium text-foreground">{testimonial.name}</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
