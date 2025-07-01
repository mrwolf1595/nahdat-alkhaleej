'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { TrendingUp, Calendar, AlertCircle, DollarSign, Clock, Percent } from 'lucide-react';
import { useTranslations } from 'next-intl';

const MarketTrends = () => {
  const t = useTranslations('records.marketTrends');
  
  const [data, setData] = useState<{
    averageSalePrice: number;
    averageDaysOnMarket: number;
    saleToListRatio: number;
  } | null>(null);

  const [chartData, setChartData] = useState<{
    price: { name: string; value: number; previous: number }[];
    days: { name: string; value: number; previous: number }[];
    ratio: { name: string; value: number; previous: number }[];
  }>({ price: [], days: [], ratio: [] });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/public/market-trends');
        const json = await res.json();
        setData(json);

        setChartData({
          price: [
            { name: 'Jan', value: json.averageSalePrice * 0.92, previous: json.averageSalePrice * 0.9 },
            { name: 'Feb', value: json.averageSalePrice * 0.95, previous: json.averageSalePrice * 0.91 },
            { name: 'Mar', value: json.averageSalePrice * 0.97, previous: json.averageSalePrice * 0.93 },
            { name: 'Apr', value: json.averageSalePrice * 0.99, previous: json.averageSalePrice * 0.95 },
            { name: 'May', value: json.averageSalePrice, previous: json.averageSalePrice * 0.97 },
            { name: 'Jun', value: json.averageSalePrice * 1.02, previous: json.averageSalePrice * 0.98 },
          ],
          days: [
            { name: 'Jan', value: json.averageDaysOnMarket + 5, previous: json.averageDaysOnMarket + 7 },
            { name: 'Feb', value: json.averageDaysOnMarket + 4, previous: json.averageDaysOnMarket + 6 },
            { name: 'Mar', value: json.averageDaysOnMarket + 2, previous: json.averageDaysOnMarket + 5 },
            { name: 'Apr', value: json.averageDaysOnMarket + 1, previous: json.averageDaysOnMarket + 3 },
            { name: 'May', value: json.averageDaysOnMarket, previous: json.averageDaysOnMarket + 2 },
            { name: 'Jun', value: json.averageDaysOnMarket - 1, previous: json.averageDaysOnMarket + 1 },
          ],
          ratio: [
            { name: 'Jan', value: json.saleToListRatio - 1, previous: json.saleToListRatio - 1.5 },
            { name: 'Feb', value: json.saleToListRatio - 0.8, previous: json.saleToListRatio - 1.2 },
            { name: 'Mar', value: json.saleToListRatio - 0.5, previous: json.saleToListRatio - 1 },
            { name: 'Apr', value: json.saleToListRatio - 0.2, previous: json.saleToListRatio - 0.7 },
            { name: 'May', value: json.saleToListRatio, previous: json.saleToListRatio - 0.3 },
            { name: 'Jun', value: json.saleToListRatio + 0.2, previous: json.saleToListRatio },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch market trends:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Custom tooltip formatter
  const formatTooltip = (value: number, name: string) => {
    if (name === 'value') return [`$${value.toLocaleString()}`, t('chart.current')];
    if (name === 'previous') return [`$${value.toLocaleString()}`, t('chart.previous')];
    return [value, name];
  };

  const formatDaysTooltip = (value: number, name: string) => {
    if (name === 'value') return [`${value} days`, t('chart.current')];
    if (name === 'previous') return [`${value} days`, t('chart.previous')];
    return [value, name];
  };

  const formatRatioTooltip = (value: number, name: string) => {
    if (name === 'value') return [`${value.toFixed(1)}%`, t('chart.current')];
    if (name === 'previous') return [`${value.toFixed(1)}%`, t('chart.previous')];
    return [value, name];
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <motion.section 
      className="py-16 rounded-3xl shadow-inner my-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.div variants={itemVariants} className="mb-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
              <TrendingUp size={24} />
            </div>
            <h2 className="text-3xl font-bold">{t('title')}</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm ml-0 md:ml-4">
              <Calendar size={16} />
              <span>{t('updatedWeekly')}</span>
            </div>
          </div>
          <p className="">{t('subtitle')}</p>
        </motion.div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            <div className="flex items-center gap-2">
              <AlertCircle size={18} className="text-blue-600" />
              <span className="">{t('loading')}</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Average Sale Price */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold ">{t('averageSalePrice.title')}</h3>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <DollarSign size={20} className="text-blue-600" />
                </div>
              </div>
              
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                {data ? `$${data.averageSalePrice.toLocaleString()}` : '...'}
              </p>
              
              <div className="flex items-center text-green-600 text-sm mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span>{t('averageSalePrice.change')}</span>
              </div>

              <div className="h-48 bg-gray-50 mt-4 rounded-lg overflow-hidden">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData.price} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip formatter={formatTooltip} contentStyle={{ borderRadius: '8px', borderColor: '#e2e8f0' }} />
                    <Legend 
                      verticalAlign="top" 
                      height={36} 
                      iconType="circle" 
                      iconSize={8} 
                      formatter={(value) => value === 'value' ? t('chart.currentYear') : t('chart.previousYear')} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="previous" 
                      stroke="#94a3b8" 
                      strokeWidth={2}
                      strokeDasharray="5 5" 
                      dot={{ r: 4, fill: "#94a3b8" }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2, fill: 'white' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Days on Market */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold ">{t('daysOnMarket.title')}</h3>
                <div className="p-2 bg-red-50 rounded-lg">
                  <Clock size={20} className="text-red-600" />
                </div>
              </div>
              
              <p className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-2">
                {data ? `${data.averageDaysOnMarket} days` : '...'}
              </p>
              
              <div className="flex items-center text-red-600 text-sm mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <span>{t('daysOnMarket.change')}</span>
              </div>

              <div className="h-48 bg-gray-50 mt-4 rounded-lg overflow-hidden">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData.days} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorDays" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip formatter={formatDaysTooltip} contentStyle={{ borderRadius: '8px', borderColor: '#e2e8f0' }} />
                    <Legend 
                      verticalAlign="top" 
                      height={36} 
                      iconType="circle" 
                      iconSize={8} 
                      formatter={(value) => value === 'value' ? t('chart.currentYear') : t('chart.previousYear')} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="previous" 
                      stroke="#94a3b8" 
                      strokeWidth={2}
                      strokeDasharray="5 5" 
                      dot={{ r: 4, fill: "#94a3b8" }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#EF4444" 
                      strokeWidth={3}
                      activeDot={{ r: 6, stroke: '#dc2626', strokeWidth: 2, fill: 'white' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Sale-to-List Ratio */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold ">{t('saleToListRatio.title')}</h3>
                <div className="p-2 bg-green-50 rounded-lg">
                  <Percent size={20} className="text-green-600" />
                </div>
              </div>
              
              <p className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-2">
                {data ? `${data.saleToListRatio.toFixed(1)}%` : '...'}
              </p>
              
              <div className="flex items-center text-green-600 text-sm mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span>{t('saleToListRatio.change')}</span>
              </div>

              <div className="h-48 bg-gray-50 mt-4 rounded-lg overflow-hidden">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData.ratio} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorRatio" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} domain={[95, 105]} />
                    <Tooltip formatter={formatRatioTooltip} contentStyle={{ borderRadius: '8px', borderColor: '#e2e8f0' }} />
                    <Legend 
                      verticalAlign="top" 
                      height={36} 
                      iconType="circle" 
                      iconSize={8} 
                      formatter={(value) => value === 'value' ? t('chart.currentYear') : t('chart.previousYear')} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="previous" 
                      stroke="#94a3b8" 
                      strokeWidth={2}
                      strokeDasharray="5 5" 
                      dot={{ r: 4, fill: "#94a3b8" }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      activeDot={{ r: 6, stroke: '#059669', strokeWidth: 2, fill: 'white' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default MarketTrends;