'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface PopupProps {
  popup: {
    message: string;
    visible: boolean;
    type?: 'success' | 'error';
  };
  setPopup: React.Dispatch<React.SetStateAction<{ message: string; visible: boolean; type?: 'success' | 'error' }>>;
}

const Popup = ({ popup, setPopup }: PopupProps) => {
  return (
    <AnimatePresence>
      {popup.visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`
            fixed top-6 left-1/2 transform -translate-x-1/2 z-50
            px-6 py-4 rounded-lg shadow-lg border-l-4
            flex items-center justify-between gap-4
            ${popup.type === 'error'
              ? 'bg-red-50 border-red-500 text-red-700'
              : 'bg-green-50 border-green-500 text-green-700'}
          `}
        >
          <div className="flex items-center gap-3">
            {popup.type === 'error' ? (
              <XCircleIcon className="w-6 h-6 text-red-500" />
            ) : (
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
            )}
            <p className="font-medium">{popup.message}</p>
          </div>

          <button
            onClick={() => setPopup((prev) => ({ ...prev, visible: false }))}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close toast"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
