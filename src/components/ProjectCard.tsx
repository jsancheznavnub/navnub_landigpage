
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  category: string;
  tags?: string[];
};

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col h-full transform hover:-translate-y-1 hover:scale-[1.02]">
      <div className="relative w-full h-48">
        <Image
          src={project.imageUrl}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          data-ai-hint={project.imageHint}
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="font-headline text-xl text-primary mb-1">{project.title}</CardTitle>
          <Badge variant="secondary" className="ml-2 whitespace-nowrap">{project.category}</Badge>
        </div>
        <CardDescription className="text-body text-muted-foreground text-sm h-20 overflow-hidden">
          {project.description}
        </CardDescription>
      </CardHeader>
      {project.tags && project.tags.length > 0 && (
        <CardContent className="mt-auto pt-0">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
