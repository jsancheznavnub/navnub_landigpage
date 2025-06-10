
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
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-12 md:p-20 rounded-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -left-10 text-primary/20">
            <Sparkles size={128} strokeWidth={1} />
        </div>
        <div className="absolute -bottom-10 -right-10 text-primary/20">
            <Sparkles size={128} strokeWidth={1} />
        </div>
        <div className="relative z-10">
            <Bot size={64} strokeWidth={1.5} className="mx-auto mb-8 text-secondary" />
            <h2 className="mb-6 text-4xl md:text-5xl !leading-tight">{dictionary.title}</h2>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
            {dictionary.description}
            </p>
            <Button asChild size="lg" className="button-text text-lg px-10 py-7 bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Link href={`/${lang}/chatbot-generator`}>{dictionary.button}</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
