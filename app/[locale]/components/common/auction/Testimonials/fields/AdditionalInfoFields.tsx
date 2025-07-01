import { ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FormDataType } from '../useTestimonialForm';

interface AdditionalInfoFieldsProps {
  formData: FormDataType;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleReturningChange: (value: string) => void;
  incrementInteraction: () => void;
}

const AdditionalInfoFields: React.FC<AdditionalInfoFieldsProps> = ({
  formData,
  handleChange,
  handleFileChange,
  handleReturningChange,
  incrementInteraction
}) => {
  const t = useTranslations('testimonials.form');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    handleChange(e);
    incrementInteraction();
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e);
    incrementInteraction();
  };

  const handleReturningSelect = (value: string) => {
    handleReturningChange(value);
    incrementInteraction();
  };

  const getReturningButtonStyle = (option: string) => {
    if (formData.returning === option) {
      switch (option) {
        case 'Yes':
          return 'bg-green-100 border-green-400 text-green-700 shadow-md';
        case 'Maybe':
          return 'bg-yellow-100 border-yellow-400 text-yellow-700 shadow-md';
        case 'No':
          return 'bg-red-100 border-red-400 text-red-700 shadow-md';
        default:
          return '';
      }
    }
    return 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50';
  };

  const returningOptions = [
    { value: 'Yes', label: t('returningOptions.yes') },
    { value: 'Maybe', label: t('returningOptions.maybe') },
    { value: 'No', label: t('returningOptions.no') }
  ];

  return (
    <div className="space-y-8">
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <label className="block text-sm font-medium text-gray-700">{t('returning')}</label>
        <div className="flex gap-3">
          {returningOptions.map((option, index) => (
            <motion.button
              key={option.value}
              type="button"
              className={`flex-1 p-4 rounded-lg border ${getReturningButtonStyle(option.value)} transition-all`}
              onClick={() => handleReturningSelect(option.value)}
              whileHover={{ y: -3, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: formData.returning === option.value ? [1, 1.05, 1] : 1 
              }}
              transition={{ 
                duration: 0.4,
                delay: index * 0.1 + 0.1
              }}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
      
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <label className="block text-sm font-medium text-gray-700">{t('improvement')}</label>
        <textarea
          name="improvement"
          value={formData.improvement}
          onChange={handleInputChange}
          className="input w-full p-4 border border-gray-300 rounded-lg min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:border-blue-300"
          placeholder={t('improvementPlaceholder')}
        />
      </motion.div>
      
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <label className="block text-sm font-medium text-gray-700">{t('avatar')}</label>
        <motion.div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-all cursor-pointer"
          whileHover={{ 
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            backgroundColor: "rgba(243, 244, 246, 0.5)" 
          }}
        >
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileInputChange} 
            className="hidden" 
            id="avatar-upload" 
          />
          <label htmlFor="avatar-upload" className="cursor-pointer block">
            {formData.avatar ? (
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center justify-center bg-green-100 rounded-full p-3 mb-3">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-sm text-gray-700 font-medium">
                  {t('fileSelected')} {formData.avatar.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">{t('clickToChange')}</p>
              </motion.div>
            ) : (
              <motion.div 
                className="text-center"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.03 }}
              >
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-gray-600 mt-2">{t('uploadText')}</p>
                <p className="text-xs text-gray-400 mt-1">({t('optional')})</p>
              </motion.div>
            )}
          </label>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdditionalInfoFields;