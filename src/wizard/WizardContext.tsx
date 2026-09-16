import { createContext, useContext, type ReactNode } from 'react';
import { useWizard } from '@/hooks/useWizard';

interface WizardContextValue {
  step: number;
  total: number;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  isFirst: boolean;
  isLast: boolean;
  progress: number;
}

const WizardContext = createContext<WizardContextValue | null>(null);

export function WizardProvider({ total, children }: { total: number; children: ReactNode }) {
  const wizard = useWizard({ total });
  return <WizardContext.Provider value={wizard}>{children}</WizardContext.Provider>;
}

export function useWizardCtx() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error('useWizardCtx must be used inside <WizardProvider>');
  return ctx;
}
