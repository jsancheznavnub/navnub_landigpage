import { Cloud, Code, Bot } from 'lucide-react';
import type { Dictionary } from '@/lib/dictionaries';
import ServiceCard from '@/components/ServiceCard';

type ServicesSectionProps = {
  dictionary: Dictionary['services'];
};

export default function ServicesSection({ dictionary }: ServicesSectionProps) {
  const services = [
    {
      icon: <Cloud size={40} strokeWidth={1.5} className="text-primary" />,
      title: dictionary.cloudSolutions.title,
      description: dictionary.cloudSolutions.description,
    },
    {
      icon: <Code size={40} strokeWidth={1.5} className="text-primary" />,
      title: dictionary.webDevelopment.title,
      description: dictionary.webDevelopment.description,
    },
    {
      icon: <Bot size={40} strokeWidth={1.5} className="text-primary" />,
      title: dictionary.chatbots.title,
      description: dictionary.chatbots.description,
    },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 md:mb-20">
        <h2 className="text-foreground">{dictionary.title}</h2>
        <div className="mt-4 h-1 w-20 bg-accent mx-auto rounded-full"></div>
      </div>
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </section>
  );
}
