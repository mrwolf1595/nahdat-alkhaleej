import { ChangeEvent } from 'react';
import { motion } from 'framer-motion';
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
          What is your full name?
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="input w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:border-blue-300"
          placeholder="Enter your full name"
        />
      </motion.div>
      <motion.div>
      <div>
      <label className="block text-sm font-medium text-gray-700">
          What is your Number?
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="e.g. 0555555555"
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
        <label className="block text-sm font-medium text-gray-700">What is your role?</label>
        <select 
          name="role" 
          value={formData.role} 
          onChange={handleInputChange} 
          className="input w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:border-blue-300"
        >
          <option value="">Select a role</option>
          <option value="Investor">Investor</option>
          <option value="First-time Buyer">First-time Buyer</option>
          <option value="Developer">Developer</option>
          <option value="Real Estate Enthusiast">Real Estate Enthusiast</option>
          <option value="Other">Other</option>
        </select>
      </motion.div>
    </div>
  );
};

export default AboutYouFields;