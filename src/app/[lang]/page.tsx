import type { Locale } from '@/app/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyNavnubSection from '@/components/sections/WhyNavnubSection';
import ChatbotCTASection from '@/components/sections/ChatbotCTASection';

export default async function HomePage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="space-y-16 md:space-y-24">
      <HeroSection dictionary={dictionary.hero} lang={lang} />
      <ServicesSection dictionary={dictionary.services} />
      <WhyNavnubSection dictionary={dictionary.whyNavnub} />
      <ChatbotCTASection dictionary={dictionary.chatbotCTA} lang={lang} />
    </div>
  );
}
