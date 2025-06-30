import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface NavigationButtonsProps {
  step: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  submitting: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  step,
  totalSteps,
  onBack,
  onNext,
  submitting
}) => {
  const isLastStep = step === totalSteps - 1;
  
  return (
    <div className="flex justify-between mt-8">
      {step > 0 && (
        <motion.button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all flex items-center shadow-sm"
          whileHover={{ x: -3, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ x: 0 }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </motion.button>
      )}
      
      <motion.button
        type={isLastStep ? "submit" : "button"}
        onClick={isLastStep ? undefined : onNext}
        disabled={submitting}
        className={`ml-auto px-6 py-2.5 text-white rounded-lg transition-all flex items-center shadow-md ${
          isLastStep 
            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700' 
            : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
        }`}
        whileHover={{ x: isLastStep ? 0 : 3, y: -3, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)" }}
        whileTap={{ y: 0 }}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {submitting ? (
          <>
            <motion.svg 
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </motion.svg>
            Submitting...
          </>
        ) : isLastStep ? (
          <>
            Submit Feedback
            <Check className="h-4 w-4 ml-2" />
          </>
        ) : (
          <>
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </>
        )}
      </motion.button>
    </div>
  );
};

export default NavigationButtons;