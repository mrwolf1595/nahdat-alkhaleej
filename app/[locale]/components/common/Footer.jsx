'use client'

import { useTheme } from '../../context/ThemeContext'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, BellRing, FileText, Info, Phone, Send, Heart } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function Footer() {
  const { theme } = useTheme()
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const footerRef = useRef(null)
  const t = useTranslations('footer')
  const commonT = useTranslations('common')

  // Set mounted state to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if footer is visible in viewport to save resources
  useEffect(() => {
    if (!isMounted) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "200px 0px" } // Preload when approaching viewport
    );
    
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    
    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, [isMounted]);

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.includes('@')) {
      setIsSubscribed(true)
      setEmail('')
      // Here you can send the email to an API later
    }
  }

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const pulseAnimation = {
    scale: [1, 1.03, 1],
    transition: { duration: 1.5, repeat: Infinity }
  }

  return (
    <div className="relative w-full">
      {/* Loading state placeholder */}
      {(!isVideoLoaded || !isMounted) && (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-zinc-800 to-black z-5"></div>
      )}
      
      {/* YouTube Video Background with 4K quality */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Gradient overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50 z-10"></div>
        
        {/* YouTube iframe with client-side only rendering */}
        {isMounted && isVisible && (
          <iframe
            src="https://www.youtube.com/embed/juf8Igbs7tQ?autoplay=1&mute=1&loop=1&playlist=juf8Igbs7tQ&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&cc_load_policy=0&playsinline=1&enablejsapi=1&vq=hd2160&hd=1&fmt=313"
            title="Footer Background Video"
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            className="absolute brightness-[0.4] pointer-events-none"
            style={{
              border: 'none',
              width: '100vw',
              height: '56.25vw', // 16:9 aspect ratio based on viewport width
              minHeight: '100vh',
              minWidth: '177.78vh', // 16:9 aspect ratio based on viewport height
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
            }}
            onLoad={() => setIsVideoLoaded(true)}
            suppressHydrationWarning
          />
        )}
        
        {/* Fallback static image when video is not loaded */}
        {(!isVisible || !isVideoLoaded) && (
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: "url('/100110.jpg')",
              filter: 'brightness(0.4)'
            }}
          />
        )}
      </div>

      {/* Main footer content */}
      <footer 
        ref={footerRef}
        className="w-full mt-10 border-t border-zinc-600/50 text-zinc-200 px-6 py-12 relative"
      >
        {/* Content container */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 relative z-20">
          {/* Column 1 */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUpVariants}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="flex items-center mb-4">
              <motion.div animate={pulseAnimation} className="mr-2">
                <Heart className="w-6 h-6 text-blue-400" />
              </motion.div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {commonT('companyName1')}{commonT('companyName2')}{commonT('companyName3')}
              </h2>
            </div>
            <p className="text-sm leading-6 ml-1 text-zinc-200 font-medium">
              {t('companyDescription')}
            </p>
            <div className="mt-6 relative w-full h-32 rounded-lg overflow-hidden shadow-lg bg-black/40 backdrop-blur-md border border-zinc-500/30">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-sm p-3 font-medium">{t('discoverMessage')}</p>
              </div>
            </div>
          </motion.div>

          {/* Column 2 - Centered Quick Links */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUpVariants}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <h3 className="font-semibold mb-4 text-lg flex items-center text-zinc-100">
              <span className="bg-blue-900/50 p-1.5 rounded-md mr-2">
                <BellRing className="w-4 h-4 text-blue-300" />
              </span>
              {t('quickLinks')}
            </h3>
            <ul className="space-y-3 text-sm backdrop-blur-md p-4 rounded-lg bg-black/40 shadow-lg border border-zinc-500/30 w-full max-w-xs mx-auto">
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link href="/offers" className="hover:text-blue-300 flex items-center justify-center transition-colors duration-200">
                  <Home className="w-4 h-4 mr-2" />
                  <span>{commonT('offers')}</span>
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link href="/auctions" className="hover:text-blue-300 flex items-center justify-center transition-colors duration-200">
                  <BellRing className="w-4 h-4 mr-2" />
                  <span>{commonT('auctions')}</span>
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link href="/records" className="hover:text-blue-300 flex items-center justify-center transition-colors duration-200">
                  <FileText className="w-4 h-4 mr-2" />
                  <span>{commonT('records')}</span>
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link href="/about" className="hover:text-blue-300 flex items-center justify-center transition-colors duration-200">
                  <Info className="w-4 h-4 mr-2" />
                  <span>{commonT('about')}</span>
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link href="/contact" className="hover:text-blue-300 flex items-center justify-center transition-colors duration-200">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{commonT('contact')}</span>
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Column 3 */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUpVariants}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-semibold mb-4 text-lg flex items-center text-zinc-100">
              <span className="bg-purple-900/50 p-1.5 rounded-md mr-2">
                <Send className="w-4 h-4 text-purple-300" />
              </span>
              {t('subscribe')}
            </h3>
            <form onSubmit={handleSubscribe} className="space-y-3 backdrop-blur-md p-4 rounded-lg bg-black/40 shadow-lg border border-zinc-500/30">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsHovered(true)}
                  onBlur={() => setIsHovered(false)}
                  placeholder={t('emailPlaceholder')}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800/90 backdrop-blur-sm border border-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm transition-all duration-300 shadow-sm text-white"
                  required
                />
                <motion.span 
                  className="absolute inset-0 rounded-lg border-2 border-blue-400 pointer-events-none opacity-0"
                  animate={{ opacity: isHovered ? 0.5 : 0 }}
                  transition={{ duration: 0.3 }}
                ></motion.span>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-4 rounded-lg transition shadow-lg font-medium"
              >
                <span className="flex items-center justify-center">
                  <Send className="w-4 h-4 mr-2" />
                  <span>{t('subscribeButton')}</span>
                </span>
              </motion.button>
              {isSubscribed && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-300 text-sm flex items-center"
                >
                  <Heart className="w-4 h-4 mr-1" />
                  {t('thanksMessage')}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-xs text-zinc-300 pt-6 border-t border-zinc-600/30 relative z-10"
        >
          &copy; {new Date().getFullYear()} {commonT('companyName1')}{commonT('companyName2')}{commonT('companyName3')}. {t('allRightsReserved')}
        </motion.div>
      </footer>
    </div>
  )
}