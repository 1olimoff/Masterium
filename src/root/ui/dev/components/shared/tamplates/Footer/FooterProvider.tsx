import React from 'react';
import { cn } from '@/root/business/lib/utils';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const FooterProvider = ({ className, children }: Props) => {
  return (
    <footer className={cn(className, 'bg-maket-primary px-4')}>
      <div className="layout-widths justify-center py-8 px-2 md:px-6 lg:px-8">
        <div className="flex flex-col gap-6 justify-center items-center md:justify-between">
          {children}
        </div>
      </div>
    </footer>
  );
};
