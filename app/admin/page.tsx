"use client";

import { Wrench, Image, MessageSquare, Phone, FileText } from "lucide-react";
import Link from "next/link";

const quickLinks = [
  { href: "/admin/services", icon: Wrench, label: "Services", desc: "Manage your services" },
  { href: "/admin/gallery", icon: Image, label: "Gallery", desc: "Upload before/after images" },
  { href: "/admin/testimonials", icon: MessageSquare, label: "Testimonials", desc: "Edit client reviews" },
  { href: "/admin/contact", icon: Phone, label: "Contact", desc: "Update contact info" },
  { href: "/admin/content", icon: FileText, label: "Content", desc: "Edit site text" },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin panel.</p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{item.label}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </Link>
          );
        })}
      </div>

      {/* Instructions */}
      <div className="mt-8 p-6 rounded-xl bg-card border border-border">
        <h2 className="font-serif text-xl font-bold text-foreground mb-4">Getting Started</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Use the sidebar to navigate between sections</li>
          <li>• Each section supports all 3 languages (EN, RO, RU)</li>
          <li>• Changes are saved locally (connect database for production)</li>
          <li>• Upload images to replace placeholders</li>
        </ul>
      </div>
    </div>
  );
}
