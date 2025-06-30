import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const deleteFromCloudinary = async (url: string) => {
  const parts = url.split('/');
  const publicIdWithExt = parts[parts.length - 1];
  const publicId = `offers/${publicIdWithExt.split('.')[0]}`; // assuming folder is offers
  return cloudinary.uploader.destroy(publicId);
};
