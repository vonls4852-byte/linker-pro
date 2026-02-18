"use client";
import React, { useState } from 'react';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Регистрация
  const handleRegister = async () => {
    if (!fullName || !phone || !nickname || !password) {
      setError('Заполните все поля');
      return;
    }
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    setLoading(true);
    setError('');

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
    if (!password) {
      setError('Введите пароль');
      return;
    }

    setLoading(true);
    setError('');

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

  // Экран выбора
  if (mode === 'choice') {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#0a0a0a', 
        color: 'white', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <h1 style={{ 
            fontSize: '48px', 
            color: themeColor, 
            textAlign: 'center',
            marginBottom: '40px',
            fontWeight: 900,
            fontStyle: 'italic'
          }}>
            LINKER
          </h1>
          
          <button
            onClick={() => { setMode('login'); setLoginMethod('phone'); }}
            style={{
              width: '100%',
              padding: '20px',
              margin: '10px 0',
              background: '#111',
              border: '1px solid rgba(255,255,255,0.05)',
              color: 'white',
              borderRadius: '16px',
              fontSize: '18px',
              fontWeight: 'bold',
              textAlign: 'left',
              cursor: 'pointer'
            }}
          >
            📱 По номеру телефона
          </button>

          <button
            onClick={() => { setMode('login'); setLoginMethod('nickname'); }}
            style={{
              width: '100%',
              padding: '20px',
              margin: '10px 0',
              background: '#111',
              border: '1px solid rgba(255,255,255,0.05)',
              color: 'white',
              borderRadius: '16px',
              fontSize: '18px',
              fontWeight: 'bold',
              textAlign: 'left',
              cursor: 'pointer'
            }}
          >
            @ По никнейму
          </button>

          <button
            onClick={() => { setMode('login'); setLoginMethod('email'); }}
            style={{
              width: '100%',
              padding: '20px',
              margin: '10px 0',
              background: '#111',
              border: '1px solid rgba(255,255,255,0.05)',
              color: 'white',
              borderRadius: '16px',
              fontSize: '18px',
              fontWeight: 'bold',
              textAlign: 'left',
              cursor: 'pointer'
            }}
          >
            ✉️ По email
          </button>

          <div style={{ 
            margin: '30px 0',
            textAlign: 'center',
            color: '#666',
            fontSize: '14px',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: '30px'
          }}>
            или
          </div>

          <button
            onClick={() => setMode('register')}
            style={{
              width: '100%',
              padding: '20px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
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
      <div style={{ 
        minHeight: '100vh', 
        background: '#0a0a0a', 
        color: 'white', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <button
            onClick={() => setMode('choice')}
            style={{
              background: 'none',
              border: 'none',
              color: '#666',
              fontSize: '16px',
              marginBottom: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            ← Назад
          </button>

          <h2 style={{ 
            fontSize: '32px', 
            color: themeColor,
            marginBottom: '10px',
            fontWeight: 900
          }}>
            Регистрация
          </h2>
          <p style={{ color: '#666', marginBottom: '30px' }}>
            Заполните все поля для создания аккаунта
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input
              placeholder="Имя и фамилия"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{
                width: '100%',
                padding: '16px',
                background: '#111',
                border: '1px solid rgba(255,255,255,0.05)',
                color: 'white',
                borderRadius: '12px',
                fontSize: '14px'
              }}
            />

            <input
              placeholder="Номер телефона"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                width: '100%',
                padding: '16px',
                background: '#111',
                border: '1px solid rgba(255,255,255,0.05)',
                color: 'white',
                borderRadius: '12px',
                fontSize: '14px'
              }}
            />

            <input
              placeholder="Никнейм"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              style={{
                width: '100%',
                padding: '16px',
                background: '#111',
                border: '1px solid rgba(255,255,255,0.05)',
                color: 'white',
                borderRadius: '12px',
                fontSize: '14px'
              }}
            />

            <input
              placeholder="Email (необязательно)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '16px',
                background: '#111',
                border: '1px solid rgba(255,255,255,0.05)',
                color: 'white',
                borderRadius: '12px',
                fontSize: '14px'
              }}
            />

            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '16px',
                background: '#111',
                border: '1px solid rgba(255,255,255,0.05)',
                color: 'white',
                borderRadius: '12px',
                fontSize: '14px'
              }}
            />

            <input
              type="password"
              placeholder="Повторите пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '16px',
                background: '#111',
                border: '1px solid rgba(255,255,255,0.05)',
                color: 'white',
                borderRadius: '12px',
                fontSize: '14px'
              }}
            />
          </div>

          {error && (
            <p style={{ color: 'red', textAlign: 'center', marginTop: '15px' }}>
              {error}
            </p>
          )}

          {success && (
            <p style={{ color: '#22c55e', textAlign: 'center', marginTop: '15px' }}>
              {success}
            </p>
          )}

          <button
            onClick={handleRegister}
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              background: themeColor,
              border: 'none',
              color: 'white',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              marginTop: '20px',
              cursor: 'pointer',
              opacity: loading ? 0.5 : 1
            }}
          >
            {loading ? 'Загрузка...' : 'Зарегистрироваться'}
          </button>
        </div>
      </div>
    );
  }

  // Экран входа
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0a0a0a', 
      color: 'white', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <button
          onClick={() => setMode('choice')}
          style={{
            background: 'none',
            border: 'none',
            color: '#666',
            fontSize: '16px',
            marginBottom: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          ← Назад
        </button>

        <h2 style={{ 
          fontSize: '32px', 
          color: themeColor,
          marginBottom: '10px',
          fontWeight: 900
        }}>
          Вход
        </h2>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          {loginMethod === 'phone' && 'Введите номер телефона и пароль'}
          {loginMethod === 'nickname' && 'Введите никнейм и пароль'}
          {loginMethod === 'email' && 'Введите email и пароль'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {loginMethod === 'phone' && (
            <input
              placeholder="Номер телефона"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                width: '100%',
                padding: '16px',
                background: '#111',
                border: '1px solid rgba(255,255,255,0.05)',
                color: 'white',
                borderRadius: '12px',
                fontSize: '14px'
              }}
            />
          )}

          {loginMethod === 'nickname' && (
            <input
              placeholder="Никнейм"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              style={{
                width: '100%',
                padding: '16px',
                background: '#111',
                border: '1px solid rgba(255,255,255,0.05)',
                color: 'white',
                borderRadius: '12px',
                fontSize: '14px'
              }}
            />
          )}

          {loginMethod === 'email' && (
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '16px',
                background: '#111',
                border: '1px solid rgba(255,255,255,0.05)',
                color: 'white',
                borderRadius: '12px',
                fontSize: '14px'
              }}
            />
          )}

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '16px',
              background: '#111',
              border: '1px solid rgba(255,255,255,0.05)',
              color: 'white',
              borderRadius: '12px',
              fontSize: '14px'
            }}
          />
        </div>

        {error && (
          <p style={{ color: 'red', textAlign: 'center', marginTop: '15px' }}>
            {error}
          </p>
        )}

        {success && (
          <p style={{ color: '#22c55e', textAlign: 'center', marginTop: '15px' }}>
            {success}
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%',
            padding: '16px',
            background: themeColor,
            border: 'none',
            color: 'white',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: 'bold',
            marginTop: '20px',
            cursor: 'pointer',
            opacity: loading ? 0.5 : 1
          }}
        >
          {loading ? 'Загрузка...' : 'Войти'}
        </button>

        <button
          onClick={() => setMode('register')}
          style={{
            width: '100%',
            padding: '16px',
            marginTop: '10px',
            background: 'none',
            border: 'none',
            color: '#666',
            cursor: 'pointer'
          }}
        >
          Нет аккаунта? Зарегистрироваться
        </button>
      </div>
    </div>
  );
}