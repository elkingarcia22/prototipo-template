/**
 * UBITS Responsive System - Utilidades Modernas
 * Sistema responsive adaptado del playground UBITS con tecnologías de punta
 */

import { ref, onMounted, onUnmounted } from 'vue';

// Breakpoints UBITS oficiales
export const UBITS_BREAKPOINTS = {
  xs: 480,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1536,
  '2xl': 1920,
} as const;

// Tipos TypeScript
export type BreakpointKey = keyof typeof UBITS_BREAKPOINTS;
export type BreakpointValue = typeof UBITS_BREAKPOINTS[BreakpointKey];

export interface ResponsiveState {
  currentBreakpoint: BreakpointKey;
  windowWidth: number;
  windowHeight: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  orientation: 'portrait' | 'landscape';
}

export interface ResponsiveConfig {
  onBreakpointChange?: (breakpoint: BreakpointKey) => void;
  onOrientationChange?: (orientation: 'portrait' | 'landscape') => void;
  onResize?: (state: ResponsiveState) => void;
  debounceMs?: number;
}

/**
 * Clase principal del sistema responsive UBITS
 */
export class UBITSResponsiveSystem {
  private state: ResponsiveState;
  private config: ResponsiveConfig;
  private listeners: Array<() => void> = [];
  private debounceTimer: NodeJS.Timeout | null = null;

  constructor(config: ResponsiveConfig = {}) {
    this.config = {
      debounceMs: 100,
      ...config,
    };

    this.state = this.getInitialState();
    this.setupEventListeners();
  }

  /**
   * Obtener estado inicial
   */
  private getInitialState(): ResponsiveState {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    return {
      currentBreakpoint: this.getCurrentBreakpoint(windowWidth),
      windowWidth,
      windowHeight,
      isMobile: windowWidth <= UBITS_BREAKPOINTS.sm,
      isTablet: windowWidth > UBITS_BREAKPOINTS.sm && windowWidth <= UBITS_BREAKPOINTS.lg,
      isDesktop: windowWidth > UBITS_BREAKPOINTS.lg,
      orientation: windowHeight > windowWidth ? 'portrait' : 'landscape',
    };
  }

  /**
   * Determinar breakpoint actual basado en el ancho
   */
  private getCurrentBreakpoint(width: number): BreakpointKey {
    if (width <= UBITS_BREAKPOINTS.xs) return 'xs';
    if (width <= UBITS_BREAKPOINTS.sm) return 'sm';
    if (width <= UBITS_BREAKPOINTS.md) return 'md';
    if (width <= UBITS_BREAKPOINTS.lg) return 'lg';
    if (width <= UBITS_BREAKPOINTS.xl) return 'xl';
    return '2xl';
  }

  /**
   * Configurar event listeners
   */
  private setupEventListeners(): void {
    const handleResize = () => {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }

      this.debounceTimer = setTimeout(() => {
        this.updateState();
      }, this.config.debounceMs);
    };

