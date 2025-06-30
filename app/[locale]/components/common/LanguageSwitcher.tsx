'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const toggleLanguage = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';

    // Replace only the locale part of the pathname
    const currentPathWithoutLocale = pathname.replace(/^\/(ar|en)/, '');
    const newPath = `/${newLocale}${currentPathWithoutLocale === '' ? '/' : currentPathWithoutLocale}`;

    console.log('Switching language:', locale, '→', newLocale);
    console.log('Current path:', pathname);
    console.log('New path:', newPath);

    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1 text-white hover:text-yellow-300 transition"
      title={locale === 'en' ? 'تغيير إلى العربية' : 'Switch to English'}
    >
      <Globe size={18} />
      <span className="text-sm">
        {locale === 'en' ? 'عربي' : 'EN'}
      </span>
    </button>
  );
}
