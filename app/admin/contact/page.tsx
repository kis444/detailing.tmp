"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

type Language = "en" | "ro" | "ru";

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

export default function AdminContactPage() {
  const [data, setData] = useState<ContactInfo>({
    phone: "",
    email: "",
    address_ro: "",
    address_en: "",
    address_ru: "",
    facebook: "",
    instagram: "",
    whatsapp: "",
  });
  const [activeLang, setActiveLang] = useState<Language>("en");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/contact");
      const contact = await res.json();
      if (contact && Object.keys(contact).length > 0) {
        setData(contact);
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Contact info saved successfully!");
      } else {
        alert("Error saving");
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setSaving(false);
    }
  };

  const getAddress = () => {
    if (activeLang === "ro") return data.address_ro;
    if (activeLang === "ru") return data.address_ru;
    return data.address_en;
  };

  const setAddress = (value: string) => {
    if (activeLang === "ro") setData({ ...data, address_ro: value });
    else if (activeLang === "ru") setData({ ...data, address_ru: value });
    else setData({ ...data, address_en: value });
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Contact Information</h1>
          <p className="text-muted-foreground">Manage contact details displayed on the site.</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save All"}
        </Button>
      </div>

      <div className="flex gap-2 mb-6">
        {(["en", "ro", "ru"] as Language[]).map((lang) => (
          <Button key={lang} variant={activeLang === lang ? "default" : "outline"} size="sm" onClick={() => setActiveLang(lang)}>
            {lang.toUpperCase()}
          </Button>
        ))}
      </div>

      <div className="space-y-6 bg-card p-6 rounded-xl border border-border">
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <Input value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} placeholder="+373 XX XXX XXX" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <Input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="contact@example.com" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address ({activeLang.toUpperCase()})</label>
          <Textarea rows={2} value={getAddress()} onChange={(e) => setAddress(e.target.value)} placeholder="Street, City, Country" />
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="font-semibold mb-4">Social Media Links</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Facebook URL</label>
              <Input value={data.facebook} onChange={(e) => setData({ ...data, facebook: e.target.value })} placeholder="https://facebook.com/..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Instagram URL</label>
              <Input value={data.instagram} onChange={(e) => setData({ ...data, instagram: e.target.value })} placeholder="https://instagram.com/..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">WhatsApp URL</label>
              <Input value={data.whatsapp} onChange={(e) => setData({ ...data, whatsapp: e.target.value })} placeholder="https://wa.me/373..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
