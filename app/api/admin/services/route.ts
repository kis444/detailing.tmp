import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    console.log('1. API called');
    console.log('2. Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Yes' : 'No');
    
    const { data, error } = await supabase
      .from('services')
      .select('*');
    
    console.log('3. Data:', data);
    console.log('4. Error:', error);
    
    if (error) {
      return NextResponse.json({ error: error.message, details: error }, { status: 500 });
    }
    
    return NextResponse.json(data || []);
  } catch (err) {
    console.error('Catch error:', err);
    return NextResponse.json({ error: 'Server error', details: String(err) }, { status: 500 });
  }
}