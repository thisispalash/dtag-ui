'use client';

import clsx from 'clsx';

interface MarketCardProps {
  image_url: string;
  title: string;
  onClick: () => void;
}

export default function MarketCard({
  image_url,
  title,
  onClick
}: MarketCardProps) {

  return (
    <div 
      className={clsx(
        'flex flex-col gap-2 pb-2 group',
        'rounded-lg shadow-lg cursor-pointer',
        'hover:shadow-xl hover:shadow-primary hover:shadow-opacity-50',
        'hover:text-primary',
        'transition-colors duration-300',
      )}
      onClick={onClick}
    >

      <div className={clsx(
        'w-full h-auto relative',
      )}>
        <img 
          src={image_url} alt={title} 
          className={clsx(
            'w-full h-full rounded-t-lg',
            'object-cover no-repeat'
          )}
        />
        <div className={clsx(
          'absolute inset-0 pointer-events-none',
          'bg-gradient-to-b from-black/0 to-background/100',
        )} />
      </div>

      <div className={clsx(
        'flex flex-col gap-2 p-2'
      )}>
        <div className={clsx(
          'text-left text-3xl font-heading',
        )}>
          {title}
        </div>
      </div>

    </div>
  );
  
}