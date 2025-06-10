import Link from 'next/link';
import { Linkedin, Instagram, Facebook } from 'lucide-react';
import type { Dictionary } from '@/lib/dictionaries';

type FooterProps = {
  dictionary: Dictionary['footer'];
};

export default function Footer({ dictionary }: FooterProps) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-card text-card-foreground py-12 mt-auto border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center space-x-6 mb-6">
          <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin size={24} />
          </Link>
          <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
            <Instagram size={24} />
          </Link>
          <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
            <Facebook size={24} />
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          {dictionary.copyright.replace('{year}', currentYear.toString())}
        </p>
        <p className="text-xs mt-2 text-muted-foreground/70">{dictionary.developedBy}</p>
      </div>
    </footer>
  );
}
