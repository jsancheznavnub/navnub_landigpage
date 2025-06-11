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
    <section className="relative min-h-[75vh] md:min-h-[85vh] flex items-center text-center text-primary-foreground overflow-hidden bg-background">
      <Image 
        src="https://placehold.co/1920x1080.png" 
        alt="Modern abstract technology background for Navnub hero section" 
        fill={true}
        className="absolute inset-0 z-0 opacity-30 object-cover"
        data-ai-hint="abstract technology"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent z-10"></div>
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <h1 className="text-primary-foreground mb-6">
          {dictionary.title}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          {dictionary.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="button-text text-lg px-10 py-7 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Link href={`/${lang}/solutions`}>{dictionary.ctaExplore}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="button-text text-lg px-10 py-7 text-primary-foreground border-primary-foreground/50 hover:bg-primary-foreground/10 hover:border-primary-foreground shadow-md">
            <Link href={`/${lang}/contact`}>{dictionary.ctaContact}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
