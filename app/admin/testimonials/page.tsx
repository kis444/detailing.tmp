"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, Save, X, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Language = "en" | "ro" | "ru";

interface Testimonial {
  id: number;
  name: string;
  content_ro: string;
  content_en: string;
  content_ru: string;
  rating: number;
  image: string;
  order: number;
}

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Testimonial | null>(null);
  const [activeLang, setActiveLang] = useState<Language>("en");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  const handleEdit = (item: Testimonial) => {
    setEditingId(item.id);
    setEditData({ ...item });
  };

  const handleSave = async () => {
    if (!editData) return;
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/testimonials/${editData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        await fetchItems();
        setEditingId(null);
        setEditData(null);
      } else {
        alert("Error saving");
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData(null);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Ștergi acest testimonial?")) {
      try {
        const response = await fetch(`/api/admin/testimonials/${id}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          await fetchItems();
        }
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  const handleAdd = async () => {
    const newItem = {
      name: "Nume Client",
      content_ro: "Text testimonial în română",
      content_en: "Testimonial text in English",
      content_ru: "Текст отзыва на русском",
      rating: 5,
      image: "",
      order: items.length + 1,
    };

    try {
      const response = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        await fetchItems();
      }
    } catch (error) {
      console.error("Add error:", error);
    }
  };

  const getContent = (item: Testimonial, lang: Language) => {
    if (lang === "ro") return item.content_ro;
    if (lang === "ru") return item.content_ru;
    return item.content_en;
  };

  const setContent = (item: Testimonial, lang: Language, value: string) => {
    if (lang === "ro") return { ...item, content_ro: value };
    if (lang === "ru") return { ...item, content_ru: value };
    return { ...item, content_en: value };
  };

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Testimonials</h1>
          <p className="text-muted-foreground">Manage client testimonials.</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
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

      <div className="space-y-4">
        {items.map((item) => {
          const isEditing = editingId === item.id;
          const data = isEditing && editData ? editData : item;

          return (
            <div key={item.id} className={cn("p-4 rounded-xl bg-card border", isEditing ? "border-primary" : "border-border")}>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <Input value={data.name} onChange={(e) => setEditData({ ...data, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
                      <Input type="number" min="1" max="5" value={data.rating} onChange={(e) => setEditData({ ...data, rating: parseInt(e.target.value) })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Order</label>
                      <Input type="number" value={data.order} onChange={(e) => setEditData({ ...data, order: parseInt(e.target.value) })} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Content ({activeLang.toUpperCase()})</label>
                    <Textarea rows={3} value={getContent(data, activeLang)} onChange={(e) => setEditData(setContent(data, activeLang, e.target.value))} />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave} disabled={loading}><Save className="h-4 w-4 mr-2" />Save</Button>
                    <Button variant="outline" onClick={handleCancel}><X className="h-4 w-4 mr-2" />Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{data.name}</h3>
                      <div className="flex gap-0.5">
                        {Array.from({ length: data.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2">{getContent(data, activeLang)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
