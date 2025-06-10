import type { Locale } from '@/app/i18n-config';
import { getDictionary, type Dictionary } from '@/lib/dictionaries';
import ProjectCard, { type Project } from '@/components/ProjectCard';

// Placeholder data for projects
const getProjects = (dictionary: Dictionary['portfolioPage']): Project[] => [
  {
    id: '1',
    title: 'AI-Powered Analytics Platform',
    description: 'A comprehensive analytics platform using machine learning to provide actionable business insights for PYMEs.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'dashboard analytics',
    category: dictionary.projectCategoryAI,
    tags: ['AI', 'Machine Learning', 'Big Data', 'SaaS'],
  },
  {
    id: '2',
    title: 'E-commerce Website Redesign',
    description: 'Complete redesign and development of an e-commerce platform, improving user experience and conversion rates.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'ecommerce website',
    category: dictionary.projectCategoryWeb,
    tags: ['Web Development', 'UX/UI', 'E-commerce', 'React'],
  },
  {
    id: '3',
    title: 'Customer Service Chatbot',
    description: 'An intelligent chatbot integrated with WhatsApp Business for 24/7 customer support and lead generation.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'chatbot conversation',
    category: dictionary.projectCategoryChatbot,
    tags: ['Chatbot', 'AI', 'Customer Support', 'WhatsApp'],
  },
  {
    id: '4',
    title: 'Cloud Migration for SME',
    description: 'Successfully migrated legacy systems of a medium-sized enterprise to a scalable and secure cloud infrastructure.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'cloud server',
    category: dictionary.projectCategoryAI, // Assuming cloud relates to AI/Cloud solutions
    tags: ['Cloud Computing', 'AWS', 'Migration', 'Scalability'],
  },
  {
    id: '5',
    title: 'Mobile App for Logistics',
    description: 'A cross-platform mobile application for optimizing logistics and fleet management.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'mobile app',
    category: dictionary.projectCategoryWeb,
    tags: ['Mobile App', 'Logistics', 'React Native', 'GPS'],
  },
  {
    id: '6',
    title: 'Automated Sales Assistant Bot',
    description: 'A chatbot designed to assist sales teams by qualifying leads and scheduling appointments.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'sales automation',
    category: dictionary.projectCategoryChatbot,
    tags: ['Chatbot', 'Sales Automation', 'AI', 'CRM Integration'],
  },
];

export default async function PortfolioPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const projects = getProjects(dictionary.portfolioPage);

  return (
    <div className="space-y-12">
      <header className="text-center py-8">
        <h1 className="text-primary">{dictionary.portfolioPage.title}</h1>
        <p className="text-body text-muted-foreground mt-2 max-w-2xl mx-auto">{dictionary.portfolioPage.description}</p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
