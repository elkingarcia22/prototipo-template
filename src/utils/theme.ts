/**
 * UBITS Theme System - Prototipo Template
 * Sistema de temas automático con tokens UBITS
 * Compatible con Vite + Tailwind + Alpine.js
 */

export interface ThemeConfig {
  current: 'light' | 'dark';
  auto: boolean;
  storageKey: string;
  classAttribute: string;
}

export class UBITSTheme {
  private config: ThemeConfig;
  private mediaQuery: MediaQueryList;
  private storage: Storage;

  constructor(config: Partial<ThemeConfig> = {}) {
    this.config = {
      current: 'light',
      auto: true,
      storageKey: 'ubits-theme',
      classAttribute: 'data-theme',
      ...config
    };

    this.storage = typeof window !== 'undefined' ? localStorage : {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {}
    };

    this.mediaQuery = typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : { matches: false, addEventListener: () => {}, removeEventListener: () => {} };

    this.init();
  }

  /**
   * Inicializar el sistema de temas
   */
  private init(): void {
    if (typeof window === 'undefined') return;

    // Cargar tema guardado
    this.loadSavedTheme();

    // Configurar listener para cambios de preferencia del sistema
    if (this.config.auto) {
      this.mediaQuery.addEventListener('change', this.handleSystemThemeChange.bind(this));
    }

    // Aplicar tema inicial
    this.applyTheme(this.config.current);
  }

  /**
   * Cargar tema guardado desde localStorage
   */
  private loadSavedTheme(): void {
    const savedTheme = this.storage.getItem(this.config.storageKey);
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      this.config.current = savedTheme;
    } else if (this.config.auto) {
      // Usar preferencia del sistema
      this.config.current = this.mediaQuery.matches ? 'dark' : 'light';
    }
  }

  /**
   * Manejar cambios en la preferencia del sistema
   */
  private handleSystemThemeChange(event: MediaQueryListEvent): void {
    if (this.config.auto) {
      const newTheme = event.matches ? 'dark' : 'light';
      this.setTheme(newTheme, false); // false = no guardar en localStorage
    }
  }

  /**
   * Aplicar tema al documento
   */
  private applyTheme(theme: 'light' | 'dark'): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    
    // Remover clases anteriores
    root.classList.remove('light', 'dark');
    
    // Agregar nueva clase
    root.classList.add(theme);
    
    // Establecer atributo data-theme
    root.setAttribute(this.config.classAttribute, theme);
    
    // Emitir evento personalizado
    this.dispatchThemeChange(theme);
  }

  /**
   * Emitir evento de cambio de tema
   */
  private dispatchThemeChange(theme: 'light' | 'dark'): void {
    if (typeof window === 'undefined') return;

    const event = new CustomEvent('ubits-theme-change', {
      detail: { theme, timestamp: Date.now() }
    });
    
    window.dispatchEvent(event);
  }

  /**
   * Establecer tema
   */
  public setTheme(theme: 'light' | 'dark', save: boolean = true): void {
    this.config.current = theme;
    
    // Aplicar tema
    this.applyTheme(theme);
    
    // Guardar en localStorage si se solicita
    if (save) {
      this.storage.setItem(this.config.storageKey, theme);
    }
  }

  /**
   * Alternar entre tema claro y oscuro
   */
  public toggleTheme(): void {
    const newTheme = this.config.current === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Obtener tema actual
   */
  public getCurrentTheme(): 'light' | 'dark' {
    return this.config.current;
  }

  /**
   * Verificar si el tema es oscuro
   */
  public isDark(): boolean {
    return this.config.current === 'dark';
  }

  /**
   * Verificar si el tema es claro
   */
  public isLight(): boolean {
    return this.config.current === 'light';
  }

  /**
   * Habilitar/deshabilitar modo automático
   */
  public setAutoMode(enabled: boolean): void {
    this.config.auto = enabled;
    
    if (enabled) {
      this.mediaQuery.addEventListener('change', this.handleSystemThemeChange.bind(this));
    } else {
      this.mediaQuery.removeEventListener('change', this.handleSystemThemeChange.bind(this));
    }
  }

  /**
   * Obtener configuración actual
   */
  public getConfig(): ThemeConfig {
    return { ...this.config };
  }

  /**
   * Resetear a tema por defecto
   */
  public reset(): void {
    this.storage.removeItem(this.config.storageKey);
    this.config.current = 'light';
    this.applyTheme('light');
  }

  /**
   * Destruir instancia y limpiar listeners
   */
  public destroy(): void {
    if (typeof window !== 'undefined') {
      this.mediaQuery.removeEventListener('change', this.handleSystemThemeChange.bind(this));
    }
  }
}

