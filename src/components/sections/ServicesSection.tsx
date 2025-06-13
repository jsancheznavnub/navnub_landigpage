
'use client';

import { useState, useEffect } from 'react';
import type { Dictionary } from '@/lib/dictionaries';
import EnhancedServiceCard from '@/components/EnhancedServiceCard';

type ServicesSectionProps = {
  dictionary: Dictionary['services'];
};

async function fetchSignedUrlForImage(imageKey: string | undefined, context: string): Promise<string | null> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    console.error(`fetchSignedUrlForImage (${context}): NEXT_PUBLIC_BACKEND_URL is not defined. Cannot fetch signed URL.`);
    return null;
  }
  if (!backendUrl.startsWith('http://') && !backendUrl.startsWith('https://')) {
    let finalErrorMessage = `fetchSignedUrlForImage (${context}): NEXT_PUBLIC_BACKEND_URL ("${backendUrl}") is not a valid absolute URL. It must start with http:// or https://.`;
    if (backendUrl === "YOUR_BACKEND_URL_HERE") {
      finalErrorMessage += " This value seems to be a placeholder. Ensure NEXT_PUBLIC_BACKEND_URL is correctly set in your .env file and RESTART your server.";
    }
    console.error(finalErrorMessage);
    return null;
  }
  if (!imageKey) {
    // console.warn(`fetchSignedUrlForImage (${context}): imageKey is not provided or is undefined. Will use placeholder.`);
    return null; // Return null so placeholder can be used
  }

  const apiUrl = `${backendUrl}/v1/media/s3-signed-url?key=${encodeURIComponent(imageKey)}`;
  // console.log(`fetchSignedUrlForImage (${context}): Attempting to fetch from API URL: ${apiUrl}`);

  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      // console.log(`fetchSignedUrlForImage (${context}): Successfully fetched signed URL for ${imageKey}.`);
      return data.url || null;
    } else {
      const errorText = await response.text();
      console.error(`fetchSignedUrlForImage (${context}): Failed to fetch signed URL for ${imageKey} from ${apiUrl}. Status: ${response.status}, Response: ${errorText}`);
      return null;
    }
  } catch (error) {
    console.error(`fetchSignedUrlForImage (${context}): Error during fetch operation for ${imageKey} from ${apiUrl}:`, error);
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

  const serviceDefinitions = [
    {
      key: 'cloudSolutions',
      title: dictionary.cloudSolutions.title,
      description: dictionary.cloudSolutions.description,
      benefits: dictionary.cloudSolutions.benefits || [],
      envVarKey: process.env.NEXT_PUBLIC_CLOUD_SOLUTIONS_IMAGE_KEY,
      placeholder: "https://placehold.co/600x400.png?text=Cloud+Solutions",
      imageAlt: 'AI Powered Cloud Solutions',
      aiHint: 'cloud computing tablet',
      reverse: false,
    },
    {
      key: 'webDevelopment',
      title: dictionary.webDevelopment.title,
      description: dictionary.webDevelopment.description,
      benefits: dictionary.webDevelopment.benefits || [],
      envVarKey: process.env.NEXT_PUBLIC_WEB_DEV_IMAGE_KEY,
      placeholder: "https://placehold.co/600x400.png?text=Web+Development",
      imageAlt: 'Innovative Web and App Development',
      aiHint: 'web design code',
      reverse: true,
    },
    {
      key: 'chatbots',
      title: dictionary.chatbots.title,
      description: dictionary.chatbots.description,
      benefits: dictionary.chatbots.benefits || [],
      envVarKey: process.env.NEXT_PUBLIC_CHATBOTS_IMAGE_KEY,
      placeholder: "https://placehold.co/600x400.png?text=Chatbots",
      imageAlt: 'Intelligent Chatbots and Automation',
      aiHint: 'chatbot interface',
      reverse: false,
    }
  ];


  useEffect(() => {
    const fetchAllImages = async () => {
      const urls: { [key: string]: string | null } = {};
      const loadingStates: { [key: string]: boolean } = {};

      for (const service of serviceDefinitions) {
        loadingStates[service.key] = true;
        const signedUrl = await fetchSignedUrlForImage(service.envVarKey, `ServicesSection-${service.key}`);
        urls[service.key] = signedUrl || service.placeholder; // Use placeholder if fetch fails or key is missing
        loadingStates[service.key] = false;
      }
      
      setImageUrls(urls);
      setIsLoadingImages(loadingStates);
    };

    fetchAllImages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // dictionary is not needed as dep as content is static within the effect's scope based on serviceDefinitions

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-foreground text-3xl font-bold">{dictionary.title}</h2>
        <div className="mt-4 h-1 w-20 bg-accent mx-auto rounded-full"></div>
      </div>

      {serviceDefinitions.map((service) => (
        <EnhancedServiceCard
          key={service.key}
          title={service.title}
          description={service.description}
          benefits={service.benefits}
          imageSrc={imageUrls[service.key] || service.placeholder}
          imageAlt={service.imageAlt}
          aiHint={service.aiHint}
          reverse={service.reverse}
          isLoading={isLoadingImages[service.key]}
        />
      ))}
    </section>
  );
}
