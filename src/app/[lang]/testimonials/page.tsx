
import type { Locale } from '@/app/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import TestimonialCard, { type Testimonial } from '@/components/TestimonialCard';

export default async function TestimonialsPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const testimonials: Testimonial[] = dictionary.testimonialsList || [];

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

    