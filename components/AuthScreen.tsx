"use client";
import React, { useState } from 'react';
import { ChevronLeft, Phone, Lock, AtSign, Smartphone, ArrowRight, User, Mail, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

interface AuthScreenProps {
  onAuthSuccess: (user: any) => void;
  themeColor: string;
}

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
  
  // Состояния для ошибок (только после отправки)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Валидация полей (используется только при отправке)
  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'fullName':
        return !value.trim() ? 'Имя обязательно' : 
               value.trim().length < 2 ? 'Минимум 2 символа' : '';
      case 'phone':
        return !value.trim() ? 'Телефон обязателен' :
               !/^\+?[0-9]{10,15}$/.test(value.replace(/\D/g, '')) ? 'Неверный формат телефона' : '';
      case 'nickname':
        return !value.trim() ? 'Никнейм обязателен' :
               !/^[a-zA-Z0-9_]{3,20}$/.test(value) ? '3-20 символов (буквы, цифры, _)' : '';
      case 'email':
        return value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Неверный email' : '';
      case 'password':
        return !value ? 'Пароль обязателен' :
               value.length < 6 ? 'Минимум 6 символов' : '';
      default:
        return '';
    }
  };

  // Проверка формы регистрации
  const validateRegisterForm = (): boolean => {
    const errors: Record<string, string> = {
      fullName: validateField('fullName', fullName),
      phone: validateField('phone', phone),
      nickname: validateField('nickname', nickname),
      email: validateField('email', email),
      password: validateField('password', password),
      confirmPassword: password !== confirmPassword ? 'Пароли не совпадают' : ''
    };
    
    setValidationErrors(errors);
    return !Object.values(errors).some(msg => msg !== '');
  };

  // Проверка формы входа
  const validateLoginForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (loginMethod === 'phone') errors.phone = validateField('phone', phone);
    if (loginMethod === 'nickname') errors.nickname = validateField('nickname', nickname);
    if (loginMethod === 'email') errors.email = validateField('email', email);
    errors.password = validateField('password', password);
    
    setValidationErrors(errors);
    return !Object.values(errors).some(msg => msg !== '');
  };

  // Регистрация
  const handleRegister = async () => {
    if (!validateRegisterForm()) return;

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

  // Вход
  const handleLogin = async () => {
    if (!validateLoginForm()) return;

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

  // Компонент поля ввода (БЕЗ onBlur!)
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
      <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
      <input
        type={isPassword ? (showToggle ? 'text' : 'password') : type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-[#111] rounded-2xl py-4 pl-12 pr-12 text-sm border transition-all outline-none
          ${error && error !== ''
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
          {showToggle ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
      {value && (!error || error === '') && (
        <CheckCircle size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />
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
          <p className="text-zinc-500 text-sm mb-8">Заполните все поля для создания аккаунта</p>

          <div className="space-y-4">
            <div>
              <InputField
                icon={User}
                placeholder="Имя и фамилия"
                value={fullName}
                onChange={setFullName}
                error={validationErrors.fullName}
              />
              {validationErrors.fullName && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {validationErrors.fullName}
                </p>
              )}
            </div>

            <div>
              <InputField
                icon={Phone}
                placeholder="Номер телефона"
                value={phone}
                onChange={setPhone}
                error={validationErrors.phone}
              />
              {validationErrors.phone && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {validationErrors.phone}
                </p>
              )}
            </div>

            <div>
              <InputField
                icon={AtSign}
                placeholder="Никнейм"
                value={nickname}
                onChange={setNickname}
                error={validationErrors.nickname}
              />
              {validationErrors.nickname && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {validationErrors.nickname}
                </p>
              )}
            </div>

            <div>
              <InputField
                icon={Mail}
                placeholder="Email (необязательно)"
                type="email"
                value={email}
                onChange={setEmail}
                error={validationErrors.email}
              />
              {validationErrors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {validationErrors.email}
                </p>
              )}
            </div>

            <div>
              <InputField
                icon={Lock}
                placeholder="Пароль"
                value={password}
                onChange={setPassword}
                error={validationErrors.password}
                isPassword
                showToggle={showPassword}
                onToggleShow={() => setShowPassword(!showPassword)}
              />
              {validationErrors.password && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {validationErrors.password}
                </p>
              )}
            </div>

            <div>
              <InputField
                icon={Lock}
                placeholder="Повторите пароль"
                value={confirmPassword}
                onChange={setConfirmPassword}
                error={validationErrors.confirmPassword}
                isPassword
                showToggle={showConfirmPassword}
                onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
              />
              {validationErrors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {validationErrors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
              <p className="text-red-500 text-sm text-center flex items-center justify-center gap-2">
                <AlertCircle size={16} />
                {error}
              </p>
            </div>
          )}

          {success && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4">
              <p className="text-green-500 text-sm text-center flex items-center justify-center gap-2">
                <CheckCircle size={16} />
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
            <div>
              <InputField
                icon={Phone}
                placeholder="Номер телефона"
                value={phone}
                onChange={setPhone}
                error={validationErrors.phone}
              />
              {validationErrors.phone && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {validationErrors.phone}
                </p>
              )}
            </div>
          )}

          {loginMethod === 'nickname' && (
            <div>
              <InputField
                icon={AtSign}
                placeholder="Никнейм"
                value={nickname}
                onChange={setNickname}
                error={validationErrors.nickname}
              />
              {validationErrors.nickname && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {validationErrors.nickname}
                </p>
              )}
            </div>
          )}

          {loginMethod === 'email' && (
            <div>
              <InputField
                icon={Mail}
                placeholder="Email"
                type="email"
                value={email}
                onChange={setEmail}
                error={validationErrors.email}
              />
              {validationErrors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {validationErrors.email}
                </p>
              )}
            </div>
          )}

          <div>
            <InputField
              icon={Lock}
              placeholder="Пароль"
              value={password}
              onChange={setPassword}
              error={validationErrors.password}
              isPassword
              showToggle={showPassword}
              onToggleShow={() => setShowPassword(!showPassword)}
            />
            {validationErrors.password && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle size={12} />
                {validationErrors.password}
              </p>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
            <p className="text-red-500 text-sm text-center flex items-center justify-center gap-2">
              <AlertCircle size={16} />
              {error}
            </p>
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4">
            <p className="text-green-500 text-sm text-center flex items-center justify-center gap-2">
              <CheckCircle size={16} />
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