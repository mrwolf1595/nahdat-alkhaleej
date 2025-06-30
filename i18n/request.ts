// i18n/request.ts
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  // Ensure locale is always defined with a fallback
  const safeLocale = locale || 'en';
  
  return {
    // Add explicit locale property to the return object
    locale: safeLocale,
    messages: {
      common: (await import(`../locales/${safeLocale}/common.json`)).default
    }
  };
});