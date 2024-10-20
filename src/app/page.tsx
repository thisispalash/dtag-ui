'use client';

import clsx from 'clsx';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/navigation';
import { loginState } from '@/util/recoil';

import CTA from '@/components/button/CTA';
import { useToast } from "@/components/toast/use-toast"

export default function Home() {

  const { toast } = useToast();

  const loggedIn = useRecoilValue(loginState);

  const router = useRouter();

  const notLoggedIn = () => {
    toast({
      title: "Not logged in!",
      description: "Please login to perform this action!",
    });
  }

  const handleCreate = () => {
    if (!loggedIn) return notLoggedIn();
    router.push('/create');
  }

  const handlePlay = () => {
    if (!loggedIn) return notLoggedIn();
    router.push('/play');
  }

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
          onClick={handleCreate}
        />
        <CTA 
          label='Play'
          variant='primary'
          onClick={handlePlay}
        />
      </div>
    </div>
  );
}