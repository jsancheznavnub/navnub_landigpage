
import type { Locale } from '@/app/i18n-config';
import { getDictionary, type Dictionary } from '@/lib/dictionaries';
import ProjectCard, { type Project } from '@/components/ProjectCard';

// Type for project data coming from the dictionary
type DictionaryProject = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  categoryKey: 'AI' | 'Web' | 'Chatbot' | string; // Add string for flexibility
  tags?: string[];
};

const getProjects = (dscp: Dictionary['successCasesPage']): Project[] => {
  if (!dscp.projects || !Array.isArray(dscp.projects)) {
    return []; // Return empty array if projects are not defined or not an array
  }
  return dscp.projects.map((p: DictionaryProject) => {
    let categoryDisplay = '';
    switch (p.categoryKey) {
      case 'AI':
        categoryDisplay = dscp.projectCategoryAI;
        break;
      case 'Web':
        categoryDisplay = dscp.projectCategoryWeb;
        break;
      case 'Chatbot':
        categoryDisplay = dscp.projectCategoryChatbot;
        break;
      default:
        // Fallback or default category if key is not recognized
        // If you expect only the defined keys, you might want to log an error here
        categoryDisplay = p.categoryKey; 
    }
    return {
      id: p.id,
      title: p.title,
      description: p.description,
      imageUrl: p.imageUrl,
      imageHint: p.imageHint,
      category: categoryDisplay, // This is the translated string for display
      tags: p.tags,
    };
  });
};

export default async function SuccessCasesPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const projects = getProjects(dictionary.successCasesPage);

  return (
    <div className="space-y-12">
      <header className="text-center py-8">
        <h1 className="text-primary">{dictionary.successCasesPage.title}</h1>
        <p className="text-body text-muted-foreground mt-2 max-w-2xl mx-auto">{dictionary.successCasesPage.description}</p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

    