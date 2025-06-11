'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Dictionary } from '@/lib/dictionaries';
import { Separator } from '@/components/ui/separator';

type HowNavnubGrowsSectionProps = {
  dictionary: Dictionary['howNavnubGrows'];
};

export default function HowNavnubGrowsSection({ dictionary }: HowNavnubGrowsSectionProps) {
  const [imageUrl, setImageUrl] = useState<string>('https://placehold.co/600x450.png'); // Default placeholder
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Usando la URL correcta proporcionada por el usuario
        const response = await fetch("https://coresite.navnub.com/v1/images/persona-que-trabaja-en-la-oficina.jpg");
        if (response.ok) {
          const data = await response.json();
          if (data.url) {
            setImageUrl(data.url);
            console.log('Image URL fetched successfully:', data.url); // Added log
          } else {
            console.error('API response missing image URL:', data);
          }
        } else {
          console.error('Failed to fetch image:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, []); // Empty dependency array means this runs once on mount

  const steps = [
    {
      title: dictionary.step1Title,
      description: dictionary.step1Description,
    },
    {
      title: dictionary.step2Title,
      description: dictionary.step2Description,
    },
    {
      title: dictionary.step3Title,
      description: dictionary.step3Description,
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-card border-t border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-primary mb-16 md:mb-20">{dictionary.title}</h2>
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative w-full h-72 sm:h-80 md:h-[450px] rounded-lg overflow-hidden shadow-xl border border-transparent hover:shadow-2xl hover:border-primary/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-103">
            {!loading && imageUrl ? (
              <Image
                src={imageUrl}
                alt={dictionary.title} // Using section title as a generic alt
                layout="fill"
                objectFit="cover"
                data-ai-hint="team collaboration office"
              />
            ) : (
              // Optionally show a placeholder or loading spinner while fetching
              <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center text-gray-500">
                Cargando imagen...
              </div>
            )}
          </div>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index}>
                <h3 className="font-headline text-2xl text-foreground mb-3">{step.title}</h3>
                <p className="text-body text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && <Separator className="my-8 bg-border/50" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
