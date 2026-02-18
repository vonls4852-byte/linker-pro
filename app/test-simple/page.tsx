"use client";
import { useState } from 'react';

export default function SimpleTest() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div style={{ padding: '50px', background: '#0a0a0a', minHeight: '100vh', color: 'white' }}>
      <h1 style={{ color: '#3b82f6' }}>Тест ввода</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Имя"
          style={{ padding: '10px', fontSize: '16px', width: '300px' }}
        />
        <p>Значение: {name}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Телефон"
          style={{ padding: '10px', fontSize: '16px', width: '300px' }}
        />
        <p>Значение: {phone}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{ padding: '10px', fontSize: '16px', width: '300px' }}
        />
        <p>Значение: {email}</p>
      </div>
    </div>
  );
}