<!--
  UBITS Button Component - Versión Moderna
  Recreación del componente Button del playground UBITS con tecnologías de punta
-->
<template>
  <button 
    :class="buttonClasses" 
    :disabled="disabled"
    :type="type"
    @click="handleClick"
    v-bind="$attrs"
  >
    <!-- Icono izquierdo -->
    <i v-if="leftIcon" :class="leftIconClasses"></i>
    
    <!-- Contenido del botón -->
    <span v-if="$slots.default || text" class="ubits-button__text">
      <slot>{{ text }}</slot>
    </span>
    
    <!-- Icono derecho -->
    <i v-if="rightIcon" :class="rightIconClasses"></i>
    
    <!-- Badge de notificación -->
    <span v-if="badge" class="ubits-button__badge" :class="badgeClasses">
      {{ badge }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { useIcons } from '../utils/icons';
import { useFontAwesomeAPI } from '../utils/fontawesome-api';

import { computed, defineProps, defineEmits, useSlots } from 'vue'
import { useResponsive } from '../utils/responsive'

// Sistema de iconos Font Awesome
const { generateIcon, isIconAvailable } = useIcons();
const { searchIcons, generateIconHTML } = useFontAwesomeAPI({

// Función helper para obtener clases de iconos
const getIconClass = (iconName, style = 'far') => {
  if (isIconAvailable(iconName)) {
    return [style, `fa-${iconName}`];
  }
  return [style, `fa-${iconName}`]; // Fallback
};

// Función helper para generar HTML de iconos
const getIconHTML = (iconName, style = 'far', size = 'md') => {
  if (isIconAvailable(iconName)) {
    return generateIcon(iconName, style, size);
  }
  return `<i class="${style} fa-${iconName} fa-${size}"></i>`; // Fallback
};
  apiToken: '15ACD43C-4C0F-44D2-AE1C-6E8646841B1F',
  autoLoad: true,
  cache: true
});

// Props del componente
interface Props {
  // Variantes UBITS
  variant?: 'primary' | 'secondary' | 'tertiary'
  
  // Tamaños UBITS
  size?: 'sm' | 'md' | 'lg'
  
  // Estados
  disabled?: boolean
  
  // Tipo de botón HTML
  type?: 'button' | 'submit' | 'reset'
  
  // Contenido
  text?: string
  
  // Iconos FontAwesome
  leftIcon?: string
  rightIcon?: string
  
  // Badge de notificación
  badge?: string | number
  
  // Modificadores
  iconOnly?: boolean
  fullWidth?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  type: 'button',
  iconOnly: false,
  fullWidth: false,
  loading: false
})

// Emits
const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Slots
const slots = useSlots()

// Clases computadas
const buttonClasses = computed(() => {
  const classes = [
    'ubits-button',
    `ubits-button--${props.variant}`,
    `ubits-button--${props.size}`
  ]
  
  // Modificadores
  if (props.iconOnly) classes.push('ubits-button--icon-only')
  if (props.fullWidth) classes.push('ubits-button--full-width')
  if (props.loading) classes.push('ubits-button--loading')
  if (props.disabled) classes.push('ubits-button--disabled')
  
  return classes
})

const leftIconClasses = computed(() => {
  const classes = ['far', props.leftIcon]
  if (props.loading) classes.push('spin')
  return classes
})

const rightIconClasses = computed(() => {
  const classes = ['far', props.rightIcon]
  if (props.loading) classes.push('spin')
  return classes
})

const badgeClasses = computed(() => {
  return {
    'ubits-button__badge--number': typeof props.badge === 'number',
    'ubits-button__badge--text': typeof props.badge === 'string'
  }
})

// Handlers
const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    event.preventDefault()
    return
  }
  
  emit('click', event)
}
</script>

<style scoped>
/* Importar tokens UBITS */
@import '../styles/ubits-tokens.css';

/* Base del botón UBITS */
.ubits-button {
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  /* Box Model */
  border: 1px solid transparent;
  border-radius: var(--ubits-radius-sm);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  
  /* Transitions */
  transition: all 0.2s ease;
  
  /* Focus */
  outline: none;
  position: relative;
}

/* Tamaños UBITS */
.ubits-button--sm {
  height: 32px;
  padding: 0 12px;
  font-size: 14px;
  line-height: 1.4;
}

