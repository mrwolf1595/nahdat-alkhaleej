import { ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FormDataType } from '../useTestimonialForm';

interface AboutYouFieldsProps {
  formData: FormDataType;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  incrementInteraction: () => void;
}

const AboutYouFields: React.FC<AboutYouFieldsProps> = ({
  formData,
  handleChange,
  incrementInteraction
}) => {
  const t = useTranslations('testimonials.form');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    handleChange(e);
    incrementInteraction();
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.1,
        duration: 0.5
      } 
    })
  };

  return (
    <div>
      <motion.div 
        className="space-y-2 mb-6"
        custom={0}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <label className="block text-sm font-medium">
          {t('name')}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="input w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:border-blue-300"
          placeholder={t('namePlaceholder')}
        />
      </motion.div>
      
      <motion.div 
        className="space-y-2 mb-6"
        custom={1}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <label className="block text-sm font-medium ">
          {t('phone')}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          placeholder={t('phonePlaceholder')}
          className="input w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:border-blue-300"
        />
      </motion.div>
      
      <motion.div 
        className="space-y-2"
        custom={2}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <label className="block text-sm font-medium ">{t('role')}</label>
        <select 
          name="role" 
          value={formData.role} 
          onChange={handleInputChange} 
          className=" input w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 rounded-md px-3 py-2"
        >
          <option value="">{t('selectRole')}</option>
          <option value="Investor">{t('roleOptions.investor')}</option>
          <option value="First-time Buyer">{t('roleOptions.firstTimeBuyer')}</option>
          <option value="Developer">{t('roleOptions.developer')}</option>
          <option value="Real Estate Enthusiast">{t('roleOptions.realEstateEnthusiast')}</option>
          <option value="Other">{t('roleOptions.other')}</option>
        </select>
      </motion.div>
    </div>
  );
};

export default AboutYouFields;