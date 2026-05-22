import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const params = await context.params;
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }
    
    const body = await request.json();
    const { data, error } = await supabase
      .from('testimonials')
      .update(body)
      .eq('id', id)
      .select();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data?.[0] || { success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const params = await context.params;
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }
    
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
