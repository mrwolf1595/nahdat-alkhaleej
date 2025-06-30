'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Phone, Mail, MessageCircle, User, MapPin, Clock, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import HijriDatePicker from '../details/date';
import ArabicTimePicker from '../details/arbictimer';


interface AgentInfo {
  name?: string;
  photo?: string;
  phone?: string;
  email?: string;
  rating?: number;
  responseTime?: string;
}

interface ContactAgentProps {
  agentInfo?: AgentInfo;
  propertyTitle: string;
}

const ContactAgent = ({ agentInfo, propertyTitle }: ContactAgentProps) => {
  const t = useTranslations('offerId.contactAgent');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [formType, setFormType] = useState('tour');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const formVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' }
  };

  const handleDateChange = (gregorian: string, hijriDate: string) => {
    setSelectedDate(gregorian);
    // You could log the hijri date or use it elsewhere
    console.log('Selected Hijri date:', hijriDate);
  };

  return (
    <div className="rounded-2xl shadow-lg overflow-hidden border border-gray-100 w-full transition-all duration-300">
      <div className="bg-gradient-to-r from-blue-400 to-indigo-400 px-5 py-4 relative overflow-hidden"> 
        <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full -translate-y-8 translate-x-8"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-10 rounded-full translate-y-8 -translate-x-8"></div>
        <h3 className="text-xl font-semibold text-white">{t('title')}</h3> 
        <p className="text-blue-50 text-sm mt-1">{t('about')} {propertyTitle}</p>
      </div>
      
      <div className="p-5"> 
        <div className="flex items-center mb-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-white shadow-md"> 
              {agentInfo?.photo ? (
                <Image 
                  src={agentInfo.photo} 
                  alt={agentInfo.name || t('agent')}
                  className="w-full h-full object-cover"
                  width={80} 
                  height={80} 
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-sky-50 flex items-center justify-center text-sky-500">
                  <User size={24} /> 
                </div>
              )}
            </div>
            <div className="absolute bottom-0 right-4 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></div> 
          </div>
          
          <div>
            <h4 className="text-base font-semibold text-zinc-800 dark:text-white"> 
              {agentInfo?.name || t('agent')}
            </h4>
            <div className="flex items-center mt-1">
              {agentInfo?.rating && (
                <div className="flex items-center mr-2">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-3 h-3 ${i < Math.floor(agentInfo.rating || 0) ? 'text-amber-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              )}
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center">
                <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block mr-1.5"></span>
                {t('availableNow')}
              </p>
            </div>
            {agentInfo?.responseTime && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {t('typicallyResponds')} {agentInfo.responseTime}
              </p>
            )}
          </div>
        </div>
        
        <div className="space-y-3"> 
          <motion.a
            whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)" }}
            whileTap={{ scale: 0.98 }}
            href={`tel:${agentInfo?.phone}`}
            className="flex items-center justify-center w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-300 shadow-sm text-sm font-medium"
          >
            <Phone size={18} className="mr-2" />
            <span>{t('callAgent')}</span>
          </motion.a>
          
          <motion.a
            whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}
            whileTap={{ scale: 0.98 }}
            href={`mailto:${agentInfo?.email}?subject=${t('inquirySubject')} ${propertyTitle}`}
            className="flex items-center justify-center w-full py-3 px-4 bg-white hover:bg-gray-50 text-zinc-800 border border-gray-200 rounded-xl transition-all duration-300 text-sm font-medium"
          >
            <Mail size={18} className="mr-2 text-blue-500" />
            <span>{t('emailAgent')}</span>
          </motion.a>
          
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(79, 70, 229, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center w-full py-3 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl transition-all duration-300 text-sm font-medium"
          >
            <MessageCircle size={18} className="mr-2" />
            <span>{t('chatNow')}</span>
          </motion.button>
        </div>
        
        <div className="mt-6 pt-5 border-t border-gray-100"> 
          <div className="flex mb-4 space-x-2 bg-gray-50 p-1 rounded-lg">
            <button 
              onClick={() => setFormType('tour')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                formType === 'tour' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t('scheduleTour')}
            </button>
            <button 
              onClick={() => setFormType('info')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                formType === 'info' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t('requestInfo')}
            </button>
          </div>
          
          <motion.div 
            initial="hidden"
            animate={formType === 'tour' ? "visible" : "hidden"}
            variants={formVariants}
            transition={{ duration: 0.3 }}
            className={`space-y-3 overflow-hidden ${formType !== 'tour' && 'hidden'}`}
          >
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                <MapPin size={16} />
              </div>
              <select className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-zinc-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm">
                <option>{t('inPersonTour')}</option>
                <option>{t('videoTour')}</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-3"> 
              {isRTL ? (
                <>
                  <HijriDatePicker 
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                  <ArabicTimePicker
                    value={selectedTime}
                    onChange={(time) => setSelectedTime(time)}
                  />
                </>
              ) : (
                <>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                      <Calendar size={16} />
                    </div>
                    <input 
                      type="date" 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-zinc-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                      <Clock size={16} />
                    </div>
                    <input 
                      type="time" 
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-zinc-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                    />
                  </div>
                </>
              )}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 4px 15px rgba(37, 99, 235, 0.25)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium rounded-xl shadow-sm transition-all duration-300 text-sm"
            >
              {t('scheduleTour')}
            </motion.button>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            animate={formType === 'info' ? "visible" : "hidden"}
            variants={formVariants}
            transition={{ duration: 0.3 }}
            className={`space-y-3 overflow-hidden ${formType !== 'info' && 'hidden'}`}
          >
            <input
              type="text"
              placeholder={t('yourName')}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-zinc-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            <input
              type="email"
              placeholder={t('yourEmail')}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-zinc-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              dir="ltr"
            />
            <textarea
              placeholder={t('yourMessage')}
              rows={3}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-zinc-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              dir={isRTL ? 'rtl' : 'ltr'}
            ></textarea>
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 4px 15px rgba(37, 99, 235, 0.25)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium rounded-xl shadow-sm transition-all duration-300 text-sm"
            >
              {t('sendMessage')}
            </motion.button>
          </motion.div>
          
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            {t('privacyMessage')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactAgent;