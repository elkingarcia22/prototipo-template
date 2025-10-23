/**
 * UBITS Prototipo Template - Main Entry Point
 * Punto de entrada principal del template robusto
 * Integración completa: Vite + Tailwind + Alpine.js + UBITS Tokens
 */

import { createApp } from 'vue';
import Alpine from 'alpinejs';
import { ubitsThemePlugin } from './utils/alpine-theme.js';
import { ubitsTheme } from './utils/theme.js';

// Importar estilos UBITS
import './styles/ubits-tokens.css';
import './styles/globals.css';

// Importar componentes UBITS
import UBITSButton from './components/UBITSButton.vue';
import UBITSInput from './components/UBITSInput.vue';

// Importar utilidades
import { useUBITSTheme } from './utils/theme.js';

/**
 * Configuración de Alpine.js
 */
Alpine.plugin(ubitsThemePlugin);

// Inicializar Alpine.js
Alpine.start();

/**
 * Configuración de Vue.js
 */
const app = createApp({
  // Configuración global de Vue
  provide: {
    ubitsTheme,
    useUBITSTheme
  }
});

// Registrar componentes globales
app.component('UBITSButton', UBITSButton);
app.component('UBITSInput', UBITSInput);

// Configurar tema inicial
document.addEventListener('DOMContentLoaded', () => {
  // Aplicar tema guardado o por defecto
  const savedTheme = localStorage.getItem('ubits-theme');
  const initialTheme = savedTheme === 'dark' || savedTheme === 'light' 
    ? savedTheme 
    : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  ubitsTheme.setTheme(initialTheme, false);
  
  // Aplicar tema al documento
  const root = document.documentElement;
  root.classList.add(initialTheme);
  root.setAttribute('data-theme', initialTheme);
  
  // Configurar modo automático
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (event) => {
      if (localStorage.getItem('ubits-theme-auto') !== 'false') {
        ubitsTheme.setTheme(event.matches ? 'dark' : 'light', false);
      }
    });
  }
});

// Montar aplicación Vue
app.mount('#app');

/**
 * Configuración global de UBITS
 */
window.UBITS = {
  // Tema
  theme: ubitsTheme,
  
  // Utilidades
  utils: {
    getToken: (token) => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      return computedStyle.getPropertyValue(`--ubits-${token}`).trim();
    },
    
    setToken: (token, value) => {
      const root = document.documentElement;
      root.style.setProperty(`--ubits-${token}`, value);
    },
    
    getBackgroundColor: (level = 1) => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      return computedStyle.getPropertyValue(`--ubits-bg-${level}`).trim();
    },
    
    getTextColor: (level = 'high') => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      return computedStyle.getPropertyValue(`--ubits-fg-1-${level}`).trim();
    },
    
    getBorderColor: (level = 1) => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      return computedStyle.getPropertyValue(`--ubits-border-${level}`).trim();
    },
    
    getBrandColor: () => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      return computedStyle.getPropertyValue('--ubits-accent-brand').trim();
    },
    
    getFeedbackColor: (type) => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      return computedStyle.getPropertyValue(`--ubits-feedback-accent-${type}`).trim();
    }
  },
  
  // Componentes
  components: {
    Button: UBITSButton,
    Input: UBITSInput
  },
  
  // Configuración
  config: {
    autoTheme: true,
    storageKey: 'ubits-theme',
    classAttribute: 'data-theme'
  }
};

/**
 * Eventos globales de UBITS
 */
window.addEventListener('ubits-theme-change', (event) => {
  console.log('🎨 UBITS Theme changed:', event.detail);
  
  // Emitir evento personalizado para otros sistemas
  window.dispatchEvent(new CustomEvent('theme-change', {
    detail: event.detail
  }));
});

/**
 * Utilidades de desarrollo
 */
if (import.meta.env.DEV) {
  // Exponer UBITS en consola para desarrollo
  window.UBITS_DEV = {
    theme: ubitsTheme,
    utils: window.UBITS.utils,
    components: window.UBITS.components,
    config: window.UBITS.config
  };
  
  console.log('🚀 UBITS Prototipo Template loaded');
  console.log('🎨 Current theme:', ubitsTheme.getCurrentTheme());
  console.log('🔧 UBITS_DEV available in console');
}

export default app;
