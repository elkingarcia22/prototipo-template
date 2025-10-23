<!--
  UBITS Input Component - Versión Moderna
  Recreación del componente Input del playground UBITS con tecnologías de punta
-->
<template>
  <div class="ubits-input-group" :class="inputGroupClasses">
    <!-- Label -->
    <label v-if="label" :for="inputId" class="ubits-input__label">
      {{ label }}
      <span v-if="required" class="ubits-input__required">*</span>
      <span v-if="optional" class="ubits-input__optional">(Opcional)</span>
    </label>
    
    <!-- Input Container -->
    <div class="ubits-input__container" :class="containerClasses">
      <!-- Left Icon -->
      <i v-if="leftIcon" :class="leftIconClasses" class="ubits-input__icon ubits-input__icon--left"></i>
      
      <!-- Input Element -->
      <input
        v-if="type !== 'select' && type !== 'textarea'"
        :id="inputId"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :maxlength="maxLength"
        :min="min"
        :max="max"
        :step="step"
        :pattern="pattern"
        :autocomplete="autocomplete"
        :class="inputClasses"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        v-bind="$attrs"
      />
      
      <!-- Textarea -->
      <textarea
        v-else-if="type === 'textarea'"
        :id="inputId"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :maxlength="maxLength"
        :rows="rows"
        :class="inputClasses"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        v-bind="$attrs"
      ></textarea>
      
      <!-- Select -->
      <select
        v-else-if="type === 'select'"
        :id="inputId"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        :class="inputClasses"
        @change="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        v-bind="$attrs"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option 
          v-for="option in selectOptions" 
          :key="option.value" 
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.text }}
        </option>
      </select>
      
      <!-- Right Icon -->
      <i v-if="rightIcon" :class="rightIconClasses" class="ubits-input__icon ubits-input__icon--right"></i>
      
      <!-- Clear Button -->
      <button 
        v-if="clearable && modelValue && !disabled" 
        type="button" 
        class="ubits-input__clear"
        @click="handleClear"
        aria-label="Limpiar campo"
      >
        <i class="far fa-times"></i>
      </button>
      
      <!-- Password Toggle -->
      <button 
        v-if="type === 'password' && !disabled" 
        type="button" 
        class="ubits-input__toggle"
        @click="togglePassword"
        aria-label="Mostrar/ocultar contraseña"
      >
        <i :class="passwordToggleIcon"></i>
      </button>
    </div>
    
    <!-- Helper Text -->
    <div v-if="showHelper" class="ubits-input__helper">
      <span v-if="helperText" class="ubits-input__helper-text">{{ helperText }}</span>
      <span v-if="showCounter && maxLength" class="ubits-input__counter">
        {{ characterCount }}/{{ maxLength }}
      </span>
    </div>
    
    <!-- Error Message -->
    <div v-if="errorMessage" class="ubits-input__error">
      <i class="far fa-exclamation-circle"></i>
      <span>{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, defineProps, defineEmits, nextTick } from 'vue'

// Props del componente
interface SelectOption {
  value: string | number
  text: string
  disabled?: boolean
}

interface Props {
  // Identificación
  id?: string
  label?: string
  
  // Contenido
  modelValue?: string | number
  placeholder?: string
  
  // Tipo de input
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'select' | 'textarea' | 'search' | 'autocomplete' | 'calendar'
  
  // Estados
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  optional?: boolean
  
  // Validación
  errorMessage?: string
  pattern?: string
  
  // Configuración
  size?: 'sm' | 'md' | 'lg'
  maxLength?: number
  min?: number
  max?: number
  step?: number
  rows?: number
  
  // Iconos
  leftIcon?: string
  rightIcon?: string
  
  // Opciones para select
  selectOptions?: SelectOption[]
  
  // Helper text
  helperText?: string
  showHelper?: boolean
  showCounter?: boolean
  clearable?: boolean
  
  // Autocomplete
  autocomplete?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'md',
  disabled: false,
  readonly: false,
  required: false,
  optional: false,
  showHelper: false,
  showCounter: false,
  clearable: false,
  rows: 3,
  selectOptions: () => []
})

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
  clear: []
}>()

// Estado interno
const isFocused = ref(false)
const showPassword = ref(false)

// Computed
const inputId = computed(() => props.id || `ubits-input-${Math.random().toString(36).substr(2, 9)}`)

const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})

const inputGroupClasses = computed(() => ({
  'ubits-input-group--error': !!props.errorMessage,
  'ubits-input-group--disabled': props.disabled,
  'ubits-input-group--focused': isFocused.value,
  'ubits-input-group--has-value': !!props.modelValue
}))

const containerClasses = computed(() => ({
  'ubits-input__container--has-left-icon': !!props.leftIcon,
  'ubits-input__container--has-right-icon': !!props.rightIcon,
  'ubits-input__container--has-clear': props.clearable && !!props.modelValue && !props.disabled,
  'ubits-input__container--has-toggle': props.type === 'password' && !props.disabled
}))

const inputClasses = computed(() => [
  'ubits-input',
  `ubits-input--${props.size}`,
  {
    'ubits-input--error': !!props.errorMessage,
    'ubits-input--disabled': props.disabled,
    'ubits-input--readonly': props.readonly,
    'ubits-input--focused': isFocused.value
  }
])

const leftIconClasses = computed(() => ['far', props.leftIcon])

const rightIconClasses = computed(() => ['far', props.rightIcon])

const passwordToggleIcon = computed(() => showPassword.value ? 'fa-eye-slash' : 'fa-eye')

