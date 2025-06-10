
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
    <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">
      <Image 
        src="https://placehold.co/1920x1080.png" 
        alt="Modern abstract background for Navnub hero section" 
        layout="fill" 
        objectFit="cover" 
        className="absolute inset-0 z-0"
        data-ai-hint="modern abstract"
        priority
      />
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h1 className="text-white mb-8 text-5xl sm:text-6xl lg:text-7xl !leading-tight">
          {dictionary.title}
        </h1>
        <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-3xl mx-auto">
          {dictionary.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="button-text text-lg px-8 py-6 bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href={`/${lang}/solutions`}>{dictionary.ctaExplore}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="button-text text-lg px-8 py-6 text-white border-white hover:bg-white/10 hover:text-white">
            <Link href={`/${lang}/contact`}>{dictionary.ctaContact}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
