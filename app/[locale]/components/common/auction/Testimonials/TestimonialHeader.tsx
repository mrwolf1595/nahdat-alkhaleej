import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface TestimonialHeaderProps {
  sectionTitle: string;
}

const TestimonialHeader: React.FC<TestimonialHeaderProps> = ({ sectionTitle }) => {
  const t = useTranslations('testimonials');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10 text-center"
    >
      <div className="relative">
        <Quote className="text-blue-500 mx-auto mb-3 relative z-10" size={40} />
        <motion.div 
          className="absolute -inset-1 rounded-full bg-blue-100 opacity-70 z-0"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        />
      </div>
      <motion.h2 
        className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-purple-600 mb-3"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {sectionTitle}
      </motion.h2>
      <motion.p 
        className="text-gray-600"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {t('subtitle')}
      </motion.p>
    </motion.div>
  );
};

export default TestimonialHeader;