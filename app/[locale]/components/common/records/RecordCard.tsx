import React from 'react';
import Link from 'next/link';
import { SalesRecord, EvaluationRecord, AuctionRecord, RecordTab } from '../../../../../types/records';

type RecordCardProps = {
  record: SalesRecord | EvaluationRecord | AuctionRecord;
  activeTab: RecordTab;
};

const RecordCard: React.FC<RecordCardProps> = ({ record, activeTab }) => {
  return (
    <div className="rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-48 md:h-64 w-full">
        <div className="absolute top-0 left-0 bg-blue-600 text-white px-3 py-1 m-2 rounded z-10 text-sm md:text-base">
          {record.propertyType}
        </div>
        {/* If you don't have actual images yet, use a placeholder */}
        <div className="h-full w-full flex items-center justify-center">
          <p className="text-gray-500">Property Image</p>
        </div>
        {/* Uncomment when you have images */}
        {/* <Image 
          src={record.image}
          alt={record.property}
          fill
          className="object-cover"
        /> */}
      </div>
      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 line-clamp-1">{record.property}</h3>
        <p className="text-gray-600 mb-3 md:mb-4">{record.location}</p>

        {activeTab === 'sales' && 'soldPrice' in record && 'listedPrice' in record && 'daysOnMarket' in record && (
          <div className="space-y-3 md:space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs md:text-sm text-gray-500">Sold Price</p>
                <p className="text-xl md:text-2xl font-bold text-blue-600">{record.soldPrice}</p>
              </div>
              <div className="text-right">
                <p className="text-xs md:text-sm text-gray-500">Listed Price</p>
                <p className="text-base md:text-lg font-semibold">{record.listedPrice}</p>
              </div>
            </div>

            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5 text-gray-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm md:text-base text-gray-700">Sold on {record.soldDate}</span>
            </div>

            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5 text-gray-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm md:text-base text-gray-700">{String(record.daysOnMarket)} days on market</span>
            </div>
          </div>
        )}

        {activeTab === 'evaluations' && 'evaluationDate' in record && 'estimatedValue' in record && (
          <div className="space-y-3 md:space-y-4">
            <div>
              <p className="text-xs md:text-sm text-gray-500">Estimated Value</p>
              <p className="text-xl md:text-2xl font-bold text-blue-600">{record.estimatedValue}</p>
            </div>

            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5 text-gray-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm md:text-base text-gray-700">Evaluated on {String(record.evaluationDate)}</span>
            </div>
          </div>
        )}

        {activeTab === 'auctions' && 'auctionDate' in record && 'soldPrice' in record && 'startingBid' in record && (
          <div className="space-y-3 md:space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs md:text-sm text-gray-500">Sold Price</p>
                <p className="text-xl md:text-2xl font-bold text-blue-600">{record.soldPrice}</p>
              </div>
              <div className="text-right">
                <p className="text-xs md:text-sm text-gray-500">Starting Bid</p>
                <p className="text-base md:text-lg font-semibold">{String(record.startingBid)}</p>
              </div>
            </div>

            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5 text-gray-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm md:text-base text-gray-700">Auctioned on {String(record.auctionDate)}</span>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm text-gray-600 mt-3 md:mt-4 mb-3 md:mb-4">
          {'bedrooms' in record && record.bedrooms && (
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{record.bedrooms} Beds</span>
            </div>
          )}

          {'bathrooms' in record && record.bathrooms && (
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{record.bathrooms} Baths</span>
            </div>
          )}

          {'units' in record && record.units && (
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{record.units} Units</span>
            </div>
          )}

          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{record.area}</span>
          </div>
        </div>

        <Link
          href={`/records/${record.id}`}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-2 rounded-md transition duration-200 text-sm md:text-base"
        >
          View Full Details
        </Link>
      </div>
    </div>
  );
};

export default RecordCard;