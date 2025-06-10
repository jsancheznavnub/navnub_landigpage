import type { Locale } from '@/app/i18n-config';
import { getDictionary, type Dictionary } from '@/lib/dictionaries';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Cloud, Code, Bot, CheckCircle } from 'lucide-react';
import Image from 'next/image';

const SolutionDetailCard = ({ title, description, benefits, icon, imageSrc, imageAlt, aiHint }: { title: string; description: string; benefits: string[]; icon: React.ReactNode; imageSrc: string; imageAlt: string; aiHint: string; }) => (
  <Card className="overflow-hidden shadow-lg">
    <div className="md:flex">
      <div className="md:w-1/2 p-6 md:p-8">
        <div className="flex items-center mb-4">
          <div className="p-3 bg-secondary text-secondary-foreground rounded-full mr-4">
            {icon}
          </div>
          <CardTitle className="text-3xl text-primary">{title}</CardTitle>
        </div>
        <CardDescription className="text-body text-muted-foreground mb-6">{description}</CardDescription>
        <h3 className="font-headline text-xl text-primary mb-3">Key Benefits:</h3>
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-body">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:w-1/2 relative min-h-[250px] md:min-h-full">
        <Image src={imageSrc} alt={imageAlt} layout="fill" objectFit="cover" data-ai-hint={aiHint} />
      </div>
    </div>
  </Card>
);


export default async function SolutionsPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const d = dictionary.solutionsPage;

  return (
    <div className="space-y-12 md:space-y-16">
      <header className="text-center py-8">
        <h1 className="text-primary">{d.title}</h1>
      </header>

      <SolutionDetailCard
        title={d.cloudTitle}
        description={d.cloudDescription}
        benefits={d.cloudBenefits}
        icon={<Cloud size={32} strokeWidth={1.5} />}
        imageSrc="https://placehold.co/600x400.png"
        imageAlt="Cloud Solutions Illustration"
        aiHint="cloud infrastructure"
      />

      <SolutionDetailCard
        title={d.webDevTitle}
        description={d.webDevDescription}
        benefits={d.webDevBenefits}
        icon={<Code size={32} strokeWidth={1.5} />}
        imageSrc="https://placehold.co/600x400.png"
        imageAlt="Web Development Illustration"
        aiHint="web design"
      />
      
      <SolutionDetailCard
        title={d.chatbotsTitle}
        description={d.chatbotsDescription}
        benefits={d.chatbotsBenefits}
        icon={<Bot size={32} strokeWidth={1.5} />}
        imageSrc="https://placehold.co/600x400.png"
        imageAlt="Chatbots Illustration"
        aiHint="chatbot interface"
      />

    </div>
  );
}
