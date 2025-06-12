
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Dictionary } from '@/lib/dictionaries';
import type { Locale } from '@/app/i18n-config';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

type HeroSectionProps = {
  dictionary: Dictionary['hero'];
  lang: Locale;
};

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

const DEFAULT_HERO_IMAGE = "https://placehold.co/1920x1080.png";

export default function HeroSection({ dictionary, lang }: HeroSectionProps) {
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_HERO_IMAGE);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadImage = async () => {
      setIsLoading(true);
      const imageKey = process.env.NEXT_PUBLIC_HERO_BACKGROUND_IMAGE_KEY;
      if (imageKey) {
        const signedUrl = await fetchSignedUrlForImage(imageKey);
        if (signedUrl) {
          setImageUrl(signedUrl);
        } else {
          // Fallback to default if signed URL fails but key was present
          setImageUrl(DEFAULT_HERO_IMAGE); 
        }
      } else {
        // Fallback to default if no key is present
        setImageUrl(DEFAULT_HERO_IMAGE);
      }
      setIsLoading(false);
    };

    loadImage();
  }, []);

  return (
    <section className="relative min-h-[75vh] md:min-h-[85vh] flex items-center text-center text-primary-foreground overflow-hidden bg-background">
      {isLoading ? (
        <Skeleton className="absolute inset-0 z-0 w-full h-full" />
      ) : (
        <Image
          src={imageUrl}
          alt="Professional working in a modern office environment for Navnub hero section"
          fill={true}
          className="absolute inset-0 z-0 opacity-30 object-cover"
          data-ai-hint="office work"
          priority
          onError={() => {
            // In case the fetched URL also fails, fallback to the absolute placeholder
            setImageUrl(DEFAULT_HERO_IMAGE);
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent z-10"></div>
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <h1 className="text-primary-foreground mb-6">
          {dictionary.title}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          {dictionary.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="button-text text-lg px-10 py-7 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Link href={`/${lang}/solutions`}>{dictionary.ctaExplore}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="button-text text-lg px-10 py-7 text-primary-foreground border-primary-foreground/50 hover:bg-primary-foreground/10 hover:border-primary-foreground shadow-md">
            <Link href={`/${lang}/contact`}>{dictionary.ctaContact}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
