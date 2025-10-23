<!--
  UBITS Flex Component - Responsive
  Sistema de flexbox responsive adaptado del playground UBITS
-->
<template>
  <div 
    :class="flexClasses"
    :style="flexStyles"
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
  // Dirección responsive
  direction?: Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', 'row' | 'column' | 'row-reverse' | 'column-reverse'>>
  
  // Alineación responsive
  align?: Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', 'start' | 'center' | 'end' | 'stretch' | 'baseline'>>
  
  // Justificación responsive
  justify?: Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'>>
  
  // Wrap responsive
  wrap?: Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', 'nowrap' | 'wrap' | 'wrap-reverse'>>
  
  // Gap responsive
  gap?: Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', number>>
  
  // Altura
  height?: 'auto' | 'full' | 'screen'
  
  // Ancho
  width?: 'auto' | 'full' | 'fit'
  
  // Overflow
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto'
  
  // Padding responsive
  padding?: Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', number>>
  
  // Margin responsive
  margin?: Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', number>>
}

const props = withDefaults(defineProps<Props>(), {
  direction: () => ({
    xs: 'column',
    sm: 'row',
    md: 'row',
    lg: 'row',
    xl: 'row',
    '2xl': 'row'
  }),
  align: () => ({
    xs: 'stretch',
    sm: 'center',
    md: 'center',
    lg: 'center',
    xl: 'center',
    '2xl': 'center'
  }),
  justify: () => ({
    xs: 'start',
    sm: 'start',
    md: 'start',
    lg: 'start',
    xl: 'start',
    '2xl': 'start'
  }),
  wrap: () => ({
    xs: 'wrap',
    sm: 'wrap',
    md: 'nowrap',
    lg: 'nowrap',
    xl: 'nowrap',
    '2xl': 'nowrap'
  }),
  gap: () => ({
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    '2xl': 32
  }),
  height: 'auto',
  width: 'auto',
  overflow: 'visible'
})

// Sistema responsive
const { state, getResponsiveValue, getResponsiveStyles } = useResponsive()

// Computed
const flexClasses = computed(() => {
  const classes = ['ubits-flex']
  
  // Altura
  if (props.height !== 'auto') {
    classes.push(`ubits-flex--height-${props.height}`)
  }
  
  // Ancho
  if (props.width !== 'auto') {
    classes.push(`ubits-flex--width-${props.width}`)
  }
  
  // Overflow
  if (props.overflow !== 'visible') {
    classes.push(`ubits-flex--overflow-${props.overflow}`)
  }
  
  // Responsive
  if (state.isMobile) {
    classes.push('ubits-flex--mobile')
  } else if (state.isTablet) {
    classes.push('ubits-flex--tablet')
  } else if (state.isDesktop) {
    classes.push('ubits-flex--desktop')
  }
  
  return classes
})

const flexStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  // Dirección responsive
  const direction = getResponsiveValue(props.direction, 'row')
  styles.flexDirection = direction
  
  // Alineación responsive
  const align = getResponsiveValue(props.align, 'center')
  styles.alignItems = align
  
  // Justificación responsive
  const justify = getResponsiveValue(props.justify, 'start')
  styles.justifyContent = justify
  
  // Wrap responsive
  const wrap = getResponsiveValue(props.wrap, 'wrap')
  styles.flexWrap = wrap
  
  // Gap responsive
  const gap = getResponsiveValue(props.gap, 16)
  styles.gap = `${gap}px`
  
  // Padding responsive
  if (props.padding) {
    const padding = getResponsiveValue(props.padding, 0)
    if (padding > 0) {
      styles.padding = `${padding}px`
    }
  }
  
  // Margin responsive
  if (props.margin) {
    const margin = getResponsiveValue(props.margin, 0)
    if (margin > 0) {
      styles.margin = `${margin}px`
    }
  }
  
  return styles
})
</script>

<style scoped>
/* Importar tokens UBITS */
@import '../styles/ubits-tokens.css';

/* Base del flex */
.ubits-flex {
  display: flex;
  transition: all 0.3s ease;
}

/* Altura */
.ubits-flex--height-auto {
  height: auto;
}

.ubits-flex--height-full {
  height: 100%;
}

.ubits-flex--height-screen {
  height: 100vh;
}

