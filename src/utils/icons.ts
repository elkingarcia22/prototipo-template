/**
 * UBITS Icons System - Sistema de Iconos con Font Awesome
 * Sistema mejorado de iconos con integración directa de Font Awesome
 */

export type IconStyle = 'fas' | 'far' | 'fal' | 'fab' | 'fad' | 'fat';
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface IconConfig {
  style?: IconStyle;
  size?: IconSize;
  color?: string;
  className?: string;
  onClick?: () => void;
}

export interface IconProps extends IconConfig {
  name: string;
}

/**
 * Clase principal del sistema de iconos UBITS
 */
export class UBITSIconsSystem {
  private static instance: UBITSIconsSystem;
  private iconCache: Map<string, string> = new Map();
  private fontAwesomeLoaded: boolean = false;

  private constructor() {
    this.loadFontAwesome();
  }

  /**
   * Obtener instancia singleton
   */
  public static getInstance(): UBITSIconsSystem {
    if (!UBITSIconsSystem.instance) {
      UBITSIconsSystem.instance = new UBITSIconsSystem();
    }
    return UBITSIconsSystem.instance;
  }

  /**
   * Cargar Font Awesome dinámicamente
   */
  private async loadFontAwesome(): Promise<void> {
    if (this.fontAwesomeLoaded) return;

    try {
      // Verificar si Font Awesome ya está cargado
      if (document.querySelector('link[href*="fontawesome"]')) {
        this.fontAwesomeLoaded = true;
        return;
      }

      // Cargar Font Awesome desde CDN
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      link.crossOrigin = 'anonymous';
      
      document.head.appendChild(link);
      
      // Esperar a que se cargue
      await new Promise((resolve) => {
        link.onload = () => {
          this.fontAwesomeLoaded = true;
          resolve(void 0);
        };
      });
    } catch (error) {
      console.warn('Error loading Font Awesome:', error);
    }
  }

  /**
   * Generar HTML de icono
   */
  public generateIconHTML(config: IconProps): string {
    const {
      name,
      style = 'far',
      size = 'md',
      color,
      className = '',
      onClick
    } = config;

    const sizeClass = this.getSizeClass(size);
    const colorStyle = color ? `color: ${color};` : '';
    const clickHandler = onClick ? `onclick="${onClick.toString()}"` : '';
    
    return `<i class="${style} fa-${name} ${sizeClass} ${className}" style="${colorStyle}" ${clickHandler}></i>`;
  }

  /**
   * Obtener clase de tamaño
   */
  private getSizeClass(size: IconSize): string {
    const sizeMap: Record<IconSize, string> = {
      xs: 'fa-xs',
      sm: 'fa-sm',
      md: 'fa-md',
      lg: 'fa-lg',
      xl: 'fa-xl',
      '2xl': 'fa-2xl'
    };
    
    return sizeMap[size] || 'fa-md';
  }

  /**
   * Verificar si un icono existe
   */
  public async iconExists(name: string, style: IconStyle = 'far'): Promise<boolean> {
    if (this.iconCache.has(`${style}-${name}`)) {
      return this.iconCache.get(`${style}-${name}`) === 'true';
    }

    try {
      // Crear elemento temporal para verificar
      const tempElement = document.createElement('i');
      tempElement.className = `${style} fa-${name}`;
      tempElement.style.visibility = 'hidden';
      tempElement.style.position = 'absolute';
      
      document.body.appendChild(tempElement);
      
      // Verificar si el icono se renderiza
      const computedStyle = window.getComputedStyle(tempElement);
      const fontFamily = computedStyle.fontFamily;
      const exists = fontFamily.includes('Font Awesome');
      
      document.body.removeChild(tempElement);
      
      // Cachear resultado
      this.iconCache.set(`${style}-${name}`, exists.toString());
      
      return exists;
    } catch (error) {
      console.warn(`Error checking icon ${name}:`, error);
      return false;
    }
  }

