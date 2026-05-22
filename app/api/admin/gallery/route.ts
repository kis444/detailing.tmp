import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('order', { ascending: true });
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data || []);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from('gallery')
      .insert(body)
      .select();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data[0]);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 });
  }
}