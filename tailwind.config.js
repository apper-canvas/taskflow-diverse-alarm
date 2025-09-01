/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#faf7ff',
          100: '#f3ecff',
          200: '#e9dcff',
          300: '#d8c0ff',
          400: '#c297ff',
          500: '#a855f7',
          600: '#5B21B6',
          700: '#4c1d95',
          800: '#3c1677',
          900: '#2e0f5b',
        },
        secondary: {
          50: '#f8f7ff',
          100: '#f0edff',
          200: '#e4deff',
          300: '#d2c7ff',
          400: '#bba6ff',
          500: '#8B5CF6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        surface: {
          50: '#F9FAFB',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        priority: {
          low: '#6b7280',
          medium: '#f59e0b',
          high: '#ef4444',
          urgent: '#dc2626',
        }
      },
      animation: {
        'pulse-gentle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'confetti': 'confetti 0.8s ease-out',
        'scale-up': 'scaleUp 0.2s ease-out',
      },
      keyframes: {
        confetti: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '0.8' },
          '100%': { transform: 'scale(0.8) rotate(360deg)', opacity: '0' },
        },
        scaleUp: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}