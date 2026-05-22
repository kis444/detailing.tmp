import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('*');
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    // Transformă array-ul într-un obiect { key: { ro, en, ru } }
    const content: Record<string, { ro: string; en: string; ru: string }> = {};
    data?.forEach(item => {
      content[item.key] = {
        ro: item.value_ro || '',
        en: item.value_en || '',
        ru: item.value_ru || ''
      };
    });
    
    return NextResponse.json(content);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch site content' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updates = await request.json();
    
    for (const [key, values] of Object.entries(updates)) {
      const typedValues = values as { ro: string; en: string; ru: string };
      
      // Verifică dacă există deja
      const { data: existing } = await supabase
        .from('site_content')
        .select('id')
        .eq('key', key)
        .limit(1);
      
      if (existing && existing.length > 0) {
        // Update
        await supabase
          .from('site_content')
          .update({
            value_ro: typedValues.ro,
            value_en: typedValues.en,
            value_ru: typedValues.ru,
            updated_at: new Date()
          })
          .eq('key', key);
      } else {
        // Insert
        await supabase
          .from('site_content')
          .insert({
            key: key,
            value_ro: typedValues.ro,
            value_en: typedValues.en,
            value_ru: typedValues.ru
          });
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update site content' }, { status: 500 });
  }
}
