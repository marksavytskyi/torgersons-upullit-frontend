/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 3.5s ease-in-out infinite',
        'ping-slow': 'ping 2s cubic-bezier(0,0,0.2,1) infinite',
      },
      boxShadow: {
        'brand': '0 8px 32px rgba(249,115,22,0.25)',
        'brand-lg': '0 16px 48px rgba(249,115,22,0.3)',
        'card': '0 2px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 16px 40px rgba(0,0,0,0.10)',
      },
    },
  },
  plugins: [],
};
