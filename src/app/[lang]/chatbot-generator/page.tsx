import type { Locale } from '@/app/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import ChatbotGeneratorClient from '@/components/ChatbotGeneratorClient';

export default async function ChatbotGeneratorPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);

  return (
    <div>
      <header className="text-center py-8">
        <h1 className="text-primary">{dictionary.chatbotGeneratorPage.title}</h1>
      </header>
      <ChatbotGeneratorClient dictionary={dictionary.chatbotGeneratorPage} />
    </div>
  );
}
