import Link from 'next/link';
import { Linkedin, Instagram, Facebook } from 'lucide-react';
import type { Dictionary } from '@/lib/dictionaries';

type FooterProps = {
  dictionary: Dictionary['footer'];
};

export default function Footer({ dictionary }: FooterProps) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primary text-primary-foreground py-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <Link href="#" aria-label="LinkedIn" className="hover:text-secondary transition-colors">
            <Linkedin size={24} />
          </Link>
          <Link href="#" aria-label="Instagram" className="hover:text-secondary transition-colors">
            <Instagram size={24} />
          </Link>
          <Link href="#" aria-label="Facebook" className="hover:text-secondary transition-colors">
            <Facebook size={24} />
          </Link>
        </div>
        <p className="text-sm">
          {dictionary.copyright.replace('{year}', currentYear.toString())}
        </p>
        <p className="text-xs mt-1 opacity-75">{dictionary.developedBy}</p>
      </div>
    </footer>
  );
}
