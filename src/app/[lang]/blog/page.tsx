import type { Locale } from '@/app/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import { Rss } from 'lucide-react';

export default async function BlogPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const d = dictionary.blogPage;

  return (
    <div className="space-y-12">
      <header className="text-center py-8">
        <h1 className="text-primary">{d.title}</h1>
        <p className="text-body text-muted-foreground mt-2 max-w-2xl mx-auto">{d.description}</p>
      </header>

      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center p-8 bg-card rounded-lg shadow-xl">
        <Rss size={64} className="text-accent mb-6" />
        <h2 className="text-2xl font-display text-foreground mb-4">{d.comingSoon}</h2>
        <p className="text-muted-foreground max-w-md">
          {/* You can add a more descriptive "coming soon" message here if needed */}
        </p>
      </div>
    </div>
  );
}
