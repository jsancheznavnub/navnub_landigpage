'use client';

import { useState, useEffect } from 'react';
import type { Dictionary } from '@/lib/dictionaries';
import EnhancedServiceCard from '@/components/EnhancedServiceCard';
import Image from 'next/image'; // Import next/image for placeholder

type ServicesSectionProps = {
  dictionary: Dictionary['services'];
};

async function fetchSignedUrlForImage(imageKey: string | undefined): Promise<string | null> {
  if (!imageKey) {
    console.error("Image key is not defined.");
    return null;
  }
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    console.error("NEXT_PUBLIC_BACKEND_URL is not defined in .env");
    return null;
  }

  const apiUrl = `${backendUrl}/v1/media/s3-signed-url?key=${encodeURIComponent(imageKey)}`;

  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      return data.url || null;
    } else {
      console.error('Failed to fetch signed URL:', response.status, response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error fetching signed URL:', error);
    return null;
  }
}


export default function ServicesSection({ dictionary }: ServicesSectionProps) {
  const [cloudImageUrl, setCloudImageUrl] = useState<string | null>(null);
  const [isLoadingCloudImage, setIsLoadingCloudImage] = useState(true);

  useEffect(() => {
    const imageKey = process.env.NEXT_PUBLIC_CLOUD_SOLUTIONS_IMAGE_KEY;
    if (imageKey) {
      fetchSignedUrlForImage(imageKey)
        .then(url => {
          setCloudImageUrl(url);
          setIsLoadingCloudImage(false);
        })
        .catch(() => setIsLoadingCloudImage(false));
    } else {
      setIsLoadingCloudImage(false); // No key, stop loading
    }
  }, []);

  const serviceItems = [
    {
      title: dictionary.cloudSolutions.title,
      description: dictionary.cloudSolutions.description,
      benefits: dictionary.cloudSolutions.benefits || [],
      imageSrc: isLoadingCloudImage ? "https://placehold.co/600x400.png" : cloudImageUrl || '/images/cloud-ai.jpg', // Fallback to static if fetch fails or no URL
      imageAlt: 'AI Powered Cloud Solutions',
      isLoading: isLoadingCloudImage,
      aiHint: 'cloud computing tablet',
      reverse: false,
    },
    {
      title: dictionary.webDevelopment.title,
      description: dictionary.webDevelopment.description,
      benefits: dictionary.webDevelopment.benefits || [],
      imageSrc: '/images/web-dev.jpg',
      imageAlt: 'Innovative Web and App Development',
      isLoading: false,
      aiHint: 'web design code',
      reverse: true,
    },
    {
      title: dictionary.chatbots.title,
      description: dictionary.chatbots.description,
      benefits: dictionary.chatbots.benefits || [],
      imageSrc: '/images/chatbots.jpg',
      imageAlt: 'Intelligent Chatbots and Automation',
      isLoading: false,
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
          imageSrc={service.imageSrc} // This will now be the dynamic URL or placeholder
          imageAlt={service.imageAlt}
          aiHint={service.aiHint}
          reverse={service.reverse}
          isLoading={service.isLoading} // Pass loading state
        />
      ))}
    </section>
  );
}