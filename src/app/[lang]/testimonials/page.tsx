
import type { Locale } from '@/app/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import TestimonialCard, { type Testimonial } from '@/components/TestimonialCard';

async function fetchSignedUrlForImage(imageKey: string | undefined): Promise<string | null> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    console.error("fetchSignedUrlForImage (TestimonialsPage): NEXT_PUBLIC_BACKEND_URL is not defined. Cannot fetch signed URL.");
    return null;
  }
  if (!backendUrl.startsWith('http://') && !backendUrl.startsWith('https://')) {
    console.error(`fetchSignedUrlForImage (TestimonialsPage): NEXT_PUBLIC_BACKEND_URL ("${backendUrl}") is not a valid absolute URL. It must start with http:// or https://.`);
    return null;
  }
  if (!imageKey) {
    console.warn("fetchSignedUrlForImage (TestimonialsPage): imageKey is not provided or is undefined.");
    return null;
  }

  const apiUrl = `${backendUrl}/v1/media/s3-signed-url?key=${encodeURIComponent(imageKey)}`;
  // console.log(`fetchSignedUrlForImage (TestimonialsPage): Attempting to fetch from API URL: ${apiUrl}`);
  
  try {
    const response = await fetch(apiUrl, { cache: 'no-store' }); 
    if (response.ok) {
      const data = await response.json();
      return data.url || null;
    } else {
      const errorText = await response.text();
      console.error(`fetchSignedUrlForImage (TestimonialsPage): Failed to fetch signed URL for ${imageKey} from ${apiUrl}. Status: ${response.status}, Response: ${errorText}`);
      return null;
    }
  } catch (error) {
    console.error(`fetchSignedUrlForImage (TestimonialsPage): Error during fetch operation for ${imageKey} from ${apiUrl}:`, error);
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
        const imageKey = process.env.NEXT_PUBLIC_TESTIMONial_SOFIA_CHEN_IMAGE_KEY;
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

export default async function TestimonialsPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const rawTestimonials: Testimonial[] = dictionary.testimonialsList || [];
  const testimonials = await processTestimonials(rawTestimonials);

  return (
    <div className="space-y-12">
      <header className="text-center py-8">
        <h1 className="text-primary">{dictionary.testimonialsPage.title}</h1>
        <p className="text-body text-muted-foreground mt-2 max-w-2xl mx-auto">{dictionary.testimonialsPage.description}</p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}
