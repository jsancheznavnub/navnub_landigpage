
import type { Locale } from '@/app/i18n-config';
import { getDictionary } from '@/lib/dictionaries';

export default async function PrivacyPolicyPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const d = dictionary.privacyPolicyPage;

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

        <h2>{d.section1.title}</h2>
        <p>{d.section1.intro}</p>
        <h3>{d.section1.subsection1.title}</h3>
        <ul>
          <li>{d.section1.subsection1.item1}</li>
          <li>{d.section1.subsection1.item2}</li>
          <li>{d.section1.subsection1.item3}</li>
          <li>{d.section1.subsection1.item4}</li>
          <li>{d.section1.subsection1.item5}</li>
        </ul>
        <h3>{d.section1.subsection2.title}</h3>
        <ul>
          <li>{d.section1.subsection2.item1}</li>
          <li>{d.section1.subsection2.item2}</li>
          <li>{d.section1.subsection2.item3}</li>
          <li>{d.section1.subsection2.item4}</li>
        </ul>

        <h2>{d.section2.title}</h2>
        <p>{d.section2.intro}</p>
        <ul>
          <li>{d.section2.item1}</li>
          <li>{d.section2.item2}</li>
          <li>{d.section2.item3}</li>
          <li>{d.section2.item4}</li>
          <li>{d.section2.item5}</li>
          <li>{d.section2.item6}</li>
          <li>{d.section2.item7}</li>
        </ul>

        <h2>{d.section3.title}</h2>
        <p>{d.section3.intro}</p>
        <ul>
          <li>{d.section3.item1}</li>
          <li>{d.section3.item2}</li>
          <li>{d.section3.item3}</li>
          <li>{d.section3.item4}</li>
          <li>{d.section3.item5}</li>
        </ul>
        
        <h2>{d.section4.title}</h2>
        <p>{d.section4.intro}</p>
        <ul>
          <li>{d.section4.item1}</li>
          <li>{d.section4.item2}</li>
          <li>{d.section4.item3}</li>
          <li>{d.section4.item4}</li>
        </ul>

        <h2>{d.section5.title}</h2>
        <p>{d.section5.content}</p>

        <h2>{d.section6.title}</h2>
        <p>{d.section6.intro}</p>
        <ul>
          <li>{d.section6.item1}</li>
          <li>{d.section6.item2}</li>
          <li>{d.section6.item3}</li>
          <li>{d.section6.item4}</li>
          <li>{d.section6.item5}</li>
          <li>{d.section6.item6}</li>
          <li>{d.section6.item7}</li>
        </ul>
        <p>{d.section6.outro}</p>

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
        <p>{d.section12.intro}</p>
        <ul>
          <li>{d.section12.item1}</li>
          <li>{d.section12.item2}</li>
          <li>{d.section12.item3}</li>
        </ul>

        <h2>{d.legalNotice.title}</h2>
        <p>{d.legalNotice.content}</p>
      </article>
    </div>
  );
}
