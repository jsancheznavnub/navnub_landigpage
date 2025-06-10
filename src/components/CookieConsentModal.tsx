
'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Dictionary } from '@/lib/dictionaries';

type CookieConsentModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAccept: () => void;
  onReject: () => void;
  dictionary: Dictionary['cookiePolicyModal'];
};

export default function CookieConsentModal({ 
  isOpen, 
  onOpenChange,
  onAccept,
  onReject,
  dictionary 
}: CookieConsentModalProps) {
  
  const handleAccept = () => {
    onAccept();
    onOpenChange(false);
  };

  const handleReject = () => {
    onReject();
    onOpenChange(false);
  };

  if (!isOpen) {
    return null;
  }

  // Add a guard for the dictionary prop
  if (!dictionary) {
    console.error("CookieConsentModal: The 'dictionary' prop is undefined or null. Cannot render modal content.");
    // Return null to prevent the crash. The modal will not appear or appear empty.
    return null; 
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-2xl w-full max-h-[80vh] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-primary">
            {dictionary.title}
          </AlertDialogTitle>
        </AlertDialogHeader>
        
        <ScrollArea className="flex-grow">
          <AlertDialogDescription className="space-y-4 text-sm text-foreground text-body pr-6"> {/* Añadido pr-6 aquí para el contenido */}
            <div className="italic">{dictionary.effectiveDate?.replace('{date}', '10 de junio de 2025')}</div>
            <div>{dictionary.introduction}</div>

            <h3 className="font-semibold text-md text-primary pt-2">{dictionary.whatAreCookies?.title}</h3>
            <div>{dictionary.whatAreCookies?.content}</div>

            <h3 className="font-semibold text-md text-primary pt-2">{dictionary.howWeUseCookies?.title}</h3>
            <div>{dictionary.howWeUseCookies?.content}</div>
            <ul className="list-disc pl-5 space-y-1">
              <li>{dictionary.howWeUseCookies?.item1}</li>
              <li>{dictionary.howWeUseCookies?.item2}</li>
              <li>{dictionary.howWeUseCookies?.item3}</li>
              <li>{dictionary.howWeUseCookies?.item4}</li>
            </ul>
            <div>{dictionary.howWeUseCookies?.aiNote}</div>

            <h3 className="font-semibold text-md text-primary pt-2">{dictionary.typesOfCookies?.title}</h3>
            <div>{dictionary.typesOfCookies?.intro}</div>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>{dictionary.typesOfCookies?.strictlyNecessary?.title}:</strong> {dictionary.typesOfCookies?.strictlyNecessary?.content}</li>
              <li><strong>{dictionary.typesOfCookies?.performance?.title}:</strong> {dictionary.typesOfCookies?.performance?.content}</li>
              <li><strong>{dictionary.typesOfCookies?.functionality?.title}:</strong> {dictionary.typesOfCookies?.functionality?.content}</li>
              <li><strong>{dictionary.typesOfCookies?.advertising?.title}:</strong> {dictionary.typesOfCookies?.advertising?.content}</li>
            </ul>
            
            <h3 className="font-semibold text-md text-primary pt-2">{dictionary.thirdPartyCookies?.title}</h3>
            <div>{dictionary.thirdPartyCookies?.content}</div>
            
            <h3 className="font-semibold text-md text-primary pt-2">{dictionary.yourConsent?.title}</h3>
            <div>{dictionary.yourConsent?.content}</div>

            <h3 className="font-semibold text-md text-primary pt-2">{dictionary.managingPreferences?.title}</h3>
            <div>{dictionary.managingPreferences?.intro}</div>
            <ul className="list-disc pl-5 space-y-1">
              <li>{dictionary.managingPreferences?.item1}</li>
              <li>{dictionary.managingPreferences?.item2}</li>
              <li>{dictionary.managingPreferences?.item3}</li>
            </ul>

            <h3 className="font-semibold text-md text-primary pt-2">{dictionary.dataRetention?.title}</h3>
            <div>{dictionary.dataRetention?.content}</div>
            
            <h3 className="font-semibold text-md text-primary pt-2">{dictionary.policyUpdates?.title}</h3>
            <div>{dictionary.policyUpdates?.content}</div>

            <h3 className="font-semibold text-md text-primary pt-2">{dictionary.contact?.title}</h3>
            <div>{dictionary.contact?.content}</div>
          </AlertDialogDescription>
        </ScrollArea>

        <AlertDialogFooter className="pt-6 mt-auto">
          <AlertDialogCancel asChild>
            <Button variant="outline" onClick={handleReject} className="button-text">
              {dictionary.rejectAllButton}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleAccept} className="button-text bg-primary hover:bg-primary/90 text-primary-foreground">
              {dictionary.acceptAllButton}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
