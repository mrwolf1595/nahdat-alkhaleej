'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { PastAuctionFormData, PastAuctionProperty } from '@/types/PastAuction';

import BasicInformation from '../../../components/admin/past-auction/BasicInformation';
import Images from '../../../components/admin/past-auction/Images';
import AuctionPropertiesSection from '../../../components/admin/past-auction/AuctionPropertiesSection';
import ReviewSubmit from '../../../components/admin/past-auction/SubmitButton';

const initialState: PastAuctionFormData = {
  title: '',
  description: '',
  auctionDate: '',
  auctionTime: '',
  location: '',
  mapLink: '',
  mainImage: '',
  gallery: [],
  featured: false,
  properties: [],
};

export default function CreatePastAuctionPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<PastAuctionFormData>(initialState);
  const [currentStep, setCurrentStep] = useState(1);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const val = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMainImagePreview(URL.createObjectURL(file));

    const url = await uploadToCloudinary(file, `auctions/past/${formData.title}/cover`);
    setFormData((prev) => ({ ...prev, mainImage: url }));
  };

  const handleGalleryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map((file) => URL.createObjectURL(file));
    setGalleryPreviews((prev) => [...prev, ...previews]);

    const uploaded = await Promise.all(
      files.map((file) => uploadToCloudinary(file, `auctions/past/${formData.title}/gallery`))
    );

    setFormData((prev) => ({ ...prev, gallery: [...prev.gallery, ...uploaded] }));
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
          type: 'land',
          propertyType: '', // Add the required propertyType field
          location: '',
          area: '',
          sold: false,
          images: [],
          featuredAmenities: [],
          nearbyPlaces: [],
        },
      ],
    }));
  };

  const handleRemoveProperty = (index: number) => {
    const updated = [...formData.properties];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, properties: updated }));
  };

  const handlePropertyChange = <K extends keyof PastAuctionProperty>(
    index: number,
    field: K,
    value: PastAuctionProperty[K]
  ) => {
    const updated = [...formData.properties];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, properties: updated }));
  };

  const handlePropertyImageUpdate = async (index: number, files: File[]) => {
    const folder = `auctions/past/${formData.title}/property-${index}`;
  
    // check already uploaded file names
    const existingUrls = formData.properties[index]?.images?.map((img) => img.url) || [];
  
    const uploaded = await Promise.all(
      files.map(async (file) => {
        const url = await uploadToCloudinary(file, folder);
        if (existingUrls.includes(url)) return null; // skip duplicates
        return {
          url,
          public_id: url.split('/').pop()?.split('.')[0] || '',
        };
      })
    );
  
    const filtered = uploaded.filter((item): item is { url: string; public_id: string } => item !== null);
  
    setFormData((prev) => {
      const updated = [...prev.properties];
      const oldImages = updated[index].images || [];
      updated[index].images = [...oldImages, ...filtered];
      return { ...prev, properties: updated };
    });
  };
  
  const uploadToCloudinary = async (file: File, folder: string) => {
    const data = new FormData();
    data.append('file', file);
    const res = await fetch(`/api/upload/cloudinary?folder=${folder}`, {
      method: 'POST',
      body: data,
    });

    if (!res.ok) throw new Error('Failed to upload image');
    const result = await res.json();
    return result.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/past-auctions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to create auction');

      toast.success('Past auction created!');
      router.push('/admin/past-auctions');
    } catch (err) {
      toast.error('Something went wrong');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen bg-white">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Create Past Auction</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {currentStep === 1 && (
          <BasicInformation
            formData={formData}
            handleChange={handleChange}
            nextStep={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <Images
            fileInputRef={fileInputRef}
            galleryInputRef={galleryInputRef}
            mainImagePreview={mainImagePreview}
            galleryPreviews={galleryPreviews}
            handleMainImageChange={handleMainImageChange}
            handleGalleryChange={handleGalleryChange}
            removeGalleryImage={removeGalleryImage}
            nextStep={() => setCurrentStep(3)}
            prevStep={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <AuctionPropertiesSection
            properties={formData.properties}
            handleAddProperty={handleAddProperty}
            handleRemoveProperty={handleRemoveProperty}
            handlePropertyChange={handlePropertyChange}
            handlePropertyImageUpdate={handlePropertyImageUpdate}
            auctionTitle={formData.title}
            nextStep={() => setCurrentStep(4)}
            prevStep={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && (
          <ReviewSubmit
            formData={formData}
            mainImagePreview={mainImagePreview}
            galleryPreviews={galleryPreviews}
            prevStep={() => setCurrentStep(3)}
            isSubmitting={isSubmitting}
          />
        )}
      </form>
    </div>
  );
}
