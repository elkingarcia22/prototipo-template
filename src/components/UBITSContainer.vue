<!--
  UBITS Container Component - Responsive
  Contenedor responsive adaptado del playground UBITS
-->
<template>
  <div 
    :class="containerClasses"
    :style="containerStyles"
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
  // Tamaño del contenedor
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  
  // Padding responsive
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  
  // Centrado
  centered?: boolean
  
  // Ancho completo
  fullWidth?: boolean
  
  // Altura completa
  fullHeight?: boolean
  
  // Overflow
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto'
  
  // Background
  background?: 'transparent' | 'primary' | 'secondary' | 'tertiary'
  
  // Border
  border?: boolean
  borderColor?: 'default' | 'primary' | 'secondary' | 'accent'
  
  // Shadow
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  
  // Radius
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'lg',
  padding: 'md',
  centered: true,
  fullWidth: false,
  fullHeight: false,
  overflow: 'visible',
  background: 'transparent',
  border: false,
  borderColor: 'default',
  shadow: 'none',
  radius: 'md'
})

// Sistema responsive
const { state, getResponsiveValue, getResponsiveStyles } = useResponsive()

// Computed
const containerClasses = computed(() => {
  const classes = ['ubits-container']
  
  // Tamaño
  classes.push(`ubits-container--${props.size}`)
  
  // Padding
  if (props.padding !== 'none') {
    classes.push(`ubits-container--padding-${props.padding}`)
  }
  
  // Centrado
  if (props.centered) {
    classes.push('ubits-container--centered')
  }
  
  // Ancho completo
  if (props.fullWidth) {
    classes.push('ubits-container--full-width')
  }
  
  // Altura completa
  if (props.fullHeight) {
    classes.push('ubits-container--full-height')
  }
  
  // Overflow
  if (props.overflow !== 'visible') {
    classes.push(`ubits-container--overflow-${props.overflow}`)
  }
  
  // Background
  if (props.background !== 'transparent') {
    classes.push(`ubits-container--bg-${props.background}`)
  }
  
  // Border
  if (props.border) {
    classes.push(`ubits-container--border-${props.borderColor}`)
  }
  
  // Shadow
  if (props.shadow !== 'none') {
    classes.push(`ubits-container--shadow-${props.shadow}`)
  }
  
  // Radius
  if (props.radius !== 'none') {
    classes.push(`ubits-container--radius-${props.radius}`)
  }
  
  // Responsive
  if (state.isMobile) {
    classes.push('ubits-container--mobile')
  } else if (state.isTablet) {
    classes.push('ubits-container--tablet')
  } else if (state.isDesktop) {
    classes.push('ubits-container--desktop')
  }
  
  return classes
})

const containerStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  // Ancho máximo responsive
  const maxWidths = {
    xs: '100%',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    full: '100%'
  }
  
  const maxWidth = getResponsiveValue({
    xs: '100%',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }, maxWidths[props.size])
  
  if (maxWidth !== '100%') {
    styles.maxWidth = maxWidth
  }
  
  // Padding responsive
  const paddingValues = {
    none: '0',
    xs: '12px',
    sm: '16px',
    md: '20px',
    lg: '24px',
    xl: '32px'
  }
  
  if (props.padding !== 'none') {
    const padding = getResponsiveValue({
      xs: '12px',
      sm: '16px',
      md: '20px',
      lg: '24px',
      xl: '32px'
    }, paddingValues[props.padding])
    
    styles.padding = padding
  }
  
  return styles
})
</script>

<style scoped>
/* Importar tokens UBITS */
@import '../styles/ubits-tokens.css';

/* Base del contenedor */
.ubits-container {
  position: relative;
  width: 100%;
  margin: 0 auto;
  transition: all 0.3s ease;
}

/* Tamaños */
.ubits-container--xs {
  max-width: 100%;
}

.ubits-container--sm {
  max-width: 640px;
}

.ubits-container--md {
  max-width: 768px;
}

.ubits-container--lg {
  max-width: 1024px;
}

.ubits-container--xl {
  max-width: 1280px;
}

.ubits-container--2xl {
  max-width: 1536px;
}

.ubits-container--full {
  max-width: 100%;
}

/* Padding */
.ubits-container--padding-none {
  padding: 0;
}

.ubits-container--padding-xs {
  padding: var(--ubits-responsive-padding-xs);
}

.ubits-container--padding-sm {
  padding: var(--ubits-responsive-padding-sm);
}

.ubits-container--padding-md {
  padding: var(--ubits-responsive-padding-md);
}

