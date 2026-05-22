"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Facebook, Instagram, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

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

export function Footer() {
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

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  const getAddress = () => {
    if (!contact) return "";
    if (language === "ro") return contact.address_ro;
    if (language === "ru") return contact.address_ru;
    return contact.address_en;
  };

  if (loading) {
    return (
      <footer className="bg-secondary border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand - același logo ca în header */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img 
                src="/logo.png" 
                alt="AutoDetail Logo" 
                className="w-10 h-10 object-contain"
              />
              <span className="font-serif text-xl font-semibold text-foreground">
                AutoDetail
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">{t.footer.tagline}</p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">
              {t.nav.home}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">
              {t.nav.contact}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                {contact?.phone || "+373 XX XXX XXX"}
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                {contact?.email || "contact@autodetail.md"}
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                {getAddress()}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">Social</h3>
            <div className="flex gap-4">
              <a href={contact?.facebook || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={contact?.instagram || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={contact?.whatsapp || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AutoDetail. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
