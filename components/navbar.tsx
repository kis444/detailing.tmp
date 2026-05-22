"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/gallery", key: "gallery" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - MODIFICAT AICI */}
          <Link href="/" className="flex items-center gap-2 ">
            <img 
              src="/logo.png" 
              alt="AutoDetail Logo" 
              className="w-18 h-18 object-contain -mt-2"
            />
            <span className="font-serif text-xl font-semibold text-foreground hidden sm:block">
              AutoDetail
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/70 hover:text-primary transition-colors text-sm font-medium tracking-wide uppercase"
              >
                {t.nav[link.key]}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link href="/contact" className="hidden sm:block">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                {t.hero.cta}
              </Button>
            </Link>
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isOpen ? "max-h-96 pb-6" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-foreground/70 hover:text-primary transition-colors text-sm font-medium tracking-wide uppercase"
              >
                {t.nav[link.key]}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-2">
                {t.hero.cta}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}