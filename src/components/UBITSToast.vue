<!--
  UBITS Toast Component - Versión Moderna
  Recreación del componente Toast del playground UBITS con tecnologías de punta
-->
<template>
  <Teleport to="body">
    <Transition name="ubits-toast" appear>
      <div 
        v-if="visible"
        :class="toastClasses"
        :role="role"
        :aria-live="ariaLive"
        v-bind="$attrs"
      >
        <!-- Icono -->
        <div class="ubits-toast__icon">
          <i :class="iconClasses"></i>
        </div>
        
        <!-- Contenido -->
        <div class="ubits-toast__content">
          <div class="ubits-toast__text">
            <slot>{{ message }}</slot>
          </div>
          <div v-if="$slots.actions" class="ubits-toast__actions">
            <slot name="actions"></slot>
          </div>
        </div>
        
        <!-- Botón de cerrar -->
        <button 
          v-if="!noClose" 
          class="ubits-toast__close"
          @click="handleClose"
          :aria-label="closeLabel"
          type="button"
        >
          <i class="far fa-times"></i>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch, defineProps, defineEmits } from 'vue'

// Props del componente
interface Props {
  // Tipo de toast
  type?: 'success' | 'info' | 'warning' | 'error'
  
  // Contenido
  message?: string
  
  // Comportamiento
  duration?: number
  noClose?: boolean
  pauseOnHover?: boolean
  
  // Accesibilidad
  closeLabel?: string
  
  // Estados
  visible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  duration: 3500,
  noClose: false,
  pauseOnHover: true,
  closeLabel: 'Cerrar notificación',
  visible: true
})

// Emits
const emit = defineEmits<{
  close: []
  closed: []
}>()

// Estado interno
const visible = ref(props.visible)
const closeTimeout = ref<NodeJS.Timeout | null>(null)
const isHovered = ref(false)

// Computed
const toastClasses = computed(() => [
  'ubits-toast',
  `ubits-toast--${props.type}`,
  {
    'ubits-toast--no-close': props.noClose,
    'ubits-toast--with-actions': !!$slots.actions,
    'ubits-toast--hovered': isHovered.value
  }
])

const iconClasses = computed(() => {
  const icons = {
    success: 'fa-check-circle',
    info: 'fa-info-circle',
    warning: 'fa-exclamation-triangle',
    error: 'fa-times-circle'
  }
  return ['far', icons[props.type]]
})

const role = computed(() => {
  return props.type === 'warning' || props.type === 'error' ? 'alert' : 'status'
})

const ariaLive = computed(() => {
  return props.type === 'warning' || props.type === 'error' ? 'assertive' : 'polite'
})

// Handlers
const handleClose = () => {
  visible.value = false
  emit('close')
  
  // Emitir evento después de la animación
  setTimeout(() => {
    emit('closed')
  }, 300)
}

const handleMouseEnter = () => {
  isHovered.value = true
  if (props.pauseOnHover) {
    clearAutoClose()
  }
}

const handleMouseLeave = () => {
  isHovered.value = false
  if (props.pauseOnHover) {
    setupAutoClose()
  }
}

// Auto close
const setupAutoClose = () => {
  if (props.duration > 0 && !isHovered.value) {
    closeTimeout.value = setTimeout(() => {
      handleClose()
    }, props.duration)
  }
}

const clearAutoClose = () => {
  if (closeTimeout.value) {
    clearTimeout(closeTimeout.value)
    closeTimeout.value = null
  }
}

// Lifecycle
onMounted(() => {
  setupAutoClose()
})

onUnmounted(() => {
  clearAutoClose()
})

// Watch para cambios en props
watch(() => props.visible, (newValue) => {
  visible.value = newValue
  if (newValue) {
    setupAutoClose()
  } else {
    clearAutoClose()
  }
})

watch(() => props.duration, () => {
  if (visible.value) {
    clearAutoClose()
    setupAutoClose()
  }
})

// Métodos públicos
const show = () => {
  visible.value = true
  setupAutoClose()
}

const hide = () => {
  handleClose()
}

// Exponer métodos
defineExpose({
  show,
  hide,
  visible: computed(() => visible.value)
})
</script>

<style scoped>
/* Importar tokens UBITS */
@import '../styles/ubits-tokens.css';

/* Base del toast */
.ubits-toast {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: var(--ubits-radius-md);
  border: 1px solid;
  font-size: 14px;
  line-height: 1.5;
  position: relative;
  overflow: hidden;
  max-width: 400px;
  min-width: 300px;
  box-shadow: var(--ubits-shadow-lg);
  backdrop-filter: blur(10px);
}

