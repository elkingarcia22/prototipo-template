<template>
  <div class="ubits-input-container">
    <!-- Label -->
    <label v-if="label" :for="inputId" class="ubits-input-label">
      {{ label }}
      <span v-if="mandatory" class="ubits-input-mandatory">
        ({{ mandatoryType }})
      </span>
    </label>

    <!-- Input Wrapper -->
    <div class="ubits-input-wrapper" :class="wrapperClasses">
      <!-- Left Icon -->
      <i v-if="leftIcon" :class="leftIconClasses" />
      
      <!-- Input Element -->
      <input
        :id="inputId"
        ref="inputRef"
        v-model="inputValue"
        :type="inputType"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxLength"
        :autocomplete="autocomplete"
        :class="inputClasses"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      />
      
      <!-- Right Icon -->
      <i v-if="rightIcon" :class="rightIconClasses" />
      
      <!-- Clear Button (for search type) -->
      <button
        v-if="showClearButton"
        type="button"
        class="ubits-input-clear"
        @click="clearInput"
      >
        <i class="far fa-times" />
      </button>
    </div>

    <!-- Helper Text and Counter -->
    <div v-if="showHelper || showCounter" class="ubits-input-helper">
      <span v-if="showHelper && helperText" class="ubits-input-helper-text">
        {{ helperText }}
      </span>
      <span v-if="showCounter" class="ubits-input-counter">
        {{ currentLength }}/{{ maxLength }}
      </span>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="ubits-input-error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue';
import { ubitsTheme } from '../utils/theme';

export interface UBITSInputProps {
  modelValue?: string | number;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  size?: 'sm' | 'md' | 'lg';
  state?: 'default' | 'focus' | 'error' | 'disabled';
  disabled?: boolean;
  required?: boolean;
  mandatory?: boolean;
  mandatoryType?: 'obligatorio' | 'opcional';
  leftIcon?: string;
  rightIcon?: string;
  showHelper?: boolean;
  showCounter?: boolean;
  maxLength?: number;
  autocomplete?: string;
  validateOnInput?: boolean;
  validationRules?: Array<(value: string) => string | null>;
}

const props = withDefaults(defineProps<UBITSInputProps>(), {
  type: 'text',
  size: 'md',
  state: 'default',
  disabled: false,
  required: false,
  mandatory: false,
  mandatoryType: 'obligatorio',
  showHelper: false,
  showCounter: false,
  maxLength: 50,
  validateOnInput: true,
  validationRules: () => []
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
  'input': [value: string | number];
  'focus': [event: FocusEvent];
  'blur': [event: FocusEvent];
  'keydown': [event: KeyboardEvent];
  'validate': [isValid: boolean, errors: string[]];
}>();

const inputRef = ref<HTMLInputElement>();
const inputValue = ref(props.modelValue || '');
const isFocused = ref(false);
const isHovered = ref(false);
const validationErrors = ref<string[]>([]);

const inputId = computed(() => `ubits-input-${Math.random().toString(36).substr(2, 9)}`);

const currentLength = computed(() => String(inputValue.value).length);

const showClearButton = computed(() => 
  props.type === 'search' && inputValue.value && !props.disabled
);

const inputType = computed(() => {
  if (props.type === 'password') {
    return 'password';
  }
  return props.type;
});

const wrapperClasses = computed(() => {
  const classes = ['ubits-input-wrapper'];
  
  if (props.size) {
    classes.push(`ubits-input-wrapper--${props.size}`);
  }
  
  if (props.state === 'error' || validationErrors.value.length > 0) {
    classes.push('ubits-input-wrapper--error');
  }
  
  if (props.disabled) {
    classes.push('ubits-input-wrapper--disabled');
  }
  
  if (isFocused.value) {
    classes.push('ubits-input-wrapper--focused');
  }
  
  if (isHovered.value) {
    classes.push('ubits-input-wrapper--hovered');
  }
  
  return classes;
});

const inputClasses = computed(() => {
  const classes = ['ubits-input'];
  
  if (props.size) {
    classes.push(`ubits-input--${props.size}`);
  }
  
  if (props.state === 'error' || validationErrors.value.length > 0) {
    classes.push('ubits-input--error');
  }
  
  if (props.disabled) {
    classes.push('ubits-input--disabled');
  }
  
  if (isFocused.value) {
    classes.push('ubits-input--focused');
  }
  
  return classes;
});

const leftIconClasses = computed(() => {
  if (!props.leftIcon) return '';
  
  const baseClasses = props.leftIcon.startsWith('fa-') 
    ? `far ${props.leftIcon}` 
    : props.leftIcon;
    
  return `${baseClasses} ubits-input-icon ubits-input-icon--left`;
});

const rightIconClasses = computed(() => {
  if (!props.rightIcon) return '';
  
  const baseClasses = props.rightIcon.startsWith('fa-') 
    ? `far ${props.rightIcon}` 
    : props.rightIcon;
    
  return `${baseClasses} ubits-input-icon ubits-input-icon--right`;
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  
  inputValue.value = value;
  emit('update:modelValue', value);
  emit('input', value);
  
  if (props.validateOnInput) {
    validateInput(value);
  }
};

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true;
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false;
  emit('blur', event);
  
  // Validar al perder el foco
  validateInput(inputValue.value);
};

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event);
};

