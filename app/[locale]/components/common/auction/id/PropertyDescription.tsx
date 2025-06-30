import { motion } from 'framer-motion';
import { BsInfoCircle } from 'react-icons/bs';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { useTranslations } from 'next-intl';

interface PropertyDescriptionProps {
  description: string;
}

export default function PropertyDescription({ description }: PropertyDescriptionProps) {
  const t = useTranslations('auctionId.detail.sections');
  
  return (
    <motion.div
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="mb-10 relative"
    >
      {/* Decorative background elements */}
      <div className="absolute -left-10 -top-10 w-40 h-40 bg-indigo-50/50 rounded-full blur-3xl -z-10"></div>
      <div className="absolute right-0 bottom-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -z-10"></div>
      
      <motion.h2 
        className="text-2xl font-semibold mb-6 text-gray-800 flex items-center"
        whileInView={{ y: [10, 0], opacity: [0, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.span 
          className="bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 p-3 rounded-xl mr-4 shadow-sm"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <HiOutlineDocumentText className="w-6 h-6" />
        </motion.span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-700">
          {t('propertyDescription')}
        </span>
      </motion.h2>
      
      <motion.div
        className="relative bg-white rounded-2xl shadow-lg p-6 border border-indigo-50 overflow-hidden"
        whileHover={{ boxShadow: "0 20px 25px -5px rgba(79, 70, 229, 0.1), 0 10px 10px -5px rgba(79, 70, 229, 0.04)" }}
      >
        {/* Quote mark decoration */}
        <div className="absolute top-3 left-3 text-indigo-100 opacity-30 transform -rotate-12">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
        
        <motion.p 
          className="text-gray-700 whitespace-pre-line leading-relaxed px-4 py-2 text-base sm:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {description}
        </motion.p>
        
        {/* Info tip at the bottom */}
        <motion.div 
          className="mt-6 flex items-center text-sm text-indigo-500 bg-indigo-50 p-3 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <BsInfoCircle className="mr-2 flex-shrink-0" />
          <p>{t('descriptionDisclaimer')}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}