/* Icono */
.ubits-toast__icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  margin-top: 2px;
}

/* Contenido */
.ubits-toast__content {
  flex: 1;
  min-width: 0;
}

.ubits-toast__text {
  line-height: 1.5;
  font-weight: 500;
}

.ubits-toast__actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* Botón de cerrar */
.ubits-toast__close {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--ubits-radius-sm);
  transition: all 0.2s ease;
  opacity: 0.7;
}

.ubits-toast__close:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.1);
}

.ubits-toast__close:focus {
  outline: 2px solid var(--ubits-button-focus-ring);
  outline-offset: 2px;
}

/* Variantes de tipo */
.ubits-toast--success {
  background: var(--ubits-feedback-bg-success-subtle);
  color: var(--ubits-feedback-fg-success-subtle);
  border-color: var(--ubits-feedback-border-success);
}

.ubits-toast--success .ubits-toast__icon {
  color: var(--ubits-feedback-accent-success);
}

.ubits-toast--info {
  background: var(--ubits-feedback-bg-info-subtle);
  color: var(--ubits-feedback-fg-info-subtle);
  border-color: var(--ubits-feedback-border-info);
}

.ubits-toast--info .ubits-toast__icon {
  color: var(--ubits-feedback-accent-info);
}

.ubits-toast--warning {
  background: var(--ubits-feedback-bg-warning-subtle);
  color: var(--ubits-feedback-fg-warning-subtle);
  border-color: var(--ubits-feedback-border-warning);
}

.ubits-toast--warning .ubits-toast__icon {
  color: var(--ubits-feedback-accent-warning);
}

.ubits-toast--error {
  background: var(--ubits-feedback-bg-error-subtle);
  color: var(--ubits-feedback-fg-error-subtle);
  border-color: var(--ubits-feedback-border-error);
}

.ubits-toast--error .ubits-toast__icon {
  color: var(--ubits-feedback-accent-error);
}

/* Estados */
.ubits-toast--no-close {
  padding-right: 16px;
}

.ubits-toast--with-actions .ubits-toast__text {
  margin-bottom: 0;
}

/* Animaciones */
.ubits-toast-enter-active {
  transition: all 0.3s ease-out;
}

.ubits-toast-leave-active {
  transition: all 0.3s ease-in;
}

.ubits-toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.ubits-toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

/* Responsive */
@media (max-width: 768px) {
  .ubits-toast {
    padding: 12px;
    gap: 10px;
    max-width: 90vw;
    min-width: 280px;
  }
  
  .ubits-toast__icon {
    width: 18px;
    height: 18px;
    font-size: 14px;
  }
  
  .ubits-toast__close {
    width: 20px;
    height: 20px;
  }
  
  .ubits-toast--no-close {
    padding-right: 12px;
  }
}

/* Modo oscuro */
[data-theme="dark"] .ubits-toast__close:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Utilidades */
.ubits-toast--hidden {
  display: none !important;
}

.ubits-toast--visible {
  display: flex !important;
}

/* Variantes de tamaño */
.ubits-toast--sm {
  padding: 12px;
  font-size: 13px;
  max-width: 300px;
  min-width: 250px;
}

.ubits-toast--lg {
  padding: 20px;
  font-size: 16px;
  max-width: 500px;
  min-width: 350px;
}

/* Variantes de estilo */
.ubits-toast--outlined {
  background: transparent;
  border-width: 2px;
}

.ubits-toast--filled {
  border: none;
}

.ubits-toast--minimal {
  background: transparent;
  border: none;
  padding: 8px 0;
  box-shadow: none;
}

.ubits-toast--minimal .ubits-toast__icon {
  margin-top: 0;
}

/* Efectos especiales */
.ubits-toast--pulse {
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

.ubits-toast--shake {
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

/* Posicionamiento */
.ubits-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
}

.ubits-toast--top-left {
  top: 20px;
  left: 20px;
  right: auto;
}

.ubits-toast--top-center {
  top: 20px;
  left: 50%;
  right: auto;
  transform: translateX(-50%);
}

.ubits-toast--bottom-right {
  top: auto;
  bottom: 20px;
  right: 20px;
}

.ubits-toast--bottom-left {
  top: auto;
  bottom: 20px;
  left: 20px;
  right: auto;
}

.ubits-toast--bottom-center {
  top: auto;
  bottom: 20px;
  left: 50%;
  right: auto;
  transform: translateX(-50%);
}
</style>
