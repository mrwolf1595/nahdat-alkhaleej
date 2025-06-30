import { ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormDataType } from './useTestimonialForm';


// Field components
import AboutYouFields from './fields/AboutYouFields';
import ExperienceFields from './fields/ExperienceFields';
import FeedbackFields from './fields/FeedbackFields';
import AdditionalInfoFields from './fields/AdditionalInfoFields';

interface StepContentProps {
  step: number;
  formData: FormDataType;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSatisfactionChange: (value: string) => void;
  handleRecommendationChange: (value: number) => void;
  handleUseCaseChange: (value: string) => void;
  handleReturningChange: (value: string) => void;
  incrementInteraction: () => void;
}

const StepContent: React.FC<StepContentProps> = ({
  step,
  formData,
  handleChange,
  handleFileChange,
  handleSatisfactionChange,
  handleRecommendationChange,
  handleUseCaseChange,
  handleReturningChange,
  incrementInteraction,
}) => {
  
  const renderStepFields = () => {
    switch (step) {
      case 0:
        return (
          <AboutYouFields 
            formData={formData}
            handleChange={handleChange}
            incrementInteraction={incrementInteraction}
          />
        );
      case 1:
        return (
          <ExperienceFields 
            formData={formData}
            handleSatisfactionChange={handleSatisfactionChange}
            handleRecommendationChange={handleRecommendationChange}
            incrementInteraction={incrementInteraction}
          />
        );
      case 2:
        return (
          <FeedbackFields 
            formData={formData}
            handleChange={handleChange}
            handleUseCaseChange={handleUseCaseChange}
            incrementInteraction={incrementInteraction}
          />
        );
      case 3:
        return (
          <AdditionalInfoFields 
            formData={formData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            handleReturningChange={handleReturningChange}
            incrementInteraction={incrementInteraction}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        {renderStepFields()}
      </motion.div>
    </AnimatePresence>
  );
};

export default StepContent;