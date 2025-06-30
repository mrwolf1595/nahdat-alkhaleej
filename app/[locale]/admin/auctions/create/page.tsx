'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { AuctionFormData, AuctionProperty, PropertyType } from '@/types/auction';
import { AnimatePresence } from 'framer-motion';

// ✅ المكونات المقسّمة
import BasicInfo from '../../../components/admin/auctions/BasicInfo';
import ImagesSection from '../../../components/admin/auctions/ImagesSection';
import AuctionPropertiesSection from '../../../components/admin/auctions/AuctionPropertiesSection';
import ReviewSubmit from '../../../components/admin/auctions/ReviewSubmit';
import AuctionStepper from '../../../components/admin/auctions/AuctionStepper';

export default function CreateAuctionPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<AuctionFormData>({
    title: '',
    auctionDate: '',
    auctionTime: '',
    startingBid: '',
    description: '',
    mainImage: '',
    gallery: [],
    featured: false,
    properties: [],
  });

  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const value =
      target instanceof HTMLInputElement && target.type === 'checkbox'
        ? target.checked
        : target.value;

    setFormData((prev) => ({
      ...prev,
      [target.name]: value,
    }));
  };

  const uploadToCloudinary = async (file: File, folder = 'auctions/upcoming'): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`/api/upload/cloudinary?folder=${folder}`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('Upload failed');
    const data = await res.json();
    return data.secure_url;
  };

  const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    setMainImagePreview(URL.createObjectURL(file));
  
    const folder = `auctions/upcoming/${formData.title || 'auction'}/cover`;
  
    toast.promise(
      uploadToCloudinary(file, folder).then((url) => {
        setFormData((prev) => ({ ...prev, mainImage: url }));
        return url;
      }),
      {
        loading: 'Uploading main image...',
        success: 'Main image uploaded!',
        error: 'Failed to upload image',
      }
    );
  };
  
  const handleGalleryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map((file) => URL.createObjectURL(file));
    setGalleryPreviews((prev) => [...prev, ...previews]);
  
    const folder = `auctions/upcoming/${formData.title || 'auction'}/gallery`;
  
    toast.promise(
      Promise.all(files.map((file) => uploadToCloudinary(file, folder))).then((uploadedUrls) => {
        setFormData((prev) => ({
          ...prev,
          gallery: [...prev.gallery, ...uploadedUrls],
        }));
        return uploadedUrls;
      }),
      {
        loading: `Uploading ${files.length} images...`,
        success: `${files.length} images uploaded!`,
        error: 'Failed to upload images',
      }
    );
  };
  

  const removeGalleryImage = (index: number) => {
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  const handleAddProperty = () => {
    setFormData((prev) => ({
      ...prev,
      properties: [
        ...prev.properties,
        {
          title: '',
          location: '',
          type: 'land',
          area: '',
          price: '',
          mapLink: '',
          featuredAmenities: [],
          nearbyPlaces: [],
          images: [], // ✅ الصور الخاصة بكل عقار
        },
      ],
    }));
  };

  const handlePropertyImageUpdate = async (
    index: number,
    files: File[]
  ) => {
    const folderName = `auctions/upcoming/${formData.title || 'auction'}/property-${index}`;
  
    toast.promise(
      Promise.all(
        files.map(async (file) => {
          const url = await uploadToCloudinary(file, folderName);
          return {
            url,
            public_id: url.split('/').pop()?.split('.')[0] || '',
          };
        })
      ).then((uploadedImages) => {
        setFormData((prev) => {
          const updated = [...prev.properties];
          const oldImages = updated[index].images || [];
  
          updated[index] = {
            ...updated[index],
            images: [...oldImages, ...uploadedImages],
          };
  
          return { ...prev, properties: updated };
        });
      }),
      {
        loading: 'Uploading property images...',
        success: 'Property images uploaded!',
        error: 'Failed to upload property images',
      }
    );
  };
  
  

  const handlePropertyChange = <K extends keyof AuctionProperty>(
    index: number,
    field: K,
    value: AuctionProperty[K]
  ) => {
    const updated = [...formData.properties];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, properties: updated }));
  };

  const handleRemoveProperty = (index: number) => {
    const updated = [...formData.properties];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, properties: updated }));
  };

  const getPropertyIcon = (type: PropertyType) => {
    switch (type) {
      case 'land':
        return <span className="text-emerald-600">🏞️</span>;
      case 'apartment':
        return <span className="text-blue-600">🏢</span>;
      case 'villa':
        return <span className="text-purple-600">🏡</span>;
      case 'building':
        return <span className="text-amber-600">🏗️</span>;
      default:
        return <span className="text-gray-400">🏠</span>;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/upcoming-auctions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to create auction');
      toast.success('Auction created successfully!');
      setTimeout(() => {
        router.push('/admin/auctions');
      }, 1500);
    } catch {
      toast.error('Something went wrong!');
      setIsSubmitting(false);
    }
  };
  console.log('Auction being submitted:', JSON.stringify(formData, null, 2));
  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-8 text-center">Create Upcoming Auction</h1>
      <AuctionStepper currentStep={currentStep} />
      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl shadow-md p-6">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <BasicInfo
              formData={formData}
              handleChange={handleChange}
              nextStep={nextStep}
            />
          )}
          {currentStep === 2 && (
            <ImagesSection
              fileInputRef={fileInputRef}
              galleryInputRef={galleryInputRef}
              mainImagePreview={mainImagePreview}
              galleryPreviews={galleryPreviews}
              handleMainImageChange={handleMainImageChange}
              handleGalleryChange={handleGalleryChange}
              removeGalleryImage={removeGalleryImage}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {currentStep === 3 && (
            <AuctionPropertiesSection
              properties={formData.properties}
              handleAddProperty={handleAddProperty}
              handleRemoveProperty={handleRemoveProperty}
              handlePropertyChange={handlePropertyChange}
              handlePropertyImageUpdate={handlePropertyImageUpdate}
              getPropertyIcon={getPropertyIcon}
              nextStep={nextStep}
              prevStep={prevStep}
              auctionTitle={formData.title}
            />
          )}
          {currentStep === 4 && (
            <ReviewSubmit
              formData={formData}
              mainImagePreview={mainImagePreview}
              galleryPreviews={galleryPreviews}
              getPropertyIcon={getPropertyIcon}
              prevStep={prevStep}
              isSubmitting={isSubmitting}
            />
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
