'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import CTA from '@/components/button/CTA';
import DynamicWallet from '@/components/wallet/Dynamic';

export default function Home() {

  const router = useRouter();

  return (
    <div className={clsx(
      'flex flex-col justify-between',
      'h-screen max-h-screen w-full'
    )}>

      {/* Wallet */}
      <div className={clsx(
        'p-8 items-start w-auto'
      )}>
        <DynamicWallet />
      </div>


      {/* Tag and CTA */}
      <div className={clsx(
        'flex flex-col gap-4',
        'p-8 items-end'
      )}>

        <div className={clsx(
          'flex flex-col gap-2',
          'text-right '
        )}>
          <span className={clsx(
            'text-4xl text-primary'
          )}>
            dextra
          </span>
          <span className={clsx(
            'text-xl text-secondary'
          )}>
            Create, or play, text adventure games powered by NFTs!
          </span>
        </div>

        <div className={clsx(
          'flex flex-row gap-4',
          'w-full justify-end'
        )}>
          <CTA 
            label='Create' 
            variant='secondary'
            onClick={() => router.push('/create')}
          />
          <CTA 
            label='Play'
            variant='primary'
            onClick={() => router.push('/play')}
          />
        </div>

      </div>

    </div>
  );
}
