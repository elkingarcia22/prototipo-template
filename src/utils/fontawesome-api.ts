/**
 * Font Awesome API Integration - Integración con API de Font Awesome
 * Sistema robusto de iconos con tokens API oficiales
 */

export interface FontAwesomeConfig {
  apiToken: string;
  kitId?: string;
  domains?: string[];
  autoLoad?: boolean;
  cache?: boolean;
  cacheExpiry?: number; // en milisegundos
}

export interface FontAwesomeIcon {
  id: string;
  name: string;
  unicode: string;
  styles: string[];
  label: string;
  search: {
    terms: string[];
  };
  free: string[];
  pro: string[];
}

export interface FontAwesomeKit {
  id: string;
  name: string;
  token: string;
  domains: string[];
  icons: FontAwesomeIcon[];
  lastModified: string;
}

export interface FontAwesomeAPIResponse {
  data: FontAwesomeIcon[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

/**
 * Clase principal para integración con Font Awesome API
 */
export class FontAwesomeAPIClient {
  private static instance: FontAwesomeAPIClient;
  private config: FontAwesomeConfig;
  private cache: Map<string, any> = new Map();
  private baseURL = 'https://api.fontawesome.com';
  private isInitialized = false;

  private constructor(config: FontAwesomeConfig) {
    this.config = {
      autoLoad: true,
      cache: true,
      cacheExpiry: 24 * 60 * 60 * 1000, // 24 horas
      ...config,
    };
  }

  /**
   * Obtener instancia singleton
   */
  public static getInstance(config: FontAwesomeConfig): FontAwesomeAPIClient {
    if (!FontAwesomeAPIClient.instance) {
      FontAwesomeAPIClient.instance = new FontAwesomeAPIClient(config);
    }
    return FontAwesomeAPIClient.instance;
  }

  /**
   * Inicializar cliente API
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Verificar token API
      await this.verifyToken();
      
      // Cargar kits si está configurado
      if (this.config.autoLoad) {
        await this.loadKits();
      }
      
      this.isInitialized = true;
    } catch (error) {
      console.error('Error initializing Font Awesome API:', error);
      throw error;
    }
  }

  /**
   * Verificar token API
   */
  private async verifyToken(): Promise<boolean> {
    try {
      const response = await this.makeRequest('/me');
      return response.ok;
    } catch (error) {
      console.warn('Font Awesome API token verification failed:', error);
      return false;
    }
  }

  /**
   * Cargar kits disponibles
   */
  public async loadKits(): Promise<FontAwesomeKit[]> {
    const cacheKey = 'kits';
    
    if (this.config.cache && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.config.cacheExpiry!) {
        return cached.data;
      }
    }

    try {
      const response = await this.makeRequest('/kits');
      const kits = await response.json();
      
      if (this.config.cache) {
        this.cache.set(cacheKey, {
          data: kits,
          timestamp: Date.now()
        });
      }
      
      return kits;
    } catch (error) {
      console.error('Error loading Font Awesome kits:', error);
      return [];
    }
  }

  /**
   * Buscar iconos
   */
  public async searchIcons(query: string, options: {
    styles?: string[];
    free?: boolean;
    pro?: boolean;
    limit?: number;
  } = {}): Promise<FontAwesomeIcon[]> {
    const cacheKey = `search_${query}_${JSON.stringify(options)}`;
    
    if (this.config.cache && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.config.cacheExpiry!) {
        return cached.data;
      }
    }

    try {
      const params = new URLSearchParams({
        q: query,
        ...(options.styles && { styles: options.styles.join(',') }),
        ...(options.free !== undefined && { free: options.free.toString() }),
        ...(options.pro !== undefined && { pro: options.pro.toString() }),
        ...(options.limit && { limit: options.limit.toString() })
      });

      const response = await this.makeRequest(`/icons?${params}`);
      const data: FontAwesomeAPIResponse = await response.json();
      
      if (this.config.cache) {
        this.cache.set(cacheKey, {
          data: data.data,
          timestamp: Date.now()
        });
      }
      
      return data.data;
    } catch (error) {
      console.error('Error searching Font Awesome icons:', error);
      return [];
    }
  }

  /**
   * Obtener icono por ID
   */
  public async getIconById(id: string): Promise<FontAwesomeIcon | null> {
    const cacheKey = `icon_${id}`;
    
    if (this.config.cache && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.config.cacheExpiry!) {
        return cached.data;
      }
    }

