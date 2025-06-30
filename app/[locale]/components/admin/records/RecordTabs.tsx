'use client';

import { motion } from 'framer-motion';
import { RecordType } from '../../../../../types/records';

interface RecordTabsProps {
  activeTab: RecordType;
  setActiveTab: (tab: RecordType) => void;
}

const tabs: { key: RecordType; label: string }[] = [
  { key: 'sales', label: 'Sales Records' },
  { key: 'evaluations', label: 'Evaluation Records' },
  { key: 'auctions', label: 'Auction Records' },
];

export function RecordTabs({ activeTab, setActiveTab }: RecordTabsProps) {
  return (
    <div className="flex gap-4 mb-6">
      {tabs.map((tab) => (
        <motion.button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
            activeTab === tab.key
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700'
          }`}
        >
          {tab.label}
        </motion.button>
      ))}
    </div>
  );
}
