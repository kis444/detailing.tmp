import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ 
        error: 'Missing env vars',
        url: !!supabaseUrl,
        key: !!supabaseKey
      });
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase.from('services').select('*').limit(1);
    
    return NextResponse.json({ 
      success: !error, 
      data: data,
      error: error?.message 
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}