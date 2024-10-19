'use client';

import clsx from 'clsx';
import { useRecoilState } from 'recoil';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';

import { loginState } from '@/util/recoil';
import { DynamicContextProvider, DynamicWidget } from '@/util/dynamic';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {

  const [ loggedIn, setLoggedIn ] = useRecoilState(loginState);
  
  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || '',
        walletConnectors: [ EthereumWalletConnectors ],
        handlers: {
          handleConnectedWallet: async (args) => {
            console.log('Connected wallet', args);
            setLoggedIn(true);
            return true;
          },
        },
      }}
    >

      <div className={clsx(
        'flex flex-col justify-between',
        'min-h-screen max-h-screen w-full h-full'
      )}>

        <div className={clsx(
          'p-8 items-start w-max',
          {
            'pointer-events-none': loggedIn,
          }
        )}>
          {/* TODO: Make own component */}
          { loggedIn ? <DynamicWidget /> : <DynamicWidget /> }
        </div>

        <main className='flex-grow'>
          {children}
        </main>

      </div>
    </DynamicContextProvider>
  );
}

