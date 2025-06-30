'use client';

import { useState, FormEvent, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import TestimonialHeader from './Testimonials/TestimonialHeader';
import ProgressBar from './Testimonials/ProgressBar';
import StepContent from './Testimonials/StepContent';
import ThankYouMessage from './Testimonials/ThankYouMessage';
import NavigationButtons from './Testimonials/NavigationButtons';
import QuickFeedbackOption from './Testimonials/QuickFeedbackOption';
import { FormDataType, useTestimonialForm } from './Testimonials/useTestimonialForm';
 
interface TestimonialsProps {
  sectionTitle: string;
}

export default function TestimonialsComponent({ sectionTitle }: TestimonialsProps) {
  const t = useTranslations('testimonials');
  
  const {
    formData,
    handleChange,
    handleFileChange,
    handleSatisfactionChange,
    handleRecommendationChange,
    handleUseCaseChange,
    handleReturningChange
  } = useTestimonialForm();
  
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [quickFeedback, setQuickFeedback] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);

  // Step configuration with translations
  const stepConfig = [
    {
      label: t('aboutYou'),
      fields: [
        {
          label: t('form.name'),
          fieldId: 'name',
          required: true,
        },
        {
          label: t('form.role'),
          fieldId: 'role',
        },
      ],
    },
    {
      label: t('experience'),
      fields: [
        {
          label: t('form.satisfaction'),
          fieldId: 'satisfaction',
          required: true,
        },
        {
          label: t('form.recommendation'),
          fieldId: 'recommendation',
        },
      ],
    },
    {
      label: t('feedback'),
      fields: [
        {
          label: t('form.testimonial'),
          fieldId: 'message',
          required: true,
        },
        {
          label: t('form.purpose'),
          fieldId: 'useCase',
        },
      ],
    },
    {
      label: t('additionalInfo'),
      fields: [
        {
          label: t('form.returning'),
          fieldId: 'returning',
        },
        {
          label: t('form.improvement'),
          fieldId: 'improvement',
        },
        {
          label: t('form.avatar'),
          fieldId: 'avatar',
        },
      ],
    },
  ];

  // Track user interaction to offer quick feedback option after some interactions
  useEffect(() => {
    if (interactionCount === 3 && !quickFeedback) {
      setQuickFeedback(true);
    }
  }, [interactionCount, quickFeedback]);

  const incrementInteraction = () => {
    setInteractionCount(prev => prev + 1);
  };

  const handleNext = () => {
    if (step < stepConfig.length - 1) {
      setStep(prev => prev + 1);
    }
  };
  
  const handleBack = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };

  const submitForm = async (data: FormDataType) => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== null && value !== undefined) {
          formData.append(key, String(value));
        }
      });

      const res = await fetch('/api/testimonials', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Submission error', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickSubmit = async () => {
    // Validate essential fields
    if (!formData.name || !formData.satisfaction || !formData.message) {
      alert(t('form.validationError'));
      return;
    }

    await submitForm(formData);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await submitForm(formData);
  };

  const calculateProgress = () => {
    return ((step + 1) / stepConfig.length) * 100;
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-4">
        <TestimonialHeader sectionTitle={sectionTitle} />

        {submitted ? (
          <ThankYouMessage />
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100"
          >
            <ProgressBar 
              currentStep={step + 1} 
              totalSteps={stepConfig.length} 
              progress={calculateProgress()} 
            />

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  {stepConfig[step].label}
                  {step === 0 && (
                    <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      Quick start
                    </span>
                  )}
                </h3>
                
                <StepContent 
                  step={step} 
                  formData={formData}
                  handleChange={handleChange}
                  handleFileChange={handleFileChange}
                  handleSatisfactionChange={handleSatisfactionChange}
                  handleRecommendationChange={handleRecommendationChange}
                  handleUseCaseChange={handleUseCaseChange}
                  handleReturningChange={handleReturningChange}
                  incrementInteraction={incrementInteraction}
                />
              </div>

              {quickFeedback && step < stepConfig.length - 1 && (
                <QuickFeedbackOption onQuickSubmit={handleQuickSubmit} />
              )}

              <NavigationButtons 
                step={step} 
                totalSteps={stepConfig.length}
                onBack={handleBack}
                onNext={handleNext}
                submitting={submitting}
              />
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
}