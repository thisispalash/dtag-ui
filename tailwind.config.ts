import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        foreground: 'var(--foreground)',
        background: '#222222',
        primary: '#297F32', // green
        secondary: '#E2E8F0', // white
        health: '#EF4444', // red-500
        energy: '#FCD34D', // amber-300
      },
      fontFamily: {
        'heading': 'var(--font-bulzing)',
        'heading-italic': 'var(--font-bulzing-italic)',
        'terminal': 'var(--font-vt323)',
        'text': 'var(--font-white-rabbit)',
      },
    },
  },
  plugins: [],
};
export default config;
