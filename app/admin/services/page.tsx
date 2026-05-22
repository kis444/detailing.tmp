"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2, Save, X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

type Language = "en" | "ro" | "ru";

interface Service {
  id: number;
  title_ro: string;
  title_en: string;
  title_ru: string;
  description_ro: string;
  description_en: string;
  description_ru: string;
  price: string;
  duration: string;
  image: string;
  order: number;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Service | null>(null);
  const [activeLang, setActiveLang] = useState<Language>("en");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setEditData({ ...service });
  };

  const handleSave = async () => {
    if (!editData) return;
    setLoading(true);

    try {
      const method = "PUT";
      const url = `/api/admin/services/${editData.id}`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        await fetchServices();
        setEditingId(null);
        setEditData(null);
      } else {
        const error = await response.json();
        alert("Error: " + (error.error || "Failed to save"));
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Error saving service");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData(null);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        const response = await fetch(`/api/admin/services/${id}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          await fetchServices();
        } else {
          alert("Failed to delete");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("Error deleting service");
      }
    }
  };

  const handleAdd = async () => {
    const newService = {
      title_ro: "Serviciu Nou",
      title_en: "New Service",
      title_ru: "Новая Услуга",
      description_ro: "Descriere aici",
      description_en: "Description here",
      description_ru: "Описание здесь",
      price: "0 MDL",
      duration: "1-2 ore",
      image: "",
      order: services.length + 1,
    };

    try {
      const response = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService),
      });

      if (response.ok) {
        await fetchServices();
      } else {
        alert("Failed to add service");
      }
    } catch (error) {
      console.error("Add error:", error);
      alert("Error adding service");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editData) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setEditData({ ...editData, image: data.url });
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const getTitle = (service: Service, lang: Language) => {
    if (lang === "ro") return service.title_ro;
    if (lang === "ru") return service.title_ru;
    return service.title_en;
  };

  const getDescription = (service: Service, lang: Language) => {
    if (lang === "ro") return service.description_ro;
    if (lang === "ru") return service.description_ru;
    return service.description_en;
  };

  const setTitle = (service: Service, lang: Language, value: string) => {
    if (lang === "ro") return { ...service, title_ro: value };
    if (lang === "ru") return { ...service, title_ru: value };
    return { ...service, title_en: value };
  };

  const setDescription = (service: Service, lang: Language, value: string) => {
    if (lang === "ro") return { ...service, description_ro: value };
    if (lang === "ru") return { ...service, description_ru: value };
    return { ...service, description_en: value };
  };

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Services</h1>
          <p className="text-muted-foreground">Manage your service offerings.</p>
        </div>
        <Button onClick={handleAdd} className="bg-primary text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="flex gap-2 mb-6">
        {(["en", "ro", "ru"] as Language[]).map((lang) => (
          <Button
            key={lang}
            variant={activeLang === lang ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveLang(lang)}
            className={activeLang === lang ? "bg-primary text-primary-foreground" : ""}
          >
            {lang.toUpperCase()}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {services.map((service) => {
          const isEditing = editingId === service.id;
          const data = isEditing && editData ? editData : service;

          return (
            <div
              key={service.id}
              className={cn(
                "p-4 rounded-xl bg-card border transition-colors",
                isEditing ? "border-primary" : "border-border"
              )}
            >
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Title ({activeLang.toUpperCase()})
                      </label>
                      <Input
                        value={getTitle(data, activeLang)}
                        onChange={(e) => setEditData(setTitle(data, activeLang, e.target.value))}
                        className="bg-input border-border"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Price</label>
                      <Input
                        value={data.price}
                        onChange={(e) => setEditData({ ...data, price: e.target.value })}
                        className="bg-input border-border"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Duration</label>
                      <Input
                        value={data.duration}
                        onChange={(e) => setEditData({ ...data, duration: e.target.value })}
                        className="bg-input border-border"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Order</label>
                      <Input
                        type="number"
                        value={data.order}
                        onChange={(e) => setEditData({ ...data, order: parseInt(e.target.value) })}
                        className="bg-input border-border"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Description ({activeLang.toUpperCase()})
                    </label>
                    <textarea
                      value={getDescription(data, activeLang)}
                      onChange={(e) => setEditData(setDescription(data, activeLang, e.target.value))}
                      rows={2}
                      className="w-full px-3 py-2 rounded-md bg-input border border-border focus:border-primary focus:outline-none text-foreground resize-none"
                    />
                  </div>

                  {/* Image Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Service Image</label>
                    <div className="flex items-center gap-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="bg-input border-border flex-1"
                      />
                      {uploading && <span className="text-sm text-muted-foreground">Uploading...</span>}
                    </div>
                    {data.image && (
                      <div className="mt-2">
                        <img src={data.image} alt="Preview" className="h-20 w-auto object-cover rounded-lg" />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-1 text-xs text-destructive"
                          onClick={() => setEditData({ ...data, image: "" })}
                        >
                          Remove image
                        </Button>
                      </div>
                    )}
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
                <div className="flex items-center gap-4">
                  {service.image && (
                    <img src={service.image} alt={getTitle(service, activeLang)} className="w-16 h-16 object-cover rounded-lg" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{getTitle(service, activeLang)}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-1">{getDescription(service, activeLang)}</p>
                    <p className="text-primary font-medium mt-1">{service.price} • {service.duration}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(service.id)} className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
