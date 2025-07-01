import { motion } from 'framer-motion';
import { Smile, Frown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FormDataType } from '../useTestimonialForm';

interface ExperienceFieldsProps {
  formData: FormDataType;
  handleSatisfactionChange: (value: string) => void;
  handleRecommendationChange: (value: number) => void;
  incrementInteraction: () => void;
}

const ExperienceFields: React.FC<ExperienceFieldsProps> = ({
  formData,
  handleSatisfactionChange,
  handleRecommendationChange,
  incrementInteraction
}) => {
  const t = useTranslations('testimonials.form');

  const handleSatisfactionSelect = (value: string) => {
    handleSatisfactionChange(value);
    incrementInteraction();
  };

  const handleRecommendationSelect = (value: number) => {
    handleRecommendationChange(value);
    incrementInteraction();
  };

  return (
    <div className="space-y-8">
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <label className="block text-sm font-medium text-gray-700">
          {t('satisfaction')}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex justify-center gap-6">
          <motion.button
            type="button"
            className={`flex flex-col items-center p-5 rounded-xl ${
              formData.satisfaction === 'Satisfied' 
                ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-400 shadow-md' 
                : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
            } transition-all duration-300`}
            onClick={() => handleSatisfactionSelect('Satisfied')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ 
                rotate: formData.satisfaction === 'Satisfied' ? [0, 15, -15, 0] : 0 
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Smile className={`h-12 w-12 ${formData.satisfaction === 'Satisfied' ? 'text-green-500' : 'text-gray-400'}`} />
            </motion.div>
            <span className="mt-3 font-medium">{t('satisfied')}</span>
          </motion.button>
          
          <motion.button
            type="button"
            className={`flex flex-col items-center p-5 rounded-xl ${
              formData.satisfaction === 'Not Satisfied' 
                ? 'bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-400 shadow-md' 
                : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
            } transition-all duration-300`}
            onClick={() => handleSatisfactionSelect('Not Satisfied')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ 
                rotate: formData.satisfaction === 'Not Satisfied' ? [0, 15, -15, 0] : 0 
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Frown className={`h-12 w-12 ${formData.satisfaction === 'Not Satisfied' ? 'text-red-500' : 'text-gray-400'}`} />
            </motion.div>
            <span className="mt-3 font-medium">{t('notSatisfied')}</span>
          </motion.button>
        </div>
      </motion.div>
      
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <label className="block text-sm font-medium text-gray-700">{t('recommendation')}</label>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">{t('notLikely')}</span>
            <span className="text-gray-500">{t('veryLikely')}</span>
          </div>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <motion.button
                key={num}
                type="button"
                className={`w-9 h-9 rounded-full flex items-center justify-center ${
                  Number(formData.recommendation) === num
                    ? num <= 3 
                      ? 'bg-red-500 text-white' 
                      : num <= 7 
                        ? 'bg-yellow-500 text-white' 
                        : 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-all`}
                onClick={() => handleRecommendationSelect(num)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                animate={{ 
                  scale: Number(formData.recommendation) === num ? [1, 1.15, 1] : 1 
                }}
                transition={{ 
                  duration: 0.5,
                  scale: { duration: 0.3 }
                }}
              >
                {num}
              </motion.button>
            ))}
          </div>
          
          {/* Visual indicator for recommendation level */}
          <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full rounded-full ${
                Number(formData.recommendation) <= 3 
                  ? 'bg-red-500' 
                  : Number(formData.recommendation) <= 7 
                    ? 'bg-yellow-500' 
                    : 'bg-green-500'
              }`}
              initial={{ width: '80%' }}
              animate={{ width: `${formData.recommendation * 10}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ExperienceFields;