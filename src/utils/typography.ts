/**
 * UBITS Typography System - Sistema de Tipografía Mejorado
 * Sistema de fuentes optimizado con tokens UBITS oficiales
 */

export type TypographyVariant = 
  | 'display-d1-regular' | 'display-d1-semibold' | 'display-d1-bold'
  | 'display-d2-regular' | 'display-d2-semibold' | 'display-d2-bold'
  | 'display-d3-regular' | 'display-d3-semibold' | 'display-d3-bold'
  | 'display-d4-regular' | 'display-d4-semibold' | 'display-d4-bold'
  | 'heading-h1' | 'heading-h2'
  | 'body-md-regular' | 'body-md-semibold' | 'body-md-bold'
  | 'body-sm-regular' | 'body-sm-semibold' | 'body-sm-bold'
  | 'body-lg-regular';

export type TypographySize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type TypographyWeight = 'regular' | 'semibold' | 'bold';
export type TypographyColor = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error' | 'info';

export interface TypographyConfig {
  variant?: TypographyVariant;
  size?: TypographySize;
  weight?: TypographyWeight;
  color?: TypographyColor;
  className?: string;
  style?: string;
}

export interface TypographyProps extends TypographyConfig {
  children: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

/**
 * Clase principal del sistema de tipografía UBITS
 */
export class UBITSTypographySystem {
  private static instance: UBITSTypographySystem;
  private fontCache: Map<string, boolean> = new Map();

  private constructor() {
    this.loadFonts();
  }

  /**
   * Obtener instancia singleton
   */
  public static getInstance(): UBITSTypographySystem {
    if (!UBITSTypographySystem.instance) {
      UBITSTypographySystem.instance = new UBITSTypographySystem();
    }
    return UBITSTypographySystem.instance;
  }

  /**
   * Cargar fuentes UBITS
   */
  private async loadFonts(): Promise<void> {
    try {
      // Cargar Noto Sans desde Google Fonts
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = 'https://fonts.googleapis.com';
      document.head.appendChild(link);

      const link2 = document.createElement('link');
      link2.rel = 'preconnect';
      link2.href = 'https://fonts.gstatic.com';
      link2.crossOrigin = 'anonymous';
      document.head.appendChild(link2);

      const link3 = document.createElement('link');
      link3.rel = 'stylesheet';
      link3.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap';
      document.head.appendChild(link3);

      // Verificar carga de fuentes
      await this.verifyFontLoad('Noto Sans');
    } catch (error) {
      console.warn('Error loading fonts:', error);
    }
  }

  /**
   * Verificar carga de fuente
   */
  private async verifyFontLoad(fontFamily: string): Promise<boolean> {
    if (this.fontCache.has(fontFamily)) {
      return this.fontCache.get(fontFamily)!;
    }

    try {
      // Verificar si la fuente está disponible
      const testElement = document.createElement('span');
      testElement.style.fontFamily = fontFamily;
      testElement.style.visibility = 'hidden';
      testElement.style.position = 'absolute';
      testElement.textContent = 'Test';
      
      document.body.appendChild(testElement);
      
      const computedStyle = window.getComputedStyle(testElement);
      const isLoaded = computedStyle.fontFamily.includes(fontFamily);
      
      document.body.removeChild(testElement);
      
      this.fontCache.set(fontFamily, isLoaded);
      return isLoaded;
    } catch (error) {
      console.warn(`Error verifying font ${fontFamily}:`, error);
      return false;
    }
  }

  /**
   * Generar HTML de tipografía
   */
  public generateTypographyHTML(config: TypographyProps): string {
    const {
      children,
      tag = 'p',
      variant,
      size,
      weight,
      color,
      className = '',
      style = ''
    } = config;

    const variantClass = variant ? `ubits-${variant}` : '';
    const sizeClass = size ? `ubits-size-${size}` : '';
    const weightClass = weight ? `ubits-weight-${weight}` : '';
    const colorClass = color ? `ubits-color-${color}` : '';
    
    const classes = [variantClass, sizeClass, weightClass, colorClass, className]
      .filter(Boolean)
      .join(' ');

    return `<${tag} class="${classes}" style="${style}">${children}</${tag}>`;
  }

  /**
   * Obtener clase de variante
   */
  public getVariantClass(variant: TypographyVariant): string {
    return `ubits-${variant}`;
  }

  /**
   * Obtener clase de tamaño
   */
  public getSizeClass(size: TypographySize): string {
    return `ubits-size-${size}`;
  }

