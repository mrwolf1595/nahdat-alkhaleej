'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  auctionDate: string;
  auctionTime: string;
  title?: string;
  isFeatured?: boolean;
}

export default function CountdownTimer({ auctionDate, auctionTime, title = 'Countdown', isFeatured = false }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      try {
        // Parse the auction date and time
        const [year, month, day] = auctionDate.split('-').map(Number);
        const [auctionHours, auctionMinutes] = auctionTime.split(':').map(Number);
        
        const auctionDateTime = new Date(year, month - 1, day, auctionHours, auctionMinutes);
        const now = new Date();
        
        // Calculate time difference in milliseconds
        const difference = auctionDateTime.getTime() - now.getTime();
        
        if (difference <= 0) {
          // Auction has already started
          return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            isExpired: true,
          };
        }
        
        // Convert time difference to days, hours, minutes, seconds
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        return {
          days,
          hours,
          minutes,
          seconds,
          isExpired: false,
        };
      } catch (error) {
        console.error('Error calculating time left:', error);
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        };
      }
    };

    // Initialize time left
    setTimeLeft(calculateTimeLeft());
    
    // Update time left every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clean up interval on unmount
    return () => clearInterval(timer);
  }, [auctionDate, auctionTime]);

  const formatTimeValue = (value: number) => {
    return value < 10 ? `0${value}` : value.toString();
  };

  // Determine box gradient colors based on featured status
  const getGradient = () => {
    return isFeatured 
      ? 'from-purple-600/10 to-indigo-600/10 dark:from-purple-600/20 dark:to-indigo-600/20 border-purple-200 dark:border-purple-700/30' 
      : 'from-blue-600/10 to-indigo-600/10 dark:from-blue-600/20 dark:to-indigo-600/20 border-blue-200 dark:border-blue-700/30';
  };

  // Get the text color for title based on featured status
  const getTitleColor = () => {
    return isFeatured ? 'text-purple-700 dark:text-purple-400' : 'text-blue-700 dark:text-blue-400';
  };
  
  // Get the text color for numbers
  const getNumberColor = () => {
    return isFeatured 
      ? 'text-purple-800 dark:text-purple-300' 
      : 'text-blue-800 dark:text-blue-300';
  };

  return (
    <div className="flex flex-col">
      <div className={`flex items-center gap-1.5 mb-3 ${getTitleColor()} font-medium text-sm`}>
        <Clock size={16} className="flex-shrink-0" />
        <span>{title}</span>
      </div>
      
      {timeLeft.isExpired ? (
        <div className="text-red-600 dark:text-red-400 font-medium text-center p-2 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800/30">
          Auction has started
        </div>
      ) : (
        <div className="flex justify-between space-x-1 sm:space-x-2">
          {/* Days */}
          <div className="flex flex-col items-center flex-1">
            <div className={`w-full aspect-square flex items-center justify-center bg-gradient-to-br ${getGradient()} rounded-lg border backdrop-blur-sm shadow-sm mb-1`}>
              <span className={`text-xl font-bold ${getNumberColor()}`}>{timeLeft.days}</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Days</span>
          </div>

          {/* Separator */}
          <div className={`${getTitleColor()} font-bold self-center text-lg`}>:</div>

          {/* Hours */}
          <div className="flex flex-col items-center flex-1">
            <div className={`w-full aspect-square flex items-center justify-center bg-gradient-to-br ${getGradient()} rounded-lg border backdrop-blur-sm shadow-sm mb-1`}>
              <span className={`text-xl font-bold ${getNumberColor()}`}>{formatTimeValue(timeLeft.hours)}</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Hours</span>
          </div>

          {/* Separator */}
          <div className={`${getTitleColor()} font-bold self-center text-lg`}>:</div>

          {/* Minutes */}
          <div className="flex flex-col items-center flex-1">
            <div className={`w-full aspect-square flex items-center justify-center bg-gradient-to-br ${getGradient()} rounded-lg border backdrop-blur-sm shadow-sm mb-1`}>
              <span className={`text-xl font-bold ${getNumberColor()}`}>{formatTimeValue(timeLeft.minutes)}</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Min</span>
          </div>

          {/* Separator */}
          <div className={`${getTitleColor()} font-bold self-center text-lg`}>:</div>

          {/* Seconds */}
          <div className="flex flex-col items-center flex-1">
            <div className={`w-full aspect-square flex items-center justify-center bg-gradient-to-br ${getGradient()} rounded-lg border backdrop-blur-sm shadow-sm mb-1 relative overflow-hidden`}>
              <div className="absolute inset-0 w-full bg-gradient-to-t from-transparent to-transparent via-white/5 dark:via-white/10"></div>
              <span className={`text-xl font-bold ${getNumberColor()} relative z-10`}>{formatTimeValue(timeLeft.seconds)}</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Sec</span>
          </div>
        </div>
      )}
    </div>
  );
}