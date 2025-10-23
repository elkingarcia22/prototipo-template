<!--
  UBITS Grid Component - Responsive
  Sistema de grid responsive adaptado del playground UBITS
-->
<template>
  <div 
    :class="gridClasses"
    :style="gridStyles"
    v-bind="$attrs"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useResponsive } from '../utils/responsive'

// Props del componente
interface Props {
  // Columnas responsive
  cols?: Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', number>>
  
  // Gap responsive
  gap?: Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', number>>
  
  // Alineación
  align?: 'start' | 'center' | 'end' | 'stretch'
  
  // Justificación
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  
  // Dirección
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  
  // Wrap
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  
  // Altura
  height?: 'auto' | 'full' | 'screen'
  
  // Overflow
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto'
}

const props = withDefaults(defineProps<Props>(), {
  cols: () => ({
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
    '2xl': 6
  }),
  gap: () => ({
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    '2xl': 32
  }),
  align: 'stretch',
  justify: 'start',
  direction: 'row',
  wrap: 'wrap',
  height: 'auto',
  overflow: 'visible'
})

// Sistema responsive
const { state, getResponsiveValue, getResponsiveStyles } = useResponsive()

// Computed
const gridClasses = computed(() => {
  const classes = ['ubits-grid']
  
  // Alineación
  classes.push(`ubits-grid--align-${props.align}`)
  
  // Justificación
  classes.push(`ubits-grid--justify-${props.justify}`)
  
  // Dirección
  classes.push(`ubits-grid--direction-${props.direction}`)
  
  // Wrap
  classes.push(`ubits-grid--wrap-${props.wrap}`)
  
  // Altura
  if (props.height !== 'auto') {
    classes.push(`ubits-grid--height-${props.height}`)
  }
  
  // Overflow
  if (props.overflow !== 'visible') {
    classes.push(`ubits-grid--overflow-${props.overflow}`)
  }
  
  // Responsive
  if (state.isMobile) {
    classes.push('ubits-grid--mobile')
  } else if (state.isTablet) {
    classes.push('ubits-grid--tablet')
  } else if (state.isDesktop) {
    classes.push('ubits-grid--desktop')
  }
  
  return classes
})

const gridStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  // Columnas responsive
  const cols = getResponsiveValue(props.cols, 3)
  styles.gridTemplateColumns = `repeat(${cols}, 1fr)`
  
  // Gap responsive
  const gap = getResponsiveValue(props.gap, 16)
  styles.gap = `${gap}px`
  
  return styles
})
</script>

<style scoped>
/* Importar tokens UBITS */
@import '../styles/ubits-tokens.css';

/* Base del grid */
.ubits-grid {
  display: grid;
  width: 100%;
  transition: all 0.3s ease;
}

/* Alineación */
.ubits-grid--align-start {
  align-items: start;
}

.ubits-grid--align-center {
  align-items: center;
}

.ubits-grid--align-end {
  align-items: end;
}

.ubits-grid--align-stretch {
  align-items: stretch;
}

/* Justificación */
.ubits-grid--justify-start {
  justify-content: start;
}

.ubits-grid--justify-center {
  justify-content: center;
}

.ubits-grid--justify-end {
  justify-content: end;
}

.ubits-grid--justify-between {
  justify-content: space-between;
}

.ubits-grid--justify-around {
  justify-content: space-around;
}

.ubits-grid--justify-evenly {
  justify-content: space-evenly;
}

/* Dirección */
.ubits-grid--direction-row {
  grid-auto-flow: row;
}

.ubits-grid--direction-column {
  grid-auto-flow: column;
}

.ubits-grid--direction-row-reverse {
  grid-auto-flow: row;
  direction: rtl;
}

.ubits-grid--direction-column-reverse {
  grid-auto-flow: column;
  direction: rtl;
}

/* Wrap */
.ubits-grid--wrap-nowrap {
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
}

.ubits-grid--wrap-wrap {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.ubits-grid--wrap-wrap-reverse {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  direction: rtl;
}

/* Altura */
.ubits-grid--height-auto {
  height: auto;
}

.ubits-grid--height-full {
  height: 100%;
}

.ubits-grid--height-screen {
  height: 100vh;
}

/* Overflow */
.ubits-grid--overflow-hidden {
  overflow: hidden;
}

.ubits-grid--overflow-scroll {
  overflow: scroll;
}

.ubits-grid--overflow-auto {
  overflow: auto;
}

/* Responsive */
.ubits-grid--mobile {
  grid-template-columns: 1fr;
  gap: var(--ubits-gap-xs);
}

.ubits-grid--tablet {
  grid-template-columns: repeat(2, 1fr);
  gap: var(--ubits-gap-sm);
}

.ubits-grid--desktop {
  grid-template-columns: repeat(3, 1fr);
  gap: var(--ubits-gap-md);
}

/* Responsive breakpoints */
@media (max-width: 480px) {
  .ubits-grid {
    grid-template-columns: 1fr;
    gap: var(--ubits-gap-xs);
  }
}

@media (max-width: 768px) {
  .ubits-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--ubits-gap-sm);
  }
}

@media (max-width: 1024px) {
  .ubits-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--ubits-gap-md);
  }
}

@media (min-width: 1280px) {
  .ubits-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: var(--ubits-gap-lg);
  }
}

@media (min-width: 1536px) {
  .ubits-grid {
    grid-template-columns: repeat(5, 1fr);
    gap: var(--ubits-gap-xl);
  }
}

@media (min-width: 1920px) {
  .ubits-grid {
    grid-template-columns: repeat(6, 1fr);
    gap: var(--ubits-gap-2xl);
  }
}

/* Grid items */
.ubits-grid > * {
  min-width: 0;
  min-height: 0;
}

/* Utilidades */
.ubits-grid--hidden {
  display: none !important;
}

.ubits-grid--visible {
  display: grid !important;
}

.ubits-grid--flex {
  display: flex !important;
}

.ubits-grid--block {
  display: block !important;
}

/* Modo oscuro */
[data-theme="dark"] .ubits-grid {
  /* Los estilos del grid no cambian en modo oscuro */
  /* Los colores se manejan en los elementos hijos */
}

/* Animaciones */
.ubits-grid {
  transition: grid-template-columns 0.3s ease, gap 0.3s ease;
}

/* Utilidades de grid específicas */
.ubits-grid--auto-fit {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.ubits-grid--auto-fill {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.ubits-grid--dense {
  grid-auto-flow: dense;
}

.ubits-grid--sparse {
  grid-auto-flow: sparse;
}
</style>
