import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Setat' : 'Nu e setat',
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Setat' : 'Nu e setat',
  });
}