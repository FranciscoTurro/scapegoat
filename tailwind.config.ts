import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        background: '#000',
        foreground: '#fff',
        ring: '#fff',
        border: '#333',
        input: '#111',
        primary: {
          DEFAULT: '#d1554b',
          foreground: '#7a2d39',
        },
        secondary: {
          DEFAULT: '#333',
          foreground: '#ccc',
        },
        destructive: {
          DEFAULT: '#7f1d1d',
          foreground: '#cc6666',
        },
        muted: {
          DEFAULT: '#666',
          foreground: '#999',
        },
        accent: {
          DEFAULT: '#333',
          foreground: '#',
        },
        popover: {
          DEFAULT: '#444',
          foreground: '#ccc',
        },
        card: {
          DEFAULT: '#000',
          foreground: '#fff',
        },
      },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
