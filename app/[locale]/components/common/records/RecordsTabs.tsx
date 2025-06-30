'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Scale, Gavel } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { RecordTab } from '../../../../../types/records';

interface RecordsTabsProps {
  activeTab: RecordTab;
  setActiveTab: React.Dispatch<React.SetStateAction<RecordTab>>;
}

const RecordsTabs: React.FC<RecordsTabsProps> = ({ activeTab, setActiveTab }) => {
  const t = useTranslations('records.tabs');

  const tabs = [
    { id: 'sales' as RecordTab, label: t('sales'), icon: <Home size={20} /> },
    { id: 'evaluations' as RecordTab, label: t('evaluations'), icon: <Scale size={20} /> },
    { id: 'auctions' as RecordTab, label: t('auctions'), icon: <Gavel size={20} /> },
  ];

  return (
    <motion.section 
      className="py-8 bg-white rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="relative flex border-b overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`relative px-8 py-4 flex items-center gap-2 text-lg font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-blue-500'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {/* Tab Icon */}
              <span className={`transition-colors duration-300 ${
                activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'
              }`}>
                {tab.icon}
              </span>
              
              {/* Tab Label */}
              <span>{tab.label}</span>
              
              {/* Active indicator */}
              {activeTab === tab.id && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-md"
                  layoutId="activeTabIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default RecordsTabs;