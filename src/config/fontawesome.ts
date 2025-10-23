/**
 * Font Awesome Configuration - Configuración de Font Awesome
 * Configuración de tokens API y kits para Font Awesome
 */

export interface FontAwesomeTokenConfig {
  name: string;
  token: string;
  permissions: {
    readKits: boolean;
    allowedDomains: boolean;
    emailAndId: boolean;
    freeIcons: boolean;
    proIcons: boolean;
  };
  description: string;
  isActive: boolean;
}

export interface FontAwesomeKitConfig {
  id: string;
  name: string;
  token: string;
  domains: string[];
  description: string;
  isActive: boolean;
}

export interface FontAwesomeProjectConfig {
  projectName: string;
  defaultToken: string;
  defaultKit: string;
  autoLoad: boolean;
  cache: boolean;
  cacheExpiry: number;
  fallbackToCDN: boolean;
  cdnVersion: string;
}

/**
 * Configuración de tokens API de Font Awesome
 */
export const FONTAWESOME_TOKENS: FontAwesomeTokenConfig[] = [
  {
    name: 'UBITS Pro Token',
    token: '15ACD43C-4C0F-44D2-AE1C-6E8646841B1F',
    permissions: {
      readKits: true,
      allowedDomains: true,
      emailAndId: true,
      freeIcons: true,
      proIcons: true
    },
    description: 'Token principal para acceso completo a Font Awesome Pro',
    isActive: true
  },
  {
    name: 'Figma (Pro)',
    token: 'CE7415C6-B548-4529-875C-03E0A9A8DF9D',
    permissions: {
      readKits: true,
      allowedDomains: true,
      emailAndId: true,
      freeIcons: true,
      proIcons: true
    },
    description: 'Token para integración con Figma y aplicaciones de diseño',
    isActive: false
  }
];

/**
 * Configuración de kits de Font Awesome
 */
export const FONTAWESOME_KITS: FontAwesomeKitConfig[] = [
  {
    id: 'ubits-main-kit',
    name: 'UBITS Main Kit',
    token: '15ACD43C-4C0F-44D2-AE1C-6E8646841B1F',
    domains: ['localhost', '127.0.0.1', 'ubits.com', '*.ubits.com'],
    description: 'Kit principal para el sistema UBITS',
    isActive: true
  },
  {
    id: 'ubits-figma-kit',
    name: 'UBITS Figma Kit',
    token: 'CE7415C6-B548-4529-875C-03E0A9A8DF9D',
    domains: ['figma.com', '*.figma.com'],
    description: 'Kit para integración con Figma',
    isActive: false
  }
];

/**
 * Configuración del proyecto UBITS
 */
export const UBITS_FONTAWESOME_CONFIG: FontAwesomeProjectConfig = {
  projectName: 'UBITS Prototype Template',
  defaultToken: '15ACD43C-4C0F-44D2-AE1C-6E8646841B1F',
  defaultKit: 'ubits-main-kit',
  autoLoad: true,
  cache: true,
  cacheExpiry: 24 * 60 * 60 * 1000, // 24 horas
  fallbackToCDN: true,
  cdnVersion: '6.4.0'
};

/**
 * Clase de configuración de Font Awesome
 */
export class FontAwesomeConfigManager {
  private static instance: FontAwesomeConfigManager;
  private config: FontAwesomeProjectConfig;
  private tokens: FontAwesomeTokenConfig[];
  private kits: FontAwesomeKitConfig[];

  private constructor() {
    this.config = UBITS_FONTAWESOME_CONFIG;
    this.tokens = FONTAWESOME_TOKENS;
    this.kits = FONTAWESOME_KITS;
  }

  /**
   * Obtener instancia singleton
   */
  public static getInstance(): FontAwesomeConfigManager {
    if (!FontAwesomeConfigManager.instance) {
      FontAwesomeConfigManager.instance = new FontAwesomeConfigManager();
    }
    return FontAwesomeConfigManager.instance;
  }

