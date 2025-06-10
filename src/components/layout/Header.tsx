
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import LanguageToggle from '@/components/LanguageToggle';
import ThemeToggle from '@/components/ThemeToggle'; // Import ThemeToggle
import type { Locale } from '@/app/i18n-config';
import type { Dictionary } from '@/lib/dictionaries';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type HeaderProps = {
  lang: Locale;
  dictionary: Dictionary['navigation'];
  themeDictionary: Dictionary['themeToggle']; // Add theme dictionary prop
};

const NavLink = ({ href, children, lang, onClick, className }: { href: string; children: React.ReactNode; lang: Locale; onClick?: () => void; className?: string; }) => (
  <Link
    href={`/${lang}${href}`}
    onClick={onClick}
    className={cn("nav-text text-foreground/80 hover:text-accent transition-colors px-3 py-2 rounded-md", className)}
  >
    {children}
  </Link>
);

const ServicesDropdown = ({ lang, dictionary }: { lang: Locale; dictionary: Dictionary['navigation']['servicesDropdown'] }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="nav-text text-foreground/80 hover:text-accent hover:bg-transparent px-3 py-2">
        {dictionary.title}
        <ChevronDown className="ml-1 h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="bg-card border-border">
      <DropdownMenuItem asChild>
        <Link href={`/${lang}/solutions#cloud`} className="nav-text text-card-foreground hover:!text-accent !bg-transparent focus:!bg-accent/10">
          {dictionary.cloudSolutions}
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href={`/${lang}/solutions#webdev`} className="nav-text text-card-foreground hover:!text-accent !bg-transparent focus:!bg-accent/10">
          {dictionary.webDevelopment}
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href={`/${lang}/solutions#chatbots`} className="nav-text text-card-foreground hover:!text-accent !bg-transparent focus:!bg-accent/10">
          {dictionary.aiAndChatbots}
        </Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);


export default function Header({ lang, dictionary, themeDictionary }: HeaderProps) {
  const navLinks = [
    { href: '/casos-de-exito', label: dictionary.successCases },
    { href: '/blog', label: dictionary.blog },
    { href: '/contact', label: dictionary.contact },
  ];

  return (
    <header className="bg-background shadow-md sticky top-0 z-50 border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href={`/${lang}`} className="flex items-center space-x-2">
            <Image src="https://placehold.co/120x40.png?text=Navnub&font=montserrat" alt={dictionary.navnubLogoAlt} width={120} height={40} data-ai-hint="logo modern dark" />
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="/" lang={lang}>{dictionary.home}</NavLink>
            <ServicesDropdown lang={lang} dictionary={dictionary.servicesDropdown} />
            {navLinks.map(link => (
              <NavLink key={link.href} href={link.href} lang={lang}>{link.label}</NavLink>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle dictionary={themeDictionary} />
            <LanguageToggle currentLocale={lang} />
            <Button asChild size="sm" className="button-text bg-cta hover:bg-cta/90 text-cta-foreground px-4 py-2">
              <Link href={`/${lang}/contact`}>{dictionary.ctaDemo}</Link>
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <ThemeToggle dictionary={themeDictionary} />
            <LanguageToggle currentLocale={lang} />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-foreground/80" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-background p-6 border-l border-border">
                <div className="flex justify-between items-center mb-6">
                   <Link href={`/${lang}`} className="flex items-center space-x-2">
                     <Image src="https://placehold.co/120x40.png?text=Navnub&font=montserrat" alt={dictionary.navnubLogoAlt} width={120} height={40} data-ai-hint="logo modern dark" />
                   </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                       <X className="h-6 w-6 text-foreground/80" />
                       <span className="sr-only">Close menu</span>
                     </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col space-y-2">
                  <SheetClose asChild>
                    <NavLink href="/" lang={lang} className="block py-2">{dictionary.home}</NavLink>
                  </SheetClose>
                  
                  <div className="text-foreground/80 px-3 py-2 font-display text-sm font-medium">{dictionary.servicesDropdown.title}</div>
                  <SheetClose asChild>
                    <Link href={`/${lang}/solutions#cloud`} className="nav-text text-foreground/70 hover:text-accent transition-colors pl-6 pr-3 py-2 block">{dictionary.servicesDropdown.cloudSolutions}</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href={`/${lang}/solutions#webdev`} className="nav-text text-foreground/70 hover:text-accent transition-colors pl-6 pr-3 py-2 block">{dictionary.servicesDropdown.webDevelopment}</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href={`/${lang}/solutions#chatbots`} className="nav-text text-foreground/70 hover:text-accent transition-colors pl-6 pr-3 py-2 block">{dictionary.servicesDropdown.aiAndChatbots}</Link>
                  </SheetClose>

                  {navLinks.map(link => (
                     <SheetClose asChild key={link.href}>
                        <NavLink href={link.href} lang={lang} className="block py-2">{link.label}</NavLink>
                     </SheetClose>
                  ))}
                   <SheetClose asChild>
                    <Button asChild size="sm" className="button-text bg-cta hover:bg-cta/90 text-cta-foreground w-full mt-4">
                      <Link href={`/${lang}/contact`}>{dictionary.ctaDemo}</Link>
                    </Button>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
