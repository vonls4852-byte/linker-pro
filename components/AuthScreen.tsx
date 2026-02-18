"use client";
import React, { useState } from 'react';

interface AuthScreenProps {
  onAuthSuccess: (user: any) => void;
  themeColor: string;
}

// Простые SVG иконки (без библиотек)
const Icons = {
  User: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Phone: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12" y2="18" />
    </svg>
  ),
  AtSign: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
    </svg>
  ),
  Mail: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 7L2 7" />
    </svg>
  ),
  Lock: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  Smartphone: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12" y2="18" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  Eye: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  EyeOff: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ),
  CheckCircle: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  AlertCircle: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
};

export default function AuthScreen({ onAuthSuccess, themeColor }: AuthScreenProps) {
  const [mode, setMode] = useState<'choice' | 'login' | 'register'>('choice');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'nickname' | 'email'>('phone');
  
  // Состояния для полей
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI состояния
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Состояния для ошибок
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Валидация (только при отправке)
  const validateRegister = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Имя обязательно';
    else if (fullName.trim().length < 2) newErrors.fullName = 'Минимум 2 символа';

    if (!phone.trim()) newErrors.phone = 'Телефон обязателен';
    else if (!/^\+?[0-9]{10,15}$/.test(phone.replace(/\D/g, ''))) newErrors.phone = 'Неверный формат телефона';

    if (!nickname.trim()) newErrors.nickname = 'Никнейм обязателен';
    else if (!/^[a-zA-Z0-9_]{3,20}$/.test(nickname)) newErrors.nickname = '3-20 символов (буквы, цифры, _)';

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Неверный email';

    if (!password) newErrors.password = 'Пароль обязателен';
    else if (password.length < 6) newErrors.password = 'Минимум 6 символов';

    if (password !== confirmPassword) newErrors.confirmPassword = 'Пароли не совпадают';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLogin = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (loginMethod === 'phone' && !phone.trim()) newErrors.phone = 'Введите телефон';
    if (loginMethod === 'nickname' && !nickname.trim()) newErrors.nickname = 'Введите никнейм';
    if (loginMethod === 'email' && !email.trim()) newErrors.email = 'Введите email';
    
    if (!password) newErrors.password = 'Введите пароль';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateRegister()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'register',
          fullName: fullName.trim(),
          phone: phone.replace(/\D/g, ''),
          nickname: nickname.trim().toLowerCase(),
          email: email.trim() || null,
          password
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('current_user', JSON.stringify(data.user || data));
        setSuccess('Регистрация успешна!');
        setTimeout(() => onAuthSuccess(data.user || data), 1000);
      } else {
        setError(data.error || 'Ошибка регистрации');
      }
    } catch (err) {
      setError('Ошибка соединения');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!validateLogin()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const payload: any = {
        action: 'login',
        password
      };

      if (loginMethod === 'phone') payload.phone = phone.replace(/\D/g, '');
      else if (loginMethod === 'nickname') payload.nickname = nickname.trim().toLowerCase();
      else if (loginMethod === 'email') payload.email = email.trim();

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('current_user', JSON.stringify(data.user || data));
        setSuccess('Вход выполнен успешно!');
        setTimeout(() => onAuthSuccess(data.user || data), 1000);
      } else {
        setError(data.error || 'Ошибка входа');
      }
    } catch (err) {
      setError('Ошибка соединения');
    } finally {
      setLoading(false);
    }
  };

  // Компонент поля ввода
  const InputField = ({
    icon: Icon,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    isPassword,
    showToggle,
    onToggleShow
  }: any) => (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
        <Icon />
      </div>
      <input
        type={isPassword ? (showToggle ? 'text' : 'password') : type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-[#111] rounded-2xl py-4 pl-12 pr-12 text-sm border transition-all outline-none
          ${error 
            ? 'border-red-500/50 focus:border-red-500' 
            : value 
              ? 'border-green-500/50 focus:border-green-500' 
              : 'border-white/5 focus:border-blue-500'
          }`}
      />
      {isPassword && (
        <button
          type="button"
          onClick={onToggleShow}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
        >
          {showToggle ? <Icons.EyeOff /> : <Icons.Eye />}
        </button>
      )}
      {value && !error && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
          <Icons.CheckCircle />
        </div>
      )}
      {error && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500">
          <Icons.AlertCircle />
        </div>
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
            <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform text-blue-500">
              <Icons.Smartphone />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-lg">По номеру телефона</p>
              <p className="text-sm text-zinc-500">Быстрый вход</p>
            </div>
            <div className="text-zinc-500 group-hover:translate-x-1 transition-transform">
              <Icons.ArrowRight />
            </div>
          </button>

          <button
            onClick={() => { setMode('login'); setLoginMethod('nickname'); }}
            className="w-full bg-[#111] hover:bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 flex items-center gap-4 transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform text-green-500">
              <Icons.AtSign />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-lg">По никнейму</p>
              <p className="text-sm text-zinc-500">Вход с паролем</p>
            </div>
            <div className="text-zinc-500 group-hover:translate-x-1 transition-transform">
              <Icons.ArrowRight />
            </div>
          </button>

          <button
            onClick={() => { setMode('login'); setLoginMethod('email'); }}
            className="w-full bg-[#111] hover:bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 flex items-center gap-4 transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform text-purple-500">
              <Icons.Mail />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-lg">По email</p>
              <p className="text-sm text-zinc-500">Классический вход</p>
            </div>
            <div className="text-zinc-500 group-hover:translate-x-1 transition-transform">
              <Icons.ArrowRight />
            </div>
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
            <div className="group-hover:-translate-x-1 transition-transform">
              <Icons.ChevronLeft />
            </div>
            Назад
          </button>

          <h2 className="text-3xl font-black mb-2" style={{ color: themeColor }}>
            Регистрация
          </h2>
          <p className="text-zinc-500 text-sm mb-8">Заполните все поля для создания аккаунта</p>

          <div className="space-y-4">
            <InputField
              icon={Icons.User}
              placeholder="Имя и фамилия"
              value={fullName}
              onChange={setFullName}
              error={errors.fullName}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <Icons.AlertCircle />
                {errors.fullName}
              </p>
            )}

            <InputField
              icon={Icons.Phone}
              placeholder="Номер телефона"
              value={phone}
              onChange={setPhone}
              error={errors.phone}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <Icons.AlertCircle />
                {errors.phone}
              </p>
            )}

            <InputField
              icon={Icons.AtSign}
              placeholder="Никнейм"
              value={nickname}
              onChange={setNickname}
              error={errors.nickname}
            />
            {errors.nickname && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <Icons.AlertCircle />
                {errors.nickname}
              </p>
            )}

            <InputField
              icon={Icons.Mail}
              placeholder="Email (необязательно)"
              type="email"
              value={email}
              onChange={setEmail}
              error={errors.email}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <Icons.AlertCircle />
                {errors.email}
              </p>
            )}

            <InputField
              icon={Icons.Lock}
              placeholder="Пароль"
              value={password}
              onChange={setPassword}
              error={errors.password}
              isPassword
              showToggle={showPassword}
              onToggleShow={() => setShowPassword(!showPassword)}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <Icons.AlertCircle />
                {errors.password}
              </p>
            )}

            <InputField
              icon={Icons.Lock}
              placeholder="Повторите пароль"
              value={confirmPassword}
              onChange={setConfirmPassword}
              error={errors.confirmPassword}
              isPassword
              showToggle={showConfirmPassword}
              onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <Icons.AlertCircle />
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
              <p className="text-red-500 text-sm text-center flex items-center justify-center gap-2">
                <Icons.AlertCircle />
                {error}
              </p>
            </div>
          )}

          {success && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4">
              <p className="text-green-500 text-sm text-center flex items-center justify-center gap-2">
                <Icons.CheckCircle />
                {success}
              </p>
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
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <button
          onClick={() => setMode('choice')}
          className="text-zinc-500 hover:text-white transition-colors mb-4 flex items-center gap-2 group"
        >
          <div className="group-hover:-translate-x-1 transition-transform">
            <Icons.ChevronLeft />
          </div>
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
            <>
              <InputField
                icon={Icons.Phone}
                placeholder="Номер телефона"
                value={phone}
                onChange={setPhone}
                error={errors.phone}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <Icons.AlertCircle />
                  {errors.phone}
                </p>
              )}
            </>
          )}

          {loginMethod === 'nickname' && (
            <>
              <InputField
                icon={Icons.AtSign}
                placeholder="Никнейм"
                value={nickname}
                onChange={setNickname}
                error={errors.nickname}
              />
              {errors.nickname && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <Icons.AlertCircle />
                  {errors.nickname}
                </p>
              )}
            </>
          )}

          {loginMethod === 'email' && (
            <>
              <InputField
                icon={Icons.Mail}
                placeholder="Email"
                type="email"
                value={email}
                onChange={setEmail}
                error={errors.email}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <Icons.AlertCircle />
                  {errors.email}
                </p>
              )}
            </>
          )}

          <InputField
            icon={Icons.Lock}
            placeholder="Пароль"
            value={password}
            onChange={setPassword}
            error={errors.password}
            isPassword
            showToggle={showPassword}
            onToggleShow={() => setShowPassword(!showPassword)}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <Icons.AlertCircle />
              {errors.password}
            </p>
          )}
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
            <p className="text-red-500 text-sm text-center flex items-center justify-center gap-2">
              <Icons.AlertCircle />
              {error}
            </p>
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4">
            <p className="text-green-500 text-sm text-center flex items-center justify-center gap-2">
              <Icons.CheckCircle />
              {success}
            </p>
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