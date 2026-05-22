"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { useEffect, useState } from "react";

interface SiteContent {
  hero_title?: { ro: string; en: string; ru: string };
  hero_subtitle?: { ro: string; en: string; ru: string };
  hero_badge?: { ro: string; en: string; ru: string };
  cta_button?: { ro: string; en: string; ru: string };
}

export function HeroSection() {
  const { t, language } = useLanguage();
  const [content, setContent] = useState<SiteContent>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/admin/site-content");
      const data = await res.json();
      setContent(data);
    } catch (error) {
      console.error("Failed to fetch content:", error);
    } finally {
      setLoading(false);
    }
  };

  const getText = (key: keyof SiteContent) => {
    const item = content[key];
    if (!item) return "";
    if (language === "ro") return item.ro;
    if (language === "ru") return item.ru;
    return item.en;
  };

  // Pentru badge (city name)
  const getBadgeText = () => {
    const item = content.hero_badge;
    if (!item) return "Chisinau, Moldova";
    if (language === "ro") return item.ro;
    if (language === "ru") return item.ru;
    return item.en;
  };

  // Pentru butonul CTA
  const getCTAButton = () => {
    const item = content.cta_button;
    if (!item) return t.hero.cta;
    if (language === "ro") return item.ro;
    if (language === "ru") return item.ru;
    return item.en;
  };

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image cu mască semitransparentă */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.jpg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>
      
      <div className="absolute inset-0 z-0 bg-linear-to-br from-background/20 via-transparent to-secondary/20" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.7 }}
        className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/15 rounded-full blur-3xl"
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
        >
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-medium">{getBadgeText()}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
        >
          <span className="text-balance">{getText("hero_title") || t.hero.title}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          {getText("hero_subtitle") || t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/contact">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 transition-transform hover:scale-105">
              {getCTAButton()}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/services">
            <Button size="lg" variant="outline" className="border-border hover:bg-card px-8 transition-transform hover:scale-105">
              {t.hero.secondary}
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: "500+", label: "Clients" },
            { value: "5+", label: "Years" },
            { value: "100%", label: "Quality" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-serif font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-3 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
