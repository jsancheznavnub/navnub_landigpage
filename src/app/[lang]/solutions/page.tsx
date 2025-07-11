
'use client';

import { useState, useEffect, type ReactElement, use } from 'react';
import type { Locale } from '@/app/i18n-config';
import { getDictionary, type Dictionary } from '@/lib/dictionaries';
import SolutionDetailCard from '@/components/SolutionDetailCard';
import { Cloud, Code, Bot } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

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
    console.warn(`fetchSignedUrlForImage (${context}): imageKey is not provided or is undefined.`);
    return null;
  }

  const apiUrl = `${backendUrl}/v1/media/s3-signed-url?key=${encodeURIComponent(imageKey)}`;
  // console.log(`fetchSignedUrlForImage (${context}): Attempting to fetch from API URL: ${apiUrl}`);
  
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
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

export default function SolutionsPage(props: { params: Promise<{ lang: Locale }> }) {
  const resolvedParams = use(props.params);
  const lang = resolvedParams.lang;

  const [dictionary, setDictionary] = useState<Dictionary | null>(null);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string | null }>({
    cloud: null,
    webDev: null,
    chatbots: null,
  });
  const [isLoadingImages, setIsLoadingImages] = useState<{ [key: string]: boolean }>({
    cloud: true,
    webDev: true,
    chatbots: true,
  });

  useEffect(() => {
    const loadDictionary = async () => {
      const dict = await getDictionary(lang);
      setDictionary(dict);
    };
    loadDictionary();
  }, [lang]);

  useEffect(() => {
    if (!dictionary) return; 

    const imageKeysConfig = [
      { key: 'cloud', envVar: process.env.NEXT_PUBLIC_CLOUD_SOLUTIONS_IMAGE_KEY, defaultPlaceholder: "https://placehold.co/600x400.png?text=Cloud+Solutions" },
      { key: 'webDev', envVar: process.env.NEXT_PUBLIC_WEB_DEV_IMAGE_KEY, defaultPlaceholder: "https://placehold.co/600x400.png?text=Web+Development" },
      { key: 'chatbots', envVar: process.env.NEXT_PUBLIC_CHATBOTS_IMAGE_KEY, defaultPlaceholder: "https://placehold.co/600x400.png?text=Chatbots" },
    ];

    const fetchAllImages = async () => {
      const urls: { [key: string]: string | null } = {};
      const loadingStates: { [key: string]: boolean } = { cloud: true, webDev: true, chatbots: true };
      
      setImageUrls(prev => ({...prev, ...imageKeysConfig.reduce((acc,curr) => ({...acc, [curr.key]: curr.defaultPlaceholder}), {})})); // Set placeholders initially
      setIsLoadingImages(loadingStates);

      for (const config of imageKeysConfig) {
        if (config.envVar) {
          const fetchedUrl = await fetchSignedUrlForImage(config.envVar, `SolutionsPage-${config.key}`);
          if (fetchedUrl) {
            urls[config.key] = fetchedUrl;
          } else {
            console.warn(`SolutionsPage: Failed to get signed URL for ${config.key} (key: ${config.envVar}). Using placeholder: ${config.defaultPlaceholder}`);
            urls[config.key] = config.defaultPlaceholder; // Ensure placeholder on explicit fail
          }
        } else {
          console.warn(`SolutionsPage: Image key not found in .env for ${config.key}. Using placeholder: ${config.defaultPlaceholder}`);
          urls[config.key] = config.defaultPlaceholder; // Ensure placeholder if envVar is missing
        }
        // Update loading state for this specific image
        // This approach might cause multiple re-renders. Consider batching state updates if performance is an issue.
        setIsLoadingImages(prev => ({...prev, [config.key]: false}));
      }
      setImageUrls(prev => ({...prev, ...urls})); // Batch update URLs at the end
      // setIsLoadingImages({ cloud: false, webDev: false, chatbots: false }); // Batch update loading states at the end
    };

    fetchAllImages();
  }, [dictionary]); 

  if (!dictionary) {
    return (
      <div className="space-y-12 md:space-y-16 container mx-auto px-4 py-12">
        <Skeleton className="h-12 w-1/2 mx-auto mb-16 rounded-md" />
        <Skeleton className="h-[400px] w-full rounded-xl mb-12" />
        <Skeleton className="h-[400px] w-full rounded-xl mb-12" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  const d = dictionary.solutionsPage;
  const serviceItems = [
    {
      key: 'cloud',
      title: d.cloudTitle,
      description: d.cloudDescription,
      benefits: d.cloudBenefits || [],
      icon: <Cloud size={32} strokeWidth={1.5}/>,
      imageAlt: "Cloud Solutions Illustration",
      aiHint: "cloud infrastructure data",
      defaultPlaceholder: "https://placehold.co/600x400.png?text=Cloud+Solutions"
    },
    {
      key: 'webDev',
      title: d.webDevTitle,
      description: d.webDevDescription,
      benefits: d.webDevBenefits || [],
      icon: <Code size={32} strokeWidth={1.5}/>,
      imageAlt: "Web Development Illustration",
      aiHint: "modern web application",
      defaultPlaceholder: "https://placehold.co/600x400.png?text=Web+Development"
    },
    {
      key: 'chatbots',
      title: d.chatbotsTitle,
      description: d.chatbotsDescription,
      benefits: d.chatbotsBenefits || [],
      icon: <Bot size={32} strokeWidth={1.5}/>,
      imageAlt: "Chatbots Illustration",
      aiHint: "ai chatbot conversation",
      defaultPlaceholder: "https://placehold.co/600x400.png?text=Chatbots"
    },
  ];

  return (
    <div className="space-y-16 md:space-y-20 container mx-auto px-4 py-12">
      <header className="text-center pt-8 pb-4">
        <h1 className="text-primary font-bold">{d.title}</h1>
        <div className="mt-4 h-1.5 w-24 bg-accent mx-auto rounded-full"></div>
      </header>

      {serviceItems.map((service, index) => (
        <SolutionDetailCard
          key={service.key}
          title={service.title}
          description={service.description}
          benefits={service.benefits}
          icon={service.icon as ReactElement}
          imageSrc={imageUrls[service.key] || service.defaultPlaceholder}
          imageAlt={service.imageAlt}
          aiHint={service.aiHint}
          isLoading={isLoadingImages[service.key]}
          reverseLayout={index % 2 !== 0} 
        />
      ))}
    </div>
  );
}