  /**
   * Obtener configuración del proyecto
   */
  public getProjectConfig(): FontAwesomeProjectConfig {
    return { ...this.config };
  }

  /**
   * Obtener token activo
   */
  public getActiveToken(): FontAwesomeTokenConfig | null {
    return this.tokens.find(token => token.isActive) || null;
  }

  /**
   * Obtener kit activo
   */
  public getActiveKit(): FontAwesomeKitConfig | null {
    return this.kits.find(kit => kit.isActive) || null;
  }

  /**
   * Obtener todos los tokens
   */
  public getAllTokens(): FontAwesomeTokenConfig[] {
    return [...this.tokens];
  }

  /**
   * Obtener todos los kits
   */
  public getAllKits(): FontAwesomeKitConfig[] {
    return [...this.kits];
  }

  /**
   * Activar token
   */
  public activateToken(tokenName: string): boolean {
    const token = this.tokens.find(t => t.name === tokenName);
    if (!token) return false;

    // Desactivar todos los tokens
    this.tokens.forEach(t => t.isActive = false);
    
    // Activar el token seleccionado
    token.isActive = true;
    
    return true;
  }

  /**
   * Activar kit
   */
  public activateKit(kitName: string): boolean {
    const kit = this.kits.find(k => k.name === kitName);
    if (!kit) return false;

    // Desactivar todos los kits
    this.kits.forEach(k => k.isActive = false);
    
    // Activar el kit seleccionado
    kit.isActive = true;
    
    return true;
  }

  /**
   * Verificar si el dominio está permitido
   */
  public isDomainAllowed(domain: string): boolean {
    const activeKit = this.getActiveKit();
    if (!activeKit) return false;

    return activeKit.domains.some(allowedDomain => {
      if (allowedDomain.startsWith('*.')) {
        const baseDomain = allowedDomain.substring(2);
        return domain.endsWith(baseDomain);
      }
      return domain === allowedDomain;
    });
  }

  /**
   * Obtener configuración para la API
   */
  public getAPIConfig(): {
    apiToken: string;
    kitId?: string;
    domains?: string[];
    autoLoad: boolean;
    cache: boolean;
    cacheExpiry: number;
  } {
    const activeToken = this.getActiveToken();
    const activeKit = this.getActiveKit();

    return {
      apiToken: activeToken?.token || this.config.defaultToken,
      kitId: activeKit?.id,
      domains: activeKit?.domains,
      autoLoad: this.config.autoLoad,
      cache: this.config.cache,
      cacheExpiry: this.config.cacheExpiry
    };
  }

