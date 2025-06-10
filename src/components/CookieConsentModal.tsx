
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

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-2xl w-full max-h-[80vh] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-primary">
            {dictionary.title}
          </AlertDialogTitle>
        </AlertDialogHeader>
        
        <ScrollArea className="flex-grow pr-6">
          <AlertDialogDescription className="space-y-4 text-sm text-foreground text-body">
            <p className="italic">{dictionary.effectiveDate.replace('{date}', '10 de junio de 2025')}</p>
            <p>{dictionary.introduction}</p>

            <h3 className="font-semibold text-md text-primary pt-2">{dictionary.whatAreCookies.title}</h3>
            <p>{dictionary.whatAreCookies.content}</p>

            <h3 className="font-semibold text-md text-primary pt-2">{dictionary.howWeUseCookies.title}</h3>
            <p>{dictionary.howWeUseCookies.content}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{dictionary.howWeUseCookies.item1}</li>
              <li>{dictionary.howWeUseCookies.item2}</li>
              <li>{dictionary.howWeUseCookies.item3}</li>
              <li>{dictionary.howWeUseCookies.item4}</li>
            </ul>
            <p>{dictionary.howWeUseCookies.aiNote}</p>

            <h3 className="font-semibold text-md text-primary pt-2">{dictionary.typesOfCookies.title}</h3>
            <p>{dictionary.typesOfCookies.intro}</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>{dictionary.typesOfCookies.strictlyNecessary.title}:</strong> {dictionary.typesOfCookies.strictlyNecessary.content}</li>
              <li><strong>{dictionary.typesOfCookies.performance.title}:</strong> {dictionary.typesOfCookies.performance.content}</li>
              <li><strong>{dictionary.typesOfCookies.functionality.title}:</strong> {dictionary.typesOfCookies.functionality.content}</li>
              <li><strong>{dictionary.typesOfCookies.advertising.title}:</strong> {dictionary.typesOfCookies.advertising.content}</li>
            </ul>
            
            <h3 className="font-semibold text-md text-primary pt-2">{dictionary.thirdPartyCookies.title}</h3>
            <p>{dictionary.thirdPartyCookies.content}</p>
            
            <h3 className="font-semibold text-md text-primary pt-2">{dictionary.yourConsent.title}</h3>
            <p>{dictionary.yourConsent.content}</p>

            <h3 className="font-semibold text-md text-primary pt-2">{dictionary.managingPreferences.title}</h3>
            <p>{dictionary.managingPreferences.intro}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{dictionary.managingPreferences.item1}</li>
              <li>{dictionary.managingPreferences.item2}</li>
              <li>{dictionary.managingPreferences.item3}</li>
            </ul>

            <h3 className="font-semibold text-md text-primary pt-2">{dictionary.dataRetention.title}</h3>
            <p>{dictionary.dataRetention.content}</p>
            
            <h3 className="font-semibold text-md text-primary pt-2">{dictionary.policyUpdates.title}</h3>
            <p>{dictionary.policyUpdates.content}</p>

            <h3 className="font-semibold text-md text-primary pt-2">{dictionary.contact.title}</h3>
            <p>{dictionary.contact.content}</p>
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
