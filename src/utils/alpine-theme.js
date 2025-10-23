/**
 * UBITS Alpine.js Theme Integration
 * Integración de temas UBITS con Alpine.js
 * Compatible con Vite + Tailwind + Alpine.js
 */

import { ubitsTheme } from './theme.js';

/**
 * Plugin de Alpine.js para temas UBITS
 */
export function ubitsThemePlugin(Alpine) {
  // Datos globales de Alpine.js
  Alpine.data('ubitsTheme', () => ({
    // Estado del tema
    currentTheme: ubitsTheme.getCurrentTheme(),
    isDark: ubitsTheme.isDark(),
    isLight: ubitsTheme.isLight(),
    
    // Configuración
    autoMode: true,
    storageKey: 'ubits-theme',
    
    // Métodos
    init() {
      // Configurar listeners
      this.setupThemeListeners();
      
      // Aplicar tema inicial
      this.applyTheme(this.currentTheme);
      
      // Configurar modo automático
      if (this.autoMode) {
        this.setupAutoMode();
      }
    },
    
    // Configurar listeners de tema
    setupThemeListeners() {
      // Escuchar cambios de tema
      window.addEventListener('ubits-theme-change', (event) => {
        this.currentTheme = event.detail.theme;
        this.isDark = this.currentTheme === 'dark';
        this.isLight = this.currentTheme === 'light';
      });
      
      // Escuchar cambios de preferencia del sistema
      if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (event) => {
          if (this.autoMode) {
            this.setTheme(event.matches ? 'dark' : 'light', false);
          }
        });
      }
    },
    
    // Configurar modo automático
    setupAutoMode() {
      if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        if (mediaQuery.matches && this.currentTheme === 'light') {
          this.setTheme('dark', false);
        }
      }
    },
    
    // Establecer tema
    setTheme(theme, save = true) {
      ubitsTheme.setTheme(theme, save);
      this.currentTheme = theme;
      this.isDark = theme === 'dark';
      this.isLight = theme === 'light';
    },
    
    // Alternar tema
    toggleTheme() {
      ubitsTheme.toggleTheme();
      this.currentTheme = ubitsTheme.getCurrentTheme();
      this.isDark = this.currentTheme === 'dark';
      this.isLight = this.currentTheme === 'light';
    },
    
    // Aplicar tema al documento
    applyTheme(theme) {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      root.setAttribute('data-theme', theme);
    },
    
    // Habilitar/deshabilitar modo automático
    setAutoMode(enabled) {
      this.autoMode = enabled;
      ubitsTheme.setAutoMode(enabled);
    },
    
    // Obtener token de color
    getToken(token) {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      return computedStyle.getPropertyValue(`--ubits-${token}`).trim();
    },
    
    // Obtener color de fondo
    getBackgroundColor(level = 1) {
      return this.getToken(`bg-${level}`);
    },
    
    // Obtener color de texto
    getTextColor(level = 'high') {
      return this.getToken(`fg-1-${level}`);
    },
    
    // Obtener color de borde
    getBorderColor(level = 1) {
      return this.getToken(`border-${level}`);
    },
    
    // Obtener color de marca
    getBrandColor() {
      return this.getToken('accent-brand');
    },
    
    // Obtener color de feedback
    getFeedbackColor(type) {
      return this.getToken(`feedback-accent-${type}`);
    }
  }));
  
  // Directiva personalizada para temas
  Alpine.directive('ubits-theme', (el, { expression }, { evaluateLater, effect }) => {
    const getTheme = evaluateLater(expression);
    
    effect(() => {
      getTheme((theme) => {
        if (theme === 'dark' || theme === 'light') {
          ubitsTheme.setTheme(theme);
        }
      });
    });
  });
  
  // Directiva para tokens de color
  Alpine.directive('ubits-color', (el, { expression }, { evaluateLater, effect }) => {
    const getColor = evaluateLater(expression);
    
    effect(() => {
      getColor((color) => {
        if (typeof color === 'string') {
          const token = el.getAttribute('data-ubits-token');
          if (token) {
            el.style.setProperty(`--ubits-${token}`, color);
          }
        }
      });
    });
  });
  
  // Directiva para modo automático
  Alpine.directive('ubits-auto', (el, { expression }, { evaluateLater, effect }) => {
    const getAuto = evaluateLater(expression);
    
    effect(() => {
      getAuto((auto) => {
        ubitsTheme.setAutoMode(!!auto);
      });
    });
  });
  
  // Método global para cambiar tema
  Alpine.store('ubitsTheme', {
    current: ubitsTheme.getCurrentTheme(),
    isDark: ubitsTheme.isDark(),
    isLight: ubitsTheme.isLight(),
    
    setTheme(theme) {
      ubitsTheme.setTheme(theme);
      this.current = theme;
      this.isDark = theme === 'dark';
      this.isLight = theme === 'light';
    },
    
    toggleTheme() {
      ubitsTheme.toggleTheme();
      this.current = ubitsTheme.getCurrentTheme();
      this.isDark = this.current === 'dark';
      this.isLight = this.current === 'light';
    }
  });
}

