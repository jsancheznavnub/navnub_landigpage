import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

type ServiceCardProps = { 
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <Card className="bg-card text-center shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 flex flex-col h-full rounded-xl overflow-hidden border border-transparent hover:border-primary/50">
      <CardHeader className="pt-10 pb-6">
        <div className="mx-auto mb-6 flex items-center justify-center h-20 w-20 rounded-full bg-primary/10">
          {icon}
        </div>
        <CardTitle className="font-headline text-2xl text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pb-10">
        <CardDescription className="text-body text-muted-foreground leading-relaxed">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
