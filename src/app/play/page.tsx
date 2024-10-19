'use client';

import REPL from '@/components/REPL';
// import { useWalletClient } from 'wagmi';

import Energy from '@/components/widget/Energy';
import Health from '@/components/widget/Health';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import clsx from 'clsx';

export default function Play() {
  // const { data: wallet } = useWalletClient();

  const { primaryWallet: wallet } = useDynamicContext();


  console.log(wallet);
  return (
    <div className={clsx(
      'flex flex-row gap-4',
      'p-8 h-full'
    )}>

      <REPL />

      <div className={clsx(
        'flex flex-col gap-4'
      )}>
        <Health />
        <Energy />

      </div>


    </div>
  );
}