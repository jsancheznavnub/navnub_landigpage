
import Image from 'next/image';
import type { Dictionary } from '@/lib/dictionaries';
import { Separator } from '@/components/ui/separator';

type HowNavnubGrowsSectionProps = {
  dictionary: Dictionary['howNavnubGrows'];
};

export default function HowNavnubGrowsSection({ dictionary }: HowNavnubGrowsSectionProps) {
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
          <div className="relative w-full h-72 sm:h-80 md:h-[450px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://placehold.co/600x450.png"
              alt={dictionary.title} // Using section title as a generic alt
              layout="fill"
              objectFit="cover"
              data-ai-hint="team collaboration office"
            />
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
