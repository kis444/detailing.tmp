"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminAuth } from "@/components/admin/admin-auth-provider";
import { Lock } from "lucide-react";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAdminAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (!success) {
      setError("Invalid password");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-card rounded-xl border border-border">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground text-sm mt-1">Enter password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Password"
              className="bg-input border-border"
            />
            {error && <p className="text-destructive text-sm mt-1">{error}</p>}
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Login
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Default password: admin123
        </p>
      </div>
    </div>
  );
}
