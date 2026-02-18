import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const CHATS_DIR = path.join(DATA_DIR, 'chats');

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ chatId: string }> } 
) {
  try {
    const { chatId } = await context.params;
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ 
        success: false, 
        error: 'User ID required' 
      }, { status: 400 });
    }

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

    if (!chat.isGroup) {
      return NextResponse.json({ 
        success: false, 
        error: 'Can only leave group chats' 
      }, { status: 400 });
    }

    chat.participants = chat.participants.filter((id: string) => id !== userId);
    chat.updatedAt = Date.now();

    if (chat.participants.length < 2) {
      await fs.unlink(chatFile);
      
      const messagesFile = path.join(CHATS_DIR, `${chatId}_messages.json`);
      try {
        await fs.unlink(messagesFile);
      } catch {
        // Файла может не быть
      }

      const chatsListFile = path.join(DATA_DIR, 'chats.json');
      const chatsListData = await fs.readFile(chatsListFile, 'utf-8');
      const chatsList = JSON.parse(chatsListData);
      const updatedChatsList = chatsList.filter((id: string) => id !== chatId);
      await fs.writeFile(chatsListFile, JSON.stringify(updatedChatsList, null, 2));

      return NextResponse.json({ 
        success: true, 
        deleted: true 
      });
    }

    await fs.writeFile(chatFile, JSON.stringify(chat, null, 2));

    return NextResponse.json({ 
      success: true, 
      chat 
    });
  } catch (error) {
    console.error('Error leaving group:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to leave group' 
    }, { status: 500 });
  }
}