import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import LanguageToggle from '@/components/LanguageToggle';
import type { Locale } from '@/app/i18n-config';
import type { Dictionary } from '@/lib/dictionaries';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

type HeaderProps = {
  lang: Locale;
  dictionary: Dictionary['navigation'];
};

const NavLink = ({ href, children, lang, onClick }: { href: string; children: React.ReactNode; lang: Locale; onClick?: () => void }) => (
  <Link
    href={`/${lang}${href}`}
    onClick={onClick}
    className="nav-text text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md"
  >
    {children}
  </Link>
);

export default function Header({ lang, dictionary }: HeaderProps) {
  const navLinks = [
    { href: '/solutions', label: dictionary.solutions },
    { href: '/portfolio', label: dictionary.portfolio },
    { href: '/chatbot-generator', label: dictionary.chatbotGenerator },
    { href: '/testimonials', label: dictionary.testimonials },
    { href: '/contact', label: dictionary.contact },
  ];

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href={`/${lang}`} className="flex items-center space-x-2">
            <Image src="https://placehold.co/120x40.png?text=Navnub" alt={dictionary.navnubLogoAlt} width={120} height={40} data-ai-hint="logo minimal" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map(link => (
              <NavLink key={link.href} href={link.href} lang={lang}>{link.label}</NavLink>
            ))}
            <LanguageToggle currentLocale={lang} />
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <LanguageToggle currentLocale={lang} />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-card p-6">
                <div className="flex justify-between items-center mb-6">
                   <Link href={`/${lang}`} className="flex items-center space-x-2">
                     <Image src="https://placehold.co/120x40.png?text=Navnub" alt={dictionary.navnubLogoAlt} width={120} height={40} data-ai-hint="logo minimal" />
                   </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                       <X className="h-6 w-6" />
                       <span className="sr-only">Close menu</span>
                     </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map(link => (
                     <SheetClose asChild key={link.href}>
                        <NavLink href={link.href} lang={lang}>{link.label}</NavLink>
                     </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
