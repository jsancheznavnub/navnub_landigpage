
import type { Locale } from '@/app/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyNavnubSection from '@/components/sections/WhyNavnubSection';
import HomePageClient from '@/components/HomePageClient';
import type { Testimonial } from '@/components/TestimonialCard';
import HowNavnubGrowsSection from '@/components/sections/HowNavnubGrowsSection';

async function fetchSignedUrlForImage(imageKey: string | undefined): Promise<string | null> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    console.error("fetchSignedUrlForImage: NEXT_PUBLIC_BACKEND_URL is not defined. Cannot fetch signed URL.");
    return null;
  }
  if (!imageKey) {
    console.warn("fetchSignedUrlForImage: imageKey is not provided or is undefined.");
    return null;
  }

  const apiUrl = `${backendUrl}/v1/media/s3-signed-url?key=${encodeURIComponent(imageKey)}`;
  
  try {
    const response = await fetch(apiUrl, { cache: 'no-store' });
    if (response.ok) {
      const data = await response.json();
      return data.url || null;
    } else {
      const errorText = await response.text();
      console.error(`fetchSignedUrlForImage: Failed to fetch signed URL for ${imageKey}. Status: ${response.status}, Response: ${errorText}`);
      return null;
    }
  } catch (error) {
    console.error(`fetchSignedUrlForImage: Error during fetch operation for ${imageKey}:`, error);
    return null;
  }
}

async function processTestimonials(rawTestimonials: Testimonial[]): Promise<Testimonial[]> {
  if (!rawTestimonials || !Array.isArray(rawTestimonials)) {
    return [];
  }

  const processed = await Promise.all(
    rawTestimonials.map(async (testimonial) => {
      let updatedTestimonial = { ...testimonial };

      if (testimonial.id === "5") { // Sofia Chen's testimonial
        const imageKey = process.env.NEXT_PUBLIC_TESTIMONIAL_SOFIA_CHEN_IMAGE_KEY;
        if (imageKey) {
          const signedUrl = await fetchSignedUrlForImage(imageKey);
          if (signedUrl) {
            updatedTestimonial.imageUrl = signedUrl;
          }
        }
      }
      // Add more conditions here for other testimonials if needed in the future
      return updatedTestimonial;
    })
  );
  return processed;
}


export default async function HomePage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const rawTestimonials: Testimonial[] = dictionary.testimonialsList || [];
  const testimonials = await processTestimonials(rawTestimonials);

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

    