  /**
   * Obtener lista de iconos disponibles
   */
  public getAvailableIcons(): string[] {
    return [
      // Navigation
      'home', 'menu', 'bars', 'grid-2', 'grid-3', 'list', 'th-list',
      
      // User & Profile
      'user', 'users', 'user-circle', 'user-friends', 'user-cog',
      
      // Actions
      'plus', 'minus', 'edit', 'trash', 'save', 'download', 'upload',
      'search', 'filter', 'sort', 'refresh', 'sync', 'undo', 'redo',
      
      // Communication
      'envelope', 'phone', 'comment', 'comments', 'chat', 'message',
      
      // Business
      'briefcase', 'building', 'chart-line', 'chart-bar', 'chart-pie',
      'chart-mixed', 'trending-up', 'trending-down', 'analytics',
      
      // Learning
      'graduation-cap', 'book', 'books', 'certificate', 'award',
      'trophy', 'medal', 'star', 'stars',
      
      // Technology
      'laptop', 'desktop', 'mobile', 'tablet', 'server', 'database',
      'cloud', 'wifi', 'bluetooth', 'usb',
      
      // Interface
      'cog', 'settings', 'gear', 'sliders', 'toggle-on', 'toggle-off',
      'eye', 'eye-slash', 'lock', 'unlock', 'key', 'shield',
      
      // Media
      'play', 'pause', 'stop', 'forward', 'backward', 'volume-up',
      'volume-down', 'volume-mute', 'camera', 'image', 'video',
      
      // Files
      'file', 'folder', 'folder-open', 'file-alt', 'file-pdf',
      'file-image', 'file-video', 'file-audio', 'file-archive',
      
      // Time & Date
      'clock', 'calendar', 'calendar-alt', 'time', 'hourglass',
      
      // Arrows
      'arrow-up', 'arrow-down', 'arrow-left', 'arrow-right',
      'chevron-up', 'chevron-down', 'chevron-left', 'chevron-right',
      'angle-up', 'angle-down', 'angle-left', 'angle-right',
      
      // Status
      'check', 'times', 'exclamation', 'question', 'info',
      'check-circle', 'times-circle', 'exclamation-circle', 'question-circle',
      
      // Theme
      'sun', 'moon', 'lightbulb', 'adjust', 'palette',
      
      // Social
      'facebook', 'twitter', 'instagram', 'linkedin', 'youtube',
      'github', 'gitlab', 'bitbucket', 'slack', 'discord'
    ];
  }

  /**
   * Obtener iconos por categoría
   */
  public getIconsByCategory(): Record<string, string[]> {
    return {
      navigation: ['home', 'menu', 'bars', 'grid-2', 'grid-3', 'list', 'th-list'],
      user: ['user', 'users', 'user-circle', 'user-friends', 'user-cog'],
      actions: ['plus', 'minus', 'edit', 'trash', 'save', 'download', 'upload'],
      communication: ['envelope', 'phone', 'comment', 'comments', 'chat', 'message'],
      business: ['briefcase', 'building', 'chart-line', 'chart-bar', 'chart-pie'],
      learning: ['graduation-cap', 'book', 'books', 'certificate', 'award'],
      technology: ['laptop', 'desktop', 'mobile', 'tablet', 'server', 'database'],
      interface: ['cog', 'settings', 'gear', 'sliders', 'toggle-on', 'toggle-off'],
      media: ['play', 'pause', 'stop', 'forward', 'backward', 'volume-up'],
      files: ['file', 'folder', 'folder-open', 'file-alt', 'file-pdf'],
      time: ['clock', 'calendar', 'calendar-alt', 'time', 'hourglass'],
      arrows: ['arrow-up', 'arrow-down', 'arrow-left', 'arrow-right'],
      status: ['check', 'times', 'exclamation', 'question', 'info'],
      theme: ['sun', 'moon', 'lightbulb', 'adjust', 'palette'],
      social: ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube']
    };
  }

  /**
   * Limpiar cache
   */
  public clearCache(): void {
    this.iconCache.clear();
  }

  /**
   * Verificar si Font Awesome está cargado
   */
  public isFontAwesomeLoaded(): boolean {
    return this.fontAwesomeLoaded;
  }
}

/**
 * Hook de Vue.js para usar el sistema de iconos
 */