  /**
   * Obtener clase de peso
   */
  public getWeightClass(weight: TypographyWeight): string {
    return `ubits-weight-${weight}`;
  }

  /**
   * Obtener clase de color
   */
  public getColorClass(color: TypographyColor): string {
    return `ubits-color-${color}`;
  }

  /**
   * Obtener variantes disponibles
   */
  public getAvailableVariants(): TypographyVariant[] {
    return [
      'display-d1-regular', 'display-d1-semibold', 'display-d1-bold',
      'display-d2-regular', 'display-d2-semibold', 'display-d2-bold',
      'display-d3-regular', 'display-d3-semibold', 'display-d3-bold',
      'display-d4-regular', 'display-d4-semibold', 'display-d4-bold',
      'heading-h1', 'heading-h2',
      'body-md-regular', 'body-md-semibold', 'body-md-bold',
      'body-sm-regular', 'body-sm-semibold', 'body-sm-bold',
      'body-lg-regular'
    ];
  }

  /**
   * Obtener variantes por categoría
   */
  public getVariantsByCategory(): Record<string, TypographyVariant[]> {
    return {
      display: [
        'display-d1-regular', 'display-d1-semibold', 'display-d1-bold',
        'display-d2-regular', 'display-d2-semibold', 'display-d2-bold',
        'display-d3-regular', 'display-d3-semibold', 'display-d3-bold',
        'display-d4-regular', 'display-d4-semibold', 'display-d4-bold'
      ],
      heading: ['heading-h1', 'heading-h2'],
      body: [
        'body-md-regular', 'body-md-semibold', 'body-md-bold',
        'body-sm-regular', 'body-sm-semibold', 'body-sm-bold',
        'body-lg-regular'
      ]
    };
  }

  /**
   * Obtener tamaños disponibles
   */
  public getAvailableSizes(): TypographySize[] {
    return ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
  }

  /**
   * Obtener pesos disponibles
   */
  public getAvailableWeights(): TypographyWeight[] {
    return ['regular', 'semibold', 'bold'];
  }

  /**
   * Obtener colores disponibles
   */
  public getAvailableColors(): TypographyColor[] {
    return ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'info'];
  }

  /**
   * Verificar si una variante existe
   */
  public variantExists(variant: TypographyVariant): boolean {
    return this.getAvailableVariants().includes(variant);
  }

  /**
   * Obtener información de una variante
   */
  public getVariantInfo(variant: TypographyVariant): {
    category: string;
    size: string;
    weight: string;
    description: string;
  } {
    const info: Record<TypographyVariant, any> = {
      'display-d1-regular': { category: 'display', size: '40px', weight: 'regular', description: 'Display D1 Regular' },
      'display-d1-semibold': { category: 'display', size: '40px', weight: 'semibold', description: 'Display D1 Semibold' },
      'display-d1-bold': { category: 'display', size: '40px', weight: 'bold', description: 'Display D1 Bold' },
      'display-d2-regular': { category: 'display', size: '32px', weight: 'regular', description: 'Display D2 Regular' },
      'display-d2-semibold': { category: 'display', size: '32px', weight: 'semibold', description: 'Display D2 Semibold' },
      'display-d2-bold': { category: 'display', size: '32px', weight: 'bold', description: 'Display D2 Bold' },
      'display-d3-regular': { category: 'display', size: '28px', weight: 'regular', description: 'Display D3 Regular' },
      'display-d3-semibold': { category: 'display', size: '28px', weight: 'semibold', description: 'Display D3 Semibold' },
      'display-d3-bold': { category: 'display', size: '28px', weight: 'bold', description: 'Display D3 Bold' },
      'display-d4-regular': { category: 'display', size: '24px', weight: 'regular', description: 'Display D4 Regular' },
      'display-d4-semibold': { category: 'display', size: '24px', weight: 'semibold', description: 'Display D4 Semibold' },
      'display-d4-bold': { category: 'display', size: '24px', weight: 'bold', description: 'Display D4 Bold' },
      'heading-h1': { category: 'heading', size: '20px', weight: 'semibold', description: 'Heading H1' },
      'heading-h2': { category: 'heading', size: '18px', weight: 'semibold', description: 'Heading H2' },
      'body-md-regular': { category: 'body', size: '16px', weight: 'regular', description: 'Body Medium Regular' },
      'body-md-semibold': { category: 'body', size: '16px', weight: 'semibold', description: 'Body Medium Semibold' },
      'body-md-bold': { category: 'body', size: '16px', weight: 'bold', description: 'Body Medium Bold' },
      'body-sm-regular': { category: 'body', size: '14px', weight: 'regular', description: 'Body Small Regular' },
      'body-sm-semibold': { category: 'body', size: '14px', weight: 'semibold', description: 'Body Small Semibold' },
      'body-sm-bold': { category: 'body', size: '14px', weight: 'bold', description: 'Body Small Bold' },
      'body-lg-regular': { category: 'body', size: '20px', weight: 'regular', description: 'Body Large Regular' }
    };

    return info[variant] || { category: 'unknown', size: 'unknown', weight: 'unknown', description: 'Unknown variant' };
  }

