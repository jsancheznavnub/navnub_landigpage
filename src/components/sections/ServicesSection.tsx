
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Cloud, Code, Bot } from 'lucide-react';
import type { Dictionary } from '@/lib/dictionaries';
import ServiceCard from '@/components/ServiceCard'; // Import the refactored ServiceCard

type ServicesSectionProps = {
  dictionary: Dictionary['services'];
};

export default function ServicesSection({ dictionary }: ServicesSectionProps) {
  const services = [
    {
      icon: <Cloud size={40} strokeWidth={1.5} className="text-accent" />,
      title: dictionary.cloudSolutions.title,
      description: dictionary.cloudSolutions.description,
    },
    {
      icon: <Code size={40} strokeWidth={1.5} className="text-accent" />,
      title: dictionary.webDevelopment.title,
      description: dictionary.webDevelopment.description,
    },
    {
      icon: <Bot size={40} strokeWidth={1.5} className="text-accent" />,
      title: dictionary.chatbots.title,
      description: dictionary.chatbots.description,
    },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-primary text-5xl">{dictionary.title}</h2>
        <div className="mt-4 h-1 w-24 bg-secondary mx-auto rounded-full"></div>
      </div>
      <div className="grid md:grid-cols-3 gap-10">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </section>
  );
}
