import { useTranslations } from 'next-intl';

export default function NotFoundState() {
  const t = useTranslations('auctionId');
  
  return (
    <div className="min-h-screen flex items-center justify-center text-red-500 bg-red-50 p-6 rounded-lg">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{t('error')}</h2>
        <p>{t('somethingWentWrong')}</p>
      </div>
    </div>
  );
}