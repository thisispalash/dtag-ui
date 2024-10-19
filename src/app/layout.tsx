import clsx from 'clsx';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import DynamicWallet from '@/components/wallet/Dynamic';

const bulzing = localFont({
  src: './fonts/Bulzing.ttf',
  variable: '--font-bulzing',
  weight: '100 900',
});

const bulzingItalic = localFont({
  src: './fonts/BulzingItalic.ttf',
  variable: '--font-bulzing-itlaic',
  weight: '100 900',
});

const vt323 = localFont({
  src: './fonts/vt323.ttf',
  variable: '--font-vt323',
  weight: '100 900',
});

const whiteRabbit = localFont({
  src: './fonts/white-rabbit.ttf',
  variable: '--font-white-rabbit',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'dextra',
  description: 'Create, or play, decentralized text adventure games powered by NFTs!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={clsx(
          bulzing.variable,
          bulzingItalic.variable,
          vt323.variable,
          whiteRabbit.variable,
          'antialiased',
          'bg-background'
        )}
      >

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

          {children}

        </div>

      </body>
    </html>
  );
}
