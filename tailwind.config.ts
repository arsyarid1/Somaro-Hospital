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
        somaro: {
          dark: '#1F120A',
          brown: {
            DEFAULT: '#3D2314', // Primary Luxury Brown
            deep: '#2A170C',
            medium: '#5C3A21',
            light: '#7A5233',
            hover: '#4A2E1B',
          },
          khaki: {
            DEFAULT: '#C8B195', // Khaki Harmony
            light: '#E5D9CC',
            soft: '#F4EFEA',
            tint: '#FAF7F4',
            dark: '#9F866A',
          },
          gold: {
            DEFAULT: '#D4AF37',
            light: '#E6C86E',
            dark: '#B08D25',
          },
          surface: {
            DEFAULT: '#FFFFFF',
            subtle: '#FAF8F5',
            muted: '#F5EFE9',
            border: '#E8DFD5',
          },
        },
      },
      fontFamily: {
        sans: ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'apple': '0 4px 24px -2px rgba(61, 35, 20, 0.06), 0 2px 8px -2px rgba(61, 35, 20, 0.04)',
        'apple-hover': '0 20px 40px -15px rgba(61, 35, 20, 0.12), 0 8px 16px -6px rgba(61, 35, 20, 0.06)',
        'apple-card': '0 10px 30px -10px rgba(61, 35, 20, 0.08)',
        'apple-glow': '0 0 40px -10px rgba(200, 177, 149, 0.35)',
      },
      backdropBlur: {
        'apple': '20px',
      },
    },
  },
  plugins: [],
};

export default config;
