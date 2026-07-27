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
        azure: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#2563eb', // Electric Vibrant Blue from design
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#0f172a',
        },
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
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#0f172a',
          gold: '#D4AF37',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};

export default config;
