import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Quote } from 'lucide-react';

export type Testimonial = {
  id: string;
  name: string;
  company: string;
  quote: string;
  imageUrl: string;
  imageHint: string;
};

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      <CardHeader className="flex flex-row items-center space-x-4 p-6">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image
            src={testimonial.imageUrl}
            alt={testimonial.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint={testimonial.imageHint}
          />
        </div>
        <div>
          <h3 className="font-headline text-lg text-primary">{testimonial.name}</h3>
          <p className="text-sm text-muted-foreground">{testimonial.company}</p>
        </div>
      </CardHeader>
      <CardContent className="pt-0 p-6 flex-grow">
        <Quote className="w-8 h-8 text-accent mb-2" />
        <p className="text-body text-foreground italic">"{testimonial.quote}"</p>
      </CardContent>
    </Card>
  );
}
