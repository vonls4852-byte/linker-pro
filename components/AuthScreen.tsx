"use client";
import React, { useState } from 'react';
import { ChevronLeft, Phone, Lock, AtSign, Smartphone, ArrowRight, User, Mail, Eye, EyeOff } from 'lucide-react';

interface AuthScreenProps {
  onAuthSuccess: (user: any) => void;
  themeColor: string;
}

interface UserData {
  fullName: string;
  phone: string;
  nickname: string;
  email?: string;
  password: string;
}

export default function AuthScreen({ onAuthSuccess, themeColor }: AuthScreenProps) {
  // Состояния
  const [mode, setMode] = useState<'choice' | 'login' | 'register'>('choice');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'nickname' | 'email'>('phone');
  const [formData, setFormData] = useState<UserData>({
    fullName: '',
    phone: '',
    nickname: '',
    email: '',
    password: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Простое обновление полей
  const handleInputChange = (field: keyof UserData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Регистрация
  const handleRegister = async () => {
    // Простая проверка на заполненность
    if (!formData.fullName || !formData.phone || !formData.nickname || !formData.password) {
      setError('Заполните все поля');
      return;
    }
    if (formData.password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          action: 'register',
          fullName: formData.fullName.trim(),
          phone: formData.phone.replace(/\D/g, ''),
          nickname: formData.nickname.trim().toLowerCase(),
          email: formData.email?.trim() || null,
          password: formData.password
        })
      });

      const data = await response.json();
      console.log('📥 Ответ:', data);

      if (response.ok) {
        const user = data.user || data;
        localStorage.setItem('current_user', JSON.stringify(user));
        onAuthSuccess(user);
      } else {
        setError(data.error || 'Ошибка регистрации');
      }
    } catch (error: any) {
      console.error('❌ Ошибка:', error);
      setError('Ошибка соединения с сервером');
    } finally {
      setLoading(false);
    }
  };

  // Вход
  const handleLogin = async () => {
    // Простая проверка
    if (!formData.password) {
      setError('Введите пароль');
      return;
    }
    if (loginMethod === 'phone' && !formData.phone) {
      setError('Введите номер телефона');
      return;
    }
    if (loginMethod === 'nickname' && !formData.nickname) {
      setError('Введите никнейм');
      return;
    }
    if (loginMethod === 'email' && !formData.email) {
      setError('Введите email');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload: any = {
        action: 'login',
        password: formData.password
      };

      if (loginMethod === 'phone') {
        payload.phone = formData.phone.replace(/\D/g, '');
      } else if (loginMethod === 'nickname') {
        payload.nickname = formData.nickname.trim().toLowerCase();
      } else if (loginMethod === 'email') {
        payload.email = formData.email?.trim();
      }

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log('📥 Ответ:', data);

      if (response.ok) {
        const user = data.user || data;
        localStorage.setItem('current_user', JSON.stringify(user));
        onAuthSuccess(user);
      } else {
        setError(data.error || 'Ошибка входа');
      }
    } catch (error: any) {
      console.error('❌ Ошибка:', error);
      setError('Ошибка соединения с сервером');
    } finally {
      setLoading(false);
    }
  };

  // Компонент поля ввода (МАКСИМАЛЬНО ПРОСТОЙ)
  const InputField = ({
    icon: Icon,
    type = 'text',
    placeholder,
    value,
    onChange,
    isPassword,
    showToggle,
    onToggleShow
  }: any) => (
    <div className="relative">
      <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
      <input
        type={isPassword ? (showToggle ? 'text' : 'password') : type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#111] rounded-2xl py-4 pl-12 pr-12 text-sm border border-white/5 focus:border-blue-500 outline-none transition-all"
      />
      {isPassword && (
        <button
          type="button"
          onClick={onToggleShow}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
        >
          {showToggle ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );

  // Экран выбора
  if (mode === 'choice') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-black text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-black italic tracking-tighter mb-2" style={{ color: themeColor }}>
              LINKER
            </h1>
            <p className="text-zinc-500 text-sm">Войди в мировую соцсеть</p>
          </div>

          <button
            onClick={() => { setMode('login'); setLoginMethod('phone'); }}
            className="w-full bg-[#111] hover:bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 flex items-center gap-4 transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Smartphone size={28} className="text-blue-500" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-lg">По номеру телефона</p>
              <p className="text-sm text-zinc-500">Быстрый вход</p>
            </div>
            <ArrowRight size={20} className="text-zinc-500 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => { setMode('login'); setLoginMethod('nickname'); }}
            className="w-full bg-[#111] hover:bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 flex items-center gap-4 transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <AtSign size={28} className="text-green-500" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-lg">По никнейму</p>
              <p className="text-sm text-zinc-500">Вход с паролем</p>
            </div>
            <ArrowRight size={20} className="text-zinc-500 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => { setMode('login'); setLoginMethod('email'); }}
            className="w-full bg-[#111] hover:bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 flex items-center gap-4 transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mail size={28} className="text-purple-500" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-lg">По email</p>
              <p className="text-sm text-zinc-500">Классический вход</p>
            </div>
            <ArrowRight size={20} className="text-zinc-500 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-[#0a0a0a] text-zinc-600">или</span>
            </div>
          </div>

          <button
            onClick={() => setMode('register')}
            className="w-full py-4 rounded-2xl font-bold border border-white/10 hover:bg-white/5 transition-all"
          >
            Создать новый аккаунт
          </button>
        </div>
      </div>
    );
  }

  // Экран регистрации
  if (mode === 'register') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-black text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <button
            onClick={() => setMode('choice')}
            className="text-zinc-500 hover:text-white transition-colors mb-4 flex items-center gap-2 group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Назад
          </button>

          <h2 className="text-3xl font-black mb-2" style={{ color: themeColor }}>
            Регистрация
          </h2>
          <p className="text-zinc-500 text-sm mb-8">Заполните все поля</p>

          <div className="space-y-4">
            <InputField
              icon={User}
              placeholder="Имя и фамилия"
              value={formData.fullName}
              onChange={(val: string) => handleInputChange('fullName', val)}
            />

            <InputField
              icon={Phone}
              placeholder="Номер телефона"
              value={formData.phone}
              onChange={(val: string) => handleInputChange('phone', val)}
            />

            <InputField
              icon={AtSign}
              placeholder="Никнейм"
              value={formData.nickname}
              onChange={(val: string) => handleInputChange('nickname', val)}
            />

            <InputField
              icon={Mail}
              placeholder="Email (необязательно)"
              type="email"
              value={formData.email || ''}
              onChange={(val: string) => handleInputChange('email', val)}
            />

            <InputField
              icon={Lock}
              placeholder="Пароль"
              value={formData.password}
              onChange={(val: string) => handleInputChange('password', val)}
              isPassword
              showToggle={showPassword}
              onToggleShow={() => setShowPassword(!showPassword)}
            />

            <InputField
              icon={Lock}
              placeholder="Повторите пароль"
              value={confirmPassword}
              onChange={setConfirmPassword}
              isPassword
              showToggle={showConfirmPassword}
              onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
              <p className="text-red-500 text-sm text-center">{error}</p>
            </div>
          )}

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-4 rounded-2xl font-bold transition-all disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: themeColor }}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Регистрация...
              </div>
            ) : 'Зарегистрироваться'}
          </button>
        </div>
      </div>
    );
  }

  // Экран входа
  if (mode === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-black text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <button
            onClick={() => setMode('choice')}
            className="text-zinc-500 hover:text-white transition-colors mb-4 flex items-center gap-2 group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Назад
          </button>

          <h2 className="text-3xl font-black mb-2" style={{ color: themeColor }}>
            Вход
          </h2>
          <p className="text-zinc-500 text-sm mb-8">
            {loginMethod === 'phone' && 'Введите номер телефона и пароль'}
            {loginMethod === 'nickname' && 'Введите никнейм и пароль'}
            {loginMethod === 'email' && 'Введите email и пароль'}
          </p>

          <div className="space-y-4">
            {loginMethod === 'phone' && (
              <InputField
                icon={Phone}
                placeholder="Номер телефона"
                value={formData.phone}
                onChange={(val: string) => handleInputChange('phone', val)}
              />
            )}

            {loginMethod === 'nickname' && (
              <InputField
                icon={AtSign}
                placeholder="Никнейм"
                value={formData.nickname}
                onChange={(val: string) => handleInputChange('nickname', val)}
              />
            )}

            {loginMethod === 'email' && (
              <InputField
                icon={Mail}
                placeholder="Email"
                type="email"
                value={formData.email || ''}
                onChange={(val: string) => handleInputChange('email', val)}
              />
            )}

            <InputField
              icon={Lock}
              placeholder="Пароль"
              value={formData.password}
              onChange={(val: string) => handleInputChange('password', val)}
              isPassword
              showToggle={showPassword}
              onToggleShow={() => setShowPassword(!showPassword)}
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
              <p className="text-red-500 text-sm text-center">{error}</p>
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-4 rounded-2xl font-bold transition-all disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: themeColor }}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Вход...
              </div>
            ) : 'Войти'}
          </button>

          <div className="text-center">
            <button
              onClick={() => setMode('register')}
              className="text-sm text-zinc-500 hover:text-white transition-colors"
            >
              Нет аккаунта? Зарегистрироваться
            </button>
          </div>
        </div>
      </div>
    );
  }
}