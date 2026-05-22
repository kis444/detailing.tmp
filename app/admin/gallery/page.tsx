"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2, Save, X, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Language = "en" | "ro" | "ru";

interface GalleryItem {
  id: number;
  title_ro: string;
  title_en: string;
  title_ru: string;
  before_image: string;
  after_image: string;
  category: string;
  order: number;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<GalleryItem | null>(null);
  const [activeLang, setActiveLang] = useState<Language>("en");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/admin/gallery");
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setEditData({ ...item });
  };

  const handleSave = async () => {
    if (!editData) return;
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/gallery/${editData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        await fetchItems();
        setEditingId(null);
        setEditData(null);
      } else {
        alert("Error saving gallery item");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Error saving gallery item");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData(null);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Ștergi această imagine?")) {
      try {
        const response = await fetch(`/api/admin/gallery/${id}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          await fetchItems();
        } else {
          alert("Failed to delete");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("Error deleting");
      }
    }
  };

  const handleAdd = async () => {
    const newItem = {
      title_ro: "Titlu Nou",
      title_en: "New Title",
      title_ru: "Новый Заголовок",
      before_image: "",
      after_image: "",
      category: "general",
      order: items.length + 1,
    };

    try {
      const response = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        await fetchItems();
      } else {
        alert("Failed to add");
      }
    } catch (error) {
      console.error("Add error:", error);
      alert("Error adding");
    }
  };

  const uploadImage = async (file: File, type: "before" | "after") => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (editData) {
        if (type === "before") {
          setEditData({ ...editData, before_image: data.url });
        } else {
          setEditData({ ...editData, after_image: data.url });
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const getTitle = (item: GalleryItem, lang: Language) => {
    if (lang === "ro") return item.title_ro;
    if (lang === "ru") return item.title_ru;
    return item.title_en;
  };

  const setTitle = (item: GalleryItem, lang: Language, value: string) => {
    if (lang === "ro") return { ...item, title_ro: value };
    if (lang === "ru") return { ...item, title_ru: value };
    return { ...item, title_en: value };
  };

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Gallery</h1>
          <p className="text-muted-foreground">Manage before/after images.</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Gallery Item
        </Button>
      </div>

      {/* Language Tabs */}
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

      {/* Gallery List */}
      <div className="space-y-4">
        {items.map((item) => {
          const isEditing = editingId === item.id;
          const data = isEditing && editData ? editData : item;

          return (
            <div
              key={item.id}
              className={cn(
                "p-4 rounded-xl bg-card border transition-colors",
                isEditing ? "border-primary" : "border-border"
              )}
            >
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Title ({activeLang.toUpperCase()})
                      </label>
                      <Input
                        value={getTitle(data, activeLang)}
                        onChange={(e) =>
                          setEditData(setTitle(data, activeLang, e.target.value))
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Order</label>
                      <Input
                        type="number"
                        value={data.order}
                        onChange={(e) => setEditData({ ...data, order: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Before Image</label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], "before")}
                        disabled={uploading}
                      />
                      {data.before_image && (
                        <img src={data.before_image} className="mt-2 h-24 object-cover rounded" alt="Before" />
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">After Image</label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], "after")}
                        disabled={uploading}
                      />
                      {data.after_image && (
                        <img src={data.after_image} className="mt-2 h-24 object-cover rounded" alt="After" />
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleSave} disabled={loading || uploading}>
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? "Saving..." : "Save"}
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold">{getTitle(item, activeLang)}</h3>
                    <div className="flex gap-2 mt-1">
                      {item.before_image && (
                        <span className="text-xs text-muted-foreground">✓ Before</span>
                      )}
                      {item.after_image && (
                        <span className="text-xs text-muted-foreground">✓ After</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {items.length === 0 && !loading && (
        <div className="text-center py-12 text-muted-foreground">
          <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No gallery items yet. Click "Add Gallery Item" to get started.</p>
        </div>
      )}
    </div>
  );
}
