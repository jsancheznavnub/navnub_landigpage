
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

type ServiceCardProps = { 
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <Card className="bg-background border border-border/70 text-center shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col h-full rounded-xl overflow-hidden">
      <CardHeader className="pt-8 pb-6">
        <div className="mx-auto mb-6 flex items-center justify-center h-20 w-20">
          {icon}
        </div>
        <CardTitle className="font-headline text-2xl text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pb-8">
        <CardDescription className="text-body text-muted-foreground leading-relaxed">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
