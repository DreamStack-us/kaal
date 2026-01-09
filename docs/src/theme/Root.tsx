import { useLocation } from '@docusaurus/router';
import type React from 'react';
import { useEffect } from 'react';

declare global {
  interface Window {
    ExpoSnack?: {
      initialize: () => void;
    };
  }
}

function initSnack() {
  if (typeof window !== 'undefined' && window.ExpoSnack) {
    window.ExpoSnack.initialize();
  }
}

export default function Root({
  children,
}: { children: React.ReactNode }): JSX.Element {
  const location = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: Re-initialize snacks on route changes
  useEffect(() => {
    // Initialize immediately if ExpoSnack is ready
    initSnack();

    // Also wait a bit for the script to load if it hasn't yet
    const timer = setTimeout(initSnack, 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return <>{children}</>;
}
