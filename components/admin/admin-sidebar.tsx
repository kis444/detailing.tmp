"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/components/admin/admin-auth-provider";
import {
  LayoutDashboard,
  Wrench,
  Image,
  MessageSquare,
  Phone,
  FileText,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/services", icon: Wrench, label: "Services" },
  { href: "/admin/gallery", icon: Image, label: "Gallery" },
  { href: "/admin/testimonials", icon: MessageSquare, label: "Testimonials" },
  { href: "/admin/contact", icon: Phone, label: "Contact Info" },
  { href: "/admin/content", icon: FileText, label: "Site Content" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAdminAuth();

  return (
    <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2 text-sidebar-foreground hover:text-primary">
          <ChevronLeft className="h-4 w-4" />
          <span className="text-sm">Back to Site</span>
        </Link>
        <h1 className="font-serif text-xl font-bold text-sidebar-foreground mt-4">Admin Panel</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          onClick={logout}
          className="w-full justify-start text-sidebar-foreground hover:text-destructive"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
