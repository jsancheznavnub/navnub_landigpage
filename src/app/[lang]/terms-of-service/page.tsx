
import type { Locale } from '@/app/i18n-config';
import { getDictionary } from '@/lib/dictionaries';

export default async function TermsOfServicePage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const d = dictionary.termsOfServicePage;

  // Helper to safely get date string
  const getEffectiveDate = () => {
    const dateString = lang === 'es' ? '10 de junio de 2025' : 'June 10, 2025';
    return d.effectiveDate?.replace('{date}', dateString) || `Effective Date: ${dateString}`;
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-primary">{d.mainTitle}</h1>
        <p className="text-body text-muted-foreground mt-2">{getEffectiveDate()}</p>
      </header>

      <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert max-w-none mx-auto bg-card p-6 sm:p-8 md:p-10 rounded-lg shadow-xl border border-border/50 text-foreground">
        <p>{d.introduction}</p>
        <p>{d.acceptanceIntro}</p>

        <h2>{d.section1.title}</h2>
        <p>{d.section1.intro}</p>
        <ul>
          <li><strong>{d.section1.item1.title}:</strong> {d.section1.item1.content}</li>
          <li><strong>{d.section1.item2.title}:</strong> {d.section1.item2.content}</li>
          <li><strong>{d.section1.item3.title}:</strong> {d.section1.item3.content}</li>
          <li><strong>{d.section1.item4.title}:</strong> {d.section1.item4.content}</li>
        </ul>

        <h2>{d.section2.title}</h2>
        <p>{d.section2.content}</p>

        <h2>{d.section3.title}</h2>
        <p>{d.section3.intro}</p>
        <ul>
          {d.section3.item1 && <li>{d.section3.item1}</li>}
          {d.section3.item2 && <li>{d.section3.item2}</li>}
          {d.section3.item3 && <li>{d.section3.item3}</li>}
          {d.section3.item4 && <li>{d.section3.item4}</li>}
          {d.section3.item5 && <li>{d.section3.item5}</li>}
          {d.section3.item6 && <li>{d.section3.item6}</li>}
          {d.section3.item7 && <li>{d.section3.item7}</li>}
        </ul>

        <h2>{d.section4.title}</h2>
        <p><strong>{d.section4.navnubContent.title}:</strong> {d.section4.navnubContent.content}</p>
        <p><strong>{d.section4.clientContent.title}:</strong> {d.section4.clientContent.content}</p>
        <p><strong>{d.section4.specificDevelopments.title}:</strong> {d.section4.specificDevelopments.content}</p>

        <h2>{d.section5.title}</h2>
        <p>{d.section5.content}</p>

        <h2>{d.section6.title}</h2>
        <p>{d.section6.content}</p>

        <h2>{d.section7.title}</h2>
        <p>{d.section7.content}</p>

        <h2>{d.section8.title}</h2>
        <p>{d.section8.content}</p>

        <h2>{d.section9.title}</h2>
        <p>{d.section9.content}</p>

        <h2>{d.section10.title}</h2>
        <p>{d.section10.content}</p>

        <h2>{d.section11.title}</h2>
        <p>{d.section11.content}</p>

        <h2>{d.section12.title}</h2>
        <p>{d.section12.content}</p>

        <h2>{d.section13.title}</h2>
        <p>{d.section13.content}</p>

        <h2>{d.section14.title}</h2>
        <p>{d.section14.content}</p>
        
        <h2>{d.section15.title}</h2>
        <p>{d.section15.content}</p>

        <h2>{d.section16.title}</h2>
        <p>{d.section16.content}</p>

        <h2>{d.section17.title}</h2>
        <p>{d.section17.content}</p>

        <h2>{d.section18.title}</h2>
        <p>{d.section18.content}</p>

        <h2>{d.finalNote.title}</h2>
        <p>{d.finalNote.content}</p>
      </article>
    </div>
  );
}

    