    try {
      const response = await this.makeRequest(`/icons/${id}`);
      const icon = await response.json();
      
      if (this.config.cache) {
        this.cache.set(cacheKey, {
          data: icon,
          timestamp: Date.now()
        });
      }
      
      return icon;
    } catch (error) {
      console.error(`Error getting Font Awesome icon ${id}:`, error);
      return null;
    }
  }

  /**
   * Obtener iconos por categoría
   */
  public async getIconsByCategory(category: string): Promise<FontAwesomeIcon[]> {
    const cacheKey = `category_${category}`;
    
    if (this.config.cache && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.config.cacheExpiry!) {
        return cached.data;
      }
    }

    try {
      const response = await this.makeRequest(`/icons/category/${category}`);
      const icons = await response.json();
      
      if (this.config.cache) {
        this.cache.set(cacheKey, {
          data: icons,
          timestamp: Date.now()
        });
      }
      
      return icons;
    } catch (error) {
      console.error(`Error getting Font Awesome icons by category ${category}:`, error);
      return [];
    }
  }

  /**
   * Obtener iconos populares
   */
  public async getPopularIcons(limit: number = 50): Promise<FontAwesomeIcon[]> {
    const cacheKey = `popular_${limit}`;
    
    if (this.config.cache && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.config.cacheExpiry!) {
        return cached.data;
      }
    }

    try {
      const response = await this.makeRequest(`/icons/popular?limit=${limit}`);
      const icons = await response.json();
      
      if (this.config.cache) {
        this.cache.set(cacheKey, {
          data: icons,
          timestamp: Date.now()
        });
      }
      
      return icons;
    } catch (error) {
      console.error('Error getting popular Font Awesome icons:', error);
      return [];
    }
  }

  /**
   * Obtener iconos recientes
   */
  public async getRecentIcons(limit: number = 50): Promise<FontAwesomeIcon[]> {
    const cacheKey = `recent_${limit}`;
    
    if (this.config.cache && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.config.cacheExpiry!) {
        return cached.data;
      }
    }

    try {
      const response = await this.makeRequest(`/icons/recent?limit=${limit}`);
      const icons = await response.json();
      
      if (this.config.cache) {
        this.cache.set(cacheKey, {
          data: icons,
          timestamp: Date.now()
        });
      }
      
      return icons;
    } catch (error) {
      console.error('Error getting recent Font Awesome icons:', error);
      return [];
    }
  }

  /**
   * Generar HTML de icono
   */
  public generateIconHTML(icon: FontAwesomeIcon, style: string = 'far', size: string = 'md'): string {
    const sizeClass = this.getSizeClass(size);
    return `<i class="${style} fa-${icon.name} ${sizeClass}"></i>`;
  }

  /**
   * Obtener clase de tamaño
   */
  private getSizeClass(size: string): string {
    const sizeMap: Record<string, string> = {
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
   * Realizar petición a la API
   */
  private async makeRequest(endpoint: string): Promise<Response> {
    const url = `${this.baseURL}${endpoint}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.config.apiToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Font Awesome API error: ${response.status} ${response.statusText}`);
    }

    return response;
  }

  /**
   * Limpiar cache
   */
  public clearCache(): void {
    this.cache.clear();
  }

  /**
   * Obtener estadísticas de cache
   */
  public getCacheStats(): {
    size: number;
    keys: string[];
    oldestEntry: number | null;
    newestEntry: number | null;
  } {
    const keys = Array.from(this.cache.keys());
    const timestamps = Array.from(this.cache.values()).map(entry => entry.timestamp);
    
    return {
      size: this.cache.size,
      keys,
      oldestEntry: timestamps.length > 0 ? Math.min(...timestamps) : null,
      newestEntry: timestamps.length > 0 ? Math.max(...timestamps) : null
    };
  }

  /**
   * Verificar si está inicializado
   */
  public isReady(): boolean {
    return this.isInitialized;
  }

  /**
   * Obtener configuración
   */
  public getConfig(): FontAwesomeConfig {
    return { ...this.config };
  }
}

/**
 * Hook de Vue.js para usar Font Awesome API
 */
export function useFontAwesomeAPI(config: FontAwesomeConfig) {
  const { ref, onMounted, onUnmounted } = require('vue');
  
  const apiClient = FontAwesomeAPIClient.getInstance(config);
  const isReady = ref(false);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  onMounted(async () => {
    try {
      isLoading.value = true;
      await apiClient.initialize();
      isReady.value = true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      isLoading.value = false;
    }
  });

  onUnmounted(() => {
    // Cleanup si es necesario
  });

  return {
    isReady: isReady.value,
    isLoading: isLoading.value,
    error: error.value,
    searchIcons: (query: string, options?: any) => apiClient.searchIcons(query, options),
    getIconById: (id: string) => apiClient.getIconById(id),
    getIconsByCategory: (category: string) => apiClient.getIconsByCategory(category),
    getPopularIcons: (limit?: number) => apiClient.getPopularIcons(limit),
    getRecentIcons: (limit?: number) => apiClient.getRecentIcons(limit),
    generateIconHTML: (icon: FontAwesomeIcon, style?: string, size?: string) => 
      apiClient.generateIconHTML(icon, style, size),
    clearCache: () => apiClient.clearCache(),
    getCacheStats: () => apiClient.getCacheStats(),
    loadKits: () => apiClient.loadKits()
  };
}

/**
 * Utilidades estáticas para Font Awesome API
 */
export const FontAwesomeAPIUtils = {
  /**
   * Crear cliente API
   */
  createClient: (config: FontAwesomeConfig) => FontAwesomeAPIClient.getInstance(config),

  /**
   * Verificar token API
   */
  verifyToken: async (token: string): Promise<boolean> => {
    try {
      const response = await fetch('https://api.fontawesome.com/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  },

  /**
   * Obtener información del token
   */
  getTokenInfo: async (token: string): Promise<any> => {
    try {
      const response = await fetch('https://api.fontawesome.com/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    } catch (error) {
      return null;
    }
  }
};

// Exportar por defecto
export default FontAwesomeAPIClient;
