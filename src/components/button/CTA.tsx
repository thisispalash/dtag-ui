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
        'rounded-lg px-3 py-1 border',
        'text-lg font-terminal font-medium capitalize',
        variant === 'primary' && 'border-primary bg-primary text-background hover:bg-background hover:text-primary',
        variant === 'secondary' && 'border-secondary text-secondary hover:bg-secondary hover:text-background'
      )}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
