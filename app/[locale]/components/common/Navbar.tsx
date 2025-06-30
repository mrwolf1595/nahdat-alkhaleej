'use client';

import Image from 'next/image';
import Link from 'next/link';
import useTheme from '../../context/ThemeContext';
import { Sun, Moon, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '../../components/common/LanguageSwitcher';
import { useTranslations, useLocale } from 'next-intl';

const Navbar: React.FC = () => {
  const t = useTranslations('common');
  const locale = useLocale();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState<boolean>(false);

  // For debugging
  console.log('Current locale in Navbar:', locale);
  console.log('Current pathname:', pathname);
  console.log('Translation function available:', !!t);
  
  try {
    console.log('Sample translation:', t('offers'));
  } catch (error) {
    console.error('Translation error:', error);
  }

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Helper function to get localized href
  const getLocalizedHref = (path: string) => {
    return `/${locale}${path}`;
  };

  return (
    <header className={`w-full sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-blue-950/80' : ''}`}
    style={{ maxHeight: '70px' }}>
      <div 
        className={`w-full ${scrolled ? '' : 'bg-gradient-to-b from-blue-950 via-blue-950/80 to-transparent'}`}
        style={{ minHeight: '20px' }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo Text (Left) */}
            <div className="flex-shrink-0">
              <Link href={getLocalizedHref('/')} className="block py-4">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-white">
                    {/* Use the translated company name with different colors */}
                    <span className="text-green-300 dark:text-green-400">{t('companyName1')}</span>
                    <span className="text-green-300 dark:text-green-400">{t('companyName2')}</span>
                    <span className="text-yellow-500">{t('companyName3')}</span>
                  </span>
                </div>
              </Link>
            </div>

            {/* Center Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
              <Link href={getLocalizedHref('/')}>
                <div className="relative h-12 w-16">
                  <Image 
                    src="/logo.png" 
                    alt={`${t('companyName1')}${t('companyName2')}${t('companyName3')}`} 
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center">
              <ul className="flex space-x-6">
                <li>
                  <Link 
                    href={getLocalizedHref('/offers')}
                    className={`text-white text-sm font-semibold hover:text-yellow-300 transition py-5 ${
                      pathname.includes('/offers') ? 'text-yellow-300' : ''
                    }`}
                  >
                    <div>{t('offers')}</div>
                  </Link>
                </li>
                <li>
                  <Link 
                    href={getLocalizedHref('/auctions')}
                    className={`text-white text-sm font-semibold hover:text-yellow-300 transition py-5 ${
                      pathname.includes('/auctions') ? 'text-yellow-300' : ''
                    }`}
                  >
                    <div>{t('auctions')}</div>
                  </Link>
                </li>
                <li>
                  <Link 
                    href={getLocalizedHref('/records')}
                    className={`text-white text-sm font-semibold hover:text-yellow-300 transition py-5 ${
                      pathname.includes('/records') ? 'text-yellow-300' : ''
                    }`}
                  >
                    <div>{t('records')}</div>
                  </Link>
                </li>
                <li>
                  <Link 
                    href={getLocalizedHref('/about')}
                    className={`text-white text-sm font-semibold hover:text-yellow-300 transition py-5 ${
                      pathname.includes('/about') ? 'text-yellow-300' : ''
                    }`}
                  >
                    <div>{t('about')}</div>
                  </Link>
                </li>
                <li>
                  <Link 
                    href={getLocalizedHref('/contact')}
                    className={`text-white text-sm font-semibold hover:text-yellow-300 transition py-5 ${
                      pathname.includes('/contact') ? 'text-yellow-300' : ''
                    }`}
                  >
                    <div>{t('contact')}</div>
                  </Link>
                </li>
                <li className="ml-2">
                  <button
                    onClick={toggleTheme}
                    className="text-white hover:text-yellow-300 transition p-1"
                    title={t('toggleTheme')}
                  >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                </li>
                <li className="ml-2">
                  <LanguageSwitcher />
                </li>
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setOpen(!open)}
                className="text-white p-2"
                aria-label="Open Mobile Menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="md:hidden bg-blue-950 text-white">
          <div className="container mx-auto px-4 py-3">
            {/* Mobile Logo */}
            <div className="flex justify-center mb-4">
              <Link href={getLocalizedHref('/')}>
                <div className="relative h-12 w-16">
                  <Image 
                    src="/logo.png" 
                    alt={`${t('companyName1')}${t('companyName2')}${t('companyName3')}`}
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>
              </Link>
            </div>
            <ul className="space-y-3">
              <li>
                <Link 
                  href={getLocalizedHref('/offers')}
                  className={`block py-2 ${pathname.includes('/offers') ? 'text-yellow-300' : 'hover:text-yellow-300'}`}
                  onClick={() => setOpen(false)}
                >
                  {t('offers')}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedHref('/auctions')}
                  className={`block py-2 ${pathname.includes('/auctions') ? 'text-yellow-300' : 'hover:text-yellow-300'}`}
                  onClick={() => setOpen(false)}
                >
                  {t('auctions')}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedHref('/records')}
                  className={`block py-2 ${pathname.includes('/records') ? 'text-yellow-300' : 'hover:text-yellow-300'}`}
                  onClick={() => setOpen(false)}
                >
                  {t('records')}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedHref('/about')}
                  className={`block py-2 ${pathname.includes('/about') ? 'text-yellow-300' : 'hover:text-yellow-300'}`}
                  onClick={() => setOpen(false)}
                >
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedHref('/contact')}
                  className={`block py-2 ${pathname.includes('/contact') ? 'text-yellow-300' : 'hover:text-yellow-300'}`}
                  onClick={() => setOpen(false)}
                >
                  {t('contact')}
                </Link>
              </li>
              <li className="pt-2 border-t border-gray-700">
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 py-2"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                  {t('toggleTheme')}
                </button>
              </li>
              <li className="pt-2">
                <LanguageSwitcher />
              </li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Header Clone - This mimics the header-wrap-clone in the original */}
      <div className="header-wrap-clone" style={{ height: '65px', display: scrolled ? 'block' : 'none' }}></div>
    </header>
  );
};

export default Navbar;