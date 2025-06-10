
'use client';

import { useEffect, useState } from 'react';
import CookieConsentModal from '@/components/CookieConsentModal';
import type { Dictionary } from '@/lib/dictionaries';
import { useCookieModal, CookieModalProvider } from '@/contexts/CookieModalContext'; // Import useCookieModal

type CookieConsentManagerProps = {
  dictionary: Dictionary['cookiePolicyModal'];
  children: React.ReactNode;
};

function CookieConsentManagerInternal({ dictionary, children }: CookieConsentManagerProps) {
  const { isModalOpen: isExplicitlyOpened, closeModal: closeExplicitlyOpenedModal } = useCookieModal();
  const [showInitialModal, setShowInitialModal] = useState(false);
  const [consentStatus, setConsentStatus] = useState<'pending' | 'accepted' | 'rejected'>('pending');

  useEffect(() => {
    const storedConsent = localStorage.getItem('navnub-cookie-consent') as 'accepted' | 'rejected' | null;
    if (storedConsent) {
      setConsentStatus(storedConsent);
      setShowInitialModal(false);
    } else {
      setConsentStatus('pending');
      setShowInitialModal(true); // Show modal if no consent is stored
    }
  }, []);

  const handleConsentChange = (isOpen: boolean, status?: 'accepted' | 'rejected') => {
    if (!isOpen && status) {
      localStorage.setItem('navnub-cookie-consent', status);
      setConsentStatus(status);
    }
    setShowInitialModal(isOpen);
    if (isExplicitlyOpened && !isOpen) {
        closeExplicitlyOpenedModal();
    }
  };
  
  const isModalEffectivelyOpen = showInitialModal || isExplicitlyOpened;

  return (
    <>
      {children}
      <CookieConsentModal
        isOpen={isModalEffectivelyOpen}
        onOpenChange={(isOpen) => handleConsentChange(isOpen, consentStatus !== 'pending' ? consentStatus : undefined)}
        onAccept={() => handleConsentChange(false, 'accepted')}
        onReject={() => handleConsentChange(false, 'rejected')}
        dictionary={dictionary}
      />
    </>
  );
}

export default function CookieConsentManager({ dictionary, children }: CookieConsentManagerProps) {
  return (
    <CookieModalProvider>
      <CookieConsentManagerInternal dictionary={dictionary} children={children} />
    </CookieModalProvider>
  );
}
