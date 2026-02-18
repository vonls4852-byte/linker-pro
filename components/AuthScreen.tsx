"use client";
import React, { useState } from 'react';

interface AuthScreenProps {
  onAuthSuccess: (user: any) => void;
  themeColor: string;
}

export default function AuthScreen({ onAuthSuccess, themeColor }: AuthScreenProps) {
  const [mode, setMode] = useState<'choice' | 'login' | 'register'>('choice');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'nickname' | 'email'>('phone');
  
  // Раздельные состояния для каждого поля
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
        onAuthSuccess(data.user || data);
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
        onAuthSuccess(data.user || data);
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
      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '400px', padding: '20px' }}>
          <h1 style={{ fontSize: '48px', color: themeColor, textAlign: 'center', marginBottom: '40px' }}>LINKER</h1>
          
          <button onClick={() => { setMode('login'); setLoginMethod('phone'); }} 
            style={{ width: '100%', padding: '20px', margin: '10px 0', background: '#111', border: 'none', color: 'white', borderRadius: '16px', cursor: 'pointer' }}>
            По номеру телефона
          </button>
          
          <button onClick={() => { setMode('login'); setLoginMethod('nickname'); }} 
            style={{ width: '100%', padding: '20px', margin: '10px 0', background: '#111', border: 'none', color: 'white', borderRadius: '16px', cursor: 'pointer' }}>
            По никнейму
          </button>
          
          <button onClick={() => { setMode('login'); setLoginMethod('email'); }} 
            style={{ width: '100%', padding: '20px', margin: '10px 0', background: '#111', border: 'none', color: 'white', borderRadius: '16px', cursor: 'pointer' }}>
            По email
          </button>
          
          <button onClick={() => setMode('register')} 
            style={{ width: '100%', padding: '20px', margin: '20px 0 10px', background: 'transparent', border: '1px solid #333', color: 'white', borderRadius: '16px', cursor: 'pointer' }}>
            Создать аккаунт
          </button>
        </div>
      </div>
    );
  }

  // Экран регистрации
  if (mode === 'register') {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '400px', padding: '20px' }}>
          <button onClick={() => setMode('choice')} 
            style={{ background: 'none', border: 'none', color: '#666', marginBottom: '20px', cursor: 'pointer' }}>
            ← Назад
          </button>
          
          <h2 style={{ fontSize: '32px', color: themeColor, marginBottom: '20px' }}>Регистрация</h2>
          
          <input placeholder="Имя и фамилия" value={fullName} onChange={(e) => setFullName(e.target.value)} 
            style={{ width: '100%', padding: '16px', margin: '10px 0', background: '#111', border: 'none', color: 'white', borderRadius: '12px' }} />
          
          <input placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} 
            style={{ width: '100%', padding: '16px', margin: '10px 0', background: '#111', border: 'none', color: 'white', borderRadius: '12px' }} />
          
          <input placeholder="Никнейм" value={nickname} onChange={(e) => setNickname(e.target.value)} 
            style={{ width: '100%', padding: '16px', margin: '10px 0', background: '#111', border: 'none', color: 'white', borderRadius: '12px' }} />
          
          <input placeholder="Email (необязательно)" value={email} onChange={(e) => setEmail(e.target.value)} 
            style={{ width: '100%', padding: '16px', margin: '10px 0', background: '#111', border: 'none', color: 'white', borderRadius: '12px' }} />
          
          <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} 
            style={{ width: '100%', padding: '16px', margin: '10px 0', background: '#111', border: 'none', color: 'white', borderRadius: '12px' }} />
          
          <input type="password" placeholder="Повторите пароль" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} 
            style={{ width: '100%', padding: '16px', margin: '10px 0', background: '#111', border: 'none', color: 'white', borderRadius: '12px' }} />
          
          {error && <p style={{ color: 'red', textAlign: 'center', margin: '10px 0' }}>{error}</p>}
          
          <button onClick={handleRegister} disabled={loading} 
            style={{ width: '100%', padding: '16px', background: themeColor, border: 'none', color: 'white', borderRadius: '12px', marginTop: '20px', cursor: 'pointer', opacity: loading ? 0.5 : 1 }}>
            {loading ? 'Загрузка...' : 'Зарегистрироваться'}
          </button>
        </div>
      </div>
    );
  }

  // Экран входа
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '20px' }}>
        <button onClick={() => setMode('choice')} 
          style={{ background: 'none', border: 'none', color: '#666', marginBottom: '20px', cursor: 'pointer' }}>
          ← Назад
        </button>
        
        <h2 style={{ fontSize: '32px', color: themeColor, marginBottom: '20px' }}>Вход</h2>
        
        {loginMethod === 'phone' && (
          <input placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} 
            style={{ width: '100%', padding: '16px', margin: '10px 0', background: '#111', border: 'none', color: 'white', borderRadius: '12px' }} />
        )}
        
        {loginMethod === 'nickname' && (
          <input placeholder="Никнейм" value={nickname} onChange={(e) => setNickname(e.target.value)} 
            style={{ width: '100%', padding: '16px', margin: '10px 0', background: '#111', border: 'none', color: 'white', borderRadius: '12px' }} />
        )}
        
        {loginMethod === 'email' && (
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} 
            style={{ width: '100%', padding: '16px', margin: '10px 0', background: '#111', border: 'none', color: 'white', borderRadius: '12px' }} />
        )}
        
        <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} 
          style={{ width: '100%', padding: '16px', margin: '10px 0', background: '#111', border: 'none', color: 'white', borderRadius: '12px' }} />
        
        {error && <p style={{ color: 'red', textAlign: 'center', margin: '10px 0' }}>{error}</p>}
        
        <button onClick={handleLogin} disabled={loading} 
          style={{ width: '100%', padding: '16px', background: themeColor, border: 'none', color: 'white', borderRadius: '12px', marginTop: '20px', cursor: 'pointer', opacity: loading ? 0.5 : 1 }}>
          {loading ? 'Загрузка...' : 'Войти'}
        </button>
        
        <button onClick={() => setMode('register')} 
          style={{ width: '100%', padding: '16px', marginTop: '10px', background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
          Нет аккаунта?
        </button>
      </div>
    </div>
  );
}