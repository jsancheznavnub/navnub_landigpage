
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
    let finalErrorMessage = `fetchSignedUrlForImage (TestimonialsPage): NEXT_PUBLIC_BACKEND_URL ("${backendUrl}") is not a valid absolute URL. It must start with http:// or https://.`;
    if (backendUrl === "YOUR_BACKEND_URL_HERE") {
      finalErrorMessage += " This value seems to be a placeholder. Ensure NEXT_PUBLIC_BACKEND_URL is correctly set in your .env file and RESTART your server.";
    }
    console.error(finalErrorMessage);
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
      let imageKeyToFetch: string | undefined = undefined;

      if (testimonial.id === "1") { // Jane Doe
        imageKeyToFetch = process.env.NEXT_PUBLIC_TESTIMONIAL_JANE_DOE_IMAGE_KEY;
      } else if (testimonial.id === "2") { // John Smith
        imageKeyToFetch = process.env.NEXT_PUBLIC_TESTIMONIAL_JOHN_SMITH_IMAGE_KEY;
      } else if (testimonial.id === "3") { // Alice Brown
        imageKeyToFetch = process.env.NEXT_PUBLIC_TESTIMONIAL_ALICE_BROWN_IMAGE_KEY;
      } else if (testimonial.id === "4") { // Carlos Rodríguez
        imageKeyToFetch = process.env.NEXT_PUBLIC_TESTIMONIAL_CARLOS_RODRIGUEZ_IMAGE_KEY;
      } else if (testimonial.id === "5") { // Sofia Chen
        imageKeyToFetch = process.env.NEXT_PUBLIC_TESTIMONIAL_SOFIA_CHEN_IMAGE_KEY;
      }

      if (imageKeyToFetch) {
        const signedUrl = await fetchSignedUrlForImage(imageKeyToFetch);
        if (signedUrl) {
          updatedTestimonial.imageUrl = signedUrl;
        } else {
          console.warn(`processTestimonials (TestimonialsPage): Failed to get signed URL for testimonial ID ${testimonial.id} (key: ${imageKeyToFetch}). Using placeholder: ${testimonial.imageUrl}`);
        }
      } else if (["1", "2", "3", "4", "5"].includes(testimonial.id)) {
         console.warn(`processTestimonials (TestimonialsPage): Image key not found in .env for testimonial ID ${testimonial.id}. Using placeholder: ${testimonial.imageUrl}`);
      }
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
