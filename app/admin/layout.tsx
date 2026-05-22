"use client";

import { AdminAuthProvider, useAdminAuth } from "@/components/admin/admin-auth-provider";
import { AdminLogin } from "@/components/admin/admin-login";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-6 lg:p-8">{children}</main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminAuthProvider>
  );
}
