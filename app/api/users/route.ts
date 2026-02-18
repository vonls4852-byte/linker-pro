import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

// Тип для пользователя
interface User {
  id: string;
  fullName: string;
  phone: string;
  nickname: string;
  email: string | null;
  password: string;
  createdAt: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('📥 Запрос:', body);

    // ===== РЕГИСТРАЦИЯ =====
    if (body.action === 'register') {
      const { fullName, phone, nickname, email, password } = body;

      // Проверка обязательных полей
      if (!fullName || !phone || !nickname || !password) {
        return NextResponse.json({
          success: false,
          error: 'Заполните все обязательные поля'
        }, { status: 400 });
      }

      // Проверяем, существует ли уже пользователь с таким nickname или phone
      const existingByNickname = await kv.get(`user:nickname:${nickname}`);
      const existingByPhone = await kv.get(`user:phone:${phone}`);
      
      if (existingByNickname || existingByPhone) {
        return NextResponse.json({
          success: false,
          error: 'Пользователь с таким никнеймом или телефоном уже существует'
        }, { status: 409 });
      }

      // Создаем нового пользователя
      const userId = Date.now().toString();
      const newUser: User = {
        id: userId,
        fullName,
        phone,
        nickname,
        email: email || null,
        password, // В реальном проекте надо хешировать!
        createdAt: new Date().toISOString()
      };

      // Сохраняем в Redis
      await kv.set(`user:id:${userId}`, newUser);
      await kv.set(`user:nickname:${nickname}`, userId);
      await kv.set(`user:phone:${phone}`, userId);
      if (email) {
        await kv.set(`user:email:${email}`, userId);
      }
      await kv.sadd('users:all', userId);

      console.log('✅ Пользователь создан:', nickname);

      // Отправляем данные без пароля
      const { password: _, ...userWithoutPassword } = newUser;

      return NextResponse.json({
        success: true,
        message: 'Регистрация успешна',
        user: userWithoutPassword
      }, { status: 201 });
    }

    // ===== ВХОД =====
    if (body.action === 'login') {
      const { phone, nickname, email, password } = body;

      console.log('🔍 Поиск пользователя...');

      let userId = null;

      // Ищем пользователя
      if (phone) {
        userId = await kv.get(`user:phone:${phone}`);
      } else if (nickname) {
        userId = await kv.get(`user:nickname:${nickname}`);
      } else if (email) {
        userId = await kv.get(`user:email:${email}`);
      }

      if (!userId) {
        console.log('❌ Пользователь не найден');
        return NextResponse.json({
          success: false,
          error: 'Пользователь не найден'
        }, { status: 404 });
      }

      // Получаем полные данные пользователя
      const user = await kv.get(`user:id:${userId}`) as User | null;

      if (!user) {
        return NextResponse.json({
          success: false,
          error: 'Ошибка загрузки данных'
        }, { status: 500 });
      }

      // Проверяем пароль
      if (user.password !== password) {
        console.log('❌ Неверный пароль');
        return NextResponse.json({
          success: false,
          error: 'Неверный пароль'
        }, { status: 401 });
      }

      console.log('✅ Вход выполнен:', user.nickname);

      // Отправляем данные без пароля
      const { password: _, ...userWithoutPassword } = user;

      return NextResponse.json({
        success: true,
        message: 'Вход выполнен успешно',
        user: userWithoutPassword
      }, { status: 200 });
    }

    return NextResponse.json({
      success: false,
      error: 'Неизвестное действие'
    }, { status: 400 });

  } catch (error) {
    console.error('❌ Ошибка сервера:', error);
    return NextResponse.json({
      success: false,
      error: 'Внутренняя ошибка сервера'
    }, { status: 500 });
  }
}

// GET запрос для просмотра пользователей
export async function GET() {
  try {
    // Получаем всех пользователей
    const userIds = await kv.smembers('users:all');
    const users = [];
    
    for (const userId of userIds) {
      const user = await kv.get(`user:id:${userId}`) as User | null;
      if (user) {
        const { password, ...rest } = user;
        users.push(rest);
      }
    }
    
    return NextResponse.json({
      users,
      total: users.length
    });
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка загрузки' }, { status: 500 });
  }
}