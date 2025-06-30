'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';

interface FormHeaderProps {
  title: string;
}

const FormHeader: FC<FormHeaderProps> = ({ title }) => {
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-2xl font-bold text-center sm:text-left">{title}</h1>
    </motion.div>
  );
};

export default FormHeader;
