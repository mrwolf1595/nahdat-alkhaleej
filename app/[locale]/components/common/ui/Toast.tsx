'use client';

import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

export default function Toast({ message, type = 'info', duration = 3000 }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  const baseStyles = 'fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md shadow-lg text-white z-50 transition-all';
  const bgColor = type === 'success'
    ? 'bg-green-600'
    : type === 'error'
    ? 'bg-red-600'
    : 'bg-blue-600';

  return (
    <div className={`${baseStyles} ${bgColor}`}>
      {message}
    </div>
  );
}
