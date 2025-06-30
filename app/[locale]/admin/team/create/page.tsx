'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function CreateTeamMemberPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    image: '',
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));
    setUploading(true);
    const url = await uploadToCloudinary(file);

    if (url) {
      setFormData((prev) => ({ ...prev, image: url }));
      toast.success('Image uploaded');
    } else {
      toast.error('Image upload failed');
    }
    setUploading(false);
  };

  const uploadToCloudinary = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload/cloudinary', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      return data.secure_url || null;
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      toast.error('Please upload an image first');
      return;
    }

    try {
      const res = await fetch('/api/admin/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('Team member added!');
        router.push('/admin/team');
      } else {
        toast.error('Failed to add member');
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Team Member</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow border"
      >
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Role</label>
          <input
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block mb-2"
          />
            {previewImage && (
  <Image
    src={previewImage}
    alt="Preview"
    width={128}
    height={128}
    className="rounded-md object-cover"
  />
)}

          {uploading && (
            <p className="text-sm text-gray-500 mt-1">Uploading...</p>
          )}
        </div>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          disabled={uploading}
          className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Add Member'}
        </motion.button>
      </form>
    </div>
  );
}
