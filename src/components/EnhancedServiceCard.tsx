import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

type EnhancedServiceCardProps = {
  title: string;
  description: string;
  benefits: string[];
  imageSrc: string;
  imageAlt?: string;
  aiHint?: string;
  reverse?: boolean;
  isLoading?: boolean;
};

export default function EnhancedServiceCard({
  title,
  description,
  benefits,
  imageSrc,
  imageAlt = '',
  aiHint,
  reverse = false,
  isLoading = false,
}: EnhancedServiceCardProps) {
  return (
    <div className={`flex flex-col lg:flex-row ${reverse ? 'lg:flex-row-reverse' : ''} items-stretch bg-card shadow-lg rounded-xl overflow-hidden mb-10 min-h-[350px] md:min-h-[400px] transition-all duration-300 ease-in-out transform hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01]`}>
      <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
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

      <div className="w-full lg:w-1/2 relative">
        {isLoading ? (
          <Skeleton className="absolute inset-0 w-full h-full" />
        ) : (
          <Image
            src={imageSrc}
            alt={imageAlt}
            layout="fill"
            objectFit="contain"
            className="w-full h-full p-4"
            data-ai-hint={aiHint}
            onError={(e) => {
              // Fallback to a placeholder if the image fails to load
              e.currentTarget.srcset = "https://placehold.co/600x400.png?text=Error";
              e.currentTarget.src = "https://placehold.co/600x400.png?text=Error";
            }}
          />
        )}
      </div>
    </div>
  );
}
