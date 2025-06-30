'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Save, Trash2, Tag, FileText, Home, Video } from 'lucide-react';

// Import components
import FormHeader from '../../../../components/admin/offers/edit/FormHeader';
import TextFields from '../../../../components/admin/offers/edit/TextFields';
import MainImageUploader from '../../../../components/admin/offers/edit/MainImageUploader';
import GalleryUploader from '../../../../components/admin/offers/edit/GalleryUploader';
import ListEditor from '../../../../components/admin/offers/edit/ListEditor';
import ActionButtons from '../../../../components/admin/offers/edit/ActionButtons';
import LoadingSpinner from '../../../../components/admin/offers/edit/LoadingSpinner';
import VideoLinksEditor from '../../../../components/admin/offers/edit/VideoLinksEditor';

export default function EditOfferPage() {
  const { id } = useParams();
  const router = useRouter();
  const [featured, setFeatured] = useState(false);
  const [offerType, setOfferType] = useState('sale'); // or 'rent'
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [existingMainImage, setExistingMainImage] = useState('');
  const [gallery, setGallery] = useState<File[]>([]);
  const [existingGallery, setExistingGallery] = useState<string[]>([]);
  const [amenities, setAmenities] = useState('');
  const [nearby, setNearby] = useState('');
  const [videoLinks, setVideoLinks] = useState<string[]>([]); // Added video links state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('details');
  const [sqft, setSqft] = useState('');
  const [area, setArea] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [yearBuilt, setYearBuilt] = useState('');
  
  useEffect(() => {
    const fetchOffer = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/offers/${id}`);
        const data = await res.json();
        setTitle(data.title || '');
        setDescription(data.description || '');
        setPrice(data.price?.toString() || '');
        setLocation(data.location || '');
        setExistingMainImage(data.mainImage || '');
        setExistingGallery(data.gallery || []);
        setAmenities((data.featuredAmenities || []).join('\n'));
        type NearbyItem = string | { name: string };
        setNearby(
          Array.isArray(data.nearbyPlaces)
            ? (data.nearbyPlaces as NearbyItem[])
                .map((x) => typeof x === 'string' ? x : x.name)
                .join('\n')
            : ''
        );
        setSqft(data.sqft || '');
        setArea(data.area || '');
        setBedrooms(data.bedrooms?.toString() || '');
        setBathrooms(data.bathrooms?.toString() || '');
        setYearBuilt(data.yearBuilt || '');
        setOfferType(data.offerType || 'sale');
        setFeatured(data.featured || false);
        setVideoLinks(data.videoLinks || []); // Load existing video links
        
      } catch (error) {
        console.error('Error fetching offer:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchOffer();
  }, [id]);

  const upload = async (file: File) => {
    const form = new FormData();
    form.append('file', file);
    const res = await fetch(`/api/upload/cloudinary?folder=offers`, { method: 'POST', body: form });
    const data = await res.json();
    return data.secure_url;
  };
  const generateDescriptionAI = async () => {
    try {
      const res = await fetch('/api/admin/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          location,
          area,
          price,
          bedrooms,
          bathrooms,
          amenities: amenities.split('\n'),
        }),
      });
      console.log({
        title,
        location,
        area,
        price,
        bedrooms,
        bathrooms,
        amenities: amenities.split('\n')
      });
      
      const data = await res.json();
      if (data.description) {
        setDescription(data.description);
      } else {
        alert('فشل توليد الوصف');
      }
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء توليد الوصف');
    }
  };
  
  
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const main = mainImage ? await upload(mainImage) : existingMainImage;
      const galleryUrls = [
        ...existingGallery,
        ...(await Promise.all(gallery.map((img) => upload(img)))),
      ];
      const payload = {
        title,
        description,
        price: Number(price),
        location,
        offerType,
        featured,
        mainImage: main,
        gallery: galleryUrls,
        featuredAmenities: amenities.split('\n').map((x) => x.trim()).filter(Boolean),
        nearbyPlaces: nearby
          .split('\n')
          .map((x) => x.trim())
          .filter(Boolean),
        sqft,
        area,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        yearBuilt,
        videoLinks, // Added video links to payload
      };
      const res = await fetch(`/api/offers/${id}/update`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) router.push('/admin/offers');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this offer?')) return;
    const res = await fetch(`/api/offers/${id}/delete`, { method: 'DELETE' });
    if (res.ok) router.push('/admin/offers');
  };

  if (isLoading) return <LoadingSpinner />;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const tabVariants = {
    inactive: { opacity: 0.7, y: 0 },
    active: { opacity: 1, y: -2, scale: 1.05 }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 md:py-10">
      <FormHeader title="Edit Offer" />
      
      {/* Mobile Tabs Navigation */}
      <div className="md:hidden mb-6 overflow-x-auto whitespace-nowrap pb-2">
        <div className="flex space-x-4">
          <motion.button 
            onClick={() => setActiveSection('details')}
            variants={tabVariants}
            animate={activeSection === 'details' ? 'active' : 'inactive'}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              activeSection === 'details' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'
            }`}
          >
            <FileText size={16} />
            Details
          </motion.button>
          
          <motion.button 
            onClick={() => setActiveSection('images')}
            variants={tabVariants}
            animate={activeSection === 'images' ? 'active' : 'inactive'}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              activeSection === 'images' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'
            }`}
          >
            <Home size={16} />
            Images
          </motion.button>
          
          <motion.button 
            onClick={() => setActiveSection('videos')}
            variants={tabVariants}
            animate={activeSection === 'videos' ? 'active' : 'inactive'}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              activeSection === 'videos' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'
            }`}
          >
            <Video size={16} />
            Videos
          </motion.button>
          
          <motion.button 
            onClick={() => setActiveSection('features')}
            variants={tabVariants}
            animate={activeSection === 'features' ? 'active' : 'inactive'}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              activeSection === 'features' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'
            }`}
          >
            <Tag size={16} />
            Features
          </motion.button>
        </div>
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-12 gap-8"
      >
        {/* Left column - always visible on Desktop */}
        <motion.div 
          variants={itemVariants}
          className={`md:col-span-7 ${activeSection !== 'details' && activeSection !== 'all' ? 'hidden md:block' : ''}`}
        >
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-sm p-6 mb-6"
          >
            <div className="flex items-center gap-2 text-lg font-semibold mb-4 text-blue-800">
              <FileText size={20} />
              <h2>Property Details</h2>
            </div>
            <TextFields
              title={title}
              description={description}
              price={price}
              location={location}
              sqft={sqft}
              area={area}
              bedrooms={bedrooms}
              bathrooms={bathrooms}
              yearBuilt={yearBuilt}
              onTitleChange={setTitle}
              onDescriptionChange={setDescription}
              onPriceChange={setPrice}
              onLocationChange={setLocation}
              onSqftChange={setSqft}
              onAreaChange={setArea}
              onBedroomsChange={setBedrooms}
              onBathroomsChange={setBathrooms}
              onYearBuiltChange={setYearBuilt}
            />
            <div className="mt-2">
  <button
    type="button"
    onClick={generateDescriptionAI}
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
  >
    توليد وصف عقاري بالذكاء الاصطناعي
  </button>
</div>

            <div className="mb-4">
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

            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox mr-2"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />
                Featured Property
              </label>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Right column - split into sections */}
        <motion.div 
          variants={itemVariants}
          className={`md:col-span-5 space-y-6 ${activeSection !== 'images' && activeSection !== 'features' && activeSection !== 'videos' && activeSection !== 'all' ? 'hidden md:block' : ''}`}
        >
          {/* Images section */}
          <motion.div 
            variants={itemVariants}
            className={`bg-white rounded-xl shadow-sm p-6 ${activeSection !== 'images' && activeSection !== 'all' ? 'hidden md:block' : ''}`}
          >
            <div className="flex items-center gap-2 text-lg font-semibold mb-4 text-blue-800">
              <Home size={20} />
              <h2>Property Images</h2>
            </div>
            <MainImageUploader
              mainImage={mainImage}
              existingMainImage={existingMainImage}
              onChange={(file) => {
                setMainImage(file);
                setExistingMainImage('');
              }}
            />
            <div className="mt-6">
              <GalleryUploader
                existingGallery={existingGallery}
                newGallery={gallery}
                onAddImages={(files) => setGallery([...gallery, ...files])}
                onRemoveExisting={(i) => setExistingGallery(existingGallery.filter((_, idx) => idx !== i))}
                onRemoveNew={(i) => setGallery(gallery.filter((_, idx) => idx !== i))}
              />
            </div>
          </motion.div>
          
          {/* Videos section - NEW */}
          <motion.div 
            variants={itemVariants}
            className={`bg-white rounded-xl shadow-sm p-6 ${activeSection !== 'videos' && activeSection !== 'all' ? 'hidden md:block' : ''}`}
          >
            <div className="flex items-center gap-2 text-lg font-semibold mb-4 text-blue-800">
              <Video size={20} />
              <h2>Property Videos</h2>
            </div>
            <VideoLinksEditor
              videoLinks={videoLinks}
              onChange={setVideoLinks}
            />
          </motion.div>
          
          {/* Features section */}
          <motion.div 
            variants={itemVariants}
            className={`bg-white rounded-xl shadow-sm p-6 ${activeSection !== 'features' && activeSection !== 'all' ? 'hidden md:block' : ''}`}
          >
            <div className="flex items-center gap-2 text-lg font-semibold mb-4 text-blue-800">
              <Tag size={20} />
              <h2>Features & Location</h2>
            </div>
            <ListEditor 
              label="Featured Amenities" 
              value={amenities} 
              onChange={setAmenities}
              placeholder="Enter each amenity on a new line"
            />
            <div className="mt-6">
              <ListEditor 
                label="Nearby Places" 
                value={nearby} 
                onChange={setNearby}
                placeholder="Enter each nearby place on a new line"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Floating action bar for mobile */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 md:hidden"
      >
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-1 text-red-600 px-3 py-2 rounded-md"
          >
            <Trash2 size={16} />
            Delete
          </button>
          
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            {isSubmitting ? (
              <>Updating...</>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </motion.div>
      
      {/* Desktop action buttons */}
      <div className="hidden md:block mt-8">
        <ActionButtons onSubmit={handleSubmit} onDelete={handleDelete} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
}