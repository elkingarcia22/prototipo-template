/**
 * UBITS Theme System - Sistema de Tema Global
 * Sistema de modo oscuro/claro adaptado del playground UBITS
 */

import { ref, computed, onMounted, onUnmounted } from 'vue';

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
      ...config
    };

    // Inicializar estado
    this.state = {
      currentTheme: this.getInitialTheme(),
      isDark: false,
      isLight: true,
    };

    // Aplicar tema inicial
    this.applyTheme(this.state.currentTheme);
  }

  /**
   * Obtener tema inicial
   */
  private getInitialTheme(): Theme {
    // Verificar si hay tema guardado
    if (this.config.persistTheme && typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem(this.config.storageKey!);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    }

    // Verificar preferencia del sistema
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Por defecto, tema claro
    return 'light';
  }

  /**
   * Aplicar tema al DOM
   */
  private applyTheme(theme: Theme): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    const body = document.body;

    // Remover clases anteriores
    root.classList.remove('light', 'dark');
    body.classList.remove('light', 'dark');

    // Agregar nueva clase
    root.classList.add(theme);
    body.classList.add(theme);

    // Establecer atributos
    root.setAttribute('data-theme', theme);
    body.setAttribute('data-theme', theme);

    // Actualizar estado
    this.state = {
      currentTheme: theme,
      isDark: theme === 'dark',
      isLight: theme === 'light',
    };

    // Notificar listeners
    this.notifyListeners();
  }

  /**
   * Guardar tema
   */
  private saveTheme(theme: Theme): void {
    if (this.config.persistTheme && typeof localStorage !== 'undefined') {
      localStorage.setItem(this.config.storageKey!, theme);
    }
  }

  /**
   * Notificar listeners
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }

  /**
   * Obtener estado actual
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
  public isDark(): boolean {
    return this.state.isDark;
  }

  /**
   * Verificar si está en modo claro
   */
  public isLight(): boolean {
    return this.state.isLight;
  }

  /**
   * Establecer tema específico
   */
  public setTheme(theme: Theme, save: boolean = true): void {
    const previousTheme = this.state.currentTheme;
    
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
   * Limpiar tema guardado
   */
  public clearStoredTheme(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.config.storageKey!);
    }
  }

  /**
   * Agregar listener
   */
  public addListener(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }
}

/**
 * Hook para usar en componentes Vue
 */
export function useTheme(config?: ThemeConfig) {
  const themeSystem = new UBITSThemeSystem(config);
  const state = ref<ThemeState>(themeSystem.getState());

  // Actualizar estado cuando cambie
  const removeListener = themeSystem.addListener(() => {
    state.value = themeSystem.getState();
  });

  // Cleanup
  onUnmounted(() => {
    removeListener();
  });

  return {
    currentTheme: computed(() => state.value.currentTheme),
    isDark: computed(() => state.value.isDark),
    isLight: computed(() => state.value.isLight),
    setTheme: themeSystem.setTheme.bind(themeSystem),
    toggleTheme: themeSystem.toggleTheme.bind(themeSystem),
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
    const body = document.body;
    
    root.classList.remove('light', 'dark');
    body.classList.remove('light', 'dark');
    root.classList.add(theme);
    body.classList.add(theme);
    root.setAttribute('data-theme', theme);
    body.setAttribute('data-theme', theme);
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