import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============ SERVICES ============
export async function getServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('order', { ascending: true });
  if (error) throw error;
  return data;
}

export async function createService(service: any) {
  const { data, error } = await supabase
    .from('services')
    .insert(service)
    .select();
  if (error) throw error;
  return data[0];
}

export async function updateService(id: number, service: any) {
  const { data, error } = await supabase
    .from('services')
    .update(service)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
}

export async function deleteService(id: number) {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}

// ============ GALLERY ============
export async function getGallery() {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('order', { ascending: true });
  if (error) throw error;
  return data;
}

export async function createGalleryItem(item: any) {
  const { data, error } = await supabase
    .from('gallery')
    .insert(item)
    .select();
  if (error) throw error;
  return data[0];
}

export async function updateGalleryItem(id: number, item: any) {
  const { data, error } = await supabase
    .from('gallery')
    .update(item)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
}

export async function deleteGalleryItem(id: number) {
  const { error } = await supabase
    .from('gallery')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}

// ============ TESTIMONIALS ============
export async function getTestimonials() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('order', { ascending: true });
  if (error) throw error;
  return data;
}

export async function createTestimonial(testimonial: any) {
  const { data, error } = await supabase
    .from('testimonials')
    .insert(testimonial)
    .select();
  if (error) throw error;
  return data[0];
}

export async function updateTestimonial(id: number, testimonial: any) {
  const { data, error } = await supabase
    .from('testimonials')
    .update(testimonial)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
}

export async function deleteTestimonial(id: number) {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}