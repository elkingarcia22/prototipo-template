<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    :type="type"
    @click="handleClick"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <i v-if="leftIcon" :class="leftIconClasses" />
    <span v-if="$slots.default" class="ubits-button-content">
      <slot />
    </span>
    <i v-if="rightIcon" :class="rightIconClasses" />
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ubitsTheme } from '../utils/theme';

export interface UBITSButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  state?: 'default' | 'hover' | 'focus' | 'active' | 'disabled';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  loading?: boolean;
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<UBITSButtonProps>(), {
  variant: 'primary',
  size: 'md',
  state: 'default',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false
});

const emit = defineEmits<{
  click: [event: MouseEvent];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

const isFocused = ref(false);
const isHovered = ref(false);

const buttonClasses = computed(() => {
  const classes = [
    'ubits-button',
    `ubits-button--${props.variant}`,
    `ubits-button--${props.size}`,
    `ubits-button--${props.state}`
  ];

  if (props.disabled) {
    classes.push('ubits-button--disabled');
  }

  if (props.loading) {
    classes.push('ubits-button--loading');
  }

  if (props.fullWidth) {
    classes.push('ubits-button--full-width');
  }

  if (isFocused.value) {
    classes.push('ubits-button--focused');
  }

  if (isHovered.value) {
    classes.push('ubits-button--hovered');
  }

  return classes;
});

const leftIconClasses = computed(() => {
  if (!props.leftIcon) return '';
  
  const baseClasses = props.leftIcon.startsWith('fa-') 
    ? `far ${props.leftIcon}` 
    : props.leftIcon;
    
  return `${baseClasses} ubits-button-icon ubits-button-icon--left`;
});

const rightIconClasses = computed(() => {
  if (!props.rightIcon) return '';
  
  const baseClasses = props.rightIcon.startsWith('fa-') 
    ? `far ${props.rightIcon}` 
    : props.rightIcon;
    
  return `${baseClasses} ubits-button-icon ubits-button-icon--right`;
});

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    event.preventDefault();
    return;
  }
  
  emit('click', event);
};

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true;
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false;
  emit('blur', event);
};

// Exponer métodos para uso externo
defineExpose({
  focus: () => {
    // Implementar focus si es necesario
  },
  blur: () => {
    // Implementar blur si es necesario
  }
});
</script>

<style scoped>
.ubits-button {
  @apply inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer;
  background-color: var(--ubits-button-primary-bg-default);
  color: var(--ubits-btn-primary-fg);
  border: 1px solid var(--ubits-button-primary-bg-default);
}

.ubits-button:hover:not(:disabled) {
  background-color: var(--ubits-button-primary-hover);
  border-color: var(--ubits-button-primary-hover);
}

.ubits-button:active:not(:disabled) {
  background-color: var(--ubits-button-primary-pressed);
  border-color: var(--ubits-button-primary-pressed);
}

.ubits-button:focus {
  outline: 2px solid var(--ubits-button-focus-ring);
  outline-offset: 2px;
}

.ubits-button:disabled {
  background-color: var(--ubits-bg-disabled-button);
  color: var(--ubits-fg-on-disabled-button);
  border-color: var(--ubits-border-disabled-button);
  cursor: not-allowed;
}

/* Variantes */
.ubits-button--secondary {
  background-color: var(--ubits-btn-secondary-bg-default);
  color: var(--ubits-btn-secondary-fg-default);
  border-color: var(--ubits-btn-secondary-border);
}

.ubits-button--secondary:hover:not(:disabled) {
  background-color: var(--ubits-btn-secondary-bg-hover);
}

.ubits-button--secondary:active:not(:disabled) {
  background-color: var(--ubits-btn-secondary-bg-pressed);
}

.ubits-button--tertiary {
  background-color: transparent;
  color: var(--ubits-btn-tertiary-fg);
  border-color: transparent;
}

.ubits-button--tertiary:hover:not(:disabled) {
  background-color: var(--ubits-btn-tertiary-bg-hover);
}

.ubits-button--tertiary:active:not(:disabled) {
  background-color: var(--ubits-btn-tertiary-bg-pressed);
}

/* Tamaños */
.ubits-button--sm {
  @apply px-3 py-1.5 text-sm;
}

.ubits-button--md {
  @apply px-4 py-2 text-base;
}

.ubits-button--lg {
  @apply px-6 py-3 text-lg;
}

/* Estados */
.ubits-button--loading {
  position: relative;
  color: transparent;
}

.ubits-button--loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 16px;
  margin: -8px 0 0 -8px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: ubits-spin 1s linear infinite;
}

.ubits-button--full-width {
  @apply w-full;
}

/* Iconos */
.ubits-button-icon {
  @apply flex-shrink-0;
  color: inherit;
}

.ubits-button-icon--left {
  @apply mr-1;
}

.ubits-button-icon--right {
  @apply ml-1;
}

.ubits-button-content {
  @apply flex-1;
}

/* Animaciones */
@keyframes ubits-spin {
  to {
    transform: rotate(360deg);
  }
}

/* Estados de foco y hover */
.ubits-button--focused {
  outline: 2px solid var(--ubits-button-focus-ring);
  outline-offset: 2px;
}

.ubits-button--hovered {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Responsive */
@media (max-width: 768px) {
  .ubits-button--sm {
    @apply px-2 py-1 text-xs;
  }
  
  .ubits-button--md {
    @apply px-3 py-1.5 text-sm;
  }
  
  .ubits-button--lg {
    @apply px-4 py-2 text-base;
  }
}
</style>

