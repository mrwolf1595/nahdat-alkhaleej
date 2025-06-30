import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function LoadingState() {
  const t = useTranslations('auctionId');
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 text-indigo-600">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-20 h-20"
      >
        <motion.div 
          className="w-full h-full rounded-full border-4 border-indigo-200 border-t-indigo-600"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-lg font-medium"
      >
        {t('loading')}
      </motion.p>
    </div>
  );
}