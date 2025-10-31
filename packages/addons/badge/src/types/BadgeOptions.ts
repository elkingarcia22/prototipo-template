/**
 * Opciones para crear un badge
 */
export interface BadgeOptions {
  /**
   * Contenido del badge (número, texto, o undefined/null para solo el punto)
   */
  content?: string | number | null;
  
  /**
   * Tamaño del badge
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  
  /**
   * Tipo de badge: 'dot' (solo bolita sin número) o 'number' (con contenido)
   */
  type?: 'dot' | 'number';
  
  /**
   * Variante de color
   */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  
  /**
   * Si el badge debe usar posición absoluta
   */
  absolute?: boolean;
  
  /**
   * Posición cuando es absoluto
   */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
}

