/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./templates/**/*.html",
    "./components/**/*.{js,ts,html}",
    "./features/**/*.{js,ts,html}",
    "./src/**/*.{js,ts,html}"
  ],
  theme: {
    extend: {
      colors: {
        // Tokens del sistema de diseño
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
          950: 'var(--color-primary-950)'
        },
        secondary: {
          50: 'var(--color-secondary-50)',
          100: 'var(--color-secondary-100)',
          200: 'var(--color-secondary-200)',
          300: 'var(--color-secondary-300)',
          400: 'var(--color-secondary-400)',
          500: 'var(--color-secondary-500)',
          600: 'var(--color-secondary-600)',
          700: 'var(--color-secondary-700)',
          800: 'var(--color-secondary-800)',
          900: 'var(--color-secondary-900)',
          950: 'var(--color-secondary-950)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        }
      }
    }
  },
  plugins: [
    // Plugin para componentes del template
    function({ addComponents, theme }) {
      addComponents({
        '.prototype-container': {
          '@apply min-h-screen bg-gray-50': {},
        },
        '.prototype-card': {
          '@apply bg-white rounded-lg shadow-sm border border-gray-200 p-6': {},
        },
        '.prototype-button': {
          '@apply px-4 py-2 rounded-md font-medium transition-all duration-200': {},
        },
        '.prototype-button-primary': {
          '@apply bg-primary-500 text-white hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2': {},
        },
        '.prototype-button-secondary': {
          '@apply bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2': {},
        }
      })
    }
  ]
}
