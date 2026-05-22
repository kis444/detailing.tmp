"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

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
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title_ro: "",
    title_en: "",
    title_ru: "",
    description_ro: "",
    description_en: "",
    description_ru: "",
    price: "",
    duration: "",
    image: "",
    order: 0,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const res = await fetch("/api/admin/services");
    const data = await res.json();
    setServices(data);
  };

  const handleSave = async () => {
    setLoading(true);
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/admin/services/${editingId}` : "/api/admin/services";
    
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    
    await fetchServices();
    resetForm();
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Ștergi acest serviciu?")) {
      await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      await fetchServices();
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({
      title_ro: "",
      title_en: "",
      title_ru: "",
      description_ro: "",
      description_en: "",
      description_ru: "",
      price: "",
      duration: "",
      image: "",
      order: 0,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = await res.json();
    setFormData(prev => ({ ...prev, image: data.url }));
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-serif font-bold">Manage Services</h1>
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </div>

        {(isAdding || editingId) && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title (RO)</label>
                  <Input
                    value={formData.title_ro}
                    onChange={(e) => setFormData(prev => ({ ...prev, title_ro: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Title (EN)</label>
                  <Input
                    value={formData.title_en}
                    onChange={(e) => setFormData(prev => ({ ...prev, title_en: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Title (RU)</label>
                  <Input
                    value={formData.title_ru}
                    onChange={(e) => setFormData(prev => ({ ...prev, title_ru: e.target.value }))}
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium">Description (RO)</label>
                  <Textarea
                    value={formData.description_ro}
                    onChange={(e) => setFormData(prev => ({ ...prev, description_ro: e.target.value }))}
                    rows={3}
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium">Description (EN)</label>
                  <Textarea
                    value={formData.description_en}
                    onChange={(e) => setFormData(prev => ({ ...prev, description_en: e.target.value }))}
                    rows={3}
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium">Description (RU)</label>
                  <Textarea
                    value={formData.description_ru}
                    onChange={(e) => setFormData(prev => ({ ...prev, description_ru: e.target.value }))}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Price</label>
                  <Input
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="€299"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Duration</label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="4-6 hours"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Order</label>
                  <Input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium">Image</label>
                  <Input type="file" accept="image/*" onChange={handleImageUpload} />
                  {formData.image && (
                    <img src={formData.image} className="mt-2 h-20 object-contain" alt="Preview" />
                  )}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleSave} disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? "Saving..." : "Save"}
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {services.map((service) => (
            <Card key={service.id}>
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="font-semibold">{service.title_ro}</h3>
                  <p className="text-sm text-muted-foreground">{service.price} • {service.duration}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => {
                    setEditingId(service.id);
                    setFormData(service);
                    setIsAdding(false);
                  }}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(service.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}