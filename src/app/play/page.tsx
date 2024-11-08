'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { Adventure } from '@/types';
import MarketCard from '@/components/card/MarketCard';

export default function SelectGame() {

  const router = useRouter();

  const [ games, setGames ] = useState<Adventure[]>([]);

  const fetchGames = async () => {
    const res = await fetch('/api/games');
    const data = await res.json();
    setGames(data);
  }

  useEffect(() => { fetchGames() }, []);

  const handlePlay = (uuid: string) => {
    router.push(`/play/${uuid}`);
  }


  return (
    <div className={clsx(
      'p-8 h-full',
      'grid grid-cols-4 gap-4',
      'overflow-y-auto'
    )}>
    {games.map((game, index) => (
      <MarketCard
        key={index}
        image_url={game.image_url}
        title={game.title}
        onClick={() => handlePlay(game.id)}
      />
    ))}
    </div>
  );
}