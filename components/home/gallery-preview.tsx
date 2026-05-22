"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";
import { FadeIn, ScaleIn } from "@/components/animations";

interface GalleryItem {
  id: number;
  title_ro: string;
  title_en: string;
  title_ru: string;
  before_image: string;
  after_image: string;
  category: string;
  order: number;
}

export function GalleryPreview() {
  const { t, language } = useLanguage();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [loading, setLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/admin/gallery");
      const data = await res.json();
      const firstThree = data.slice(0, 3);
      setItems(firstThree);
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = (item: GalleryItem) => {
    if (language === "ro") return item.title_ro;
    if (language === "ru") return item.title_ru;
    return item.title_en;
  };

  const handleStart = () => {
    setIsDragging(true);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart();
    handleMove(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleStart();
    handleMove(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => handleEnd();
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };
    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    };
    const handleGlobalTouchEnd = () => handleEnd();

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      window.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      window.addEventListener('touchend', handleGlobalTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging]);

  if (loading) {
    return (
      <section className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground mt-4">Loading gallery...</p>
        </div>
      </section>
    );
  }

  if (items.length === 0) return null;

  const activeItem = items[activeIndex];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.gallery.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.gallery.subtitle}
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <ScaleIn>
            <div
              ref={containerRef}
              className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted select-none touch-none"
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
            >
              <img
                src={activeItem.after_image}
                alt="După"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                draggable={false}
              />
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={activeItem.before_image}
                  alt="Înainte"
                  className="absolute top-0 left-0 h-full object-cover pointer-events-none"
                  style={{ width: `${100 / sliderPosition * 100}%`, maxWidth: 'none' }}
                  draggable={false}
                />
              </div>
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-primary cursor-ew-resize">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                    <path d="M8 4L4 8L8 12" />
                    <path d="M16 4L20 8L16 12" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-md text-sm font-medium text-white z-10 select-none pointer-events-none">
                ÎNAINTE
              </div>
              <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-primary/90 backdrop-blur-sm rounded-md text-sm font-medium text-white z-10 select-none pointer-events-none">
                DUPĂ
              </div>
            </div>
          </ScaleIn>

          <FadeIn direction="right">
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-semibold text-foreground">
                {getTitle(activeItem)}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {items.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveIndex(index);
                      setSliderPosition(50);
                    }}
                    className={cn(
                      "aspect-square rounded-lg overflow-hidden bg-muted border-2 transition-all hover:scale-105",
                      activeIndex === index ? "border-primary" : "border-transparent hover:border-primary/50"
                    )}
                  >
                    <img
                      src={item.after_image}
                      alt={getTitle(item)}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              <Link href="/gallery">
                <Button variant="outline" className="border-border hover:bg-card hover:border-primary transition-transform hover:scale-105">
                  {t.gallery.title}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
