
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { i18n, type Locale } from '@/app/i18n-config';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getDictionary } from '@/lib/dictionaries';
import CookieConsentManager from '@/components/CookieConsentManager';
import '../globals.css';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: 'Navnub Digital Fusion',
  description: 'AI, Cloud Solutions, Web Development, Chatbots for PYMEs',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  return (
    <html lang={params.lang} className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;600;700&family=Lato:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased text-foreground flex flex-col min-h-screen bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CookieConsentManager dictionary={dictionary.cookiePolicyModal}>
            <Header lang={params.lang} dictionary={dictionary.navigation} themeDictionary={dictionary.themeToggle} />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <Footer lang={params.lang} dictionary={dictionary.footer} />
          </CookieConsentManager>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
