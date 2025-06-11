
import type { Dictionary } from '@/lib/dictionaries';
import EnhancedServiceCard from '@/components/EnhancedServiceCard';

type ServicesSectionProps = {
  dictionary: Dictionary['services'];
};

export default function ServicesSection({ dictionary }: ServicesSectionProps) {
  const serviceItems = [
    {
      title: dictionary.cloudSolutions.title,
      description: dictionary.cloudSolutions.description,
      benefits: dictionary.cloudSolutions.benefits || [],
      imageSrc: '/images/cloud-ai.jpg',
      imageAlt: 'AI Powered Cloud Solutions', 
      reverse: false,
    },
    {
      title: dictionary.webDevelopment.title,
      description: dictionary.webDevelopment.description,
      benefits: dictionary.webDevelopment.benefits || [],
      imageSrc: '/images/web-dev.jpg',
      imageAlt: 'Innovative Web and App Development',
      reverse: true,
    },
    {
      title: dictionary.chatbots.title,
      description: dictionary.chatbots.description,
      benefits: dictionary.chatbots.benefits || [],
      imageSrc: '/images/chatbots.jpg',
      imageAlt: 'Intelligent Chatbots and Automation',
      reverse: false,
    },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-foreground text-3xl font-bold">{dictionary.title}</h2>
        <div className="mt-4 h-1 w-20 bg-accent mx-auto rounded-full"></div>
      </div>

      {serviceItems.map((service, index) => (
        <EnhancedServiceCard
          key={index}
          title={service.title}
          description={service.description}
          benefits={service.benefits}
          imageSrc={service.imageSrc}
          imageAlt={service.imageAlt}
          reverse={service.reverse}
        />
      ))}
    </section>
  );
}

    