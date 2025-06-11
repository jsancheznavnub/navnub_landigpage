'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Dictionary } from '@/lib/dictionaries';
import { Separator } from '@/components/ui/separator';

type HowNavnubGrowsSectionProps = {
  dictionary: Dictionary['howNavnubGrows'];
};

export default function HowNavnubGrowsSection({ dictionary }: HowNavnubGrowsSectionProps) {
  const [imageUrl, setImageUrl] = useState<string>(''); // Iniciar vacío para mostrar el spinner
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSignedUrl = async () => {
      // Obtener la clave de la imagen de la variable de entorno
      const imageKey = process.env.NEXT_PUBLIC_HOW_NAVNUB_GROWS_IMAGE_KEY;
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

      if (!imageKey) {
        console.error("NEXT_PUBLIC_HOW_NAVNUB_GROWS_IMAGE_KEY is not defined in .env");
        setLoading(false);
        return;
      }

      if (!backendUrl) {
        console.error("NEXT_PUBLIC_BACKEND_URL is not defined in .env");
        setLoading(false);
        return;
      }

      // Construir la URL correcta con el query parameter usando la variable de entorno
      const apiUrl = `${backendUrl}/v1/media/s3-signed-url?key=${encodeURIComponent(imageKey)}`;

      try {
        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json(); // El backend devuelve { "url": "...", "expires_in": ... }
          if (data.url) {
            setImageUrl(data.url);
            console.log('Image URL fetched successfully from API.', data.url); // Log para confirmar
          } else {
            console.error('La respuesta de la API no contiene una URL.', data);
          }
        } else {
          console.error('Falló la obtención de la URL firmada:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error en la llamada a la API:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSignedUrl();
  }, []); // El array vacío asegura que esto se ejecute solo una vez

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
              <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center text-gray-500">
                Cargando imagen...
              </div>
            ) : imageUrl ? (
              <Image
                src={imageUrl}
                alt={dictionary.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint="team collaboration office"
              />
            ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                    No se pudo cargar la imagen.
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