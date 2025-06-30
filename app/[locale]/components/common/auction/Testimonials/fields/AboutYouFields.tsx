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
  const t = useTranslations('testimonials');

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
        <label className="block text-sm font-medium text-gray-700">
          {t('form.name')}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="input w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:border-blue-300"
          placeholder={t('form.namePlaceholder')}
        />
      </motion.div>
      
      <motion.div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('form.phone')}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder={t('form.phonePlaceholder')}
            className="input w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:border-blue-300"
          />
        </div>
      </motion.div>
      
      <motion.div 
        className="space-y-2"
        custom={1}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <label className="block text-sm font-medium text-gray-700">{t('form.role')}</label>
        <select 
          name="role" 
          value={formData.role} 
          onChange={handleInputChange} 
          className="input w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:border-blue-300"
        >
          <option value="">{t('form.selectRole')}</option>
          <option value="Investor">{t('form.roleOptions.investor')}</option>
          <option value="First-time Buyer">{t('form.roleOptions.firstTimeBuyer')}</option>
          <option value="Developer">{t('form.roleOptions.developer')}</option>
          <option value="Real Estate Enthusiast">{t('form.roleOptions.realEstateEnthusiast')}</option>
          <option value="Other">{t('form.roleOptions.other')}</option>
        </select>
      </motion.div>
    </div>
  );
};

export default AboutYouFields;