'use client';

import clsx from 'clsx';

import MarketCard from '@/components/card/MarketCard';

export default function SelectGame() {

  const handlePlay = (uuid: string) => {
    console.log('play', uuid);
  }

  return (
    <div className={clsx(
      'p-8 h-full',
      'grid grid-cols-4 gap-4',
      'overflow-y-auto'
    )}>
      {Array.from({ length: 10 }).map((_, index) => (
        <MarketCard
          key={index}
          image_url={'https://as2.ftcdn.net/v2/jpg/02/55/80/49/1000_F_255804946_NbEpVCoKVh0PJjyZr8QSomct8mgq0lKE.jpghttps://as2.ftcdn.net/v2/jpg/02/55/80/49/1000_F_255804946_NbEpVCoKVh0PJjyZr8QSomct8mgq0lKE.jpg'}
          title={'Game ' + index}
          onClick={() => handlePlay(index.toString())}
        />
      ))}
    </div>
  );
}