const characterCount = computed(() => {
  if (typeof props.modelValue === 'string') {
    return props.modelValue.length
  }
  return 0
})

// Handlers
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  emit('update:modelValue', target.value)
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// Watch para validación automática
watch(() => props.modelValue, (newValue) => {
  if (props.type === 'email' && newValue) {
    validateEmail(newValue as string)
  }
})

// Validación de email
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    // Emitir evento de validación si es necesario
    console.warn('Email inválido:', email)
  }
}
</script>

<style scoped>
/* Importar tokens UBITS */
@import '../styles/ubits-tokens.css';

/* Grupo de input */
.ubits-input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

/* Label */
.ubits-input__label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ubits-fg-1-high);
  line-height: 1.4;
}

.ubits-input__required {
  color: var(--ubits-feedback-accent-error);
  font-weight: 600;
}

.ubits-input__optional {
  color: var(--ubits-fg-1-medium);
  font-size: 12px;
  font-weight: 400;
}

/* Container del input */
.ubits-input__container {
  position: relative;
  display: flex;
  align-items: center;
}

/* Input base */
.ubits-input {
  width: 100%;
  border: 1px solid var(--ubits-border-1);
  border-radius: var(--ubits-radius-sm);
  background: var(--ubits-bg-1);
  color: var(--ubits-fg-1-high);
  font-family: inherit;
  font-size: 16px;
  line-height: 1.5;
  transition: all 0.2s ease;
  outline: none;
}

.ubits-input:focus {
  border-color: var(--ubits-accent-brand);
  box-shadow: 0 0 0 3px var(--ubits-button-focus-ring);
}

.ubits-input::placeholder {
  color: var(--ubits-fg-1-medium);
}

/* Tamaños */
.ubits-input--sm {
  height: 32px;
  padding: 0 12px;
  font-size: 14px;
}

.ubits-input--md {
  height: 40px;
  padding: 0 16px;
  font-size: 16px;
}

.ubits-input--lg {
  height: 48px;
  padding: 0 20px;
  font-size: 18px;
}

/* Ajustes de padding para iconos */
.ubits-input__container--has-left-icon .ubits-input {
  padding-left: 40px;
}

.ubits-input__container--has-right-icon .ubits-input {
  padding-right: 40px;
}

.ubits-input__container--has-clear .ubits-input {
  padding-right: 40px;
}

.ubits-input__container--has-toggle .ubits-input {
  padding-right: 40px;
}

/* Textarea */
.ubits-input[type="textarea"] {
  min-height: 80px;
  padding: 12px 16px;
  resize: vertical;
}

/* Estados */
.ubits-input--error {
  border-color: var(--ubits-feedback-accent-error);
}

.ubits-input--error:focus {
  border-color: var(--ubits-feedback-accent-error);
  box-shadow: 0 0 0 3px var(--ubits-feedback-bg-error-subtle);
}

.ubits-input--disabled {
  background: var(--ubits-bg-disabled);
  color: var(--ubits-fg-disabled);
  border-color: var(--ubits-border-disabled);
  cursor: not-allowed;
}

.ubits-input--readonly {
  background: var(--ubits-bg-2);
  cursor: default;
}

/* Iconos */
.ubits-input__icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: var(--ubits-fg-1-medium);
  pointer-events: none;
  z-index: 1;
}

.ubits-input__icon--left {
  left: 12px;
}

.ubits-input__icon--right {
  right: 12px;
}

/* Botones de acción */
.ubits-input__clear,
.ubits-input__toggle {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  color: var(--ubits-fg-1-medium);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
  z-index: 2;
}

.ubits-input__clear:hover,
.ubits-input__toggle:hover {
  background: var(--ubits-bg-3);
  color: var(--ubits-fg-1-high);
}

/* Helper text */
.ubits-input__helper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  line-height: 1.4;
}

.ubits-input__helper-text {
  color: var(--ubits-fg-1-medium);
}

.ubits-input__counter {
  color: var(--ubits-fg-1-medium);
  font-weight: 500;
}

/* Error message */
.ubits-input__error {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--ubits-feedback-fg-error-subtle);
  line-height: 1.4;
}

.ubits-input__error i {
  font-size: 14px;
}

/* Estados del grupo */
.ubits-input-group--error .ubits-input__label {
  color: var(--ubits-feedback-accent-error);
}

.ubits-input-group--disabled .ubits-input__label {
  color: var(--ubits-fg-disabled);
}

.ubits-input-group--focused .ubits-input__label {
  color: var(--ubits-accent-brand);
}

/* Responsive */
@media (max-width: 768px) {
  .ubits-input--sm {
    height: 28px;
    padding: 0 10px;
    font-size: 13px;
  }
  
  .ubits-input--md {
    height: 36px;
    padding: 0 14px;
    font-size: 15px;
  }
  
  .ubits-input--lg {
    height: 44px;
    padding: 0 18px;
    font-size: 17px;
  }
}

/* Modo oscuro */
[data-theme="dark"] .ubits-input {
  background: var(--ubits-bg-1);
  color: var(--ubits-fg-1-high);
  border-color: var(--ubits-border-1);
}

[data-theme="dark"] .ubits-input:focus {
  border-color: var(--ubits-accent-brand);
  box-shadow: 0 0 0 3px var(--ubits-button-focus-ring);
}

[data-theme="dark"] .ubits-input--readonly {
  background: var(--ubits-bg-2);
}

/* Utilidades */
.ubits-input-group--hidden {
  display: none !important;
}

.ubits-input-group--visible {
  display: flex !important;
}
</style>