const clearInput = () => {
  inputValue.value = '';
  emit('update:modelValue', '');
  emit('input', '');
  
  if (inputRef.value) {
    inputRef.value.focus();
  }
};

const validateInput = (value: string) => {
  const errors: string[] = [];
  
  if (props.required && !value.trim()) {
    errors.push('Este campo es obligatorio');
  }
  
  if (props.maxLength && value.length > props.maxLength) {
    errors.push(`Máximo ${props.maxLength} caracteres`);
  }
  
  // Aplicar reglas de validación personalizadas
  props.validationRules.forEach(rule => {
    const error = rule(value);
    if (error) {
      errors.push(error);
    }
  });
  
  validationErrors.value = errors;
  emit('validate', errors.length === 0, errors);
};

// Watchers
watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue || '';
});

watch(() => props.state, (newState) => {
  if (newState === 'error') {
    validationErrors.value = ['Error de validación'];
  }
});

// Exponer métodos para uso externo
defineExpose({
  focus: () => {
    if (inputRef.value) {
      inputRef.value.focus();
    }
  },
  blur: () => {
    if (inputRef.value) {
      inputRef.value.blur();
    }
  },
  clear: clearInput,
  validate: () => validateInput(inputValue.value),
  getValue: () => inputValue.value,
  setValue: (value: string) => {
    inputValue.value = value;
    emit('update:modelValue', value);
  }
});
</script>

<style scoped>
.ubits-input-container {
  @apply w-full;
}

.ubits-input-label {
  @apply block text-sm font-medium mb-2;
  color: var(--ubits-fg-1-high);
}

.ubits-input-mandatory {
  @apply text-xs font-normal;
  color: var(--ubits-fg-1-medium);
}

.ubits-input-wrapper {
  @apply relative flex items-center;
}

.ubits-input {
  @apply w-full rounded-lg border transition-all duration-200;
  background-color: var(--ubits-bg-1);
  color: var(--ubits-fg-1-high);
  border-color: var(--ubits-border-1);
}

.ubits-input:focus {
  border-color: var(--ubits-accent-brand);
  outline: 2px solid var(--ubits-button-focus-ring);
  outline-offset: 0;
}

.ubits-input:disabled {
  background-color: var(--ubits-bg-disabled);
  color: var(--ubits-fg-disabled);
  border-color: var(--ubits-border-disabled);
  cursor: not-allowed;
}

.ubits-input--error {
  border-color: var(--ubits-feedback-accent-error);
}

.ubits-input--error:focus {
  border-color: var(--ubits-feedback-accent-error);
  outline-color: var(--ubits-feedback-accent-error);
}

/* Tamaños */
.ubits-input--sm {
  @apply px-3 py-1.5 text-sm;
}

.ubits-input--md {
  @apply px-4 py-2 text-base;
}

.ubits-input--lg {
  @apply px-5 py-3 text-lg;
}

/* Iconos */
.ubits-input-icon {
  @apply absolute flex-shrink-0 pointer-events-none;
  color: var(--ubits-fg-1-medium);
}

.ubits-input-icon--left {
  @apply left-3;
  top: 50%;
  transform: translateY(-50%);
}

.ubits-input-icon--right {
  @apply right-3;
  top: 50%;
  transform: translateY(-50%);
}

/* Padding con iconos */
.ubits-input-wrapper:has(.ubits-input-icon--left) .ubits-input {
  padding-left: 2.5rem;
}

.ubits-input-wrapper:has(.ubits-input-icon--right) .ubits-input {
  padding-right: 2.5rem;
}

/* Clear Button */
.ubits-input-clear {
  @apply absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-all duration-200;
  background-color: var(--ubits-bg-2);
  color: var(--ubits-fg-1-medium);
}

.ubits-input-clear:hover {
  background-color: var(--ubits-bg-3);
  color: var(--ubits-fg-1-high);
}

/* Helper Text */
.ubits-input-helper {
  @apply flex justify-between items-center mt-1 text-sm;
}

.ubits-input-helper-text {
  color: var(--ubits-fg-1-medium);
}

.ubits-input-counter {
  color: var(--ubits-fg-1-medium);
}

.ubits-input-counter:has-text(over) {
  color: var(--ubits-feedback-accent-error);
  font-weight: 600;
}

/* Error Message */
.ubits-input-error {
  @apply mt-1 text-sm;
  color: var(--ubits-feedback-accent-error);
}

/* Estados del wrapper */
.ubits-input-wrapper--focused .ubits-input {
  border-color: var(--ubits-accent-brand);
  outline: 2px solid var(--ubits-button-focus-ring);
  outline-offset: 0;
}

.ubits-input-wrapper--error .ubits-input {
  border-color: var(--ubits-feedback-accent-error);
}

.ubits-input-wrapper--disabled .ubits-input {
  background-color: var(--ubits-bg-disabled);
  color: var(--ubits-fg-disabled);
  border-color: var(--ubits-border-disabled);
  cursor: not-allowed;
}

.ubits-input-wrapper--hovered:not(.ubits-input-wrapper--disabled) .ubits-input {
  border-color: var(--ubits-accent-brand);
}

/* Responsive */
@media (max-width: 768px) {
  .ubits-input--sm {
    @apply px-2 py-1 text-xs;
  }
  
  .ubits-input--md {
    @apply px-3 py-1.5 text-sm;
  }
  
  .ubits-input--lg {
    @apply px-4 py-2 text-base;
  }
}
</style>

