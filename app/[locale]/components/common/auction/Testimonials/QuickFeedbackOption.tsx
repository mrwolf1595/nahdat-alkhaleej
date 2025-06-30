import { motion } from 'framer-motion';
import { Heart, Zap } from 'lucide-react';

interface QuickFeedbackOptionProps {
  onQuickSubmit: () => void;
}

const QuickFeedbackOption: React.FC<QuickFeedbackOptionProps> = ({ onQuickSubmit }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.5 }}
      className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="mr-3"
          >
            <Heart className="h-5 w-5 text-pink-500 fill-pink-500" />
          </motion.div>
          <div>
            <p className="text-sm font-medium text-gray-700">In a hurry? Submit your essential feedback now!</p>
            <p className="text-xs text-gray-500 mt-1">We&apos;ll only use your name, satisfaction level, and testimonial message.</p>
          </div>
        </div>
        
        <motion.button
          type="button"
          onClick={onQuickSubmit}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-sm"
          whileHover={{ scale: 1.05, boxShadow: "0 4px 8px rgba(37, 99, 235, 0.3)" }}
          whileTap={{ scale: 0.95 }}
        >
          <Zap className="h-4 w-4 mr-1" />
          <span>Quick Submit</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QuickFeedbackOption;