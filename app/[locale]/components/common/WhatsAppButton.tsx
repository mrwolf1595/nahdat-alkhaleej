'use client';

import { FaWhatsapp } from 'react-icons/fa';
import { useParams } from 'next/navigation';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '966543434447', // Replace with your actual WhatsApp number
  message = 'Hello! I want to know more about your properties.'
}) => {
  const params = useParams();
  const locale = params.locale as string;
  
  const handleWhatsAppClick = () => {
    // Make sure phone number is clean (no spaces, dashes, parentheses, or plus signs)
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    // URL encode the message properly
    const encodedMessage = encodeURIComponent(message);
    
    // Use the correct format for WhatsApp API URL
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodedMessage}`;
    
    // Open in a new tab
    window.open(whatsappUrl, '_blank');
  };

  // Adjust position for RTL languages
  const positionClass = locale === 'ar' ? 'left-6' : 'right-6';
  
  return (
    <button
      onClick={handleWhatsAppClick}
      className={`fixed bottom-24 ${positionClass} z-30 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all hover:bg-green-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2`}
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="h-7 w-7" />
    </button>
  );
};

export default WhatsAppButton;