    const handleOrientationChange = () => {
      setTimeout(() => {
        this.updateState();
      }, 100); // Delay para que el navegador actualice las dimensiones
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    this.listeners.push(() => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    });
  }

  /**
   * Actualizar estado responsive
   */
  private updateState(): void {
    const newState = this.getInitialState();
    const previousState = { ...this.state };
    
    this.state = newState;

    // Notificar cambios
    if (previousState.currentBreakpoint !== newState.currentBreakpoint) {
      this.config.onBreakpointChange?.(newState.currentBreakpoint);
    }

    if (previousState.orientation !== newState.orientation) {
      this.config.onOrientationChange?.(newState.orientation);
    }

    this.config.onResize?.(newState);
  }

  /**
   * Obtener estado actual
   */
  public getState(): ResponsiveState {
    return { ...this.state };
  }

  /**
   * Verificar si el breakpoint actual es mayor o igual al especificado
   */
  public isBreakpointUp(breakpoint: BreakpointKey): boolean {
    return UBITS_BREAKPOINTS[this.state.currentBreakpoint] >= UBITS_BREAKPOINTS[breakpoint];
  }

  /**
   * Verificar si el breakpoint actual es menor al especificado
   */
  public isBreakpointDown(breakpoint: BreakpointKey): boolean {
    return UBITS_BREAKPOINTS[this.state.currentBreakpoint] < UBITS_BREAKPOINTS[breakpoint];
  }

  /**
   * Verificar si el breakpoint actual está entre dos breakpoints
   */
  public isBreakpointBetween(min: BreakpointKey, max: BreakpointKey): boolean {
    const current = UBITS_BREAKPOINTS[this.state.currentBreakpoint];
    return current >= UBITS_BREAKPOINTS[min] && current < UBITS_BREAKPOINTS[max];
  }

  /**
   * Obtener valor responsive basado en breakpoint
   */
  public getResponsiveValue<T>(values: Partial<Record<BreakpointKey, T>>, defaultValue: T): T {
    const currentBreakpoint = this.state.currentBreakpoint;
    
    // Buscar valor para el breakpoint actual
    if (values[currentBreakpoint] !== undefined) {
      return values[currentBreakpoint]!;
    }

    // Buscar el valor más cercano hacia abajo
    const breakpoints: BreakpointKey[] = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
    const currentIndex = breakpoints.indexOf(currentBreakpoint);
    
    for (let i = currentIndex + 1; i < breakpoints.length; i++) {
      const breakpoint = breakpoints[i];
      if (values[breakpoint] !== undefined) {
        return values[breakpoint]!;
      }
    }

    return defaultValue;
  }

  /**
   * Obtener clases CSS responsive
   */
  public getResponsiveClasses(baseClass: string, responsiveClasses: Partial<Record<BreakpointKey, string>>): string {
    const classes = [baseClass];
    
    Object.entries(responsiveClasses).forEach(([breakpoint, className]) => {
      if (className && this.isBreakpointUp(breakpoint as BreakpointKey)) {
        classes.push(className);
      }
    });

    return classes.join(' ');
  }

  /**
   * Obtener estilos CSS responsive
   */
  public getResponsiveStyles(styles: Partial<Record<BreakpointKey, Record<string, string>>>): Record<string, string> {
    const currentBreakpoint = this.state.currentBreakpoint;
    
    if (styles[currentBreakpoint]) {
      return styles[currentBreakpoint]!;
    }

    // Buscar el valor más cercano hacia abajo
    const breakpoints: BreakpointKey[] = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
    const currentIndex = breakpoints.indexOf(currentBreakpoint);
    
    for (let i = currentIndex + 1; i < breakpoints.length; i++) {
      const breakpoint = breakpoints[i];
      if (styles[breakpoint]) {
        return styles[breakpoint]!;
      }
    }

    return {};
  }

  /**
   * Limpiar recursos
   */
  public destroy(): void {
    this.listeners.forEach(cleanup => cleanup());
    this.listeners = [];
    
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }
}

/**
 * Hook de Vue.js para usar el sistema responsive
 */
export function useResponsive(config?: ResponsiveConfig) {
  
  const responsiveSystem = new UBITSResponsiveSystem(config);
  const state = ref<ResponsiveState>(responsiveSystem.getState());

  // Actualizar estado reactivo
  const updateState = () => {
    state.value = responsiveSystem.getState();
  };

  onMounted(() => {
    responsiveSystem.config.onResize = updateState;
  });

  onUnmounted(() => {
    responsiveSystem.destroy();
  });

  return {
    state: state.value,
    isBreakpointUp: responsiveSystem.isBreakpointUp.bind(responsiveSystem),
    isBreakpointDown: responsiveSystem.isBreakpointDown.bind(responsiveSystem),
    isBreakpointBetween: responsiveSystem.isBreakpointBetween.bind(responsiveSystem),
    getResponsiveValue: responsiveSystem.getResponsiveValue.bind(responsiveSystem),
    getResponsiveClasses: responsiveSystem.getResponsiveClasses.bind(responsiveSystem),
    getResponsiveStyles: responsiveSystem.getResponsiveStyles.bind(responsiveSystem),
  };
}

/**
 * Utilidades de breakpoint estáticas
 */
export const ResponsiveUtils = {
  /**
   * Obtener breakpoint actual sin instancia
   */
  getCurrentBreakpoint(): BreakpointKey {
    const width = window.innerWidth;
    if (width <= UBITS_BREAKPOINTS.xs) return 'xs';
    if (width <= UBITS_BREAKPOINTS.sm) return 'sm';
    if (width <= UBITS_BREAKPOINTS.md) return 'md';
    if (width <= UBITS_BREAKPOINTS.lg) return 'lg';
    if (width <= UBITS_BREAKPOINTS.xl) return 'xl';
    return '2xl';
  },

  /**
   * Verificar si es móvil
   */
  isMobile(): boolean {
    return window.innerWidth <= UBITS_BREAKPOINTS.sm;
  },

  /**
   * Verificar si es tablet
   */
  isTablet(): boolean {
    const width = window.innerWidth;
    return width > UBITS_BREAKPOINTS.sm && width <= UBITS_BREAKPOINTS.lg;
  },

  /**
   * Verificar si es desktop
   */
  isDesktop(): boolean {
    return window.innerWidth > UBITS_BREAKPOINTS.lg;
  },

  /**
   * Obtener orientación
   */
  getOrientation(): 'portrait' | 'landscape' {
    return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
  },
};

// Exportar por defecto
export default UBITSResponsiveSystem;
