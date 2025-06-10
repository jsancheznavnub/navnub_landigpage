
'use client';

import Link from 'next/link';
import { Linkedin, Instagram, Facebook, Mail, Phone } from 'lucide-react';
import type { Dictionary } from '@/lib/dictionaries';
import LanguageToggle from '@/components/LanguageToggle';
import type { Locale } from '@/app/i18n-config';
import { useCookieModal } from '@/contexts/CookieModalContext';

type FooterProps = {
  dictionary: Dictionary['footer'];
  lang: Locale;
};

export default function Footer({ dictionary, lang }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { openModal: openCookiePolicyModal } = useCookieModal();

  return (
    <footer className="bg-footer-background text-footer-foreground py-12 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          {/* Column 1: Navnub + Slogan */}
          <div className="space-y-4">
            <Link href={`/${lang}`} className="inline-block mb-2">
               <span className="text-2xl font-bold font-display text-white">{dictionary.navnubLogoAlt}</span>
            </Link>
            <p className="text-sm font-body">{dictionary.slogan}</p>
          </div>

          {/* Column 2: Legal Links */}
          <div className="space-y-2">
            <h3 className="text-md font-display font-semibold mb-3 uppercase tracking-wider">{dictionary.legalLinksTitle}</h3>
            <Link href="#" className="block text-sm font-body hover:text-accent transition-colors">{dictionary.privacyPolicy}</Link>
            <Link href="#" className="block text-sm font-body hover:text-accent transition-colors">{dictionary.termsOfService}</Link>
            <button
              onClick={openCookiePolicyModal}
              className="text-sm font-body hover:text-accent transition-colors text-left w-full md:w-auto block"
            >
              {dictionary.cookiePolicy}
            </button>
          </div>

          {/* Column 3: Contact Info & Social */}
          <div className="space-y-3">
             <h3 className="text-md font-display font-semibold mb-3 uppercase tracking-wider">{dictionary.contactTitle}</h3>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Mail size={18} className="text-accent"/>
              <a href={`mailto:${dictionary.email}`} className="text-sm font-body hover:text-accent transition-colors">{dictionary.email}</a>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Phone size={18} className="text-accent"/>
              <a href={`tel:${dictionary.phone.replace(/\s/g, '')}`} className="text-sm font-body hover:text-accent transition-colors">{dictionary.phone}</a>
            </div>
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <Link href="#" aria-label="LinkedIn" className="text-footer-foreground hover:text-accent transition-colors">
                <Linkedin size={22} />
              </Link>
              <Link href="#" aria-label="Instagram" className="text-footer-foreground hover:text-accent transition-colors">
                <Instagram size={22} />
              </Link>
              <Link href="#" aria-label="Facebook" className="text-footer-foreground hover:text-accent transition-colors">
                <Facebook size={22} />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="font-body text-footer-foreground/80">
            {dictionary.copyright.replace('{year}', currentYear.toString())} {dictionary.developedBy}
          </p>
          <div className="mt-4 md:mt-0">
            <LanguageToggle currentLocale={lang} />
          </div>
        </div>
      </div>
    </footer>
  );
}
