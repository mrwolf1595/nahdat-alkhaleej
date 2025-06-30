'use client';

import { motion } from 'framer-motion';
import { FileText, Image as ImageIcon, Building, CheckCircle } from 'lucide-react';

interface StepperProps {
  currentStep: number;
}

export default function AuctionStepper({ currentStep }: StepperProps) {
  const steps = [
    { label: 'Basic Info', icon: FileText },
    { label: 'Images', icon: ImageIcon },
    { label: 'Properties', icon: Building },
    { label: 'Review & Submit', icon: CheckCircle },
  ];

  return (
    <div className="flex justify-between mb-8 border-b pb-4">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = currentStep >= index + 1;

        return (
          <motion.div
            key={step.label}
            whileHover={{ scale: 1.05 }}
            className={`flex flex-col items-center ${isActive ? 'text-indigo-600' : 'text-gray-400'}`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isActive ? 'bg-indigo-100' : 'bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-sm mt-1">{step.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}