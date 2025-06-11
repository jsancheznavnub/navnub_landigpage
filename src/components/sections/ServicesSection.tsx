
'use client';

import { useState, useEffect } from 'react';
import type { Dictionary } from '@/lib/dictionaries';
import EnhancedServiceCard from '@/components/EnhancedServiceCard';
// import Image from 'next/image'; // No longer directly needed here

type ServicesSectionProps = {
  dictionary: Dictionary['services'];
};

async function fetchSignedUrlForImage(imageKey: string | undefined): Promise<string | null> {
  if (!imageKey) {
    console.error("fetchSignedUrlForImage: Image key is not defined.");
    return null;
  }
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    console.error("fetchSignedUrlForImage: NEXT_PUBLIC_BACKEND_URL is not defined in .env. Cannot fetch signed URL.");
    return null;
  }

  const apiUrl = `${backendUrl}/v1/media/s3-signed-url?key=${encodeURIComponent(imageKey)}`;
  console.log("fetchSignedUrlForImage: Attempting to fetch from API URL:", apiUrl); // Log the API URL

  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      console.log("fetchSignedUrlForImage: Successfully fetched signed URL:", data.url);
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
  const [cloudImageUrl, setCloudImageUrl] = useState<string | null>(null);
  const [isLoadingCloudImage, setIsLoadingCloudImage] = useState(true);

  useEffect(() => {
    const imageKey = process.env.NEXT_PUBLIC_CLOUD_SOLUTIONS_IMAGE_KEY;
    if (imageKey) {
      setIsLoadingCloudImage(true); // Set loading true before fetch
      fetchSignedUrlForImage(imageKey)
        .then(url => {
          setCloudImageUrl(url);
          // setIsLoadingCloudImage(false); // Loading is set to false in finally
        })
        .catch((error) => { // Catch errors from the promise itself
            console.error("Error in useEffect calling fetchSignedUrlForImage:", error);
            // setCloudImageUrl(null); // Ensure it's null on error
            // setIsLoadingCloudImage(false); // Loading is set to false in finally
        })
        .finally(() => {
            setIsLoadingCloudImage(false); // Set loading to false after fetch attempt (success or fail)
        });
    } else {
      console.log("ServicesSection: NEXT_PUBLIC_CLOUD_SOLUTIONS_IMAGE_KEY is not defined. Using fallback image.");
      setIsLoadingCloudImage(false); // No key, stop loading, use fallback
    }
  }, []);

  const serviceItems = [
    {
      title: dictionary.cloudSolutions.title,
      description: dictionary.cloudSolutions.description,
      benefits: dictionary.cloudSolutions.benefits || [],
      // Logic for imageSrc:
      // 1. If loading, use placeholder.
      // 2. If not loading and cloudImageUrl is available, use it.
      // 3. Otherwise (not loading, no cloudImageUrl), use static fallback.
      imageSrc: isLoadingCloudImage ? "https://placehold.co/600x400.png" : (cloudImageUrl || '/images/cloud-ai.jpg'),
      imageAlt: 'AI Powered Cloud Solutions',
      isLoading: isLoadingCloudImage,
      aiHint: 'cloud computing tablet',
      reverse: false,
    },
    {
      title: dictionary.webDevelopment.title,
      description: dictionary.webDevelopment.description,
      benefits: dictionary.webDevelopment.benefits || [],
      imageSrc: '/images/web-dev.jpg', // Assuming this is a static image
      imageAlt: 'Innovative Web and App Development',
      isLoading: false, // This image is static, so never loading
      aiHint: 'web design code',
      reverse: true,
    },
    {
      title: dictionary.chatbots.title,
      description: dictionary.chatbots.description,
      benefits: dictionary.chatbots.benefits || [],
      imageSrc: '/images/chatbots.jpg', // Assuming this is a static image
      imageAlt: 'Intelligent Chatbots and Automation',
      isLoading: false, // This image is static, so never loading
      aiHint: 'chatbot interface',
      reverse: false,
    },
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
