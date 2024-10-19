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
          onConnectWallet: (wallet) => {
            console.log('Connected wallet', wallet);
          },
          onDisconnectWallet: () => {
            console.log('Disconnected wallet');
            setLoggedIn(false);
          },
          handleConnectedWallet: (args) => {
            console.log('Connected wallet', args);
            setLoggedIn(true);
            return true;
          },
        },
      }}
    >

      <div className={clsx(
        'flex flex-col justify-between',
        'h-screen max-h-screen w-full'
      )}>

        <div className={clsx(
          'p-8 items-start w-max',
          {
            'pointer-events-none': loggedIn,
          }
        )}>
          <DynamicWidget />
        </div>

        <main>
          {children}
        </main>

      </div>
    </DynamicContextProvider>
  );
}

