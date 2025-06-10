import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Dictionary } from '@/lib/dictionaries';
import type { Locale } from '@/app/i18n-config';
import { Bot, Sparkles } from 'lucide-react';

type ChatbotCTASectionProps = {
  dictionary: Dictionary['chatbotCTA'];
  lang: Locale;
};

export default function ChatbotCTASection({ dictionary, lang }: ChatbotCTASectionProps) {
  return (
    <section className="py-20 md:py-32 bg-card border-t border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Optional decorative elements, adjust opacity/color for dark theme */}
        <div className="absolute -top-16 -left-16 text-primary/10 hidden md:block">
            <Sparkles size={160} strokeWidth={0.5} />
        </div>
        <div className="absolute -bottom-16 -right-16 text-primary/10 hidden md:block">
            <Sparkles size={160} strokeWidth={0.5} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
            <Bot size={56} strokeWidth={1.5} className="mx-auto mb-8 text-accent" />
            <h2 className="mb-6 text-4xl md:text-5xl !leading-tight text-foreground">{dictionary.title}</h2>
            <p className="text-xl md:text-2xl mb-10 text-muted-foreground">
            {dictionary.description}
            </p>
            <Button asChild size="lg" className="button-text text-lg px-10 py-7 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Link href={`/${lang}/chatbot-generator`}>{dictionary.button}</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
