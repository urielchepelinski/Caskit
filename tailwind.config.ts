import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        surface: '#F8F5F0',
        'surface-light': '#F0EBE3',
        accent: {
          DEFAULT: '#C8974C',
          dark: '#A67B3D',
          light: '#D4A85E',
        },
        text: {
          primary: '#1A1612',
          secondary: '#5C5248',
          muted: '#8A7E72',
        },
        border: '#E8E2DA',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
        story: ['Lora', 'serif'],
      },
      borderRadius: {
        card: '16px',
        sm: '10px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0, 0, 0, 0.06)',
        elevated: '0 8px 24px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}

export default config
