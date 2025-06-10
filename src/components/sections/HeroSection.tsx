import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Dictionary } from '@/lib/dictionaries';
import type { Locale } from '@/app/i18n-config';
import Image from 'next/image';

type HeroSectionProps = {
  dictionary: Dictionary['hero'];
  lang: Locale;
};

export default function HeroSection({ dictionary, lang }: HeroSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-card rounded-lg shadow-lg overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-primary mb-6">{dictionary.title}</h1>
          <p className="text-body text-muted-foreground mb-8">
            {dictionary.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button asChild size="lg" className="button-text bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <Link href={`/${lang}/solutions`}>{dictionary.ctaExplore}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="button-text text-primary border-primary hover:bg-primary/10">
              <Link href={`/${lang}/contact`}>{dictionary.ctaContact}</Link>
            </Button>
          </div>
        </div>
        <div className="relative h-64 md:h-96">
           <Image 
            src="https://placehold.co/600x400.png" 
            alt="Abstract technology background" 
            layout="fill" 
            objectFit="cover" 
            className="rounded-lg"
            data-ai-hint="abstract technology"
          />
        </div>
      </div>
    </section>
  );
}
