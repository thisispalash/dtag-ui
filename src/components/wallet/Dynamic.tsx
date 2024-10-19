import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';

const DynamicWallet = () => (
  <DynamicContextProvider
    settings={{
      environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || '',
      walletConnectors: [ EthereumWalletConnectors ],
    }}>
    <DynamicWidget />
  </DynamicContextProvider>
);

export default DynamicWallet;