export function useIcons() {
  const iconsSystem = UBITSIconsSystem.getInstance();
  
  return {
    generateIcon: (config: IconProps) => iconsSystem.generateIconHTML(config),
    iconExists: (name: string, style?: IconStyle) => iconsSystem.iconExists(name, style),
    getAvailableIcons: () => iconsSystem.getAvailableIcons(),
    getIconsByCategory: () => iconsSystem.getIconsByCategory(),
    clearCache: () => iconsSystem.clearCache(),
    isFontAwesomeLoaded: () => iconsSystem.isFontAwesomeLoaded()
  };
}

/**
 * Utilidades de iconos estáticas
 */
export const IconUtils = {
  /**
   * Generar icono directamente
   */
  generateIcon: (name: string, style: IconStyle = 'far', size: IconSize = 'md'): string => {
    const iconsSystem = UBITSIconsSystem.getInstance();
    return iconsSystem.generateIconHTML({ name, style, size });
  },

  /**
   * Verificar si Font Awesome está disponible
   */
  isFontAwesomeAvailable: (): boolean => {
    return document.querySelector('link[href*="fontawesome"]') !== null;
  },

  /**
   * Obtener iconos de navegación
   */
  getNavigationIcons: (): string[] => {
    return ['home', 'menu', 'bars', 'grid-2', 'grid-3', 'list', 'th-list'];
  },

  /**
   * Obtener iconos de usuario
   */
  getUserIcons: (): string[] => {
    return ['user', 'users', 'user-circle', 'user-friends', 'user-cog'];
  },

  /**
   * Obtener iconos de acciones
   */
  getActionIcons: (): string[] => {
    return ['plus', 'minus', 'edit', 'trash', 'save', 'download', 'upload'];
  },

  /**
   * Obtener iconos de comunicación
   */
  getCommunicationIcons: (): string[] => {
    return ['envelope', 'phone', 'comment', 'comments', 'chat', 'message'];
  },

  /**
   * Obtener iconos de negocio
   */
  getBusinessIcons: (): string[] => {
    return ['briefcase', 'building', 'chart-line', 'chart-bar', 'chart-pie'];
  },

  /**
   * Obtener iconos de aprendizaje
   */
  getLearningIcons: (): string[] => {
    return ['graduation-cap', 'book', 'books', 'certificate', 'award'];
  },

  /**
   * Obtener iconos de tecnología
   */
  getTechnologyIcons: (): string[] => {
    return ['laptop', 'desktop', 'mobile', 'tablet', 'server', 'database'];
  },

  /**
   * Obtener iconos de interfaz
   */
  getInterfaceIcons: (): string[] => {
    return ['cog', 'settings', 'gear', 'sliders', 'toggle-on', 'toggle-off'];
  },

  /**
   * Obtener iconos de media
   */
  getMediaIcons: (): string[] => {
    return ['play', 'pause', 'stop', 'forward', 'backward', 'volume-up'];
  },

  /**
   * Obtener iconos de archivos
   */
  getFileIcons: (): string[] => {
    return ['file', 'folder', 'folder-open', 'file-alt', 'file-pdf'];
  },

  /**
   * Obtener iconos de tiempo
   */
  getTimeIcons: (): string[] => {
    return ['clock', 'calendar', 'calendar-alt', 'time', 'hourglass'];
  },

  /**
   * Obtener iconos de flechas
   */
  getArrowIcons: (): string[] => {
    return ['arrow-up', 'arrow-down', 'arrow-left', 'arrow-right'];
  },

  /**
   * Obtener iconos de estado
   */
  getStatusIcons: (): string[] => {
    return ['check', 'times', 'exclamation', 'question', 'info'];
  },

  /**
   * Obtener iconos de tema
   */
  getThemeIcons: (): string[] => {
    return ['sun', 'moon', 'lightbulb', 'adjust', 'palette'];
  },

  /**
   * Obtener iconos sociales
   */
  getSocialIcons: (): string[] => {
    return ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'];
  }
};

// Exportar por defecto
export default UBITSIconsSystem;
