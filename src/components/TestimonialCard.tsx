
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
    <Card className="bg-card border border-border/50 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 ease-in-out h-full flex flex-col rounded-xl overflow-hidden">
      <CardHeader className="flex flex-row items-center space-x-4 p-6 bg-muted/30 border-b border-border/50">
        {/* Contenedor de la imagen: asegurar que sea cuadrado y con bordes redondeados completos y overflow hidden */}
        <div className="relative w-24 h-24 aspect-square rounded-full overflow-hidden border-2 border-accent">
          <Image
            src={testimonial.imageUrl}
            alt={testimonial.name}
            fill={true} // Hace que la imagen llene el contenedor padre
            sizes="96px"
            className="object-cover rounded-full" // Asegura que la imagen cubra el área y también intenta ser redonda
            data-ai-hint={testimonial.imageHint}
          />
        </div>
        <div>
          <h3 className="font-headline text-lg text-foreground">{testimonial.name}</h3>
          <p className="text-sm text-muted-foreground">{testimonial.company}</p>
        </div>
      </CardHeader>
      <CardContent className="pt-6 p-6 flex-grow">
        <Quote className="w-8 h-8 text-accent mb-4 transform -scale-x-100" strokeWidth={1.5}/>
        <p className="text-body text-muted-foreground italic leading-relaxed">"{testimonial.quote}"</p>
      </CardContent>
    </Card>
  );
}
