
import type { Locale } from '@/app/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import ContactForm from '@/components/ContactForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default async function ContactPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const d = dictionary.contactPage;

  const contactAddress = process.env.NEXT_PUBLIC_CONTACT_ADDRESS || d.addressDetail;
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || d.phoneDetail;
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || d.emailDetail;
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

  return (
    <div className="space-y-12">
      <header className="text-center py-8">
        <h1 className="text-primary">{d.title}</h1>
        <p className="text-body text-muted-foreground mt-2 max-w-2xl mx-auto">{d.description}</p>
      </header>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <Card className="shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">{d.form.submit}</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm dictionary={d.form} />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">{d.infoTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-body text-foreground">
              <div className="flex items-start group">
                <MapPin className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <span className="transition-colors duration-300 group-hover:text-primary whitespace-pre-line">{contactAddress}</span>
              </div>
              <div className="flex items-center group">
                <Phone className="h-6 w-6 text-accent mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <a href={`tel:${contactPhone.replace(/\s|-/g, '')}`} className="hover:text-primary transition-colors duration-300 group-hover:text-primary">{contactPhone}</a>
              </div>
              <div className="flex items-center group">
                <Mail className="h-6 w-6 text-accent mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <a href={`mailto:${contactEmail}`} className="hover:text-primary transition-colors duration-300 group-hover:text-primary">{contactEmail}</a>
              </div>
            </CardContent>
          </Card>

          {bookingUrl && (
            <div className="flex justify-center">
              <Button
                asChild
                size="lg"
                className="button-text bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out animate-pulse-badge"
              >
                <Link href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  {d.talkToUsButton}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
