'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { OnboardingModal } from './IntroModal';

export default function SessionCheck({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [status]);

  if (status === 'loading') {
    return null;
  }

  return (
    <>
      {children}
      <OnboardingModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
} 