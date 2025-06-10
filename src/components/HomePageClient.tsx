
'use client';

import React, { useRef } from 'react';
import type { Testimonial } from '@/components/TestimonialCard';
import TestimonialCard from '@/components/TestimonialCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { Dictionary } from '@/lib/dictionaries';

type HomePageClientProps = {
  dictionary: Dictionary['homePageTestimonials'];
  testimonials: Testimonial[];
};

export default function HomePageClient({ dictionary, testimonials }: HomePageClientProps) {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    // This component's content is now wrapped by a div in page.tsx, 
    // so the py-16 md:py-24 and specific background are handled there.
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-foreground mb-16 md:mb-20">{dictionary.title}</h2>
      <Carousel
        plugins={[autoplayPlugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-6xl mx-auto"
      >
        <CarouselContent className="-ml-4">
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full">
                <TestimonialCard testimonial={testimonial} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-12 -translate-x-full text-foreground/70 hover:text-primary disabled:text-muted-foreground" />
        <CarouselNext className="mr-12 translate-x-full text-foreground/70 hover:text-primary disabled:text-muted-foreground" />
      </Carousel>
    </div>
  );
}
