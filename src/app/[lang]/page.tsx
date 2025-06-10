
'use client' 

import type { Locale } from '@/app/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyNavnubSection from '@/components/sections/WhyNavnubSection';
import ChatbotCTASection from '@/components/sections/ChatbotCTASection';
import TestimonialCard, { type Testimonial } from '@/components/TestimonialCard';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React, { useEffect, useState, useRef } from 'react';
import type { Dictionary } from '@/lib/dictionaries';


// Placeholder data for testimonials - This should ideally come from a shared source or API
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

// This component now needs to be a client component because of the carousel hooks
export default function HomePage({ params: { lang } }: { params: { lang: Locale } }) {
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);

  useEffect(() => {
    async function fetchDictionary() {
      const dict = await getDictionary(lang);
      setDictionary(dict);
    }
    fetchDictionary();
  }, [lang]);

  const autoplayPlugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  if (!dictionary) {
    // You can render a loading state here if needed
    return <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">Loading...</div>;
  }

  return (
    <div className="space-y-16 md:space-y-24">
      <HeroSection dictionary={dictionary.hero} lang={lang} />
      <ServicesSection dictionary={dictionary.services} />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-primary mb-12">{dictionary.homePageTestimonials.title}</h2>
          <Carousel
            plugins={[autoplayPlugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-1">
              {staticTestimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-12" />
            <CarouselNext className="mr-12" />
          </Carousel>
        </div>
      </section>

      <WhyNavnubSection dictionary={dictionary.whyNavnub} />
      <ChatbotCTASection dictionary={dictionary.chatbotCTA} lang={lang} />
    </div>
  );
}
