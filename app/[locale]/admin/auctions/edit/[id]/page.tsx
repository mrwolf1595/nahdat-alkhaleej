'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { AuctionFormData, AuctionProperty, PropertyType } from '@/types/auction';
import { AnimatePresence } from 'framer-motion';

import BasicInfo from '../../../../components/admin/auctions/BasicInfo';
import ImagesSection from '../../../../components/admin/auctions/ImagesSection';
import AuctionPropertiesSection from '../../../../components/admin/auctions/AuctionPropertiesSection';
import ReviewSubmit from '../../../../components/admin/auctions/ReviewSubmit';
import AuctionStepper from '../../../../components/admin/auctions/AuctionStepper';


export default function EditAuctionPage() {
  const { id } = useParams();
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<AuctionFormData | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // 🟢 تحميل البيانات
  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const res = await fetch(`/api/admin/upcoming-auctions/${id}`);
        const data = await res.json();
        setFormData({
          title: data.title,
          auctionDate: data.auctionDate,
          auctionTime: data.auctionTime,
          startingBid: data.startingBid,
          description: data.description,
          mainImage: data.mainImage,
          gallery: data.gallery,
          featured: data.featured,
          properties: data.properties,
        });
        setMainImagePreview(data.mainImage);
        setGalleryPreviews(data.gallery);
      } catch {
        toast.error('Failed to load auction');
        router.push('/admin/auctions');
      }
    };

    if (id) fetchAuction();
  }, [id, router]);

  // 🟠 التعديلات
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const value =
      target instanceof HTMLInputElement && target.type === 'checkbox'
        ? target.checked
        : target.value;

    setFormData((prev) => prev && ({ ...prev, [target.name]: value }));
  };

  const handleAddProperty = () => {
    setFormData((prev) =>
      prev && {
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
          },
        ],
      }
    );
  };

  const handlePropertyChange = <K extends keyof AuctionProperty>(
    index: number,
    field: K,
    value: AuctionProperty[K]
  ) => {
    if (!formData) return;
    const updated = [...formData.properties];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, properties: updated });
  };

  const handleRemoveProperty = (index: number) => {
    if (!formData) return;
    const updated = [...formData.properties];
    updated.splice(index, 1);
    setFormData({ ...formData, properties: updated });
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

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/admin/upcoming-auctions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();
      toast.success('Auction updated successfully!');
      router.push('/admin/auctions');
    } catch (error) {
      console.error('Error updating auction:', error);
      toast.error('Failed to update auction.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!formData) {
    return (
      <div className="text-center text-gray-500 py-20 text-lg">
        Loading auction...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Auction</h1>
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
              handleMainImageChange={() => toast('Image change not supported in edit')}
              handleGalleryChange={() => toast('Gallery change not supported')}
              removeGalleryImage={() => toast('Remove image not available')}
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
              handlePropertyImageUpdate={async () => {
                toast('Property image update not supported');
              }}
              auctionTitle={formData.title}
              getPropertyIcon={getPropertyIcon}
              nextStep={nextStep}
              prevStep={prevStep}
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