/**
 * Instancia global del sistema de temas
 */
export const ubitsTheme = new UBITSTheme();

/**
 * Hook para Alpine.js
 */
export function useUBITSTheme() {
  return {
    theme: ubitsTheme,
    
    // Métodos para usar en Alpine.js
    toggleTheme: () => ubitsTheme.toggleTheme(),
    setTheme: (theme: 'light' | 'dark') => ubitsTheme.setTheme(theme),
    isDark: () => ubitsTheme.isDark(),
    isLight: () => ubitsTheme.isLight(),
    
    // Estado reactivo
    get currentTheme() {
      return ubitsTheme.getCurrentTheme();
    },
    
    get isDarkMode() {
      return ubitsTheme.isDark();
    },
    
    get isLightMode() {
      return ubitsTheme.isLight();
    }
  };
}

/**
 * Utilidades para componentes
 */
export const themeUtils = {
  /**
   * Obtener token de color UBITS
   */
  getToken: (token: string): string => {
    if (typeof window === 'undefined') return '';
    
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    return computedStyle.getPropertyValue(`--ubits-${token}`).trim();
  },

  /**
   * Establecer token de color UBITS
   */
  setToken: (token: string, value: string): void => {
    if (typeof document === 'undefined') return;
    
    const root = document.documentElement;
    root.style.setProperty(`--ubits-${token}`, value);
  },

  /**
   * Obtener color de fondo actual
   */
  getBackgroundColor: (level: 1 | 2 | 3 | 4 | 5 = 1): string => {
    return themeUtils.getToken(`bg-${level}`);
  },

  /**
   * Obtener color de texto actual
   */
  getTextColor: (level: 'high' | 'medium' | 'low' = 'high'): string => {
    return themeUtils.getToken(`fg-1-${level}`);
  },

  /**
   * Obtener color de borde actual
   */
  getBorderColor: (level: 1 | 2 = 1): string => {
    return themeUtils.getToken(`border-${level}`);
  },

  /**
   * Obtener color de marca actual
   */
  getBrandColor: (): string => {
    return themeUtils.getToken('accent-brand');
  },

  /**
   * Obtener color de feedback
   */
  getFeedbackColor: (type: 'success' | 'info' | 'warning' | 'error'): string => {
    return themeUtils.getToken(`feedback-accent-${type}`);
  }
};

/**
 * Decorador para componentes que usan temas
 */
export function withTheme<T extends Record<string, any>>(component: T): T & { theme: typeof ubitsTheme } {
  return {
    ...component,
    theme: ubitsTheme
  };
}

/**
 * Plugin para Vite
 */
export function ubitsThemePlugin() {
  return {
    name: 'ubits-theme',
    configureServer(server: any) {
      // Configurar servidor de desarrollo para temas
      server.middlewares.use('/api/theme', (req: any, res: any, next: any) => {
        if (req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            current: ubitsTheme.getCurrentTheme(),
            config: ubitsTheme.getConfig()
          }));
        } else if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => body += chunk);
          req.on('end', () => {
            try {
              const { theme } = JSON.parse(body);
              if (theme === 'light' || theme === 'dark') {
                ubitsTheme.setTheme(theme);
                res.end(JSON.stringify({ success: true }));
              } else {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid theme' }));
              }
            } catch (error) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

export default ubitsTheme;

