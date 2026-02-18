import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const DATA_DIR = path.join(process.cwd(), 'data');
const CHATS_DIR = path.join(DATA_DIR, 'chats');

// GET /api/chats/[chatId]/participants - получить участников группы
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ chatId: string }> }
) {
  try {
    const { chatId } = await context.params;
    
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

    const usersFile = path.join(DATA_DIR, 'users.json');
    const usersData = await fs.readFile(usersFile, 'utf-8');
    const users = JSON.parse(usersData);

    const participants = chat.participants.map((participantId: string) => {
      const user = users.find((u: any) => u.id === participantId);
      return {
        id: participantId,
        name: user?.name || user?.fullName || 'Пользователь',
        nickname: user?.nickname || 'user',
        avatar: user?.avatar || null,
        role: user?.role || 'user'
      };
    });

    return NextResponse.json({ 
      success: true, 
      participants 
    });
  } catch (error) {
    console.error('Error loading participants:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to load participants' 
    }, { status: 500 });
  }
}

// POST /api/chats/[chatId]/participants - добавить участников в группу
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ chatId: string }> }
) {
  try {
    const { chatId } = await context.params;
    const { participantIds } = await request.json();

    if (!participantIds || !Array.isArray(participantIds) || participantIds.length === 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'Participant IDs required' 
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
        error: 'Can only add participants to group chats' 
      }, { status: 400 });
    }

    const usersFile = path.join(DATA_DIR, 'users.json');
    const usersData = await fs.readFile(usersFile, 'utf-8');
    const users = JSON.parse(usersData);

    const validParticipants = participantIds.filter((id: string) => 
      users.some((u: any) => u.id === id)
    );

    if (validParticipants.length === 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'No valid participants to add' 
      }, { status: 400 });
    }

    const newParticipants = validParticipants.filter(
      (id: string) => !chat.participants.includes(id)
    );
    
    if (newParticipants.length === 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'All participants are already in the group' 
      }, { status: 400 });
    }
    
    chat.participants = [...chat.participants, ...newParticipants];
    chat.updatedAt = Date.now();

    await fs.writeFile(chatFile, JSON.stringify(chat, null, 2));

    const messagesFile = path.join(CHATS_DIR, `${chatId}_messages.json`);
    let messages = [];
    
    try {
      const messagesData = await fs.readFile(messagesFile, 'utf-8');
      messages = JSON.parse(messagesData);
    } catch {
      messages = [];
    }

    const userId = request.headers.get('x-user-id') || 'system';
    const adder = users.find((u: any) => u.id === userId);
    const adderName = adder?.name || adder?.nickname || 'Пользователь';

    const addedNames = newParticipants.map((id: string) => {
      const user = users.find((u: any) => u.id === id);
      return user?.name || user?.nickname || id;
    });

    const systemMessage = {
      id: uuidv4(),
      chatId,
      senderId: 'system',
      senderName: 'Система',
      text: `${adderName} добавил(а) ${addedNames.join(', ')}`,
      timestamp: Date.now(),
      read: false,
      system: true
    };

    messages.push(systemMessage);
    await fs.writeFile(messagesFile, JSON.stringify(messages, null, 2));

    chat.lastMessage = systemMessage;
    await fs.writeFile(chatFile, JSON.stringify(chat, null, 2));

    const chatsListFile = path.join(DATA_DIR, 'chats.json');
    const chatsListData = await fs.readFile(chatsListFile, 'utf-8');
    const chatsList = JSON.parse(chatsListData);
    
    if (!chatsList.includes(chatId)) {
      chatsList.push(chatId);
      await fs.writeFile(chatsListFile, JSON.stringify(chatsList, null, 2));
    }

    return NextResponse.json({ 
      success: true, 
      chat,
      addedParticipants: newParticipants
    });
  } catch (error) {
    console.error('Error adding participants:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to add participants' 
    }, { status: 500 });
  }
}

// DELETE /api/chats/[chatId]/participants - удалить участника из группы
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ chatId: string }> }
) {
  try {
    const { chatId } = await context.params;
    const { userId, removedByUserId } = await request.json();

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
        error: 'Can only remove participants from group chats' 
      }, { status: 400 });
    }

    if (!chat.participants.includes(userId)) {
      return NextResponse.json({ 
        success: false, 
        error: 'User is not a participant of this chat' 
      }, { status: 400 });
    }

    chat.participants = chat.participants.filter((id: string) => id !== userId);
    chat.updatedAt = Date.now();

    const usersFile = path.join(DATA_DIR, 'users.json');
    const usersData = await fs.readFile(usersFile, 'utf-8');
    const users = JSON.parse(usersData);

    const messagesFile = path.join(CHATS_DIR, `${chatId}_messages.json`);
    let messages = [];
    
    try {
      const messagesData = await fs.readFile(messagesFile, 'utf-8');
      messages = JSON.parse(messagesData);
    } catch {
      messages = [];
    }

    const removedUser = users.find((u: any) => u.id === userId);
    const removedByName = removedUser?.name || removedUser?.nickname || 'Пользователь';
    
    let actionText = '';
    if (removedByUserId === userId) {
      actionText = `${removedByName} покинул(а) группу`;
    } else {
      const remover = users.find((u: any) => u.id === removedByUserId);
      const removerName = remover?.name || remover?.nickname || 'Пользователь';
      actionText = `${removerName} удалил(а) ${removedByName} из группы`;
    }

    const systemMessage = {
      id: uuidv4(),
      chatId,
      senderId: 'system',
      senderName: 'Система',
      text: actionText,
      timestamp: Date.now(),
      read: false,
      system: true
    };

    messages.push(systemMessage);
    await fs.writeFile(messagesFile, JSON.stringify(messages, null, 2));

    if (chat.participants.length < 2) {
      await fs.unlink(chatFile);
      
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

    chat.lastMessage = systemMessage;
    await fs.writeFile(chatFile, JSON.stringify(chat, null, 2));

    return NextResponse.json({ 
      success: true, 
      chat 
    });
  } catch (error) {
    console.error('Error removing participant:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to remove participant' 
    }, { status: 500 });
  }
}