/* Ancho */
.ubits-flex--width-auto {
  width: auto;
}

.ubits-flex--width-full {
  width: 100%;
}

.ubits-flex--width-fit {
  width: fit-content;
}

/* Overflow */
.ubits-flex--overflow-hidden {
  overflow: hidden;
}

.ubits-flex--overflow-scroll {
  overflow: scroll;
}

.ubits-flex--overflow-auto {
  overflow: auto;
}

/* Responsive */
.ubits-flex--mobile {
  flex-direction: column;
  gap: var(--ubits-gap-xs);
}

.ubits-flex--tablet {
  flex-direction: row;
  gap: var(--ubits-gap-sm);
}

.ubits-flex--desktop {
  flex-direction: row;
  gap: var(--ubits-gap-md);
}

/* Responsive breakpoints */
@media (max-width: 480px) {
  .ubits-flex {
    flex-direction: column;
    gap: var(--ubits-gap-xs);
  }
}

@media (max-width: 768px) {
  .ubits-flex {
    flex-direction: row;
    gap: var(--ubits-gap-sm);
  }
}

@media (max-width: 1024px) {
  .ubits-flex {
    flex-direction: row;
    gap: var(--ubits-gap-md);
  }
}

@media (min-width: 1280px) {
  .ubits-flex {
    flex-direction: row;
    gap: var(--ubits-gap-lg);
  }
}

@media (min-width: 1536px) {
  .ubits-flex {
    flex-direction: row;
    gap: var(--ubits-gap-xl);
  }
}

@media (min-width: 1920px) {
  .ubits-flex {
    flex-direction: row;
    gap: var(--ubits-gap-2xl);
  }
}

/* Flex items */
.ubits-flex > * {
  min-width: 0;
  min-height: 0;
}

/* Utilidades */
.ubits-flex--hidden {
  display: none !important;
}

.ubits-flex--visible {
  display: flex !important;
}

.ubits-flex--grid {
  display: grid !important;
}

.ubits-flex--block {
  display: block !important;
}

/* Modo oscuro */
[data-theme="dark"] .ubits-flex {
  /* Los estilos del flex no cambian en modo oscuro */
  /* Los colores se manejan en los elementos hijos */
}

/* Animaciones */
.ubits-flex {
  transition: flex-direction 0.3s ease, gap 0.3s ease, align-items 0.3s ease, justify-content 0.3s ease;
}

/* Utilidades de flex específicas */
.ubits-flex--inline {
  display: inline-flex;
}

.ubits-flex--column {
  flex-direction: column;
}

.ubits-flex--row {
  flex-direction: row;
}

.ubits-flex--column-reverse {
  flex-direction: column-reverse;
}

.ubits-flex--row-reverse {
  flex-direction: row-reverse;
}

.ubits-flex--wrap {
  flex-wrap: wrap;
}

.ubits-flex--nowrap {
  flex-wrap: nowrap;
}

.ubits-flex--wrap-reverse {
  flex-wrap: wrap-reverse;
}

.ubits-flex--align-start {
  align-items: flex-start;
}

.ubits-flex--align-center {
  align-items: center;
}

.ubits-flex--align-end {
  align-items: flex-end;
}

.ubits-flex--align-stretch {
  align-items: stretch;
}

.ubits-flex--align-baseline {
  align-items: baseline;
}

.ubits-flex--justify-start {
  justify-content: flex-start;
}

.ubits-flex--justify-center {
  justify-content: center;
}

.ubits-flex--justify-end {
  justify-content: flex-end;
}

.ubits-flex--justify-between {
  justify-content: space-between;
}

.ubits-flex--justify-around {
  justify-content: space-around;
}

.ubits-flex--justify-evenly {
  justify-content: space-evenly;
}

/* Flex grow/shrink utilities */
.ubits-flex--grow {
  flex-grow: 1;
}

.ubits-flex--shrink {
  flex-shrink: 1;
}

.ubits-flex--no-grow {
  flex-grow: 0;
}

.ubits-flex--no-shrink {
  flex-shrink: 0;
}

.ubits-flex--basis-auto {
  flex-basis: auto;
}

.ubits-flex--basis-0 {
  flex-basis: 0;
}

.ubits-flex--basis-full {
  flex-basis: 100%;
}
</style>
