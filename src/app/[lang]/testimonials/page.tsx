import type { Locale } from '@/app/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import TestimonialCard, { type Testimonial } from '@/components/TestimonialCard';

// Placeholder data for testimonials
const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Jane Doe',
    company: 'Tech Solutions Inc.',
    quote: "Navnub transformed our online presence with their innovative web solutions. Their team is professional, creative, and truly understands business needs. Highly recommended!",
    imageUrl: 'https://placehold.co/100x100.png',
    imageHint: 'professional woman',
  },
  {
    id: '2',
    name: 'John Smith',
    company: 'Cloud Innovations Ltd.',
    quote: "The AI-powered chatbot Navnub developed for us has significantly improved our customer engagement and operational efficiency. A game-changer for our PYME!",
    imageUrl: 'https://placehold.co/100x100.png',
    imageHint: 'smiling man',
  },
  {
    id: '3',
    name: 'Alice Brown',
    company: 'Future Web Co.',
    quote: "Working with Navnub on our cloud migration was seamless. Their expertise in AI and cloud technologies is top-notch, delivering results beyond our expectations.",
    imageUrl: 'https://placehold.co/100x100.png',
    imageHint: 'business person',
  },
];

export default async function TestimonialsPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);

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
