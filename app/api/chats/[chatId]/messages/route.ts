import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const DATA_DIR = path.join(process.cwd(), 'data');
const CHATS_DIR = path.join(DATA_DIR, 'chats');

// GET /api/chats/[chatId]/messages - получить сообщения чата
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ chatId: string }> }
) {
  try {
    const { chatId } = await context.params;
    
    const messagesFile = path.join(CHATS_DIR, `${chatId}_messages.json`);
    let messages = [];
    try {
      const data = await fs.readFile(messagesFile, 'utf-8');
      messages = JSON.parse(data);
    } catch {
      messages = [];
    }

    return NextResponse.json({ 
      success: true, 
      messages 
    });
  } catch (error) {
    console.error('Error loading messages:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to load messages' 
    }, { status: 500 });
  }
}

// POST /api/chats/[chatId]/messages - отправить сообщение
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ chatId: string }> }
) {
  try {
    const { chatId } = await context.params;
    const { content, userId, userName } = await request.json();

    if (!content || !userId) {
      return NextResponse.json({ 
        success: false, 
        error: 'Content and userId required' 
      }, { status: 400 });
    }

    // Загружаем чат
    const chatFile = path.join(CHATS_DIR, `${chatId}.json`);
    let chatData;
    try {
      chatData = await fs.readFile(chatFile, 'utf-8');
    } catch {
      return NextResponse.json({ 
        success: false, 
        error: 'Chat not found' 
      }, { status: 404 });
    }
    
    const chat = JSON.parse(chatData);

    // Загружаем сообщения
    const messagesFile = path.join(CHATS_DIR, `${chatId}_messages.json`);
    let messages = [];
    try {
      const data = await fs.readFile(messagesFile, 'utf-8');
      messages = JSON.parse(data);
    } catch {
      messages = [];
    }

    // Создаём новое сообщение
    const newMessage = {
      id: uuidv4(),
      chatId,
      userId,
      userName,
      content,
      timestamp: Date.now(),
      read: false
    };

    messages.push(newMessage);
    await fs.writeFile(messagesFile, JSON.stringify(messages, null, 2));

    // Обновляем lastMessage в чате
    chat.lastMessage = newMessage;
    chat.updatedAt = Date.now();
    await fs.writeFile(chatFile, JSON.stringify(chat, null, 2));

    return NextResponse.json({ 
      success: true, 
      message: newMessage 
    });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to send message' 
    }, { status: 500 });
  }
}