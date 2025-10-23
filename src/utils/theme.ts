/**
 * UBITS Theme System - Sistema de Tema Global
 * Sistema de modo oscuro/claro adaptado del playground UBITS
 */

export type Theme = 'light' | 'dark';

export interface ThemeState {
  currentTheme: Theme;
  isDark: boolean;
  isLight: boolean;
}

export interface ThemeConfig {
  onThemeChange?: (theme: Theme) => void;
  onThemeToggle?: (newTheme: Theme) => void;
  persistTheme?: boolean;
  storageKey?: string;
}

/**
 * Clase principal del sistema de tema UBITS
 */
export class UBITSThemeSystem {
  private state: ThemeState;
  private config: ThemeConfig;
  private listeners: Array<() => void> = [];

  constructor(config: ThemeConfig = {}) {
    this.config = {
      persistTheme: true,
      storageKey: 'ubits-theme',
      ...config,
    };

    this.state = this.getInitialState();
    this.setupEventListeners();
  }

  /**
   * Obtener estado inicial del tema
   */
  private getInitialState(): ThemeState {
    const savedTheme = this.getStoredTheme();
    const systemTheme = this.getSystemTheme();
    const currentTheme = savedTheme || systemTheme;
    
    return {
      currentTheme,
      isDark: currentTheme === 'dark',
      isLight: currentTheme === 'light',
    };
  }

  /**
   * Obtener tema guardado en localStorage
   */
  private getStoredTheme(): Theme | null {
    if (!this.config.persistTheme) return null;
    
    try {
      const stored = localStorage.getItem(this.config.storageKey!);
      return stored === 'light' || stored === 'dark' ? stored : null;
    } catch (error) {
      console.warn('Error reading theme from localStorage:', error);
      return null;
    }
  }

  /**
   * Obtener tema del sistema
   */
  private getSystemTheme(): Theme {
    if (typeof window === 'undefined') return 'light';
    
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (error) {
      console.warn('Error detecting system theme:', error);
      return 'light';
    }
  }

  /**
   * Configurar event listeners
   */
  private setupEventListeners(): void {
    if (typeof window === 'undefined') return;

    // Escuchar cambios en la preferencia del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Solo cambiar si no hay tema guardado
      if (!this.getStoredTheme()) {
        const newTheme = e.matches ? 'dark' : 'light';
        this.setTheme(newTheme, false); // No guardar automáticamente
      }
    };

    // Agregar listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else {
      // Fallback para navegadores antiguos
      mediaQuery.addListener(handleSystemThemeChange);
    }

    // Cleanup function
    this.listeners.push(() => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      } else {
        mediaQuery.removeListener(handleSystemThemeChange);
      }
    });
  }

  /**
   * Aplicar tema al DOM
   */
  private applyTheme(theme: Theme): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    
    // Remover clases anteriores
    root.classList.remove('light', 'dark');
    
    // Agregar nueva clase
    root.classList.add(theme);
    
    // Establecer atributo data-theme
    root.setAttribute('data-theme', theme);
    
    // Establecer atributo en body también
    document.body.setAttribute('data-theme', theme);
  }

  /**
   * Guardar tema en localStorage
   */
  private saveTheme(theme: Theme): void {
    if (!this.config.persistTheme) return;
    
    try {
      localStorage.setItem(this.config.storageKey!, theme);
    } catch (error) {
      console.warn('Error saving theme to localStorage:', error);
    }
  }

  /**
   * Obtener estado actual del tema
   */
  public getState(): ThemeState {
    return { ...this.state };
  }

  /**
   * Obtener tema actual
   */
  public getCurrentTheme(): Theme {
    return this.state.currentTheme;
  }

  /**
   * Verificar si está en modo oscuro
   */
  public isDarkMode(): boolean {
    return this.state.isDark;
  }

  /**
   * Verificar si está en modo claro
   */
  public isLightMode(): boolean {
    return this.state.isLight;
  }

  /**
   * Establecer tema específico
   */
  public setTheme(theme: Theme, save: boolean = true): void {
    const previousTheme = this.state.currentTheme;
    
    // Actualizar estado
    this.state = {
      currentTheme: theme,
      isDark: theme === 'dark',
      isLight: theme === 'light',
    };
    
    // Aplicar tema al DOM
    this.applyTheme(theme);
    
    // Guardar si se solicita
    if (save) {
      this.saveTheme(theme);
    }
    
    // Notificar cambios
    if (previousTheme !== theme) {
      this.config.onThemeChange?.(theme);
    }
  }

  /**
   * Alternar entre tema claro y oscuro
   */
  public toggleTheme(): void {
    const newTheme: Theme = this.state.isDark ? 'light' : 'dark';
    this.setTheme(newTheme);
    this.config.onThemeToggle?.(newTheme);
  }

  /**
   * Resetear tema al del sistema
   */
  public resetToSystemTheme(): void {
    const systemTheme = this.getSystemTheme();
    this.setTheme(systemTheme);
  }

  /**
   * Limpiar preferencia guardada
   */
  public clearStoredTheme(): void {
    if (!this.config.persistTheme) return;
    
    try {
      localStorage.removeItem(this.config.storageKey!);
    } catch (error) {
      console.warn('Error clearing theme from localStorage:', error);
    }
  }

  /**
   * Limpiar recursos
   */
  public destroy(): void {
    this.listeners.forEach(cleanup => cleanup());
    this.listeners = [];
  }
}

/**
 * Hook de Vue.js para usar el sistema de tema
 */
export function useTheme(config?: ThemeConfig) {
  const { ref, onMounted, onUnmounted } = require('vue');
  
  const themeSystem = new UBITSThemeSystem(config);
  const state = ref<ThemeState>(themeSystem.getState());

  // Actualizar estado reactivo
  const updateState = () => {
    state.value = themeSystem.getState();
  };

  onMounted(() => {
    themeSystem.config.onThemeChange = updateState;
  });

  onUnmounted(() => {
    themeSystem.destroy();
  });

  return {
    state: state.value,
    currentTheme: themeSystem.getCurrentTheme(),
    isDark: themeSystem.isDarkMode(),
    isLight: themeSystem.isLightMode(),
    setTheme: themeSystem.setTheme.bind(themeSystem),
    toggleTheme: themeSystem.toggleTheme.bind(themeSystem),
    resetToSystemTheme: themeSystem.resetToSystemTheme.bind(themeSystem),
    clearStoredTheme: themeSystem.clearStoredTheme.bind(themeSystem),
  };
}

/**
 * Utilidades de tema estáticas
 */
export const ThemeUtils = {
  /**
   * Obtener tema actual sin instancia
   */
  getCurrentTheme(): Theme {
    if (typeof document === 'undefined') return 'light';
    
    const root = document.documentElement;
    const dataTheme = root.getAttribute('data-theme');
    
    if (dataTheme === 'light' || dataTheme === 'dark') {
      return dataTheme;
    }
    
    // Fallback a preferencia del sistema
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    return 'light';
  },

  /**
   * Verificar si está en modo oscuro
   */
  isDarkMode(): boolean {
    return this.getCurrentTheme() === 'dark';
  },

  /**
   * Verificar si está en modo claro
   */
  isLightMode(): boolean {
    return this.getCurrentTheme() === 'light';
  },

  /**
   * Aplicar tema directamente
   */
  applyTheme(theme: Theme): void {
    if (typeof document === 'undefined') return;
    
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
  },

  /**
   * Alternar tema directamente
   */
  toggleTheme(): void {
    const currentTheme = this.getCurrentTheme();
    const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
  },
};

// Exportar por defecto
export default UBITSThemeSystem;