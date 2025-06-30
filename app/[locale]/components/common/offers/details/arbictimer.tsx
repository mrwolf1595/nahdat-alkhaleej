// components/common/ArabicTimePicker.tsx
'use client';
import { useState } from 'react';
import { Clock } from 'lucide-react';

interface ArabicTimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
  className?: string;
}

const ArabicTimePicker = ({ value, onChange, className = '' }: ArabicTimePickerProps) => {
  const [selectedTime, setSelectedTime] = useState(value || '');
  
  // Convert 24h to 12h format with Arabic period
  const formatArabicTime = (time: string) => {
    if (!time) return '';
    
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'م' : 'ص'; // م for مساءً, ص for صباحاً
    const hour12 = hour % 12 || 12;
    
    return `${hour12}:${minutes} ${period}`;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    setSelectedTime(time);
    if (onChange) {
      onChange(time);
    }
  };
  
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
        <Clock size={16} />
      </div>
      <input 
        type="time" 
        value={selectedTime}
        onChange={handleChange}
        className={`w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-zinc-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm ${className}`}
        lang="ar"
        dir="rtl"
      />
      {selectedTime && (
        <p className="text-xs text-gray-500 mt-1 text-right">
          {formatArabicTime(selectedTime)}
        </p>
      )}
    </div>
  );
};

export default ArabicTimePicker;