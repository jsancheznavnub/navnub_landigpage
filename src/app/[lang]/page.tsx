import type { Locale } from '@/app/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyNavnubSection from '@/components/sections/WhyNavnubSection';
import ChatbotCTASection from '@/components/sections/ChatbotCTASection';
import HomePageClient from '@/components/HomePageClient';
import type { Testimonial } from '@/components/TestimonialCard';

const staticTestimonials: Testimonial[] = [
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
  {
    id: '4',
    name: 'Carlos Rodríguez',
    company: 'Soluciones Digitales PYME',
    quote: "El equipo de Navnub nos ayudó a automatizar procesos clave con IA, lo que nos permitió enfocarnos en crecer nuestro negocio. ¡Excelente servicio!",
    imageUrl: 'https://placehold.co/100x100.png',
    imageHint: 'focused developer',
  },
  {
    id: '5',
    name: 'Sofia Chen',
    company: 'Innovatech Startups',
    quote: "Desde el diseño web hasta la implementación de soluciones en la nube, Navnub ha sido un socio tecnológico invaluable para nuestra startup.",
    imageUrl: 'https://placehold.co/100x100.png',
    imageHint: 'creative director',
  },
];

export default async function HomePage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="flex flex-col">
      <HeroSection dictionary={dictionary.hero} lang={lang} />
      
      <div className="py-20 md:py-32 bg-background">
        <ServicesSection dictionary={dictionary.services} />
      </div>

      <div className="py-20 md:py-32 bg-card border-t border-b border-border/50">
        <HomePageClient
          dictionary={dictionary.homePageTestimonials}
          testimonials={staticTestimonials}
        />
      </div>
      
      <div className="py-20 md:py-32 bg-background">
        <WhyNavnubSection dictionary={dictionary.whyNavnub} />
      </div>
      
      <ChatbotCTASection dictionary={dictionary.chatbotCTA} lang={lang} />
    </div>
  );
}
