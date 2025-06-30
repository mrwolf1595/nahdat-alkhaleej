import React from 'react';
import { FaCalendarAlt, FaClock, FaTag, FaDollarSign, FaInfoCircle } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

interface AuctionInformationProps {
  auctionDate: string;
  auctionTime: string;
  startingBid: string;
  estimatedValue?: string;
}

export default function AuctionInformation({
  auctionDate,
  auctionTime,
  startingBid,
  estimatedValue
}: AuctionInformationProps) {
  const t = useTranslations('auctionId.detail.sections');
  const infoT = useTranslations('auctionId.detail.auctionInfo');

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
        <span 
          className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 p-2 rounded-lg mr-3 shadow-sm"
        >
          <FaInfoCircle className="w-5 h-5" />
        </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-yellow-600">
          {t('auctionInformation')}
        </span>
      </h3>
      
      <div 
        className="bg-white rounded-2xl shadow-lg p-6 mb-6 hover:shadow-xl transition-all duration-500 border border-amber-100 relative overflow-hidden"
      >
        {/* Background decorative element */}
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br from-amber-100/40 to-yellow-100/40 rounded-full blur-2xl"></div>
        <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-gradient-to-tr from-amber-100/40 to-yellow-100/40 rounded-full blur-2xl"></div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
          <div 
            className="flex items-center p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 hover:from-indigo-100 hover:to-blue-100 transition-colors duration-300 transform hover:scale-[1.03] hover:-translate-y-1"
          >
            <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full mr-4 shadow-sm">
              <FaCalendarAlt className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-indigo-400">{infoT('date')}</p>
              <p className="font-semibold text-indigo-700">{auctionDate}</p>
            </div>
          </div>
          
          <div 
            className="flex items-center p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 hover:from-indigo-100 hover:to-blue-100 transition-colors duration-300 transform hover:scale-[1.03] hover:-translate-y-1"
          >
            <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full mr-4 shadow-sm">
              <FaClock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-indigo-400">{infoT('time')}</p>
              <p className="font-semibold text-indigo-700">{auctionTime}</p>
            </div>
          </div>
          
          <div 
            className="flex items-center p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 hover:from-emerald-100 hover:to-green-100 transition-colors duration-300 transform hover:scale-[1.03] hover:-translate-y-1"
          >
            <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full mr-4 shadow-sm">
              <FaTag className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">{infoT('startingBid')}</p>
              <p className="font-semibold text-emerald-700">{startingBid}</p>
            </div>
          </div>
          
          {estimatedValue && (
            <div 
              className="flex items-center p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 hover:from-emerald-100 hover:to-green-100 transition-colors duration-300 transform hover:scale-[1.03] hover:-translate-y-1"
            >
              <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full mr-4 shadow-sm">
                <FaDollarSign className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">{infoT('estimatedValue')}</p>
                <p className="font-semibold text-emerald-700">{estimatedValue}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}