import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads/avatars');

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('avatar') as File;
    const userId = formData.get('userId') as string;

    if (!file || !userId) {
      return NextResponse.json({ 
        success: false, 
        error: 'File and userId required' 
      }, { status: 400 });
    }

    await mkdir(UPLOAD_DIR, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split('.').pop();
    const filename = `${userId}-${uuidv4()}.${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    await writeFile(filepath, buffer);

    const avatarUrl = `/uploads/avatars/${filename}`;

    return NextResponse.json({ 
      success: true, 
      avatarUrl 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Upload failed' 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const avatarUrl = searchParams.get('avatarUrl');

    if (!userId || !avatarUrl) {
      return NextResponse.json({ 
        success: false, 
        error: 'UserId and avatarUrl required' 
      }, { status: 400 });
    }

    const filename = avatarUrl.split('/').pop();
    if (!filename) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid avatar URL' 
      }, { status: 400 });
    }

    const filepath = path.join(UPLOAD_DIR, filename);
    
    try {
      await unlink(filepath);
    } catch {
      // Файла может не быть
    }

    return NextResponse.json({ 
      success: true 
    });

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Delete failed' 
    }, { status: 500 });
  }
}