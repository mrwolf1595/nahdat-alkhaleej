'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import OfferDetailsForm from '../../../components/admin/offers/OfferDetailsForm';
import MainImageUploader from '../../../components/admin/offers/MainImageUploader';
import GalleryUploader from '../../../components/admin/offers/GalleryUploader';

export default function CreateOfferPage() {
  const [offerType, setOfferType] = useState('sale'); // "sale" أو "rent"
  const [featured, setFeatured] = useState(false); // true or false
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [featuredAmenities, setFeaturedAmenities] = useState('');
  const [nearbyPlaces, setNearbyPlaces] = useState('');
  const [sqft, setSqft] = useState('');
  const [area, setArea] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [yearBuilt, setYearBuilt] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');

  const uploadImageToCloudinary = async (file: File, folder: string): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
  
    const res = await fetch(`/api/upload/cloudinary?folder=${folder}`, {
      method: 'POST',
      body: formData,
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw new Error('Upload failed');
    }
  
    return data.secure_url; // دي هي الصورة اللي هتتحفظ في الداتا بيز
  };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  if (!mainImage) {
    setError('Please select a main image');
    setLoading(false);
    return;
  }

  if (galleryImages.length === 0) {
    setError('Please select at least one gallery image');
    setLoading(false);
    return;
  }

  try {
    const folderPath = `offers/${offerType}${featured ? '/featured' : ''}`;

    // رفع الصورة الرئيسية
    const mainImageUrl = await uploadImageToCloudinary(mainImage, folderPath);

    // رفع صور المعرض
    const galleryUrls = await Promise.all(
      galleryImages.map((img) => uploadImageToCloudinary(img, folderPath))
    );

    // إرسال البيانات (بدون رفع فيديو، فقط رابط يوتيوب اختياري)
    const res = await fetch('/api/admin/offers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        price: Number(price),
        location,
        offerType,
        featured,
        mainImage: mainImageUrl,
        gallery: galleryUrls,
        videoUrl: '', // دائمًا فاضي
        youtubeLink: youtubeLink || '', // الرابط اللي المستخدم يكتبه
        featuredAmenities: featuredAmenities
          .split('\n')
          .map((item) => item.trim())
          .filter((item) => item !== ''),
        nearbyPlaces: nearbyPlaces
          .split('\n')
          .map((item) => item.trim())
          .filter((item) => item !== ''),
        sqft,
        area,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        yearBuilt,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push('/admin/offers');
    } else {
      setError(data.message || 'Failed to create offer');
    }
  } catch (err) {
    setError('Something went wrong during upload');
    console.error(err);
  }

  setLoading(false);
};

  

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Offer</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <OfferDetailsForm
          title={title}
          description={description}
          price={price}
          location={location}
          setTitle={setTitle}
          setDescription={setDescription}
          setPrice={setPrice}
          setLocation={setLocation}
        />

        <MainImageUploader
          mainImage={mainImage}
          onChange={(file) => setMainImage(file)}
        />

        <GalleryUploader
          galleryImages={galleryImages}
          onAddImages={(newImgs) => setGalleryImages([...galleryImages, ...newImgs])}
          onRemoveImage={(idx) => setGalleryImages(galleryImages.filter((_, i) => i !== idx))}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
  <label className="block font-semibold mb-1">Featured Amenities (one per line)</label>
  <textarea
    value={featuredAmenities}
    onChange={(e) => setFeaturedAmenities(e.target.value)}
    className="w-full border border-gray-300 rounded px-4 py-2"
    rows={4}
    placeholder="e.g. Swimming Pool\nGym\nSmart Home System"
  />
</div>

<div>
  <label className="block font-semibold mb-1">Nearby Places (one per line)</label>
  <textarea
    value={nearbyPlaces}
    onChange={(e) => setNearbyPlaces(e.target.value)}
    className="w-full border border-gray-300 rounded px-4 py-2"
    rows={4}
    placeholder="e.g. School\nShopping Mall\nHospital"
  />
</div>
<div>
  <label className="block font-semibold mb-1">Square Footage (sqft)</label>
  <input
    type="text"
    value={sqft}
    onChange={(e) => setSqft(e.target.value)}
    className="w-full border border-gray-300 rounded px-4 py-2"
    placeholder="e.g. 1200"
  />
</div>
<div>
  <label className="block font-semibold mb-1">YouTube Link</label>
  <input
    type="url"
    value={youtubeLink}
    onChange={(e) => setYoutubeLink(e.target.value)}
    className="w-full border border-gray-300 rounded px-4 py-2"
    placeholder="https://www.youtube.com/watch?v=..."
  />
</div>


<div>
  <label className="block font-semibold mb-1">Area</label>
  <input
    type="text"
    value={area}
    onChange={(e) => setArea(e.target.value)}
    className="w-full border border-gray-300 rounded px-4 py-2"
    placeholder="e.g. North Jeddah"
  />
</div>

<div className="grid grid-cols-2 gap-4">
  <div>
    <label className="block font-semibold mb-1">Bedrooms</label>
    <input
      type="number"
      value={bedrooms}
      onChange={(e) => setBedrooms(e.target.value)}
      className="w-full border border-gray-300 rounded px-4 py-2"
    />
  </div>
  <div>
    <label className="block font-semibold mb-1">Bathrooms</label>
    <input
      type="number"
      value={bathrooms}
      onChange={(e) => setBathrooms(e.target.value)}
      className="w-full border border-gray-300 rounded px-4 py-2"
    />
  </div>
</div>

<div>
  <label className="block font-semibold mb-1">Year Built</label>
  <input
    type="text"
    value={yearBuilt}
    onChange={(e) => setYearBuilt(e.target.value)}
    className="w-full border border-gray-300 rounded px-4 py-2"
    placeholder="e.g. 2020"
  />
</div>
<div>
  <label className="block font-semibold mb-1">Offer Type</label>
  <select
    value={offerType}
    onChange={(e) => setOfferType(e.target.value)}
    className="w-full border border-gray-300 rounded px-4 py-2"
  >
    <option value="sale">For Sale</option>
    <option value="rent">For Rent</option>
  </select>
</div>

<div className="mt-2">
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      checked={featured}
      onChange={(e) => setFeatured(e.target.checked)}
      className="form-checkbox mr-2"
    />
    Mark as Featured
  </label>
</div>


<div className="mt-4">
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      checked={featured}
      onChange={(e) => setFeatured(e.target.checked)}
      className="mr-2"
    />
    Featured Property
  </label>
</div>



        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Submitting...' : 'Submit Offer'}
        </button>
      </form>
    </div>
  );
}
