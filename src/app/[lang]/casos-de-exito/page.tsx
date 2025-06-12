
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
  categoryKey: 'AI' | 'Web' | 'Chatbot' | string; 
  tags?: string[];
};

async function fetchSignedUrlForImage(imageKey: string | undefined): Promise<string | null> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    console.error("fetchSignedUrlForImage: NEXT_PUBLIC_BACKEND_URL is not defined. Cannot fetch signed URL.");
    return null;
  }
  if (!imageKey) {
    console.warn("fetchSignedUrlForImage: imageKey is not provided or is undefined.");
    return null;
  }

  const apiUrl = `${backendUrl}/v1/media/s3-signed-url?key=${encodeURIComponent(imageKey)}`;
  
  try {
    const response = await fetch(apiUrl, { cache: 'no-store' }); // Consider caching strategy
    if (response.ok) {
      const data = await response.json();
      return data.url || null;
    } else {
      const errorText = await response.text();
      console.error(`fetchSignedUrlForImage: Failed to fetch signed URL for ${imageKey}. Status: ${response.status}, Response: ${errorText}`);
      return null;
    }
  } catch (error) {
    console.error(`fetchSignedUrlForImage: Error during fetch operation for ${imageKey}:`, error);
    return null;
  }
}

const getProjects = async (dscp: Dictionary['successCasesPage']): Promise<Project[]> => {
  if (!dscp.projects || !Array.isArray(dscp.projects)) {
    return []; 
  }

  const processedProjects = await Promise.all(
    dscp.projects.map(async (p: DictionaryProject) => {
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
          categoryDisplay = p.categoryKey; 
      }

      let currentImageUrl = p.imageUrl;
      if (p.id === "1") {
        const imageKey = process.env.NEXT_PUBLIC_SUCCESS_CASE_AI_ANALYTICS_IMAGE_KEY;
        if (imageKey) {
          const signedUrl = await fetchSignedUrlForImage(imageKey);
          if (signedUrl) {
            currentImageUrl = signedUrl;
          }
        }
      }

      return {
        id: p.id,
        title: p.title,
        description: p.description,
        imageUrl: currentImageUrl, // Use the potentially updated URL
        imageHint: p.imageHint,
        category: categoryDisplay,
        tags: p.tags,
      };
    })
  );
  return processedProjects;
};

export default async function SuccessCasesPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const projects = await getProjects(dictionary.successCasesPage);

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

