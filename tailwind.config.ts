import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        surface: '#F8F6F4',
        accent: {
          DEFAULT: '#C8974C',
          dark: '#8B6B3D',
        },
        text: {
          primary: '#1A1612',
          secondary: '#6B5E52',
          muted: '#A89B8C',
        },
        border: '#EDE8E3',
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
        card: '0 2px 12px rgba(26, 22, 18, 0.06)',
        elevated: '0 8px 24px rgba(26, 22, 18, 0.1)',
      },
    },
  },
  plugins: [],
}

export default config
