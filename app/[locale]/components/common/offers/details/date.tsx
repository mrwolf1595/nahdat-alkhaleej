// components/common/HijriDatePicker.tsx
'use client';
import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { HijriConverter } from '@/lib/hijriConverter';

interface HijriDatePickerProps {
  value?: string;
  onChange?: (gregorian: string, hijriDate: string) => void;
  className?: string;
}

const HijriDatePicker = ({ value, onChange, className = '' }: HijriDatePickerProps) => {
  const t = useTranslations('offerId.contactAgent');
  const [hijriDateDisplay, setHijriDateDisplay] = useState('');
  
  useEffect(() => {
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        const hijriFormatted = HijriConverter.formatHijriDate(date);
        setHijriDateDisplay(hijriFormatted);
      }
    }
  }, [value]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const gregorianDate = e.target.value;
    const date = new Date(gregorianDate);
    if (!isNaN(date.getTime())) {
      const hijriFormatted = HijriConverter.formatHijriDate(date);
      setHijriDateDisplay(hijriFormatted);
      if (onChange) {
        onChange(gregorianDate, hijriFormatted);
      }
    }
  };
  
  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
        <Calendar size={16} />
      </div>
      <input 
        type="date" 
        value={value}
        onChange={handleChange}
        min={today}
        className={`w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-zinc-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm ${className}`}
        lang="ar"
        dir="rtl"
      />
      {hijriDateDisplay && (
        <p className="text-xs text-gray-500 mt-1 text-right">
          {t('hijriDate')}: {hijriDateDisplay}
        </p>
      )}
    </div>
  );
};

export default HijriDatePicker;