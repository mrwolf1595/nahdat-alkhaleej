'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Save, ArrowLeft } from 'lucide-react';

interface ActionButtonsProps {
  onSubmit: () => void;
  onDelete: () => void;
  isSubmitting?: boolean;
}

const ActionButtons: FC<ActionButtonsProps> = ({ onSubmit, onDelete, isSubmitting = false }) => {
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1
      }
    }
  };

  // Animation variants for the buttons
  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 200 }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      className="flex flex-col-reverse sm:flex-row sm:justify-between items-center gap-4 border-t border-gray-200 pt-6 mt-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex gap-3 w-full sm:w-auto">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          type="button"
          onClick={() => window.history.back()}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </motion.button>
        
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          type="button"
          onClick={onDelete}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-2 border border-red-200 bg-white text-red-600 px-5 py-2.5 rounded-lg hover:bg-red-50 transition"
        >
          <Trash2 size={18} />
          <span>Delete</span>
        </motion.button>
      </div>
      
      <motion.button
        variants={buttonVariants}
        whileHover={isSubmitting ? {} : "hover"}
        whileTap={isSubmitting ? {} : "tap"}
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-2.5 rounded-lg shadow-md transition ${
          isSubmitting 
            ? 'bg-blue-400 text-white cursor-not-allowed' 
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isSubmitting ? (
          <>
            <motion.div
              className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span>Updating...</span>
          </>
        ) : (
          <>
            <Save size={18} />
            <span>Save Changes</span>
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

export default ActionButtons;