.ubits-container--padding-lg {
  padding: var(--ubits-responsive-padding-lg);
}

.ubits-container--padding-xl {
  padding: var(--ubits-responsive-padding-xl);
}

/* Centrado */
.ubits-container--centered {
  margin-left: auto;
  margin-right: auto;
}

/* Ancho completo */
.ubits-container--full-width {
  width: 100%;
  max-width: none;
}

/* Altura completa */
.ubits-container--full-height {
  height: 100vh;
  min-height: 100vh;
}

/* Overflow */
.ubits-container--overflow-hidden {
  overflow: hidden;
}

.ubits-container--overflow-scroll {
  overflow: scroll;
}

.ubits-container--overflow-auto {
  overflow: auto;
}

/* Backgrounds */
.ubits-container--bg-transparent {
  background: transparent;
}

.ubits-container--bg-primary {
  background: var(--ubits-bg-1);
}

.ubits-container--bg-secondary {
  background: var(--ubits-bg-2);
}

.ubits-container--bg-tertiary {
  background: var(--ubits-bg-3);
}

/* Borders */
.ubits-container--border-default {
  border: 1px solid var(--ubits-border-1);
}

.ubits-container--border-primary {
  border: 1px solid var(--ubits-accent-brand);
}

.ubits-container--border-secondary {
  border: 1px solid var(--ubits-border-2);
}

.ubits-container--border-accent {
  border: 1px solid var(--ubits-accent-brand);
}

/* Shadows */
.ubits-container--shadow-none {
  box-shadow: none;
}

.ubits-container--shadow-sm {
  box-shadow: var(--ubits-shadow-sm);
}

.ubits-container--shadow-md {
  box-shadow: var(--ubits-shadow-md);
}

.ubits-container--shadow-lg {
  box-shadow: var(--ubits-shadow-lg);
}

.ubits-container--shadow-xl {
  box-shadow: var(--ubits-shadow-xl);
}

/* Radius */
.ubits-container--radius-none {
  border-radius: 0;
}

.ubits-container--radius-sm {
  border-radius: var(--ubits-radius-sm);
}

.ubits-container--radius-md {
  border-radius: var(--ubits-radius-md);
}

.ubits-container--radius-lg {
  border-radius: var(--ubits-radius-lg);
}

.ubits-container--radius-xl {
  border-radius: var(--ubits-radius-xl);
}

.ubits-container--radius-full {
  border-radius: var(--ubits-radius-full);
}

/* Responsive */
.ubits-container--mobile {
  padding: var(--ubits-responsive-padding-xs);
}

.ubits-container--tablet {
  padding: var(--ubits-responsive-padding-sm);
}

.ubits-container--desktop {
  padding: var(--ubits-responsive-padding-md);
}

/* Responsive breakpoints */
@media (max-width: 480px) {
  .ubits-container {
    padding: var(--ubits-responsive-padding-xs);
  }
  
  .ubits-container--padding-lg,
  .ubits-container--padding-xl {
    padding: var(--ubits-responsive-padding-xs);
  }
}

@media (max-width: 768px) {
  .ubits-container {
    padding: var(--ubits-responsive-padding-sm);
  }
  
  .ubits-container--padding-xl {
    padding: var(--ubits-responsive-padding-sm);
  }
}

@media (max-width: 1024px) {
  .ubits-container {
    padding: var(--ubits-responsive-padding-md);
  }
}

@media (min-width: 1280px) {
  .ubits-container {
    padding: var(--ubits-responsive-padding-lg);
  }
}

@media (min-width: 1536px) {
  .ubits-container {
    padding: var(--ubits-responsive-padding-xl);
  }
}

/* Modo oscuro */
[data-theme="dark"] .ubits-container--bg-primary {
  background: var(--ubits-bg-1-inverted);
}

[data-theme="dark"] .ubits-container--bg-secondary {
  background: var(--ubits-bg-2-inverted);
}

[data-theme="dark"] .ubits-container--bg-tertiary {
  background: var(--ubits-bg-3-inverted);
}

[data-theme="dark"] .ubits-container--border-default {
  border-color: var(--ubits-border-1);
}

[data-theme="dark"] .ubits-container--border-secondary {
  border-color: var(--ubits-border-2);
}

/* Utilidades */
.ubits-container--hidden {
  display: none !important;
}

.ubits-container--visible {
  display: block !important;
}

.ubits-container--flex {
  display: flex !important;
}

.ubits-container--grid {
  display: grid !important;
}
</style>
