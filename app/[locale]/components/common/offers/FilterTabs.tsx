'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface FilterTabsProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const FilterTabs = ({  setActiveFilter }: FilterTabsProps) => {
  const t = useTranslations('offers.filterTabs');
  
  const tabs = [
    { id: 'all', label: t('allProperties') },
    { id: 'featured', label: t('featured') },
    { id: 'forsale', label: t('forSale') },
    { id: 'forrent', label: t('forRent') },
  ];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex overflow-x-auto gap-2 pb-2 mb-6 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar"
    >
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => setActiveFilter(tab.id)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {tab.label}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default FilterTabs;