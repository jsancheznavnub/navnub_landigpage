
import type { ReactElement } from 'react';
import Image from 'next/image';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

type SolutionDetailCardProps = {
  title: string;
  description: string;
  benefits: string[];
  icon: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  aiHint: string;
  isLoading?: boolean;
  reverseLayout?: boolean;
};

export default function SolutionDetailCard({
  title,
  description,
  benefits,
  icon,
  imageSrc,
  imageAlt,
  aiHint,
  isLoading = false,
  reverseLayout = false,
}: SolutionDetailCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 rounded-xl border border-border/20">
      <div className={`md:flex ${reverseLayout ? 'md:flex-row-reverse' : ''}`}>
        <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-primary/10 text-primary rounded-full mr-4 shadow-md">
              {React.cloneElement(icon as ReactElement, { size: 32, strokeWidth: 1.5 })}
            </div>
            <CardTitle className="text-3xl text-primary font-bold">{title}</CardTitle>
          </div>
          <CardDescription className="text-body text-muted-foreground mb-8 text-base leading-relaxed">{description}</CardDescription>
          <h3 className="font-headline text-xl text-foreground mb-4">Principales Beneficios:</h3>
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-6 w-6 text-accent mr-3 mt-0.5 flex-shrink-0" strokeWidth={2} />
                <span className="text-body text-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:w-1/2 relative min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px]">
          {isLoading ? (
            <Skeleton className="absolute inset-0 w-full h-full bg-muted/50" />
          ) : (
            <Image
              src={imageSrc}
              alt={imageAlt}
              layout="fill"
              objectFit="contain"
              data-ai-hint={aiHint}
              className="transition-opacity duration-500 ease-in-out"
              onError={(e) => {
                // Fallback to a placeholder if the image fails to load
                const target = e.target as HTMLImageElement;
                target.srcset = "https://placehold.co/600x400.png?text=Error";
                target.src = "https://placehold.co/600x400.png?text=Error";
              }}
            />
          )}
        </div>
      </div>
    </Card>
  );
}
