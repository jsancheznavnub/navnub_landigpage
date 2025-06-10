
import type { Dictionary } from '@/lib/dictionaries';
import { Zap, Lightbulb, Users, Settings, BarChartBig, Target } from 'lucide-react'; 
import ValueItem from '@/components/ValueItem'; // Import the refactored ValueItem

type WhyNavnubSectionProps = {
  dictionary: Dictionary['whyNavnub'];
};

export default function WhyNavnubSection({ dictionary }: WhyNavnubSectionProps) {
  const values = [
    { icon: <Zap size={28} strokeWidth={1.5} />, text: dictionary.excellence },
    { icon: <Lightbulb size={28} strokeWidth={1.5} />, text: dictionary.innovation },
    { icon: <Users size={28} strokeWidth={1.5} />, text: dictionary.collaboration },
    { icon: <Settings size={28} strokeWidth={1.5} />, text: dictionary.customization },
    { icon: <BarChartBig size={28} strokeWidth={1.5} />, text: dictionary.predictiveAnalysis },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-primary text-5xl">{dictionary.title}</h2>
        <div className="mt-4 h-1 w-24 bg-secondary mx-auto rounded-full"></div>
      </div>
      <div className="max-w-4xl mx-auto space-y-8 text-center mb-16">
        <div className="bg-muted/40 p-8 rounded-xl shadow-md">
          <div className="flex items-center justify-center mb-3">
            <Target size={32} strokeWidth={1.5} className="text-accent mr-3" />
            <h3 className="font-headline text-3xl text-primary">{dictionary.mission.split(':')[0]}</h3>
          </div>
          <p className="text-body text-xl text-muted-foreground leading-relaxed">{dictionary.mission.split(':')[1]?.trim()}</p>
        </div>
        <div className="bg-muted/40 p-8 rounded-xl shadow-md">
          <div className="flex items-center justify-center mb-3">
            <Lightbulb size={32} strokeWidth={1.5} className="text-accent mr-3" />
            <h3 className="font-headline text-3xl text-primary">{dictionary.vision.split(':')[0]}</h3>
          </div>
          <p className="text-body text-xl text-muted-foreground leading-relaxed">{dictionary.vision.split(':')[1]?.trim()}</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {values.map(value => (
          <ValueItem key={value.text} icon={value.icon} text={value.text} />
        ))}
      </div>
    </section>
  );
}
