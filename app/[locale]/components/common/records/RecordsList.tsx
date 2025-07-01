'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FC } from 'react';
import { motion } from 'framer-motion';
import { Bed, Bath, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { NewRecord } from '@/types/records';

interface RecordsListProps {
  records: NewRecord[];
}

const RecordsList: FC<RecordsListProps> = ({ records }) => {
  const t = useTranslations('records.recordsList');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-10"
        >
          <h2 className="text-3xl font-bold flex items-center">
            <span className="mr-2">{t('title')}</span>
            <span className="text-blue-600 text-lg font-medium bg-blue-50 px-3 py-1 rounded-full">
              {records.length} {t('results')}
            </span>
          </h2>
          
          {records.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={16} />
              <span>{t('lastUpdated')}</span>
            </div>
          )}
        </motion.div>

        {records.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-xl shadow-sm"
          >
            <div className="text-gray-400 mb-3">
              <svg className="inline-block w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold">{t('noRecords.title')}</h3>
            <p className=" mt-2">{t('noRecords.subtitle')}</p>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {records.map((record) => (
              <motion.div
                key={record._id?.toString() || record.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="relative group bg-white rounded-xl shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <div className="absolute top-0 left-0 z-10 m-4">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                      {record.propertyType.charAt(0).toUpperCase() + record.propertyType.slice(1)}
                    </div>
                  </div>
                  
                  {record.image ? (
                    <>
                      <Image
                        src={record.image}
                        alt={record.property}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                    </>
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <p className="text-gray-500">{t('recordCard.noImageAvailable')}</p>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 line-clamp-1">{record.property}</h3>
                  
                  <div className="flex items-center  mb-4">
                    <MapPin size={16} className="mr-1 text-blue-500" />
                    <p className="line-clamp-1">{record.location}</p>
                  </div>

                  <div className="flex flex-wrap gap-4 my-4">
                    {record.bedrooms && (
                      <div className="flex items-center ">
                        <Bed size={18} className="mr-1 text-blue-500" />
                        <span>{record.bedrooms} {t('beds')}</span>
                      </div>
                    )}
                    
                    {record.bathrooms && (
                      <div className="flex items-center ">
                        <Bath size={18} className="mr-1 text-blue-500" />
                        <span>{record.bathrooms} {t('baths')}</span>
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/records/${record._id}`}
                    className="group flex items-center justify-between w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-indigo-600 text-white text-center font-semibold py-3 px-4 rounded-lg transition-all duration-300"
                  >
                    <span>{t('viewDetails')}</span>
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RecordsList;