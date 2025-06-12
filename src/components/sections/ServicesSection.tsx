
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
      console.log("fetchSignedUrlForImage: Successfully fetched signed URL.");
      return data.url || null;
    } else {
      const errorText = await response.text();
      console.error(`fetchSignedUrlForImage: Failed to fetch signed URL. Status: ${response.status}, StatusText: ${response.statusText}, Response: ${errorText}`);
      return null;
    }
  } catch (error) {
    console.error('fetchSignedUrlForImage: Error during fetch operation:', error);
    return null;
  }
}

export default function ServicesSection({ dictionary }: ServicesSectionProps) {
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string | null }>({});
  const [isLoadingImages, setIsLoadingImages] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const imageKeysConfig = {
      cloudSolutions: process.env.NEXT_PUBLIC_CLOUD_SOLUTIONS_IMAGE_KEY,
      webDevelopment: process.env.NEXT_PUBLIC_WEB_DEV_IMAGE_KEY,
      chatbots: process.env.NEXT_PUBLIC_CHATBOTS_IMAGE_KEY,
    };

    const fetchImages = async () => {
      const newImageUrls: { [key: string]: string | null } = {};
      const initialLoadingStates: { [key: string]: boolean } = {};
      const fetchPromises = [];

      for (const [serviceKey, imageKey] of Object.entries(imageKeysConfig)) {
        if (imageKey) {
          initialLoadingStates[serviceKey] = true;
          fetchPromises.push(
            fetchSignedUrlForImage(imageKey)
              .then(url => {
                newImageUrls[serviceKey] = url;
              })
              .catch(error => {
                console.error(`Error fetching image for ${serviceKey}:`, error);
                newImageUrls[serviceKey] = null; // Use null or a static fallback on error
              })
          );
        } else {
          // If no env var, use a static fallback path and set loading to false immediately
          console.log(`Image key for ${serviceKey} is not defined in environment variables. Using static fallback.`);
          newImageUrls[serviceKey] = `/images/${serviceKey}.jpg`; // Assuming fallback names like cloudSolutions.jpg, webDevelopment.jpg, chatbots.jpg
          initialLoadingStates[serviceKey] = false;
        }
      }

      // Set initial loading states
      setIsLoadingImages(prev => ({ ...prev, ...initialLoadingStates }));

      // Wait for all fetch promises to settle
      await Promise.allSettled(fetchPromises);

      // Update image URLs state after all fetches are done
      setImageUrls(prev => ({ ...prev, ...newImageUrls }));

      // Set loading to false for all services that had a key defined
      const finalLoadingStates: { [key: string]: boolean } = {};
      for (const serviceKey of Object.keys(imageKeysConfig)) {
          finalLoadingStates[serviceKey] = false;
      }
      setIsLoadingImages(finalLoadingStates);

    };

    fetchImages();

  }, []); // Empty dependency array means this runs once on mount

  const serviceItems = [
    {
      title: dictionary.cloudSolutions.title,
      description: dictionary.cloudSolutions.description,
      benefits: dictionary.cloudSolutions.benefits || [],
      // Use the URL from state, or a placeholder/fallback
      imageSrc: isLoadingImages.cloudSolutions ? "https://placehold.co/600x400.png" : (imageUrls.cloudSolutions || '/images/cloudSolutions.jpg'), // Fallback if fetch fails or no key
      imageAlt: 'AI Powered Cloud Solutions',
      isLoading: isLoadingImages.cloudSolutions,
      aiHint: 'cloud computing tablet',
      reverse: false,
    },
    {
      title: dictionary.webDevelopment.title,
      description: dictionary.webDevelopment.description,
      benefits: dictionary.webDevelopment.benefits || [],
      // Use the URL from state, or a placeholder/fallback
      imageSrc: isLoadingImages.webDevelopment ? "https://placehold.co/600x400.png" : (imageUrls.webDevelopment || '/images/webDevelopment.jpg'), // Fallback
      imageAlt: 'Innovative Web and App Development',
      isLoading: isLoadingImages.webDevelopment,
      aiHint: 'web design code',
      reverse: true,
    },
    {
      title: dictionary.chatbots.title,
      description: dictionary.chatbots.description,
      benefits: dictionary.chatbots.benefits || [],
      // Use the URL from state, or a placeholder/fallback
      imageSrc: isLoadingImages.chatbots ? "https://placehold.co/600x400.png" : (imageUrls.chatbots || '/images/chatbots.jpg'), // Fallback
      imageAlt: 'Intelligent Chatbots and Automation',
      isLoading: isLoadingImages.chatbots,
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

      {serviceItems.map((service, index) => (
        <EnhancedServiceCard
          key={index}
          title={service.title}
          description={service.description}
          benefits={service.benefits}
          imageSrc={service.imageSrc}
          imageAlt={service.imageAlt}
          aiHint={service.aiHint}
          reverse={service.reverse}
          isLoading={service.isLoading}
        />
      ))}
    </section>
  );
}
