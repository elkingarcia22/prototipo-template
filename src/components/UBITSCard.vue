<!--
  UBITS Card Component - Versión Moderna
  Recreación del componente Card del playground UBITS con tecnologías de punta
-->
<template>
  <div :class="cardClasses" v-bind="$attrs">
    <!-- Header del card -->
    <div v-if="$slots.header || title" class="ubits-card__header">
      <slot name="header">
        <div v-if="title" class="ubits-card__title">
          {{ title }}
        </div>
        <div v-if="subtitle" class="ubits-card__subtitle">
          {{ subtitle }}
        </div>
      </slot>
    </div>
    
    <!-- Imagen del card -->
    <div v-if="image || $slots.image" class="ubits-card__image">
      <slot name="image">
        <img v-if="image" :src="image" :alt="imageAlt" class="ubits-card__img" />
      </slot>
    </div>
    
    <!-- Contenido del card -->
    <div class="ubits-card__content">
      <slot></slot>
    </div>
    
    <!-- Footer del card -->
    <div v-if="$slots.footer || $slots.actions" class="ubits-card__footer">
      <slot name="footer">
        <div v-if="$slots.actions" class="ubits-card__actions">
          <slot name="actions"></slot>
        </div>
      </slot>
    </div>
    
    <!-- Overlay para estados -->
    <div v-if="loading || disabled" class="ubits-card__overlay">
      <div v-if="loading" class="ubits-card__loading">
        <i class="far fa-spinner fa-spin"></i>
        <span>Cargando...</span>
      </div>
      <div v-if="disabled" class="ubits-card__disabled">
        <i class="far fa-lock"></i>
        <span>No disponible</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

// Props del componente
interface Props {
  // Contenido
  title?: string
  subtitle?: string
  image?: string
  imageAlt?: string
  
  // Estados
  loading?: boolean
  disabled?: boolean
  selected?: boolean
  
  // Variantes
  variant?: 'default' | 'outlined' | 'elevated' | 'flat'
  size?: 'sm' | 'md' | 'lg'
  
  // Comportamiento
  clickable?: boolean
  hoverable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  loading: false,
  disabled: false,
  selected: false,
  clickable: false,
  hoverable: true
})

// Computed
const cardClasses = computed(() => [
  'ubits-card',
  `ubits-card--${props.variant}`,
  `ubits-card--${props.size}`,
  {
    'ubits-card--loading': props.loading,
    'ubits-card--disabled': props.disabled,
    'ubits-card--selected': props.selected,
    'ubits-card--clickable': props.clickable,
    'ubits-card--hoverable': props.hoverable
  }
])
</script>

<style scoped>
/* Importar tokens UBITS */
@import '../styles/ubits-tokens.css';

/* Base del card */
.ubits-card {
  display: flex;
  flex-direction: column;
  background: var(--ubits-bg-1);
  border-radius: var(--ubits-radius-lg);
  overflow: hidden;
  position: relative;
  transition: all 0.2s ease;
}

/* Header */
.ubits-card__header {
  padding: 20px 20px 0 20px;
  flex-shrink: 0;
}

.ubits-card__title {
  font-size: 18px;
  font-weight: 600;
  color: var(--ubits-fg-1-high);
  line-height: 1.4;
  margin-bottom: 4px;
}

.ubits-card__subtitle {
  font-size: 14px;
  color: var(--ubits-fg-1-medium);
  line-height: 1.4;
  margin-bottom: 16px;
}

/* Imagen */
.ubits-card__image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  flex-shrink: 0;
}

.ubits-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease;
}

/* Contenido */
.ubits-card__content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Footer */
.ubits-card__footer {
  padding: 0 20px 20px 20px;
  flex-shrink: 0;
}

.ubits-card__actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

/* Variantes */
.ubits-card--outlined {
  border: 1px solid var(--ubits-border-1);
  box-shadow: none;
}

.ubits-card--elevated {
  box-shadow: var(--ubits-shadow-lg);
  border: none;
}

.ubits-card--flat {
  box-shadow: none;
  border: none;
}

/* Tamaños */
.ubits-card--sm {
  max-width: 300px;
}

.ubits-card--sm .ubits-card__header,
.ubits-card--sm .ubits-card__content,
.ubits-card--sm .ubits-card__footer {
  padding: 16px;
}

.ubits-card--sm .ubits-card__image {
  height: 150px;
}

.ubits-card--sm .ubits-card__title {
  font-size: 16px;
}

.ubits-card--lg {
  max-width: 500px;
}

.ubits-card--lg .ubits-card__header,
.ubits-card--lg .ubits-card__content,
.ubits-card--lg .ubits-card__footer {
  padding: 24px;
}

.ubits-card--lg .ubits-card__image {
  height: 250px;
}

.ubits-card--lg .ubits-card__title {
  font-size: 20px;
}

/* Estados */
.ubits-card--loading {
  pointer-events: none;
}

.ubits-card--disabled {
  opacity: 0.6;
  pointer-events: none;
}

.ubits-card--selected {
  border: 2px solid var(--ubits-accent-brand);
  box-shadow: 0 0 0 3px var(--ubits-button-focus-ring);
}

.ubits-card--clickable {
  cursor: pointer;
}

.ubits-card--hoverable:hover:not(.ubits-card--disabled):not(.ubits-card--loading) {
  transform: translateY(-2px);
  box-shadow: var(--ubits-shadow-xl);
}

.ubits-card--hoverable:hover:not(.ubits-card--disabled):not(.ubits-card--loading) .ubits-card__img {
  transform: scale(1.05);
}

/* Overlay */
.ubits-card__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: var(--ubits-radius-lg);
}

.ubits-card__loading,
.ubits-card__disabled {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--ubits-fg-1-medium);
  font-size: 14px;
  font-weight: 500;
}

.ubits-card__loading i,
.ubits-card__disabled i {
  font-size: 24px;
  color: var(--ubits-fg-1-medium);
}

/* Responsive */
@media (max-width: 768px) {
  .ubits-card {
    max-width: 100%;
  }
  
  .ubits-card__header,
  .ubits-card__content,
  .ubits-card__footer {
    padding: 16px;
  }
  
  .ubits-card__image {
    height: 150px;
  }
  
  .ubits-card__title {
    font-size: 16px;
  }
  
  .ubits-card__actions {
    flex-direction: column;
    gap: 8px;
  }
}

/* Modo oscuro */
[data-theme="dark"] .ubits-card__overlay {
  background: rgba(0, 0, 0, 0.9);
}

[data-theme="dark"] .ubits-card--outlined {
  border-color: var(--ubits-border-1);
}

/* Utilidades */
.ubits-card--hidden {
  display: none !important;
}

.ubits-card--visible {
  display: flex !important;
}

/* Variantes especiales */
.ubits-card--compact {
  padding: 0;
}

.ubits-card--compact .ubits-card__header,
.ubits-card--compact .ubits-card__content,
.ubits-card--compact .ubits-card__footer {
  padding: 12px;
}

.ubits-card--spacious {
  padding: 0;
}

.ubits-card--spacious .ubits-card__header,
.ubits-card--spacious .ubits-card__content,
.ubits-card--spacious .ubits-card__footer {
  padding: 32px;
}

/* Efectos especiales */
.ubits-card--pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.ubits-card--shake {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

/* Grid layout */
.ubits-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.ubits-card-grid--sm {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.ubits-card-grid--lg {
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 32px;
}
</style>
