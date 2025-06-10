import type { Dictionary } from '@/lib/dictionaries';
import { Zap, Lightbulb, Users, Settings, BarChartBig } from 'lucide-react'; // Example icons

type WhyNavnubSectionProps = {
  dictionary: Dictionary['whyNavnub'];
};

const ValueItem = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <div className="flex items-center space-x-3 bg-card p-4 rounded-lg shadow-sm">
    <div className="text-accent">{icon}</div>
    <span className="text-body text-foreground">{text}</span>
  </div>
);

export default function WhyNavnubSection({ dictionary }: WhyNavnubSectionProps) {
  const values = [
    { icon: <Zap size={24} strokeWidth={1.5} />, text: dictionary.excellence },
    { icon: <Lightbulb size={24} strokeWidth={1.5} />, text: dictionary.innovation },
    { icon: <Users size={24} strokeWidth={1.5} />, text: dictionary.collaboration },
    { icon: <Settings size={24} strokeWidth={1.5} />, text: dictionary.customization },
    { icon: <BarChartBig size={24} strokeWidth={1.5} />, text: dictionary.predictiveAnalysis },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/50 rounded-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-primary mb-6">{dictionary.title}</h2>
        <p className="text-center text-body text-muted-foreground max-w-3xl mx-auto mb-4">{dictionary.mission}</p>
        <p className="text-center text-body text-muted-foreground max-w-3xl mx-auto mb-12">{dictionary.vision}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map(value => (
            <ValueItem key={value.text} icon={value.icon} text={value.text} />
          ))}
        </div>
      </div>
    </section>
  );
}
