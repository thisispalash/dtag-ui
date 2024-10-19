'use client';

import clsx from 'clsx';

export interface CTAProps {
  label: string;
  variant: 'primary' | 'secondary';
  onClick: () => void;
}


export default function CTA({
  label,
  variant,
  onClick,
}: CTAProps) {

  return (
    <button 
      className={clsx(
        'rounded-lg px-4 py-2 border',
        'text-base font-medium capitalize',
        variant === 'primary' && 'border-primary text-primary hover:bg-primary hover:text-background',
        variant === 'secondary' && 'border-secondary text-secondary hover:bg-secondary hover:text-background'
      )}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
