"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { FadeIn } from "@/components/animations";
import { useEffect, useState } from "react";

export function CTASection() {
  const { t, language } = useLanguage();
  const [content, setContent] = useState<{ cta_title?: any; cta_subtitle?: any; cta_button?: any }>({});
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
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  const getText = (key: string) => {
    const item = content[key as keyof typeof content];
    if (!item) return "";
    if (language === "ro") return item.ro;
    if (language === "ru") return item.ru;
    return item.en;
  };

  if (loading) return null;

  return (
    <section className="py-20 lg:py-32 bg-secondary relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
      />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {getText("cta_title") || t.cta.title}
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            {getText("cta_subtitle") || t.cta.subtitle}
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <Link href="/contact">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 transition-transform hover:scale-105">
              {getText("cta_button") || t.cta.button}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
