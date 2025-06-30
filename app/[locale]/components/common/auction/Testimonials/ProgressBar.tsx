import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, progress }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
        <span className="flex items-center">
          <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-2">
            {currentStep}
          </span>
          <span>of {totalSteps}</span>
        </span>
        <motion.span
          key={currentStep}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-semibold text-blue-600"
        >
          {Math.round(progress)}% Complete
        </motion.span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <motion.div 
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      {/* Step indicators */}
      <div className="mt-2 flex justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <motion.div 
            key={index}
            className={`w-3 h-3 rounded-full ${
              index < currentStep 
                ? 'bg-blue-500' 
                : index === currentStep - 1 
                  ? 'bg-purple-500' 
                  : 'bg-gray-300'
            }`}
            animate={{
              scale: index === currentStep - 1 ? [1, 1.3, 1] : 1
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              repeatDelay: 0.5
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;