  /**
   * Limpiar cache
   */
  public clearCache(): void {
    this.fontCache.clear();
  }

  /**
   * Verificar si las fuentes están cargadas
   */
  public async areFontsLoaded(): Promise<boolean> {
    return await this.verifyFontLoad('Noto Sans');
  }
}

/**
 * Hook de Vue.js para usar el sistema de tipografía
 */
export function useTypography() {
  const typographySystem = UBITSTypographySystem.getInstance();
  
  return {
    generateTypography: (config: TypographyProps) => typographySystem.generateTypographyHTML(config),
    getVariantClass: (variant: TypographyVariant) => typographySystem.getVariantClass(variant),
    getSizeClass: (size: TypographySize) => typographySystem.getSizeClass(size),
    getWeightClass: (weight: TypographyWeight) => typographySystem.getWeightClass(weight),
    getColorClass: (color: TypographyColor) => typographySystem.getColorClass(color),
    getAvailableVariants: () => typographySystem.getAvailableVariants(),
    getVariantsByCategory: () => typographySystem.getVariantsByCategory(),
    getAvailableSizes: () => typographySystem.getAvailableSizes(),
    getAvailableWeights: () => typographySystem.getAvailableWeights(),
    getAvailableColors: () => typographySystem.getAvailableColors(),
    variantExists: (variant: TypographyVariant) => typographySystem.variantExists(variant),
    getVariantInfo: (variant: TypographyVariant) => typographySystem.getVariantInfo(variant),
    clearCache: () => typographySystem.clearCache(),
    areFontsLoaded: () => typographySystem.areFontsLoaded()
  };
}

/**
 * Utilidades de tipografía estáticas
 */
export const TypographyUtils = {
  /**
   * Generar tipografía directamente
   */
  generateTypography: (
    text: string, 
    variant: TypographyVariant, 
    tag: string = 'p'
  ): string => {
    const typographySystem = UBITSTypographySystem.getInstance();
    return typographySystem.generateTypographyHTML({ 
      children: text, 
      variant, 
      tag: tag as any 
    });
  },

  /**
   * Verificar si las fuentes están disponibles
   */
  areFontsAvailable: (): boolean => {
    return document.querySelector('link[href*="fonts.googleapis.com"]') !== null;
  },

  /**
   * Obtener variantes de display
   */
  getDisplayVariants: (): TypographyVariant[] => {
    return [
      'display-d1-regular', 'display-d1-semibold', 'display-d1-bold',
      'display-d2-regular', 'display-d2-semibold', 'display-d2-bold',
      'display-d3-regular', 'display-d3-semibold', 'display-d3-bold',
      'display-d4-regular', 'display-d4-semibold', 'display-d4-bold'
    ];
  },

  /**
   * Obtener variantes de heading
   */
  getHeadingVariants: (): TypographyVariant[] => {
    return ['heading-h1', 'heading-h2'];
  },

  /**
   * Obtener variantes de body
   */
  getBodyVariants: (): TypographyVariant[] => {
    return [
      'body-md-regular', 'body-md-semibold', 'body-md-bold',
      'body-sm-regular', 'body-sm-semibold', 'body-sm-bold',
      'body-lg-regular'
    ];
  },

  /**
   * Obtener tamaños responsive
   */
  getResponsiveSizes: (): TypographySize[] => {
    return ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
  },

  /**
   * Obtener pesos disponibles
   */
  getAvailableWeights: (): TypographyWeight[] => {
    return ['regular', 'semibold', 'bold'];
  },

  /**
   * Obtener colores disponibles
   */
  getAvailableColors: (): TypographyColor[] => {
    return ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'info'];
  }
};

// Exportar por defecto
export default UBITSTypographySystem;
