'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { PastAuctionFormData, PastAuctionProperty } from '@/types/PastAuction';

import BasicInformation from '../../../../components/admin/past-auction/BasicInformation';
import Images from '../../../../components/admin/past-auction/Images';
import AuctionPropertiesSection from '../../../../components/admin/past-auction/AuctionPropertiesSection';
import ReviewSubmit from '../../../../components/admin/past-auction/SubmitButton';

export default function EditPastAuctionPage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState<PastAuctionFormData | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const res = await fetch(`/api/admin/past-auctions/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load auction');

        setFormData({
          ...data,
          mapLink: data.mapLink || '',
        });

        setMainImagePreview(data.mainImage);
        setGalleryPreviews(data.gallery || []);
      } catch (err) {
        console.error(err);
        toast.error('Error loading auction data');
        router.push('/admin/past-auctions');
      }
    };

    if (id) fetchAuction();
  }, [id, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const val = type === 'checkbox' ? checked : value;
    setFormData((prev) => prev && { ...prev, [name]: val });
  };

  const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !formData) return;

    setMainImagePreview(URL.createObjectURL(file));
    const uploaded = await uploadToCloudinary(file, `auctions/past/${formData.title}/cover`);
    setFormData({ ...formData, mainImage: uploaded });
  };

  const handleGalleryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!formData || files.length === 0) return;

    const previews = files.map((file) => URL.createObjectURL(file));
    setGalleryPreviews((prev) => [...prev, ...previews]);

    const uploaded = await Promise.all(
      files.map((file) => uploadToCloudinary(file, `auctions/past/${formData.title}/gallery`))
    );

    setFormData({ ...formData, gallery: [...formData.gallery, ...uploaded] });
  };

  const removeGalleryImage = (index: number) => {
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
    if (formData) {
      setFormData({
        ...formData,
        gallery: formData.gallery.filter((_, i) => i !== index),
      });
    }
  };

  const handleAddProperty = () => {
    if (!formData) return;
    const updated = [...formData.properties];
    updated.push({
      type: 'land',
      location: '',
      area: '',
      sold: false,
      images: [],
      featuredAmenities: [],
      nearbyPlaces: [],
      propertyType: ''
    });
    setFormData({ ...formData, properties: updated });
  };

  const handleRemoveProperty = (index: number) => {
    if (!formData) return;
    const updated = [...formData.properties];
    updated.splice(index, 1);
    setFormData({ ...formData, properties: updated });
  };

  const handlePropertyChange = <K extends keyof PastAuctionProperty>(
    index: number,
    field: K,
    value: PastAuctionProperty[K]
  ) => {
    if (!formData) return;
    const updated = [...formData.properties];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, properties: updated });
  };

  const handlePropertyImageUpdate = async (index: number, files: File[]) => {
    if (!formData) return;
    const uploaded = await Promise.all(
      files.map(async (file) => {
        const url = await uploadToCloudinary(file, `auctions/past/${formData.title}/property-${index}`);
        return { url, public_id: url.split('/').pop()?.split('.')[0] || '' };
      })
    );

    const updated = [...formData.properties];
    const oldImages = updated[index].images || [];
    updated[index].images = [...oldImages, ...uploaded];
    setFormData({ ...formData, properties: updated });
  };

  const uploadToCloudinary = async (file: File, folder: string) => {
    const data = new FormData();
    data.append('file', file);

    const res = await fetch(`/api/upload/cloudinary?folder=${folder}`, {
      method: 'POST',
      body: data,
    });

    if (!res.ok) throw new Error('Upload failed');

    const result = await res.json();
    return result.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/admin/past-auctions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to update auction');

      toast.success('Auction updated successfully');
      router.push('/admin/past-auctions');
    } catch (err) {
      toast.error('Error updating auction');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!formData) {
    return <div className="p-10 text-center text-gray-500">Loading auction data...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen bg-white">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Past Auction</h1>

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
            nextStep={() => setCurrentStep(4)}
            prevStep={() => setCurrentStep(2)}
            auctionTitle={formData.title}
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
