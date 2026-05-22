"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/components/language-provider";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, MessageCircle } from "lucide-react";

interface ContactInfo {
  phone: string;
  email: string;
  address_ro: string;
  address_en: string;
  address_ru: string;
  facebook: string;
  instagram: string;
  whatsapp: string;
}

export default function ContactPage() {
  const { t, language } = useLanguage();
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const res = await fetch("/api/admin/contact");
      const data = await res.json();
      setContact(data);
    } catch (error) {
      console.error("Failed to fetch contact:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAddress = () => {
    if (!contact) return "";
    if (language === "ro") return contact.address_ro;
    if (language === "ru") return contact.address_ru;
    return contact.address_en;
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
            {t.contact.title}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Contact Info Cards (2x2 grid) */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone Card */}
                <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all group">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Telefon</h3>
                  <a 
                    href={`tel:${contact?.phone?.replace(/\s/g, '')}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {contact?.phone || "+373 XX XXX XXX"}
                  </a>
                </div>

                {/* Email Card */}
                <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all group">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Email</h3>
                  <a 
                    href={`mailto:${contact?.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors break-all"
                  >
                    {contact?.email || "contact@autodetail.md"}
                  </a>
                </div>

                {/* Address Card */}
                <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all group">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Adresă</h3>
                  <p className="text-muted-foreground">{getAddress()}</p>
                </div>

                {/* Hours Card */}
                <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all group">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Program de Lucru</h3>
                  <p className="text-muted-foreground text-sm">Luni - Vineri: 9:00 - 18:00</p>
                  <p className="text-muted-foreground text-sm">Sâmbătă: 10:00 - 15:00</p>
                  <p className="text-muted-foreground text-sm">Duminică: Închis</p>
                </div>
              </div>

              {/* Social Media Section - Below the grid */}
              <div className="mt-6 p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-4">Social Media</h3>
                <div className="flex gap-4">
                  <a
                    href={contact?.facebook || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-input border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all hover:scale-105"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href={contact?.instagram || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-input border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all hover:scale-105"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href={contact?.whatsapp || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-input border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all hover:scale-105"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Map */}
            <div className="rounded-xl overflow-hidden bg-card border border-border sticky top-24 h-125 lg:h-137.5">
              <iframe
src="https://www.google.com/maps?q=Str.+Colina+Verde+26,+Chi%C8%99in%C4%83u,+Moldova&output=embed"                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps - Location"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
