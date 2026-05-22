"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Wrench, Image, MessageSquare, Phone, FileText } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Services", icon: Wrench, href: "/admin/services", color: "bg-blue-500/20 text-blue-500" },
  { label: "Gallery", icon: Image, href: "/admin/gallery", color: "bg-green-500/20 text-green-500" },
  { label: "Testimonials", icon: MessageSquare, href: "/admin/testimonials", color: "bg-purple-500/20 text-purple-500" },
  { label: "Contact", icon: Phone, href: "/admin/contact", color: "bg-yellow-500/20 text-yellow-500" },
  { label: "Content", icon: FileText, href: "/admin/content", color: "bg-pink-500/20 text-pink-500" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to admin panel</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.href} href={stat.href}>
                <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{stat.label}</h3>
                      <p className="text-sm text-muted-foreground">Manage {stat.label.toLowerCase()}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}