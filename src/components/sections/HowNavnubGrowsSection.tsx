
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Dictionary } from '@/lib/dictionaries';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

type HowNavnubGrowsSectionProps = {
  dictionary: Dictionary['howNavnubGrows'];
};

const DEFAULT_IMAGE_PLACEHOLDER = "https://placehold.co/600x400.png?text=Growth+Strategy";

export default function HowNavnubGrowsSection({ dictionary }: HowNavnubGrowsSectionProps) {
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE_PLACEHOLDER);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSignedUrl = async () => {
      setLoading(true);
      const imageKey = process.env.NEXT_PUBLIC_HOW_NAVNUB_GROWS_IMAGE_KEY;
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

      if (!backendUrl) {
        console.error("HowNavnubGrowsSection: NEXT_PUBLIC_BACKEND_URL is not defined.");
        setImageUrl(DEFAULT_IMAGE_PLACEHOLDER);
        setLoading(false);
        return;
      }

      if (!backendUrl.startsWith('http://') && !backendUrl.startsWith('https://')) {
        let finalErrorMessage = `HowNavnubGrowsSection: NEXT_PUBLIC_BACKEND_URL ("${backendUrl}") is not a valid absolute URL. It must start with http:// or https://.`;
        if (backendUrl === "YOUR_BACKEND_URL_HERE") {
          finalErrorMessage += " This value seems to be a placeholder. Ensure NEXT_PUBLIC_BACKEND_URL is correctly set in your .env file and RESTART your server.";
        }
        console.error(finalErrorMessage);
        setImageUrl(DEFAULT_IMAGE_PLACEHOLDER);
        setLoading(false);
        return;
      }
      
      if (!imageKey) {
        console.warn("HowNavnubGrowsSection: NEXT_PUBLIC_HOW_NAVNUB_GROWS_IMAGE_KEY is not defined. Using placeholder.");
        setImageUrl(DEFAULT_IMAGE_PLACEHOLDER);
        setLoading(false);
        return;
      }

      const apiUrl = `${backendUrl}/v1/media/s3-signed-url?key=${encodeURIComponent(imageKey)}`;
      // console.log(`HowNavnubGrowsSection: Fetching from ${apiUrl}`);

      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          if (data.url) {
            setImageUrl(data.url);
          } else {
            console.error('HowNavnubGrowsSection: API response did not contain a URL.', data);
            setImageUrl(DEFAULT_IMAGE_PLACEHOLDER);
          }
        } else {
          const errorText = await response.text();
          console.error(`HowNavnubGrowsSection: Failed to fetch signed URL from ${apiUrl}. Status: ${response.status}, Response: ${errorText}`);
          setImageUrl(DEFAULT_IMAGE_PLACEHOLDER);
        }
      } catch (error) {
        console.error(`HowNavnubGrowsSection: Error fetching from ${apiUrl}:`, error);
        setImageUrl(DEFAULT_IMAGE_PLACEHOLDER);
      } finally {
        setLoading(false);
      }
    };

    fetchSignedUrl();
  }, []);

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
            {loading ? (
              <Skeleton className="w-full h-full" />
            ) : (
              <Image
                src={imageUrl}
                alt={dictionary.title} // Consider a more descriptive alt based on the image content
                layout="fill"
                objectFit="cover"
                data-ai-hint="coding programming" // Updated hint
                sizes="(max-width: 768px) 100vw, 50vw"
                onError={() => {
                  setImageUrl(DEFAULT_IMAGE_PLACEHOLDER); // Fallback on error
                }}
              />
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
