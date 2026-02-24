/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: '#7fff6e',
          dim: 'rgba(127,255,110,0.12)',
          glow: 'rgba(127,255,110,0.25)',
        },
        dark: {
          bg:    '#0a0a0a',
          bg2:   '#111111',
          bg3:   '#1a1a1a',
          card:  '#141414',
        },
      },
      animation: {
        'fade-up':    'fadeUp 0.8s ease forwards',
        'pulse-slow': 'pulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
