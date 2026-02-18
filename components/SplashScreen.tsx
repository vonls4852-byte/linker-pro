"use client";
import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#1a1a1a] flex flex-col items-center justify-center transition-opacity duration-500 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Анимированные фоны */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Главный контент */}
      <div className={`relative z-10 text-center transform transition-all duration-1000 ${
        isAnimating ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
      }`}>
        
        {/* ===== ЛОГОТИП ===== */}
        <div className="relative mb-12 group">
          <div className="relative w-48 h-48 mx-auto bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-[2.5rem] shadow-2xl group-hover:scale-110 transition-all duration-700 flex items-center justify-center">
            <div className="w-40 h-40 bg-black/20 backdrop-blur-sm rounded-[2rem] flex items-center justify-center">
              <span className="text-white font-black text-8xl">
                L
              </span>
              <div className="absolute -top-3 -right-3 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping" />
            </div>
          </div>
        </div>

        {/* ===== УВЕЛИЧИЛ КОНТЕЙНЕР И УБРАЛ ВСЕ СЖИМАЮЩИЕ СТИЛИ ===== */}
        <div className="relative px-16 py-8">
          <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            LINKER
          </h1>
        </div>
        
        {/* Слоган */}
        <p className="text-zinc-400 text-2xl mb-8 animate-fade-in relative px-8">
          мировая соцсеть нового поколения
        </p>

        {/* Индикатор загрузки */}
        <div className="flex justify-center gap-3 mt-12">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" />
        </div>

        {/* Версия */}
        <p className="absolute bottom-12 left-0 right-0 text-sm text-zinc-600 animate-fade-in">
          LINKER PRO • БЕТА • 2026
        </p>
      </div>
    </div>
  );
}