import { useState, ChangeEvent } from 'react';

export interface FormDataType {
  name: string;
  role: string;
  satisfaction: string;
  recommendation: number;
  message: string;
  useCase: string;
  returning: string;
  improvement: string;
  phone: string;
  avatar: File | null;
}

export const useTestimonialForm = () => {
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    role: '',
    satisfaction: '',
    recommendation: 8, // Default value for better user experience
    message: '',
    useCase: '',
    returning: '',
    phone: '',
    improvement: '',
    avatar: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, avatar: e.target.files![0] }));
    }
  };
  
  const handleSatisfactionChange = (value: string) => {
    setFormData(prev => ({ ...prev, satisfaction: value }));
  };
  
  const handleRecommendationChange = (value: number) => {
    setFormData(prev => ({ ...prev, recommendation: value }));
  };
  
  const handleUseCaseChange = (value: string) => {
    setFormData(prev => ({ ...prev, useCase: value }));
  };
  
  const handleReturningChange = (value: string) => {
    setFormData(prev => ({ ...prev, returning: value }));
  };

  return {
    formData,
    handleChange,
    handleFileChange,
    handleSatisfactionChange,
    handleRecommendationChange,
    handleUseCaseChange,
    handleReturningChange
  };
};