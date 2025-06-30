import { ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { FormDataType } from '../useTestimonialForm';

interface FeedbackFieldsProps {
  formData: FormDataType;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleUseCaseChange: (value: string) => void;
  incrementInteraction: () => void;
}

const FeedbackFields: React.FC<FeedbackFieldsProps> = ({
  formData,
  handleChange,
  handleUseCaseChange,
  incrementInteraction
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    handleChange(e);
    incrementInteraction();
  };

  const handleUseCaseSelect = (value: string) => {
    handleUseCaseChange(value);
    incrementInteraction();
  };

  const purposeOptions = [
    { id: 'Buy', label: 'Buying a property' },
    { id: 'Sell', label: 'Selling a property' },
    { id: 'Auction', label: 'Participating in an auction' },
    { id: 'Browsing', label: 'Just browsing' }
  ];

  return (
    <div className="space-y-8">
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <label className="block text-sm font-medium text-gray-700">
          Share your testimonial
          <span className="text-red-500 ml-1">*</span>
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          className="input w-full p-4 border border-gray-300 rounded-lg min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:border-blue-300"
          placeholder="What did you like about our service? How did it help you?"
        />
        
        {/* Character count indicator */}
        <motion.div 
          className="text-right text-xs text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {formData.message.length} characters
          {formData.message.length > 0 && formData.message.length < 20 && (
            <span className="text-yellow-600 ml-1">
              (Consider adding more details for a helpful testimonial)
            </span>
          )}
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <label className="block text-sm font-medium text-gray-700">Purpose of using our platform</label>
        <div className="grid grid-cols-2 gap-3">
          {purposeOptions.map((purpose, index) => (
            <motion.button
              key={purpose.id}
              type="button"
              className={`p-4 rounded-lg border ${
                formData.useCase === purpose.id
                  ? 'bg-blue-50 border-blue-400 text-blue-700 shadow-md'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              } transition-all`}
              onClick={() => handleUseCaseSelect(purpose.id)}
              whileHover={{ y: -3, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: formData.useCase === purpose.id ? [1, 1.05, 1] : 1 
              }}
              transition={{ 
                duration: 0.4,
                delay: index * 0.1 + 0.3
              }}
            >
              {purpose.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FeedbackFields;