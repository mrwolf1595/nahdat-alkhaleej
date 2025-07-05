// /app/admin/team/edit/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function EditTeamMemberPage() {
  const router = useRouter();
  const params = useParams();
  const memberId = params?.id as string;

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    image: '',
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  // تحميل بيانات العضو الحالي
  useEffect(() => {
    if (!memberId) return;
    fetch(`/api/public/team/${memberId}`)
      .then(res => res.json())
      .then(data => {
        setFormData({
          name: data.name,
          role: data.role,
          bio: data.bio,
          image: data.image,
        });
        setPreviewImage(data.image || null);
      })
      .catch(() => toast.error('فشل تحميل بيانات العضو'))
      .finally(() => setLoading(false));
  }, [memberId]);

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
    // ارفع الصورة على Cloudinary
    const url = await uploadToCloudinary(file);
    if (url) {
      setFormData((prev) => ({ ...prev, image: url }));
      toast.success('تم رفع الصورة');
    } else {
      toast.error('فشل رفع الصورة');
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
    } catch {
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/admin/team/${memberId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('تم تحديث العضو!');
        router.push('/admin/team');
      } else {
        toast.error('فشل تحديث البيانات');
      }
    } catch {
      toast.error('حدث خطأ');
    }
  };

  if (loading) return <p className="text-gray-500">جاري التحميل...</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">تعديل بيانات عضو الفريق</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow border">
        <div>
          <label className="block font-semibold mb-1">الاسم</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">الدور</label>
          <input
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">نبذة</label>
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
          <label className="block font-semibold mb-1">الصورة</label>
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
            <p className="text-sm text-gray-500 mt-1">جاري الرفع...</p>
          )}
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? 'جاري الرفع...' : 'تحديث العضو'}
        </button>
      </form>
    </div>
  );
}
