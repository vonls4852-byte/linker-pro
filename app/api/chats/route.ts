import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CHATS_FILE = path.join(process.cwd(), 'data', 'chats.json');
const MESSAGES_DIR = path.join(process.cwd(), 'data', 'messages');

// Инициализация папок
const initFolders = () => {
  if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
    fs.mkdirSync(path.join(process.cwd(), 'data'));
  }
  if (!fs.existsSync(MESSAGES_DIR)) {
    fs.mkdirSync(MESSAGES_DIR);
  }
  if (!fs.existsSync(CHATS_FILE)) {
    fs.writeFileSync(CHATS_FILE, JSON.stringify([]));
  }
};

// GET - получить все чаты пользователя
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ success: false, error: 'userId обязателен' }, { status: 400 });
    }

    initFolders();
    
    const chats = JSON.parse(fs.readFileSync(CHATS_FILE, 'utf8'));
    
    // Фильтруем чаты, где участвует пользователь
    const userChats = chats.filter((chat: any) => 
      chat.participants.includes(userId)
    );

    // Для каждого чата добавляем последнее сообщение
    const chatsWithLastMessage = userChats.map((chat: any) => {
      const messagesFile = path.join(MESSAGES_DIR, `${chat.id}.json`);
      let lastMessage = null;
      
      if (fs.existsSync(messagesFile)) {
        const messages = JSON.parse(fs.readFileSync(messagesFile, 'utf8'));
        lastMessage = messages[messages.length - 1] || null;
      }
      
      return {
        ...chat,
        lastMessage
      };
    });

    return NextResponse.json({ success: true, chats: chatsWithLastMessage });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Ошибка загрузки чатов' }, { status: 500 });
  }
}

// POST - создать новый чат (личный или групповой)
export async function POST(request: Request) {
  try {
    const { participants, name, currentUserId, isGroup = false } = await request.json();

    if (!participants || !currentUserId) {
      return NextResponse.json({ success: false, error: 'Не хватает данных' }, { status: 400 });
    }

    initFolders();

    // Генерируем ID чата
    const chatId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Все участники (включая текущего пользователя)
    const allParticipants = [currentUserId, ...participants];
    
    // Для личного чата имя = имя собеседника
    // Для группы - либо переданное имя, либо генерируем
    let chatName = name;
    if (!isGroup) {
      // Для личного чата имя не нужно - будет показано имя собеседника
      chatName = '';
    } else if (!chatName) {
      chatName = `Группа ${allParticipants.length} участников`;
    }

    // Создаем чат
    const newChat = {
      id: chatId,
      name: chatName,
      participants: allParticipants,
      isGroup,
      createdAt: new Date().toISOString(),
      createdBy: currentUserId,
      avatar: isGroup ? null : undefined // Для группы можно добавить общий аватар
    };

    // Добавляем в общий список чатов
    const chats = JSON.parse(fs.readFileSync(CHATS_FILE, 'utf8'));
    chats.push(newChat);
    fs.writeFileSync(CHATS_FILE, JSON.stringify(chats, null, 2));

    // Создаем пустой файл для сообщений
    fs.writeFileSync(path.join(MESSAGES_DIR, `${chatId}.json`), JSON.stringify([]));

    return NextResponse.json({ success: true, chat: newChat });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Ошибка создания чата' }, { status: 500 });
  }
}