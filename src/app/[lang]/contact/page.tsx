import type { Locale } from '@/app/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import ContactForm from '@/components/ContactForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

export default async function ContactPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const d = dictionary.contactPage;

  return (
    <div className="space-y-12">
      <header className="text-center py-8">
        <h1 className="text-primary">{d.title}</h1>
        <p className="text-body text-muted-foreground mt-2 max-w-2xl mx-auto">{d.description}</p>
      </header>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">{d.form.submit}</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm dictionary={d.form} />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">{d.infoTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-body text-foreground">
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
              <span>{d.addressDetail}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-6 w-6 text-accent mr-3 flex-shrink-0" />
              <a href={`tel:${d.phoneDetail.replace(/\s/g, '')}`} className="hover:text-primary">{d.phoneDetail}</a>
            </div>
            <div className="flex items-center">
              <Mail className="h-6 w-6 text-accent mr-3 flex-shrink-0" />
              <a href={`mailto:${d.emailDetail}`} className="hover:text-primary">{d.emailDetail}</a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
