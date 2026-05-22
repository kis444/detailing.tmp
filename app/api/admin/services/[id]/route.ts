import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // Obține params corect în Next.js 15+
    const params = await context.params;
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }
    
    const body = await request.json();
    console.log('Updating service ID:', id);
    console.log('Update data:', body);
    
    const { data, error } = await supabase
      .from('services')
      .update(body)
      .eq('id', id)
      .select();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data?.[0] || { success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
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
      .from('services')
      .delete()
      .eq('id', id);
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
