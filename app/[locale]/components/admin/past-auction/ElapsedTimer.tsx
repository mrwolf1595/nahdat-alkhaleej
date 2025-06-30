'use client';

import { useEffect, useState } from 'react';

interface Props {
  auctionDate: string; // e.g. "2024-11-20"
  auctionTime: string; // e.g. "13:00"
}

export default function ElapsedTimer({ auctionDate, auctionTime }: Props) {
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

  return (
    <div className="flex justify-center rtl space-x-2 space-x-reverse text-center mt-2">
      {[
        { label: 'days', value: elapsed.days },
        { label: 'hours', value: elapsed.hours },
        { label: 'minutes', value: elapsed.minutes },
        { label: 'seconds', value: elapsed.seconds },
      ].map((unit, i) => (
        <div key={i} className="mx-1">
          <div
            className="digit-split rounded-md shadow-md bg-gray-300 px-3 py-2"
            style={{ minWidth: 48 }}
          >
            <span className="text-red-600 text-xl font-bold font-[Cairo]">
              {unit.value.toString().padStart(2, '0')}
            </span>
          </div>
          <p className="text-xs mt-1 text-gray-700 font-[BoutrosNewsH1]">{unit.label}</p>
        </div>
      ))}
    </div>
  );
}
