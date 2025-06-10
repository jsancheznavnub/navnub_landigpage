
import type { Locale } from '@/app/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyNavnubSection from '@/components/sections/WhyNavnubSection';
import HomePageClient from '@/components/HomePageClient';
import type { Testimonial } from '@/components/TestimonialCard';
import HowNavnubGrowsSection from '@/components/sections/HowNavnubGrowsSection';

export default async function HomePage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const testimonials: Testimonial[] = dictionary.testimonialsList || [];

  return (
    <div className="flex flex-col">
      <HeroSection dictionary={dictionary.hero} lang={lang} />
      
      <div className="py-20 md:py-32 bg-background">
        <ServicesSection dictionary={dictionary.services} />
      </div>

      <div className="py-20 md:py-32 bg-card border-t border-b border-border/50">
        <HomePageClient
          dictionary={dictionary.homePageTestimonials}
          testimonials={testimonials}
        />
      </div>
      
      <div className="py-20 md:py-32 bg-background">
        <WhyNavnubSection dictionary={dictionary.whyNavnub} />
      </div>
      
      <HowNavnubGrowsSection dictionary={dictionary.howNavnubGrows} />
    </div>
  );
}

    
