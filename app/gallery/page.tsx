"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

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

export default function GalleryPage() {
  const { t, language } = useLanguage();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [sliderPositions, setSliderPositions] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const containerRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/admin/gallery");
      const data = await res.json();
      setItems(data);
      const positions: Record<number, number> = {};
      data.forEach((item: GalleryItem) => {
        positions[item.id] = 50;
      });
      setSliderPositions(positions);
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

  const handleMove = (id: number, clientX: number) => {
    const container = containerRefs.current[id];
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPositions((prev) => ({ ...prev, [id]: Math.min(Math.max(percentage, 0), 100) }));
  };

  const onMouseDown = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    setDraggingId(id);
    handleMove(id, e.clientX);
  };

  const onTouchStart = (id: number, e: React.TouchEvent) => {
    e.preventDefault();
    setDraggingId(id);
    handleMove(id, e.touches[0].clientX);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (draggingId !== null) handleMove(draggingId, e.clientX);
    };
    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (draggingId !== null) {
        e.preventDefault();
        handleMove(draggingId, e.touches[0].clientX);
      }
    };
    const handleEnd = () => setDraggingId(null);

    if (draggingId !== null) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [draggingId]);

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
      
      <section className="pt-32 pb-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            {t.gallery.title}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.gallery.subtitle}
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {items.map((item) => (
              <div key={item.id} className="space-y-4">
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  {getTitle(item)}
                </h3>
                
                <div
                  ref={(el) => { containerRefs.current[item.id] = el; }}
                  className="relative aspect-[16/10] rounded-xl overflow-hidden bg-muted select-none touch-none"
                  onMouseDown={(e) => onMouseDown(item.id, e)}
                  onTouchStart={(e) => onTouchStart(item.id, e)}
                >
                  <img
                    src={item.after_image}
                    alt="After"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    draggable={false}
                  />
                  
                  <div
                    className="absolute inset-0 overflow-hidden pointer-events-none"
                    style={{ width: `${sliderPositions[item.id] || 50}%` }}
                  >
                    <img
                      src={item.before_image}
                      alt="Before"
                      className="absolute top-0 left-0 h-full object-cover"
                      style={{ width: `${100 / (sliderPositions[item.id] || 50) * 100}%`, maxWidth: 'none' }}
                      draggable={false}
                    />
                  </div>

                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-20 pointer-events-none"
                    style={{ left: `${sliderPositions[item.id] || 50}%` }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-primary">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
