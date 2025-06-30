'use client';
import { motion } from 'framer-motion';
import { Heart, Phone } from 'lucide-react';
import { Offer } from '@/types/offer';

// PageFooter Component
export const PageFooter = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white dark:bg-zinc-800 mt-10 py-8 px-6 rounded-t-xl border-t border-gray-200 dark:border-zinc-700"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-zinc-500 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">Our Agents</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">Careers</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">Properties</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-zinc-500 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">For Sale</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">For Rent</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">New Developments</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">Featured Listings</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-zinc-500 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">Mortgage Calculator</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">Property Guides</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">Market Reports</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">Stay Connected</h3>
            <p className="text-zinc-500 dark:text-zinc-400">Subscribe for the latest property updates</p>
            
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 p-3 bg-gray-50 dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 rounded-l-lg text-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg transition-colors">
                Subscribe
              </button>
            </div>
            
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-zinc-700 flex items-center justify-center text-zinc-500 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-zinc-700 flex items-center justify-center text-zinc-500 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-zinc-700 flex items-center justify-center text-zinc-500 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-zinc-700 flex items-center justify-center text-zinc-500 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-zinc-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            © 2025 Modern Real Estate. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-zinc-500 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-zinc-500 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-zinc-500 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 text-sm transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// FloatingActions Component
interface FloatingActionsProps {
  favorited: boolean;
  onFavoriteToggle: () => void;
}

// Update for FloatingActions Component
export const FloatingActions = ({ onFavoriteToggle, favorited }: FloatingActionsProps) => {
    return (
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40"
      >
        {/* Favorite button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onFavoriteToggle}
          className={`w-12 h-12 rounded-full ${
            favorited 
              ? 'bg-red-50 dark:bg-red-900/30 text-red-500' 
              : 'bg-white dark:bg-zinc-800 text-zinc-500'
          } shadow-lg flex items-center justify-center border border-gray-200 dark:border-zinc-700`}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            size={20} 
            className={favorited ? 'fill-red-500' : ''}
          />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full bg-white dark:bg-zinc-800 shadow-lg flex items-center justify-center text-blue-500 border border-gray-200 dark:border-zinc-700"
          aria-label="Compare this property"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full bg-white dark:bg-zinc-800 shadow-lg flex items-center justify-center text-blue-500 border border-gray-200 dark:border-zinc-700"
          aria-label="Share property"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg flex items-center justify-center text-white"
          aria-label="Contact agent"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        </motion.button>
      </motion.div>
    );
  };

// MobileBottomBar Component

export const MobileBottomBar = ({ offer, favorited, setFavorited }: {
  offer: Offer;
  favorited: boolean;
  setFavorited: (value: boolean) => void;
}) => {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.6 }}
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 px-3 sm:px-4 py-2 sm:py-3 z-30 shadow-lg"
      // Added shadow-lg for better visibility
    >
      <div className="flex items-center justify-between">
        <div className="max-w-[55%]">
          {/* Limited width to prevent overflow */}
          <div className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 truncate">
            {/* Added truncate to prevent text overflow */}
            ${offer.price.toLocaleString()}
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
            {/* Added truncate to prevent text overflow */}
            ${Math.round(Number(offer.price) / Number(offer.area)).toLocaleString()}/sqft
          </div>
        </div>
        
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFavorited(!favorited)}
            className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-colors ${
              favorited 
                ? 'bg-red-50 dark:bg-red-900/30 text-red-500' 
                : 'bg-gray-100 dark:bg-zinc-800 text-zinc-500'
            }`}
          >
            <Heart 
              size={18} className={favorited ? 'fill-red-500' : ''} 
            />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center px-4 sm:px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors shadow-sm text-sm sm:text-base whitespace-nowrap"
            // Added whitespace-nowrap to prevent text wrapping
          >
            <Phone size={16} className="mr-2 sm:hidden" />
            <Phone size={18} className="mr-2 hidden sm:block" />
            <span>Contact</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const components = { PageFooter, FloatingActions, MobileBottomBar };
export default components;