  /**
   * Actualizar configuración del proyecto
   */
  public updateProjectConfig(updates: Partial<FontAwesomeProjectConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  /**
   * Agregar nuevo token
   */
  public addToken(token: FontAwesomeTokenConfig): void {
    this.tokens.push(token);
  }

  /**
   * Agregar nuevo kit
   */
  public addKit(kit: FontAwesomeKitConfig): void {
    this.kits.push(kit);
  }

  /**
   * Remover token
   */
  public removeToken(tokenName: string): boolean {
    const index = this.tokens.findIndex(t => t.name === tokenName);
    if (index === -1) return false;

    this.tokens.splice(index, 1);
    return true;
  }

  /**
   * Remover kit
   */
  public removeKit(kitName: string): boolean {
    const index = this.kits.findIndex(k => k.name === kitName);
    if (index === -1) return false;

    this.kits.splice(index, 1);
    return true;
  }

  /**
   * Exportar configuración
   */
  public exportConfig(): string {
    return JSON.stringify({
      project: this.config,
      tokens: this.tokens,
      kits: this.kits
    }, null, 2);
  }

  /**
   * Importar configuración
   */
  public importConfig(configJson: string): boolean {
    try {
      const config = JSON.parse(configJson);
      
      if (config.project) {
        this.config = { ...this.config, ...config.project };
      }
      
      if (config.tokens) {
        this.tokens = config.tokens;
      }
      
      if (config.kits) {
        this.kits = config.kits;
      }
      
      return true;
    } catch (error) {
      console.error('Error importing Font Awesome configuration:', error);
      return false;
    }
  }

  /**
   * Resetear configuración
   */
  public resetConfig(): void {
    this.config = UBITS_FONTAWESOME_CONFIG;
    this.tokens = FONTAWESOME_TOKENS;
    this.kits = FONTAWESOME_KITS;
  }

  /**
   * Obtener estadísticas de configuración
   */
  public getConfigStats(): {
    totalTokens: number;
    activeTokens: number;
    totalKits: number;
    activeKits: number;
    allowedDomains: number;
  } {
    return {
      totalTokens: this.tokens.length,
      activeTokens: this.tokens.filter(t => t.isActive).length,
      totalKits: this.kits.length,
      activeKits: this.kits.filter(k => k.isActive).length,
      allowedDomains: this.getActiveKit()?.domains.length || 0
    };
  }
}

/**
 * Hook de Vue.js para usar la configuración de Font Awesome
 */
export function useFontAwesomeConfig() {
  const { ref, computed } = require('vue');
  
  const configManager = FontAwesomeConfigManager.getInstance();
  
  const projectConfig = ref(configManager.getProjectConfig());
  const activeToken = ref(configManager.getActiveToken());
  const activeKit = ref(configManager.getActiveKit());
  const allTokens = ref(configManager.getAllTokens());
  const allKits = ref(configManager.getAllKits());
  
  const configStats = computed(() => configManager.getConfigStats());
  
  return {
    projectConfig: projectConfig.value,
    activeToken: activeToken.value,
    activeKit: activeKit.value,
    allTokens: allTokens.value,
    allKits: allKits.value,
    configStats: configStats.value,
    activateToken: (tokenName: string) => configManager.activateToken(tokenName),
    activateKit: (kitName: string) => configManager.activateKit(kitName),
    isDomainAllowed: (domain: string) => configManager.isDomainAllowed(domain),
    getAPIConfig: () => configManager.getAPIConfig(),
    updateProjectConfig: (updates: Partial<FontAwesomeProjectConfig>) => 
      configManager.updateProjectConfig(updates),
    addToken: (token: FontAwesomeTokenConfig) => configManager.addToken(token),
    addKit: (kit: FontAwesomeKitConfig) => configManager.addKit(kit),
    removeToken: (tokenName: string) => configManager.removeToken(tokenName),
    removeKit: (kitName: string) => configManager.removeKit(kitName),
    exportConfig: () => configManager.exportConfig(),
    importConfig: (configJson: string) => configManager.importConfig(configJson),
    resetConfig: () => configManager.resetConfig()
  };
}

/**
 * Utilidades estáticas para configuración de Font Awesome
 */
export const FontAwesomeConfigUtils = {
  /**
   * Crear manager de configuración
   */
  createConfigManager: () => FontAwesomeConfigManager.getInstance(),

  /**
   * Validar token API
   */
  validateToken: (token: string): boolean => {
    // Validar formato básico de token UUID
    const uuidRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;
    return uuidRegex.test(token);
  },

  /**
   * Validar dominio
   */
  validateDomain: (domain: string): boolean => {
    const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?)*$/;
    return domainRegex.test(domain);
  },

  /**
   * Obtener configuración por defecto
   */
  getDefaultConfig: (): FontAwesomeProjectConfig => UBITS_FONTAWESOME_CONFIG,

  /**
   * Obtener tokens por defecto
   */
  getDefaultTokens: (): FontAwesomeTokenConfig[] => FONTAWESOME_TOKENS,

  /**
   * Obtener kits por defecto
   */
  getDefaultKits: (): FontAwesomeKitConfig[] => FONTAWESOME_KITS
};

// Exportar por defecto
export default FontAwesomeConfigManager;
