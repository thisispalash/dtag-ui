'use client';

import clsx from 'clsx';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

import { gameIdState } from '@/util/recoil';

import REPL from '@/components/REPL';
import Energy from '@/components/widget/Energy';
import Health from '@/components/widget/Health';
import { GameProvider } from '@/context/GameContext';

export default function Play({ params }: { params: { gameId: string } }) {

  const setGameId = useSetRecoilState(gameIdState);
  
  const { gameId } = params;
  
  const { primaryWallet: wallet } = useDynamicContext();


  const confirmOwnership = async () => {
    // this function confirms that the wallet does indeed own the game
    //  associated by `gameId`
    // If not, toast shown, and redirected to `/play`

    setGameId(gameId);
  }

  useEffect(() => { confirmOwnership(); }, []);

  return (
    <div className={clsx(
      'flex flex-row gap-4',
      'p-8 h-full'
    )}>

      <GameProvider>
        <REPL />
      </GameProvider>

      <div className={clsx(
        'flex flex-col gap-4'
      )}>
        <Health />
        <Energy />

      </div>


    </div>
  );
}