.ubits-button--md {
  height: 40px;
  padding: 0 16px;
  font-size: 16px;
  line-height: 1.5;
}

.ubits-button--lg {
  height: 48px;
  padding: 0 20px;
  font-size: 18px;
  line-height: 1.6;
}

/* Variantes UBITS */
.ubits-button--primary {
  background: var(--ubits-button-primary-bg-default);
  color: var(--ubits-btn-primary-fg);
  border-color: var(--ubits-button-primary-bg-default);
}

.ubits-button--primary:hover:not(:disabled) {
  background: var(--ubits-button-primary-hover);
  border-color: var(--ubits-button-primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--ubits-shadow-md);
}

.ubits-button--primary:active:not(:disabled) {
  background: var(--ubits-button-primary-pressed);
  border-color: var(--ubits-button-primary-pressed);
  transform: translateY(0);
}

.ubits-button--secondary {
  background: var(--ubits-btn-secondary-bg-default);
  color: var(--ubits-btn-secondary-fg-default);
  border-color: var(--ubits-btn-secondary-border);
}

.ubits-button--secondary:hover:not(:disabled) {
  background: var(--ubits-btn-secondary-bg-hover);
  border-color: var(--ubits-btn-secondary-border);
}

.ubits-button--secondary:active:not(:disabled) {
  background: var(--ubits-btn-secondary-bg-pressed);
}

.ubits-button--tertiary {
  background: transparent;
  color: var(--ubits-fg-1-high);
  border-color: var(--ubits-border-1);
}

.ubits-button--tertiary:hover:not(:disabled) {
  background: var(--ubits-bg-2);
  border-color: var(--ubits-border-2);
}

.ubits-button--tertiary:active:not(:disabled) {
  background: var(--ubits-bg-3);
}

/* Estados */
.ubits-button--disabled {
  background: var(--ubits-bg-disabled-button);
  color: var(--ubits-fg-on-disabled-button);
  border-color: var(--ubits-border-disabled-button);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.ubits-button--loading {
  cursor: wait;
  pointer-events: none;
}

/* Modificadores */
.ubits-button--icon-only {
  padding: 0;
  width: var(--ubits-button-height);
}

.ubits-button--icon-only.ubits-button--sm {
  width: 32px;
}

.ubits-button--icon-only.ubits-button--lg {
  width: 48px;
}

.ubits-button--full-width {
  width: 100%;
}

/* Focus ring UBITS */
.ubits-button:focus-visible {
  outline: 2px solid var(--ubits-button-focus-ring);
  outline-offset: 2px;
}

/* Texto del botón */
.ubits-button__text {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}

/* Badge de notificación */
.ubits-button__badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 9px;
  font-size: 11px;
  font-weight: 600;
  line-height: 18px;
  text-align: center;
  background: var(--ubits-feedback-accent-error);
  color: white;
  border: 2px solid var(--ubits-bg-1);
}

.ubits-button__badge--number {
  min-width: 18px;
}

.ubits-button__badge--text {
  min-width: auto;
  padding: 0 6px;
}

/* Iconos */
.ubits-button i {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: inherit;
  line-height: 1;
}

/* Responsive */
@media (max-width: 768px) {
  .ubits-button--sm {
    height: 28px;
    padding: 0 10px;
    font-size: 13px;
  }
  
  .ubits-button--md {
    height: 36px;
    padding: 0 14px;
    font-size: 15px;
  }
  
  .ubits-button--lg {
    height: 44px;
    padding: 0 18px;
    font-size: 17px;
  }
}

/* Modo oscuro */
[data-theme="dark"] .ubits-button--tertiary {
  color: var(--ubits-fg-1-high);
  border-color: var(--ubits-border-1);
}

[data-theme="dark"] .ubits-button--tertiary:hover:not(:disabled) {
  background: var(--ubits-bg-2);
  border-color: var(--ubits-border-2);
}

[data-theme="dark"] .ubits-button--tertiary:active:not(:disabled) {
  background: var(--ubits-bg-3);
}

/* Animaciones */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.ubits-button--loading i.spin {
  animation: spin 1s linear infinite;
}

/* Utilidades */
.ubits-button--hidden {
  display: none !important;
}

.ubits-button--visible {
  display: inline-flex !important;
}
</style>