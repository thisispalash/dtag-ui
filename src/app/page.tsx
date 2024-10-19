'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import CTA from '@/components/button/CTA';
// import DynamicWallet from '@/components/wallet/Dynamic';

export default function Home() {

  const router = useRouter();

  return (
    <div className={clsx(
      'flex flex-col gap-4',
      'p-8 h-full justify-end'
    )}>

      <div className={clsx(
        'flex flex-col gap-2',
        'text-right '
      )}>
        <span className={clsx(
          'text-6xl text-primary',
          'font-heading'
        )}>
          dextra
        </span>
        <span className={clsx(
          'text-base text-secondary',
          'font-text'
        )}>
          Create, or play, text adventure games!
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
  );
}