import type { ReactNode } from 'react';
import { Info } from 'lucide-react';

type CalloutProps = {
  children: ReactNode;
  live?: boolean;
};

export function Callout({ children, live = false }: CalloutProps) {
  return (
    <div className="explanation" role="status" aria-live={live ? 'polite' : 'off'}>
      <Info size={20} aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}
