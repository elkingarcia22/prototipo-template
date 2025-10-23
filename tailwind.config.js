/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Extender colores de Tailwind con tokens UBITS
      colors: {
        // Colores principales UBITS
        'ubits-brand': 'var(--ubits-accent-brand)',
        'ubits-brand-hover': 'var(--ubits-button-primary-hover)',
        'ubits-brand-pressed': 'var(--ubits-button-primary-pressed)',
        
        // Colores de texto UBITS
        'ubits-text-primary': 'var(--ubits-fg-1-high)',
        'ubits-text-secondary': 'var(--ubits-fg-1-medium)',
        'ubits-text-disabled': 'var(--ubits-fg-disabled)',
        
        // Colores de fondo UBITS
        'ubits-bg-primary': 'var(--ubits-bg-1)',
        'ubits-bg-secondary': 'var(--ubits-bg-2)',
        'ubits-bg-tertiary': 'var(--ubits-bg-3)',
        'ubits-bg-disabled': 'var(--ubits-bg-disabled)',
        
        // Colores de borde UBITS
        'ubits-border-primary': 'var(--ubits-border-1)',
        'ubits-border-secondary': 'var(--ubits-border-2)',
        'ubits-border-disabled': 'var(--ubits-border-disabled)',
        
        // Colores de feedback UBITS
        'ubits-success': 'var(--ubits-feedback-accent-success)',
        'ubits-success-bg': 'var(--ubits-feedback-bg-success-subtle)',
        'ubits-success-border': 'var(--ubits-feedback-border-success)',
        
        'ubits-info': 'var(--ubits-feedback-accent-info)',
        'ubits-info-bg': 'var(--ubits-feedback-bg-info-subtle)',
        'ubits-info-border': 'var(--ubits-feedback-border-info)',
        
        'ubits-warning': 'var(--ubits-feedback-accent-warning)',
        'ubits-warning-bg': 'var(--ubits-feedback-bg-warning-subtle)',
        'ubits-warning-border': 'var(--ubits-feedback-border-warning)',
        
        'ubits-error': 'var(--ubits-feedback-accent-error)',
        'ubits-error-bg': 'var(--ubits-feedback-bg-error-subtle)',
        'ubits-error-border': 'var(--ubits-feedback-border-error)',
        
        // Colores de sidebar UBITS
        'ubits-sidebar-bg': 'var(--ubits-sidebar-bg)',
        'ubits-sidebar-text': 'var(--ubits-sidebar-button-fg-default)',
        'ubits-sidebar-text-hover': 'var(--ubits-sidebar-button-fg-hover)',
        'ubits-sidebar-text-active': 'var(--ubits-sidebar-button-fg-active)',
        'ubits-sidebar-text-disabled': 'var(--ubits-sidebar-button-fg-disabled)',
      },
      
      // Extender fuentes con UBITS
      fontFamily: {
        'ubits': ['Noto Sans', 'system-ui', 'sans-serif'],
      },
      
      // Extender tamaños con UBITS
      fontSize: {
        'ubits-xs': ['0.75rem', { lineHeight: '1rem' }],
        'ubits-sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'ubits-base': ['1rem', { lineHeight: '1.5rem' }],
        'ubits-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'ubits-xl': ['1.25rem', { lineHeight: '1.75rem' }],
        'ubits-2xl': ['1.5rem', { lineHeight: '2rem' }],
        'ubits-3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        'ubits-4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      
      // Extender espaciado con UBITS
      spacing: {
        'ubits-xs': '0.25rem',
        'ubits-sm': '0.5rem',
        'ubits-md': '1rem',
        'ubits-lg': '1.5rem',
        'ubits-xl': '2rem',
        'ubits-2xl': '3rem',
        'ubits-3xl': '4rem',
      },
      
      // Extender border radius con UBITS
      borderRadius: {
        'ubits-sm': '0.375rem',
        'ubits-md': '0.5rem',
        'ubits-lg': '0.75rem',
        'ubits-xl': '1rem',
      },
      
      // Extender box shadow con UBITS
      boxShadow: {
        'ubits-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'ubits-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'ubits-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'ubits-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'ubits-focus': '0 0 0 3px var(--ubits-button-focus-ring)',
        'ubits-focus-error': '0 0 0 3px var(--ubits-feedback-accent-error)',
      },
      
      // Extender transiciones con UBITS
      transitionDuration: {
        'ubits-fast': '150ms',
        'ubits-normal': '200ms',
        'ubits-slow': '300ms',
      },
      
      // Extender z-index con UBITS
      zIndex: {
        'ubits-dropdown': '1000',
        'ubits-sticky': '1020',
        'ubits-fixed': '1030',
        'ubits-modal-backdrop': '1040',
        'ubits-modal': '1050',
        'ubits-popover': '1060',
        'ubits-tooltip': '1070',
        'ubits-toast': '1080',
      },
    },
  },
  plugins: [
    // Plugin personalizado para UBITS
    function({ addUtilities, addComponents, theme }) {
      // Utilidades UBITS
      addUtilities({
        '.ubits-text-primary': {
          color: 'var(--ubits-fg-1-high)',
        },
        '.ubits-text-secondary': {
          color: 'var(--ubits-fg-1-medium)',
        },
        '.ubits-text-disabled': {
          color: 'var(--ubits-fg-disabled)',
        },
        '.ubits-bg-primary': {
          backgroundColor: 'var(--ubits-bg-1)',
        },
        '.ubits-bg-secondary': {
          backgroundColor: 'var(--ubits-bg-2)',
        },
        '.ubits-bg-tertiary': {
          backgroundColor: 'var(--ubits-bg-3)',
        },
        '.ubits-border-primary': {
          borderColor: 'var(--ubits-border-1)',
        },
        '.ubits-border-secondary': {
          borderColor: 'var(--ubits-border-2)',
        },
        '.ubits-focus': {
          outline: '2px solid var(--ubits-button-focus-ring)',
          outlineOffset: '2px',
        },
        '.ubits-focus-error': {
          outline: '2px solid var(--ubits-feedback-accent-error)',
          outlineOffset: '2px',
        },
      });

      // Componentes UBITS
      addComponents({
        '.ubits-button': {
          '@apply inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer': {},
          backgroundColor: 'var(--ubits-button-primary-bg-default)',
          color: 'var(--ubits-btn-primary-fg)',
          border: '1px solid var(--ubits-button-primary-bg-default)',
          '&:hover:not(:disabled)': {
            backgroundColor: 'var(--ubits-button-primary-hover)',
            borderColor: 'var(--ubits-button-primary-hover)',
          },
          '&:active:not(:disabled)': {
            backgroundColor: 'var(--ubits-button-primary-pressed)',
            borderColor: 'var(--ubits-button-primary-pressed)',
          },
          '&:focus': {
            outline: '2px solid var(--ubits-button-focus-ring)',
            outlineOffset: '2px',
          },
          '&:disabled': {
            backgroundColor: 'var(--ubits-bg-disabled-button)',
            color: 'var(--ubits-fg-on-disabled-button)',
            borderColor: 'var(--ubits-border-disabled-button)',
            cursor: 'not-allowed',
          },
        },
        '.ubits-input': {
          '@apply w-full rounded-lg border transition-all duration-200': {},
          backgroundColor: 'var(--ubits-bg-1)',
          color: 'var(--ubits-fg-1-high)',
          borderColor: 'var(--ubits-border-1)',
          '&:focus': {
            borderColor: 'var(--ubits-accent-brand)',
            outline: '2px solid var(--ubits-button-focus-ring)',
            outlineOffset: '0',
          },
          '&:disabled': {
            backgroundColor: 'var(--ubits-bg-disabled)',
            color: 'var(--ubits-fg-disabled)',
            borderColor: 'var(--ubits-border-disabled)',
            cursor: 'not-allowed',
          },
        },
        '.ubits-card': {
          '@apply rounded-lg border p-4': {},
          backgroundColor: 'var(--ubits-bg-1)',
          borderColor: 'var(--ubits-border-1)',
          color: 'var(--ubits-fg-1-high)',
        },
        '.ubits-alert': {
          '@apply rounded-lg border p-4': {},
          borderColor: 'var(--ubits-feedback-border-info)',
          backgroundColor: 'var(--ubits-feedback-bg-info-subtle)',
          color: 'var(--ubits-feedback-fg-info-subtle)',
        },
        '.ubits-alert-success': {
          borderColor: 'var(--ubits-feedback-border-success)',
          backgroundColor: 'var(--ubits-feedback-bg-success-subtle)',
          color: 'var(--ubits-feedback-fg-success-subtle)',
        },
        '.ubits-alert-warning': {
          borderColor: 'var(--ubits-feedback-border-warning)',
          backgroundColor: 'var(--ubits-feedback-bg-warning-subtle)',
          color: 'var(--ubits-feedback-fg-warning-subtle)',
        },
        '.ubits-alert-error': {
          borderColor: 'var(--ubits-feedback-border-error)',
          backgroundColor: 'var(--ubits-feedback-bg-error-subtle)',
          color: 'var(--ubits-feedback-fg-error-subtle)',
        },
        '.ubits-sidebar': {
          '@apply fixed left-0 top-0 h-full w-64': {},
          backgroundColor: 'var(--ubits-sidebar-bg)',
          color: 'var(--ubits-sidebar-button-fg-default)',
        },
        '.ubits-main': {
          '@apply ml-64': {},
          backgroundColor: 'var(--ubits-bg-1)',
          color: 'var(--ubits-fg-1-high)',
        },
      });
    },
  ],
  // Configuración para modo oscuro
  darkMode: 'class', // Usar clase para modo oscuro
}