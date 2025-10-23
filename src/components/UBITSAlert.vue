<!--
  UBITS Alert Component - Versión Moderna
  Recreación del componente Alert del playground UBITS con tecnologías de punta
-->
<template>
  <Transition name="ubits-alert" appear>
    <div 
      v-if="visible"
      :class="alertClasses"
      :role="role"
      :aria-live="ariaLive"
      v-bind="$attrs"
    >
      <!-- Icono -->
      <div class="ubits-alert__icon">
        <i :class="iconClasses"></i>
      </div>
      
      <!-- Contenido -->
      <div class="ubits-alert__content">
        <div v-if="title" class="ubits-alert__title">
          {{ title }}
        </div>
        <div class="ubits-alert__text">
          <slot>{{ message }}</slot>
        </div>
        <div v-if="$slots.actions" class="ubits-alert__actions">
          <slot name="actions"></slot>
        </div>
      </div>
      
      <!-- Botón de cerrar -->
      <button 
        v-if="closable" 
        class="ubits-alert__close"
        @click="handleClose"
        :aria-label="closeLabel"
        type="button"
      >
        <i class="far fa-times"></i>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, defineProps, defineEmits } from 'vue'

// Props del componente
interface Props {
  // Tipo de alerta
  type?: 'success' | 'info' | 'warning' | 'error'
  
  // Contenido
  title?: string
  message?: string
  
  // Comportamiento
  closable?: boolean
  autoClose?: boolean
  duration?: number
  
  // Accesibilidad
  closeLabel?: string
  
  // Estados
  visible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  closable: true,
  autoClose: false,
  duration: 5000,
  closeLabel: 'Cerrar alerta',
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

// Computed
const alertClasses = computed(() => [
  'ubits-alert',
  `ubits-alert--${props.type}`,
  {
    'ubits-alert--closable': props.closable,
    'ubits-alert--with-title': !!props.title,
    'ubits-alert--with-actions': !!$slots.actions
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

// Auto close
const setupAutoClose = () => {
  if (props.autoClose && props.duration > 0) {
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

watch(() => props.autoClose, (newValue) => {
  if (newValue) {
    setupAutoClose()
  } else {
    clearAutoClose()
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

/* Base del alert */
.ubits-alert {
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
}

/* Icono */
.ubits-alert__icon {
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
.ubits-alert__content {
  flex: 1;
  min-width: 0;
}

.ubits-alert__title {
  font-weight: 600;
  margin-bottom: 4px;
  line-height: 1.4;
}

.ubits-alert__text {
  line-height: 1.5;
}

.ubits-alert__actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* Botón de cerrar */
.ubits-alert__close {
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

.ubits-alert__close:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.1);
}

.ubits-alert__close:focus {
  outline: 2px solid var(--ubits-button-focus-ring);
  outline-offset: 2px;
}

/* Variantes de tipo */
.ubits-alert--success {
  background: var(--ubits-feedback-bg-success-subtle);
  color: var(--ubits-feedback-fg-success-subtle);
  border-color: var(--ubits-feedback-border-success);
}

.ubits-alert--success .ubits-alert__icon {
  color: var(--ubits-feedback-accent-success);
}

.ubits-alert--info {
  background: var(--ubits-feedback-bg-info-subtle);
  color: var(--ubits-feedback-fg-info-subtle);
  border-color: var(--ubits-feedback-border-info);
}

.ubits-alert--info .ubits-alert__icon {
  color: var(--ubits-feedback-accent-info);
}

.ubits-alert--warning {
  background: var(--ubits-feedback-bg-warning-subtle);
  color: var(--ubits-feedback-fg-warning-subtle);
  border-color: var(--ubits-feedback-border-warning);
}

.ubits-alert--warning .ubits-alert__icon {
  color: var(--ubits-feedback-accent-warning);
}

.ubits-alert--error {
  background: var(--ubits-feedback-bg-error-subtle);
  color: var(--ubits-feedback-fg-error-subtle);
  border-color: var(--ubits-feedback-border-error);
}

.ubits-alert--error .ubits-alert__icon {
  color: var(--ubits-feedback-accent-error);
}

/* Estados */
.ubits-alert--closable {
  padding-right: 48px;
}

.ubits-alert--with-title .ubits-alert__text {
  margin-top: 4px;
}

.ubits-alert--with-actions .ubits-alert__text {
  margin-bottom: 0;
}

/* Animaciones */
.ubits-alert-enter-active {
  transition: all 0.3s ease-out;
}

.ubits-alert-leave-active {
  transition: all 0.3s ease-in;
}

.ubits-alert-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.ubits-alert-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

/* Responsive */
@media (max-width: 768px) {
  .ubits-alert {
    padding: 12px;
    gap: 10px;
  }
  
  .ubits-alert__icon {
    width: 18px;
    height: 18px;
    font-size: 14px;
  }
  
  .ubits-alert__close {
    width: 20px;
    height: 20px;
  }
  
  .ubits-alert--closable {
    padding-right: 40px;
  }
}

/* Modo oscuro */
[data-theme="dark"] .ubits-alert__close:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Utilidades */
.ubits-alert--hidden {
  display: none !important;
}

.ubits-alert--visible {
  display: flex !important;
}

/* Variantes de tamaño */
.ubits-alert--sm {
  padding: 12px;
  font-size: 13px;
}

.ubits-alert--lg {
  padding: 20px;
  font-size: 16px;
}

/* Variantes de estilo */
.ubits-alert--outlined {
  background: transparent;
  border-width: 2px;
}

.ubits-alert--filled {
  border: none;
}

.ubits-alert--minimal {
  background: transparent;
  border: none;
  padding: 8px 0;
}

.ubits-alert--minimal .ubits-alert__icon {
  margin-top: 0;
}

/* Efectos especiales */
.ubits-alert--pulse {
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

.ubits-alert--shake {
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
</style>
