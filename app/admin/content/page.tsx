"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

type Language = "en" | "ro" | "ru";

interface ContentSection {
  key: string;
  label: string;
  isTextarea?: boolean;
}

const sections: ContentSection[] = [
  { key: "hero_title", label: "Hero Title", isTextarea: false },
  { key: "hero_subtitle", label: "Hero Subtitle", isTextarea: true },
  { key: "hero_badge", label: "Hero Badge (Location)", isTextarea: false },
  { key: "cta_title", label: "CTA Title", isTextarea: false },
  { key: "cta_subtitle", label: "CTA Subtitle", isTextarea: true },
  { key: "cta_button", label: "CTA Button Text", isTextarea: false },
  { key: "footer_tagline", label: "Footer Tagline", isTextarea: true },
  { key: "footer_rights", label: "Footer Rights Text", isTextarea: false },
];

export default function AdminContentPage() {
  const [content, setContent] = useState<Record<string, { ro: string; en: string; ru: string }>>({});
  const [activeLang, setActiveLang] = useState<Language>("en");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/site-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (response.ok) {
        alert("Content saved successfully!");
      } else {
        alert("Error saving");
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setSaving(false);
    }
  };

  const updateContent = (key: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [activeLang]: value
      }
    }));
  };

  const getValue = (key: string) => {
    return content[key]?.[activeLang] || "";
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Site Content</h1>
          <p className="text-muted-foreground">Manage all text content on the website.</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save All"}
        </Button>
      </div>

      <div className="flex gap-2 mb-6">
        {(["en", "ro", "ru"] as Language[]).map((lang) => (
          <Button
            key={lang}
            variant={activeLang === lang ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveLang(lang)}
          >
            {lang.toUpperCase()}
          </Button>
        ))}
      </div>

      <div className="space-y-6 bg-card p-6 rounded-xl border border-border">
        {sections.map((section) => (
          <div key={section.key}>
            <label className="block text-sm font-medium mb-1">
              {section.label} ({activeLang.toUpperCase()})
            </label>
            {section.isTextarea ? (
              <Textarea
                rows={3}
                value={getValue(section.key)}
                onChange={(e) => updateContent(section.key, e.target.value)}
                className="bg-input border-border"
              />
            ) : (
              <Input
                value={getValue(section.key)}
                onChange={(e) => updateContent(section.key, e.target.value)}
                className="bg-input border-border"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
