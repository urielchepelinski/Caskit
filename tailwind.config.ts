import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#1A1612',
        surface: '#2A2420',
        'surface-light': '#3A3430',
        accent: {
          DEFAULT: '#C8974C',
          dark: '#8B6B3D',
          light: '#D4A85E',
        },
        text: {
          primary: '#F5F0EB',
          secondary: '#C4B8AA',
          muted: '#A89B8C',
        },
        border: '#3D3530',
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
        card: '0 2px 12px rgba(0, 0, 0, 0.2)',
        elevated: '0 8px 24px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}

export default config
