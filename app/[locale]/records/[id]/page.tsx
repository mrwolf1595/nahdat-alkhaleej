import { notFound } from 'next/navigation';
import { RecordModel } from '@/models/Record';
import Image from 'next/image';
import Link from 'next/link';
import { NewRecord } from '../../../../types/records';
import { 
  Home as HomeIcon, 
  MapPin as MapPinIcon, 
  Ruler as RulerIcon, 
  Bed as BedIcon, 
  Bath as BathIcon, 
  Building as BuildingIcon, 
  Banknote as BanknoteIcon, 
  BarChart as ChartBarIcon, 
  Gavel as GavelIcon, 
  Calendar as CalendarIcon, 
  HardHat as ConstructionIcon, 
  ArrowLeft as ArrowLeftIcon, 
  Camera as CameraIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from 'lucide-react';
import AutoGallerySlider from '../../components/common/records/AutoGallerySlider';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

// Define the params type properly as a Promise for Next.js 15.2.4
type PageParams = Promise<{
  id: string;
  locale?: string;
}>;

// Add metadata generation function
export async function generateMetadata({ 
  params 
}: { 
  params: PageParams 
}): Promise<Metadata> {
  // Wait for params to resolve
  const resolvedParams = await params;
  const record = await RecordModel.findById(resolvedParams.id).lean<NewRecord>();
  
  if (!record) {
    return {
      title: 'Record Not Found',
    };
  }
  
  return {
    title: record.property || 'Property Record',
    description: `View details for ${record.property} in ${record.location || 'our records'}`,
  };
}

// Use async component and properly handle the Promise params
export default async function RecordDetailPage({
  params,
}: {
  params: PageParams;
}) {
  // Force use icons to prevent ESLint unused variable warnings
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _unusedIcons = { ChevronLeftIcon, ChevronRightIcon };
  
  // Wait for params to resolve
  const resolvedParams = await params;
  
  const record = await RecordModel.findById(resolvedParams.id).lean<NewRecord>();

  if (!record) return notFound();

  const accentColor = record.type === 'sales' 
    ? 'text-blue-600 border-blue-400' 
    : record.type === 'evaluations' 
      ? 'text-emerald-600 border-emerald-400' 
      : 'text-orange-600 border-orange-400';

  const gradientBg = record.type === 'sales' 
    ? 'bg-gradient-to-br from-blue-50 to-indigo-100' 
    : record.type === 'evaluations' 
      ? 'bg-gradient-to-br from-green-50 to-emerald-100' 
      : 'bg-gradient-to-br from-amber-50 to-orange-100';

  const iconBgColor = record.type === 'sales' 
    ? 'bg-blue-100 text-blue-600' 
    : record.type === 'evaluations' 
      ? 'bg-emerald-100 text-emerald-600' 
      : 'bg-orange-100 text-orange-600';

  // Create an image gallery array that includes the main image and all gallery images
  const allImages = [
    ...(record.image ? [record.image] : []),
    ...(record.gallery || [])
  ];

  return (
    <div className={`min-h-screen ${gradientBg} animate-fadeIn`}>
      {/* Top Full-Width Gallery Section */}
      <div className="relative w-full">
        {allImages.length > 0 ? (
          <AutoGallerySlider images={allImages} propertyName={record.property} />
        ) : (
          <div className="w-full h-[500px] bg-zinc-200 flex flex-col items-center justify-center text-zinc-500">
            <CameraIcon className="w-20 h-20 mb-4" />
            <p className="text-xl font-medium">No Images Available</p>
          </div>
        )}
        
        {/* Back button positioned absolutely on top of the slider */}
        <div className="absolute top-6 left-6 z-10">
          <Link 
            href={`/${resolvedParams.locale || 'en'}/records`} 
            className="group flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-gray-700 hover:text-blue-700 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Records</span>
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-12 px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 -mt-20 relative z-10">
          <div className="flex items-center space-x-2 mb-6">
            <HomeIcon className={`w-7 h-7 ${accentColor}`} />
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
              {record.property}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slideUp">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Property Details</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${iconBgColor}`}>
                    <MapPinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-700">{record.location}</p>
                  </div>
                </div>
                
                {record.area && (
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${iconBgColor}`}>
                      <RulerIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Area</p>
                      <p className="font-medium text-gray-700">{record.area}</p>
                    </div>
                  </div>
                )}
                
                {record.bedrooms && (
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${iconBgColor}`}>
                      <BedIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bedrooms</p>
                      <p className="font-medium text-gray-700">{record.bedrooms}</p>
                    </div>
                  </div>
                )}
                
                {record.bathrooms && (
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${iconBgColor}`}>
                      <BathIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bathrooms</p>
                      <p className="font-medium text-gray-700">{record.bathrooms}</p>
                    </div>
                  </div>
                )}
                
                {record.units && (
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${iconBgColor}`}>
                      <BuildingIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Units</p>
                      <p className="font-medium text-gray-700">{record.units}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Transaction Details</h2>
              <div className="space-y-4">
                {record.type === 'sales' && record.soldPrice && (
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${iconBgColor}`}>
                      <BanknoteIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Sold Price</p>
                      <p className="font-medium text-gray-700">{record.soldPrice}</p>
                    </div>
                  </div>
                )}
                
                {record.type === 'evaluations' && record.estimatedValue && (
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${iconBgColor}`}>
                      <ChartBarIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Estimated Value</p>
                      <p className="font-medium text-gray-700">{record.estimatedValue}</p>
                    </div>
                  </div>
                )}
                
                {record.type === 'auctions' && record.startingBid && (
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${iconBgColor}`}>
                      <GavelIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Starting Bid</p>
                      <p className="font-medium text-gray-700">{record.startingBid}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${iconBgColor}`}>
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium text-gray-700">{record.date}</p>
                  </div>
                </div>
                
                {record.yearBuilt && (
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${iconBgColor}`}>
                      <ConstructionIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Year Built</p>
                      <p className="font-medium text-gray-700">{record.yearBuilt}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Thumbnail gallery section for quick navigation */}
          {allImages.length > 3 && (
            <div className="mt-10 animate-slideUp">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <CameraIcon className={`w-5 h-5 mr-2 ${accentColor}`} />
                All Photos
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {allImages.slice(0, 10).map((img: string, index: number) => (
                  <div 
                    key={index}
                    className="relative w-full aspect-square rounded-lg overflow-hidden shadow-md cursor-pointer transform hover:scale-105 hover:shadow-xl transition-all duration-300"
                  >
                    <Image 
                      src={img} 
                      alt={`Photo ${index + 1}`} 
                      fill 
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      className="object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">#{index + 1}</span>
                    </div>
                  </div>
                ))}
                
                {allImages.length > 10 && (
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-md cursor-pointer bg-gray-100 flex items-center justify-center">
                    <span className="font-bold text-gray-600">+{allImages.length - 10} more</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}