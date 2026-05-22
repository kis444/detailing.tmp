import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .limit(1);
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data?.[0] || {});
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch contact info' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    // Verifică dacă există deja o înregistrare
    const { data: existing } = await supabase
      .from('contact_info')
      .select('id')
      .limit(1);
    
    let result;
    if (existing && existing.length > 0) {
      // Update existent
      result = await supabase
        .from('contact_info')
        .update({ ...body, updated_at: new Date() })
        .eq('id', existing[0].id)
        .select();
    } else {
      // Insert nou
      result = await supabase
        .from('contact_info')
        .insert({ ...body, updated_at: new Date() })
        .select();
    }
    
    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }
    
    return NextResponse.json(result.data?.[0]);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update contact info' }, { status: 500 });
  }
}
