'use client';

import { useState, useEffect } from 'react';
import type { Dictionary } from '@/lib/dictionaries';
import EnhancedServiceCard from '@/components/EnhancedServiceCard';

type ServicesSectionProps = {
  dictionary: Dictionary['services'];
};

async function fetchSignedUrlForImage(imageKey: string): Promise<string | null> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    console.error("fetchSignedUrlForImage: NEXT_PUBLIC_BACKEND_URL is not defined in .env. Cannot fetch signed URL.");
    return null;
  }

  const apiUrl = `${backendUrl}/v1/media/s3-signed-url?key=${encodeURIComponent(imageKey)}`;
  console.log("fetchSignedUrlForImage: Attempting to fetch from API URL:", apiUrl);

  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      console.log(`fetchSignedUrlForImage: Successfully fetched signed URL for ${imageKey}.`);
      return data.url || null;
    } else {
      const errorText = await response.text();
      console.error(`fetchSignedUrlForImage: Failed to fetch signed URL for ${imageKey}. Status: ${response.status}, StatusText: ${response.statusText}, Response: ${errorText}`);
      return null;
    }
  } catch (error) {
    console.error(`fetchSignedUrlForImage: Error during fetch operation for ${imageKey}:`, error);
    return null;
  }
}

export default function ServicesSection({ dictionary }: ServicesSectionProps) {
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string | null }>({
    cloudSolutions: null,
    webDevelopment: null,
    chatbots: null,
  });
  const [isLoadingImages, setIsLoadingImages] = useState<{ [key: string]: boolean }>({
    cloudSolutions: true,
    webDevelopment: true,
    chatbots: true,
  });

  useEffect(() => {
    const imageKeysConfig = {
      cloudSolutions: process.env.NEXT_PUBLIC_CLOUD_SOLUTIONS_IMAGE_KEY,
      webDevelopment: process.env.NEXT_PUBLIC_WEB_DEV_IMAGE_KEY,
      chatbots: process.env.NEXT_PUBLIC_CHATBOTS_IMAGE_KEY,
    };

    const fetchAllImages = async () => {
      const urls: { [key: string]: string | null } = {};
      const loadingStates: { [key: string]: boolean } = {};

      for (const [serviceKey, imageKey] of Object.entries(imageKeysConfig)) {
        loadingStates[serviceKey] = true; // Set loading true before fetch
        if (imageKey) {
          console.log(`Fetching image for ${serviceKey} with key ${imageKey}`);
          urls[serviceKey] = await fetchSignedUrlForImage(imageKey);
        } else {
          console.log(`No image key found for ${serviceKey}. Using static placeholder or default.`);
          // Fallback to a generic placeholder if no key is provided or if fetch fails
          urls[serviceKey] = `https://placehold.co/600x400.png?text=${serviceKey.replace(/([A-Z])/g, ' $1').trim()}`;
        }
        loadingStates[serviceKey] = false; // Set loading false after fetch
      }
      
      setImageUrls(urls);
      setIsLoadingImages(loadingStates);
    };

    fetchAllImages();
  }, []);

  const serviceItems = [
    {
      key: 'cloudSolutions',
      title: dictionary.cloudSolutions.title,
      description: dictionary.cloudSolutions.description,
      benefits: dictionary.cloudSolutions.benefits || [],
      imageSrc: isLoadingImages.cloudSolutions ? "https://placehold.co/600x400.png?text=Loading..." : (imageUrls.cloudSolutions || "https://placehold.co/600x400.png?text=Cloud+Solutions"),
      imageAlt: 'AI Powered Cloud Solutions',
      aiHint: 'cloud computing tablet',
      reverse: false,
    },
    {
      key: 'webDevelopment',
      title: dictionary.webDevelopment.title,
      description: dictionary.webDevelopment.description,
      benefits: dictionary.webDevelopment.benefits || [],
      imageSrc: isLoadingImages.webDevelopment ? "https://placehold.co/600x400.png?text=Loading..." : (imageUrls.webDevelopment || "https://placehold.co/600x400.png?text=Web+Development"),
      imageAlt: 'Innovative Web and App Development',
      aiHint: 'web design code',
      reverse: true,
    },
    {
      key: 'chatbots',
      title: dictionary.chatbots.title,
      description: dictionary.chatbots.description,
      benefits: dictionary.chatbots.benefits || [],
      imageSrc: isLoadingImages.chatbots ? "https://placehold.co/600x400.png?text=Loading..." : (imageUrls.chatbots || "https://placehold.co/600x400.png?text=Chatbots"),
      imageAlt: 'Intelligent Chatbots and Automation',
      aiHint: 'chatbot interface',
      reverse: false,
    }
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-foreground text-3xl font-bold">{dictionary.title}</h2>
        <div className="mt-4 h-1 w-20 bg-accent mx-auto rounded-full"></div>
      </div>

      {serviceItems.map((service) => (
        <EnhancedServiceCard
          key={service.key}
          title={service.title}
          description={service.description}
          benefits={service.benefits}
          imageSrc={service.imageSrc}
          imageAlt={service.imageAlt}
          aiHint={service.aiHint}
          reverse={service.reverse}
          isLoading={isLoadingImages[service.key]}
        />
      ))}
    </section>
  );
}
