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
        saudi: {
          emerald: '#0F6C44',
          emeraldDark: '#0A4B2F',
          emeraldLight: '#148C59',
          gold: '#D4AF37',
          goldLight: '#E5C158',
          slateDark: '#1E293B',
          offWhite: '#F8FAFC',
        },
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#148C59',
          600: '#0F6C44',
          700: '#0A4B2F',
          800: '#063320',
          900: '#031C12',
          gold: '#D4AF37',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
