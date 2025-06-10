import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Dictionary } from '@/lib/dictionaries';
import type { Locale } from '@/app/i18n-config';
import { Bot } from 'lucide-react';

type ChatbotCTASectionProps = {
  dictionary: Dictionary['chatbotCTA'];
  lang: Locale;
};

export default function ChatbotCTASection({ dictionary, lang }: ChatbotCTASectionProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center bg-primary text-primary-foreground p-10 md:p-16 rounded-lg shadow-xl">
        <Bot size={48} strokeWidth={1.5} className="mx-auto mb-6 text-secondary" />
        <h2 className="mb-4 text-3xl md:text-4xl">{dictionary.title}</h2>
        <p className="text-body mb-8 max-w-2xl mx-auto opacity-90">
          {dictionary.description}
        </p>
        <Button asChild size="lg" className="button-text bg-secondary hover:bg-secondary/90 text-secondary-foreground">
          <Link href={`/${lang}/chatbot-generator`}>{dictionary.button}</Link>
        </Button>
      </div>
    </section>
  );
}
