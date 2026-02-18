import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

export async function POST(request: NextRequest) {
  try {
    const { phone, nickname, name, password, invitedBy, inviteCode } = await request.json();

    if (!phone || !nickname || !name || !password) {
      return NextResponse.json({ 
        success: false, 
        error: 'Все поля обязательны' 
      }, { status: 400 });
    }

    let users = [];
    try {
      const data = await fs.readFile(USERS_FILE, 'utf-8');
      users = JSON.parse(data);
    } catch {
      users = [];
    }

    if (users.some((u: any) => u.phone === phone)) {
      return NextResponse.json({ 
        success: false, 
        error: 'Телефон уже зарегистрирован' 
      }, { status: 400 });
    }

    if (users.some((u: any) => u.nickname === nickname)) {
      return NextResponse.json({ 
        success: false, 
        error: 'Никнейм уже занят' 
      }, { status: 400 });
    }

    const newUser = {
      id: uuidv4(),
      phone,
      nickname,
      name,
      password,
      role: 'user',
      avatar: null,
      invitedBy,
      inviteCode,
      createdAt: Date.now(),
      settings: {
        theme: 'dark',
        notifications: true,
        privacy: 'public'
      }
    };

    users.push(newUser);
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));

    const { password: _, ...userWithoutPassword } = newUser;
    
    return NextResponse.json({ 
      success: true, 
      user: userWithoutPassword 
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Ошибка сервера' 
    }, { status: 500 });
  }
}