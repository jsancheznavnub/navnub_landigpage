
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
    <Card className="bg-card border border-border/70 shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col rounded-xl overflow-hidden">
      <CardHeader className="flex flex-row items-center space-x-4 p-6 bg-muted/50">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
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
      <CardContent className="pt-6 p-6 flex-grow bg-background">
        <Quote className="w-10 h-10 text-accent mb-4 transform -scale-x-100" strokeWidth={1.5}/>
        <p className="text-body text-foreground italic leading-relaxed">"{testimonial.quote}"</p>
      </CardContent>
    </Card>
  );
}