/**
 * Hook para usar en componentes
 */
export function useUBITSTheme() {
  return {
    // Estado
    currentTheme: ubitsTheme.getCurrentTheme(),
    isDark: ubitsTheme.isDark(),
    isLight: ubitsTheme.isLight(),
    
    // Métodos
    setTheme: (theme) => ubitsTheme.setTheme(theme),
    toggleTheme: () => ubitsTheme.toggleTheme(),
    
    // Utilidades
    getToken: (token) => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      return computedStyle.getPropertyValue(`--ubits-${token}`).trim();
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
  };
}

/**
 * Componente de botón de cambio de tema
 */
export function ubitsThemeToggle() {
  return {
    init() {
      this.setupThemeToggle();
    },
    
    setupThemeToggle() {
      // Configurar botón de cambio de tema
      this.$el.addEventListener('click', () => {
        ubitsTheme.toggleTheme();
      });
    },
    
    get currentTheme() {
      return ubitsTheme.getCurrentTheme();
    },
    
    get isDark() {
      return ubitsTheme.isDark();
    },
    
    get isLight() {
      return ubitsTheme.isLight();
    },
    
    get icon() {
      return this.isDark ? 'fa-sun' : 'fa-moon';
    },
    
    get label() {
      return this.isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
    }
  };
}

/**
 * Componente de selector de tema
 */
export function ubitsThemeSelector() {
  return {
    init() {
      this.setupThemeSelector();
    },
    
    setupThemeSelector() {
      // Configurar selector de tema
      this.$el.addEventListener('change', (event) => {
        const theme = event.target.value;
        if (theme === 'light' || theme === 'dark') {
          ubitsTheme.setTheme(theme);
        }
      });
    },
    
    get currentTheme() {
      return ubitsTheme.getCurrentTheme();
    },
    
    get isDark() {
      return ubitsTheme.isDark();
    },
    
    get isLight() {
      return ubitsTheme.isLight();
    },
    
    get options() {
      return [
        { value: 'light', label: 'Modo claro', icon: 'fa-sun' },
        { value: 'dark', label: 'Modo oscuro', icon: 'fa-moon' }
      ];
    }
  };
}

/**
 * Componente de indicador de tema
 */
export function ubitsThemeIndicator() {
  return {
    get currentTheme() {
      return ubitsTheme.getCurrentTheme();
    },
    
    get isDark() {
      return ubitsTheme.isDark();
    },
    
    get isLight() {
      return ubitsTheme.isLight();
    },
    
    get icon() {
      return this.isDark ? 'fa-moon' : 'fa-sun';
    },
    
    get label() {
      return this.isDark ? 'Modo oscuro' : 'Modo claro';
    },
    
    get color() {
      return this.isDark ? '#ffffff' : '#000000';
    }
  };
}

/**
 * Utilidades para temas
 */
export const themeUtils = {
  // Aplicar tema al documento
  applyTheme(theme) {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
  },
  
  // Obtener tema actual
  getCurrentTheme() {
    return ubitsTheme.getCurrentTheme();
  },
  
  // Verificar si es modo oscuro
  isDark() {
    return ubitsTheme.isDark();
  },
  
  // Verificar si es modo claro
  isLight() {
    return ubitsTheme.isLight();
  },
  
  // Obtener token de color
  getToken(token) {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    return computedStyle.getPropertyValue(`--ubits-${token}`).trim();
  },
  
  // Establecer token de color
  setToken(token, value) {
    const root = document.documentElement;
    root.style.setProperty(`--ubits-${token}`, value);
  },
  
  // Obtener color de fondo
  getBackgroundColor(level = 1) {
    return themeUtils.getToken(`bg-${level}`);
  },
  
  // Obtener color de texto
  getTextColor(level = 'high') {
    return themeUtils.getToken(`fg-1-${level}`);
  },
  
  // Obtener color de borde
  getBorderColor(level = 1) {
    return themeUtils.getToken(`border-${level}`);
  },
  
  // Obtener color de marca
  getBrandColor() {
    return themeUtils.getToken('accent-brand');
  },
  
  // Obtener color de feedback
  getFeedbackColor(type) {
    return themeUtils.getToken(`feedback-accent-${type}`);
  }
};

export default ubitsThemePlugin;
