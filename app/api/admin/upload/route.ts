import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const timestamp = Date.now();
    // Înlocuiește spațiile și caracterele speciale din nume
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}-${cleanName}`;
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    
    // Creează folderul dacă nu există
    await mkdir(uploadDir, { recursive: true });
    
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);
    
    const publicUrl = `/uploads/${filename}`;
    console.log('File uploaded to:', publicUrl);
    
    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
