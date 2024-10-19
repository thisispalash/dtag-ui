'use client';

import { http, createConfig, WagmiProvider, useWalletClient } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { PropsWithChildren } from 'react';
import { StoryProvider } from '@story-protocol/react-sdk';
import { createWalletClient, type Chain } from 'viem';
import { flowTestnet, sepolia } from 'wagmi/chains';


export const iliad = {
  id: 1513, // Your custom chain ID
  name: 'Story Network Testnet',
  nativeCurrency: {
    name: 'Testnet IP',
    symbol: 'IP',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://testnet.storyrpc.io'] },
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: 'https://testnet.storyscan.xyz' },
  },
  testnet: true,
} as const satisfies Chain;

// setup wagmi
const config = createConfig({
  chains: [iliad, sepolia, flowTestnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [iliad.id]: http(),
    [sepolia.id]: http(),
    [flowTestnet.id]: http(),
  },
});
const queryClient = new QueryClient();

export default function Web3Providers({ children }: PropsWithChildren) {
  return (
    // setup dynamic
    <DynamicContextProvider
      settings={{
        appName: 'Story Documentation',
        // Find your environment id at https://app.dynamic.xyz/dashboard/developer
        environmentId: process.env
          .NEXT_PUBLIC_DYNAMIC_LABS_ENVIRONMENT_ID as string,
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <StoryProviderWrapper>{children}</StoryProviderWrapper>
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}

// we use this component to pass in our
// wallet from wagmi
function StoryProviderWrapper({ children }: PropsWithChildren) {
  const { data: wallet } = useWalletClient();

  const dummyWallet = createWalletClient({
    chain: iliad,
    transport: http('https://testnet.storyrpc.io'),
  });

  return (
    <StoryProvider
      config={{
        chainId: 'iliad',
        transport: http(process.env.NEXT_PUBLIC_RPC_PROVIDER_URL),
        wallet: wallet || dummyWallet,
      }}
    >
      {children}
    </StoryProvider>
  );
}