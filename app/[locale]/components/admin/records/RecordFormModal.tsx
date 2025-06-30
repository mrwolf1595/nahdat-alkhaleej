'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { NewRecord, RecordType, SalesRecord, EvaluationRecord, AuctionRecord } from '@/types/records';

interface Props {
  record: NewRecord | null;
  onClose: () => void;
  onSave: (record: NewRecord) => void;
  defaultType: RecordType;
}

const uploadToCloudinary = async (file: File, folder: string): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder.trim());
  const res = await fetch('/api/upload/cloudinary', {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Upload failed');
  const data = await res.json();
  return data.secure_url;
};

export function RecordFormModal({ record, onClose, onSave, defaultType }: Props) {
  const [formData, setFormData] = useState<NewRecord>(() => {
    const base = {
      id: Date.now(),
      property: '',
      propertyType: '',
      location: '',
      area: '',
      description: '',
      date: '',
      type: defaultType,
      image: '',
      gallery: [],
      mapLink: '',
      iframeLink: '',
      yearBuilt: '',
      bedrooms: '',
      bathrooms: '',
    };

    if (defaultType === 'sales') return { ...base, soldPrice: '', soldDate: '' } as SalesRecord;
    if (defaultType === 'evaluations') return { ...base, estimatedValue: '' } as EvaluationRecord;
    if (defaultType === 'auctions') return { ...base, startingBid: '', sold: false } as AuctionRecord;
    throw new Error('Invalid defaultType');
  });

  useEffect(() => {
    if (record) {
      setFormData({
        ...record,
        gallery: record.gallery || [],
      });
    }
  }, [record]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const val = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleGalleryUpload = async (files: FileList | null) => {
    if (!files) return;
    const folder = `records/${formData.type}/gallery`;
    const uploaded: string[] = [];

    for (const file of Array.from(files)) {
      const url = await uploadToCloudinary(file, folder);
      uploaded.push(url);
    }

    setFormData((prev) => ({
      ...prev,
      gallery: [...(prev.gallery || []), ...uploaded],
    }));

    toast.success('Gallery images uploaded');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    let cleaned: NewRecord;
  
    const sharedFields = {
      area: formData.area,
      description: formData.description,
      property: formData.property,
      propertyType: formData.propertyType,
      location: formData.location,
      date: formData.date,
      image: formData.image,
      gallery: formData.gallery,
      mapLink: formData.mapLink,
      iframeLink: formData.iframeLink,
      yearBuilt: formData.yearBuilt,
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      type: formData.type,
      id: formData.id,
      _id: formData._id,
      units: formData.units,
      listedPrice: formData.listedPrice,
      listedDate: formData.listedDate,
    };
  
    switch (formData.type) {
      case 'sales':
        cleaned = {
          ...sharedFields,
          type: 'sales',
          soldPrice: formData.soldPrice || '',
          soldDate: formData.soldDate || '',
        } as SalesRecord;
        break;
  
      case 'evaluations':
        cleaned = {
          ...sharedFields,
          type: 'evaluations',
          estimatedValue: formData.estimatedValue || '',
        } as EvaluationRecord;
        break;
  
      case 'auctions':
        cleaned = {
          ...sharedFields,
          type: 'auctions',
          startingBid: formData.startingBid || '',
          sold: formData.sold ?? false,
        } as AuctionRecord;
        break;
  
      default:
        throw new Error('Invalid record type');
    }
  
    onSave(cleaned);
    toast.success(record ? 'Record updated' : 'Record created');
  };
  

  const isBuiltProperty = formData.propertyType !== 'land';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl max-w-md w-full p-6 relative overflow-y-auto max-h-[95vh]">
        <button onClick={onClose} className="absolute top-2 right-2 text-zinc-500 hover:text-white">
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {record ? 'Edit Record' : 'Create New Record'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="property" placeholder="Property Name" value={formData.property} onChange={handleChange} required className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800" />
          <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800" />
          <input name="area" placeholder="Area (m²)" value={formData.area || ''} onChange={handleChange} className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800" />
          <textarea name="description" placeholder="Property Description" value={formData.description || ''} onChange={handleChange} className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800" />

          <select name="propertyType" value={formData.propertyType} onChange={handleChange} required className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800">
            <option value="">Select Property Type</option>
            <option value="land">Land</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="building">Building</option>
          </select>

          <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800" />

          {formData.type === 'sales' && (
            <>
              <input name="soldPrice" placeholder="Sold Price" value={formData.soldPrice || ''} onChange={handleChange} required className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800" />
              <input type="date" name="soldDate" placeholder="Sold Date" value={formData.soldDate || ''} onChange={handleChange} required className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800" />
            </>
          )}
          {formData.type === 'evaluations' && (
            <input name="estimatedValue" placeholder="Estimated Value" value={formData.estimatedValue || ''} onChange={handleChange} required className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800" />
          )}
          {formData.type === 'auctions' && (
            <>
              <input name="startingBid" placeholder="Starting Bid" value={formData.startingBid || ''} onChange={handleChange} required className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800" />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="sold" checked={formData.sold ?? false} onChange={handleChange} />
                Mark as Sold
              </label>
            </>
          )}

          <div>
            <label className="text-sm font-medium block mb-1">Main Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const folder = `records/${formData.type}/cover`;
                  const url = await uploadToCloudinary(file, folder);
                  setFormData((prev) => ({ ...prev, image: url }));
                  toast.success('Main image uploaded');
                }
              }}
              className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800"
            />
            {formData.image && (
              <Image src={formData.image} alt="Cover" className="mt-2 rounded shadow w-full object-cover" width={400} height={200} />
            )}
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Gallery Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleGalleryUpload(e.target.files)}
              className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800"
            />
            {(formData.gallery?.length || 0) > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {(formData.gallery || []).map((img, idx) => (
                  <div key={idx} className="relative w-full aspect-square">
                    <Image src={img} alt={`Gallery ${idx}`} fill className="object-cover rounded" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {isBuiltProperty && (
            <>
              <input name="yearBuilt" placeholder="Year Built" value={formData.yearBuilt} onChange={handleChange} className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800" />
              <input name="bedrooms" placeholder="Bedrooms" value={formData.bedrooms} onChange={handleChange} className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800" />
              <input name="bathrooms" placeholder="Bathrooms" value={formData.bathrooms} onChange={handleChange} className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800" />
              <input name="mapLink" placeholder="Google Maps Link" value={formData.mapLink} onChange={handleChange} className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800" />
              <input name="iframeLink" placeholder="Google Maps Iframe Link" value={formData.iframeLink} onChange={handleChange} className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800" />
              <input
                name="units"
                placeholder="Number of Units"
                value={formData.units || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800"/>
              <input
                name="listedPrice"
                placeholder="Listed Price"
                value={formData.listedPrice || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800"
              />
              <input
                type="date"
                name="listedDate"
                value={formData.listedDate || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800"
              />
            </>
          )}

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            {record ? 'Save Changes' : 'Save Record'}
          </button>
        </form>
      </div>
    </div>
  );
}