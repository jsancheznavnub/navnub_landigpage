import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Cloud, Code, Bot } from 'lucide-react';
import type { Dictionary } from '@/lib/dictionaries';

type ServicesSectionProps = {
  dictionary: Dictionary['services'];
};

const ServiceCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardHeader>
      <div className="mx-auto bg-secondary text-secondary-foreground rounded-full p-4 w-fit mb-4">
        {icon}
      </div>
      <CardTitle className="font-headline text-2xl text-primary">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-body text-muted-foreground">{description}</CardDescription>
    </CardContent>
  </Card>
);

export default function ServicesSection({ dictionary }: ServicesSectionProps) {
  const services = [
    {
      icon: <Cloud size={32} strokeWidth={1.5} />,
      title: dictionary.cloudSolutions.title,
      description: dictionary.cloudSolutions.description,
    },
    {
      icon: <Code size={32} strokeWidth={1.5} />,
      title: dictionary.webDevelopment.title,
      description: dictionary.webDevelopment.description,
    },
    {
      icon: <Bot size={32} strokeWidth={1.5} />,
      title: dictionary.chatbots.title,
      description: dictionary.chatbots.description,
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-primary mb-12">{dictionary.title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
