'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaRegClock } from 'react-icons/fa';

interface Props {
  auctionDate: string; // e.g. "2024-11-20"
  auctionTime: string; // e.g. "13:00"
  title?: string;
}

export default function ElapsedTimer({ auctionDate, auctionTime, title = "Time Since Auction" }: Props) {
  const [elapsed, setElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const endDate = new Date(`${auctionDate}T${auctionTime}`);

    const updateElapsed = () => {
      const now = new Date();
      const diff = Math.max(0, now.getTime() - endDate.getTime());
      const seconds = Math.floor(diff / 1000) % 60;
      const minutes = Math.floor(diff / (1000 * 60)) % 60;
      const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      setElapsed({ days, hours, minutes, seconds });
    };

    updateElapsed(); // Initial
    const interval = setInterval(updateElapsed, 1000);
    return () => clearInterval(interval);
  }, [auctionDate, auctionTime]);

  // Units to display
  const timeUnits = [
    { label: 'days', value: elapsed.days, color: 'from-indigo-500 to-indigo-600' },
    { label: 'hours', value: elapsed.hours, color: 'from-violet-500 to-violet-600' },
    { label: 'minutes', value: elapsed.minutes, color: 'from-blue-500 to-blue-600' },
    { label: 'seconds', value: elapsed.seconds, color: 'from-purple-500 to-purple-600' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-indigo-100/50 mb-8 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/60 rounded-full -mr-32 -mt-32 opacity-30 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-50/60 rounded-full -ml-24 -mb-24 opacity-30 blur-2xl" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-center mb-6">
          <FaRegClock className="text-indigo-500 text-xl mr-2" />
          <h3 className="text-xl font-bold text-center bg-gradient-to-r from-indigo-700 to-violet-700 bg-clip-text text-transparent">
            {title}
          </h3>
        </div>

        <div className="flex justify-center rtl space-x-3 space-x-reverse text-center">
          {timeUnits.map((unit, i) => (
            <motion.div 
              key={i}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="mx-1.5"
            >
              <div
                className={`digit-split rounded-lg shadow-md bg-gradient-to-br ${unit.color} px-4 py-3 relative overflow-hidden`}
                style={{ minWidth: 60 }}
              >
                <div className="absolute inset-0 bg-white/10 rounded-lg" />
                <motion.span 
                  key={unit.value}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 text-white text-2xl font-bold font-[Cairo] flex justify-center"
                >
                  {unit.value.toString().padStart(2, '0')}
                </motion.span>
              </div>
              <p className="text-xs mt-2 text-gray-700 font-medium">{unit.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}