import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton

type EnhancedServiceCardProps = {
  title: string;
  description: string;
  benefits: string[];
  imageSrc: string;
  imageAlt?: string;
  aiHint?: string;
  reverse?: boolean; // Para alternar imagen/texto
  isLoading?: boolean; // Add isLoading prop
};

export default function EnhancedServiceCard({
  title,
  description,
  benefits,
  imageSrc,
  imageAlt = '',
  aiHint,
  reverse = false,
  isLoading = false, // Default to false
}: EnhancedServiceCardProps) {
  return (
    <div className={`flex flex-col lg:flex-row ${reverse ? 'lg:flex-row-reverse' : ''} items-center bg-card shadow-md rounded-xl overflow-hidden mb-10`}>
      {/* Texto */}
      <div className="w-full lg:w-1/2 p-8">
        <h3 className="text-primary text-2xl font-bold mb-4">{title}</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
        <ul className="space-y-2 text-foreground text-sm">
          {benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Imagen */}
      <div className="w-full lg:w-1/2 h-64 md:h-80 lg:h-auto relative">
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill // Use fill to cover the container
            className="w-full h-full object-cover" // These ensure it tries to fill the parent and cover the area
            data-ai-hint={aiHint}
          />
        )}
      </div>
    </div>
  );
}