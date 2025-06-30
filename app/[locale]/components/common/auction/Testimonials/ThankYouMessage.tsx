import { motion } from 'framer-motion';
import { Check, Award, Star } from 'lucide-react';

const ThankYouMessage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-xl shadow-lg text-center border border-gray-100"
    >
      <motion.div 
        className="relative mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.div 
          className="inline-flex items-center justify-center bg-green-100 rounded-full p-5 relative z-10"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 1.5,
            repeat: 1,
            repeatDelay: 1
          }}
        >
          <Check className="h-10 w-10 text-green-600" />
        </motion.div>
        <motion.div 
          className="absolute -inset-4 bg-green-50 rounded-full opacity-50 z-0"
          initial={{ scale: 0 }}
          animate={{ scale: 1.5 }}
          transition={{ delay: 0.5, duration: 1 }}
        />
      </motion.div>
      
      <motion.h3 
        className="text-2xl font-bold text-gray-800 mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Thank You!
      </motion.h3>
      
      <motion.p 
        className="text-gray-600 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        Your feedback is incredibly valuable to us. We appreciate you taking the time to share your thoughts.
      </motion.p>
      
      <motion.div 
        className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-lg border border-blue-100 flex flex-col items-center space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        whileHover={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
      >
        <Award className="text-blue-500" size={28} />
        <span className="text-blue-700 font-medium">You&apos;ve helped us improve our service!</span>
        
        <div className="flex mt-2">
          {[1, 2, 3, 4, 5].map((star, i) => (
            <motion.div 
              key={star}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + (i * 0.1), duration: 0.5 }}
            >
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      <motion.button
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"
        whileHover={{ y: -3, boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)" }}
        whileTap={{ y: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        Back to Home
      </motion.button>
    </motion.div>
  );
};

export default ThankYouMessage;