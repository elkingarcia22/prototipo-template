# 🎨 Guía del Sistema de Tokens UBITS

## 📋 Índice

- [Introducción](#introducción)
- [Configuración](#configuración)
- [Tokens de Color](#tokens-de-color)
- [Tokens de Tipografía](#tokens-de-tipografía)
- [Tokens de Espaciado](#tokens-de-espaciado)
- [Tokens de Componentes](#tokens-de-componentes)
- [Modo Oscuro/Claro](#modo-oscuroclaro)
- [Integración con Tailwind](#integración-con-tailwind)
- [Integración con Alpine.js](#integración-con-alpinejs)
- [Integración con Vue.js](#integración-con-vuejs)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Mejores Prácticas](#mejores-prácticas)
- [Troubleshooting](#troubleshooting)

## 🚀 Introducción

El **Sistema de Tokens UBITS** es un sistema de diseño robusto que proporciona:

- ✅ **Consistencia visual** en todos los componentes
- ✅ **Modo oscuro/claro automático** con transiciones suaves
- ✅ **Integración completa** con Vite, Tailwind CSS, Alpine.js y Vue.js
- ✅ **Tokens de color oficiales** de UBITS
- ✅ **Componentes reutilizables** con estilos consistentes
- ✅ **Responsive design** automático
- ✅ **Accesibilidad** integrada

## ⚙️ Configuración

### 1. Instalación

```bash
# Instalar dependencias
npm install

# Instalar dependencias de desarrollo
npm install -D tailwindcss postcss autoprefixer
```

### 2. Configuración de Vite

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { ubitsThemePlugin } from './src/utils/theme.js';

export default defineConfig({
  plugins: [
    vue(),
    ubitsThemePlugin()
  ],
  css: {
    postcss: './postcss.config.js'
  }
});
```

### 3. Configuración de Tailwind

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ubits-brand': 'var(--ubits-accent-brand)',
        'ubits-text-primary': 'var(--ubits-fg-1-high)',
        'ubits-bg-primary': 'var(--ubits-bg-1)',
        // ... más colores UBITS
      }
    }
  },
  darkMode: 'class'
}
```

### 4. Configuración de Alpine.js

```javascript
// main.js
import Alpine from 'alpinejs';
import { ubitsThemePlugin } from './src/utils/alpine-theme.js';

Alpine.plugin(ubitsThemePlugin);
Alpine.start();
```

## 🎨 Tokens de Color

### Colores de Marca

```css
/* Colores principales UBITS */
--ubits-accent-brand: #0c5bef;
--ubits-accent-brand-inverted: #0c5bef;
--ubits-accent-brand-static: #0c5bef;
--ubits-accent-brand-static-inverted: #3865f5;
```

### Colores de Texto

```css
/* Texto principal */
--ubits-fg-1-high: #303a47;
--ubits-fg-1-high-inverted: #edeeef;
--ubits-fg-1-medium: #5c646f;
--ubits-fg-1-medium-inverted: #d0d2d5;

/* Texto secundario */
--ubits-fg-2-high: #2a303f;
--ubits-fg-2-high-inverted: #ffffff;
--ubits-fg-2-medium: #5a5e6a;
--ubits-fg-2-medium-inverted: #d0d2d5;
```

### Colores de Fondo

```css
/* Fondos principales */
--ubits-bg-1: #ffffff;
--ubits-bg-2: #F3F3F4;
--ubits-bg-3: #e7e8ea;
--ubits-bg-4: #dbdde0;
--ubits-bg-5: #ced0d5;
```

### Colores de Feedback

```css
/* Éxito */
--ubits-feedback-accent-success: #4ab028;
--ubits-feedback-bg-success-subtle: #e8f8e4;
--ubits-feedback-border-success: #41c433;

/* Información */
--ubits-feedback-accent-info: #7397fe;
--ubits-feedback-bg-info-subtle: #f3f2ff;
--ubits-feedback-border-info: #97a5fd;

/* Advertencia */
--ubits-feedback-accent-warning: #d68b0d;
--ubits-feedback-bg-warning-subtle: #fff1e0;
--ubits-feedback-border-warning: #ec9907;

/* Error */
--ubits-feedback-accent-error: #e9343c;
--ubits-feedback-bg-error-subtle: #fff0ee;
--ubits-feedback-border-error: #fd8a82;
```

## 📝 Tokens de Tipografía

### Clases de Utilidad

```css
/* Texto */
.ubits-text-primary { color: var(--ubits-fg-1-high); }
.ubits-text-secondary { color: var(--ubits-fg-1-medium); }
.ubits-text-disabled { color: var(--ubits-fg-disabled); }

/* Fondos */
.ubits-bg-primary { background-color: var(--ubits-bg-1); }
.ubits-bg-secondary { background-color: var(--ubits-bg-2); }
.ubits-bg-tertiary { background-color: var(--ubits-bg-3); }

/* Bordes */
.ubits-border-primary { border-color: var(--ubits-border-1); }
.ubits-border-secondary { border-color: var(--ubits-border-2); }
.ubits-border-disabled { border-color: var(--ubits-border-disabled); }
```

### Tipografía Responsiva

```css
/* Tamaños de texto UBITS */
.ubits-heading-1 { @apply text-3xl font-bold; }
.ubits-heading-2 { @apply text-2xl font-semibold; }
.ubits-heading-3 { @apply text-xl font-semibold; }
.ubits-body-large { @apply text-lg; }
.ubits-body-medium { @apply text-base; }
.ubits-body-small { @apply text-sm; }
.ubits-caption { @apply text-xs; }
```

## 📏 Tokens de Espaciado

### Espaciado UBITS

```css
/* Espaciado personalizado */
.ubits-spacing-xs { margin: var(--ubits-spacing-xs); }
.ubits-spacing-sm { margin: var(--ubits-spacing-sm); }
.ubits-spacing-md { margin: var(--ubits-spacing-md); }
.ubits-spacing-lg { margin: var(--ubits-spacing-lg); }
.ubits-spacing-xl { margin: var(--ubits-spacing-xl); }
```

### Border Radius

```css
/* Border radius UBITS */
.ubits-radius-sm { border-radius: var(--ubits-radius-sm); }
.ubits-radius-md { border-radius: var(--ubits-radius-md); }
.ubits-radius-lg { border-radius: var(--ubits-radius-lg); }
.ubits-radius-xl { border-radius: var(--ubits-radius-xl); }
```

## 🧩 Tokens de Componentes

### Botones

```css
/* Botón primario */
.ubits-button {
  background-color: var(--ubits-button-primary-bg-default);
  color: var(--ubits-btn-primary-fg);
  border: 1px solid var(--ubits-button-primary-bg-default);
}

.ubits-button:hover {
  background-color: var(--ubits-button-primary-hover);
  border-color: var(--ubits-button-primary-hover);
}

.ubits-button:active {
  background-color: var(--ubits-button-primary-pressed);
  border-color: var(--ubits-button-primary-pressed);
}
```

### Inputs

```css
/* Input UBITS */
.ubits-input {
  background-color: var(--ubits-bg-1);
  color: var(--ubits-fg-1-high);
  border: 1px solid var(--ubits-border-1);
}

.ubits-input:focus {
  border-color: var(--ubits-accent-brand);
  outline: 2px solid var(--ubits-button-focus-ring);
}
```

### Cards

```css
/* Card UBITS */
.ubits-card {
  background-color: var(--ubits-bg-1);
  border: 1px solid var(--ubits-border-1);
  color: var(--ubits-fg-1-high);
}
```

### Alertas

```css
/* Alerta de información */
.ubits-alert {
  border-color: var(--ubits-feedback-border-info);
  background-color: var(--ubits-feedback-bg-info-subtle);
  color: var(--ubits-feedback-fg-info-subtle);
}

/* Alerta de éxito */
.ubits-alert-success {
  border-color: var(--ubits-feedback-border-success);
  background-color: var(--ubits-feedback-bg-success-subtle);
  color: var(--ubits-feedback-fg-success-subtle);
}
```

## 🌙 Modo Oscuro/Claro

### Configuración Automática

```javascript
// Configurar tema automático
const ubitsTheme = new UBITSTheme({
  auto: true,
  storageKey: 'ubits-theme',
  classAttribute: 'data-theme'
});
```

### Cambio Manual de Tema

```javascript
// Cambiar a tema oscuro
ubitsTheme.setTheme('dark');

// Cambiar a tema claro
ubitsTheme.setTheme('light');

// Alternar tema
ubitsTheme.toggleTheme();
```

### Detección de Preferencia del Sistema

```javascript
// Escuchar cambios de preferencia del sistema
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (event) => {
    if (event.matches) {
      ubitsTheme.setTheme('dark', false);
    } else {
      ubitsTheme.setTheme('light', false);
    }
  });
```

## 🎯 Integración con Tailwind

### Configuración de Colores

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        'ubits-brand': 'var(--ubits-accent-brand)',
        'ubits-text-primary': 'var(--ubits-fg-1-high)',
        'ubits-bg-primary': 'var(--ubits-bg-1)',
        'ubits-border-primary': 'var(--ubits-border-1)',
        'ubits-success': 'var(--ubits-feedback-accent-success)',
        'ubits-info': 'var(--ubits-feedback-accent-info)',
        'ubits-warning': 'var(--ubits-feedback-accent-warning)',
        'ubits-error': 'var(--ubits-feedback-accent-error)',
      }
    }
  }
}
```

### Uso en Clases Tailwind

```html
<!-- Usar colores UBITS con Tailwind -->
<div class="bg-ubits-bg-primary text-ubits-text-primary border-ubits-border-primary">
  Contenido con colores UBITS
</div>

<button class="bg-ubits-brand hover:bg-ubits-brand-hover text-white">
  Botón con color UBITS
</button>
```

## 🏔️ Integración con Alpine.js

### Plugin de Tema

```javascript
// Configurar plugin de tema
Alpine.plugin(ubitsThemePlugin);
```

### Uso en Componentes

```html
<!-- Componente con tema UBITS -->
<div x-data="ubitsTheme()">
  <h1 x-text="currentTheme" class="text-ubits-text-primary"></h1>
  <button @click="toggleTheme()" class="bg-ubits-brand">
    Cambiar tema
  </button>
</div>
```

### Directivas Personalizadas

```html
<!-- Directiva de tema -->
<div x-ubits-theme="'dark'">
  Contenido con tema oscuro
</div>

<!-- Directiva de color -->
<div x-ubits-color="'#ff0000'" data-ubits-token="accent-brand">
  Contenido con color personalizado
</div>
```

## 🖼️ Integración con Vue.js

### Componente de Tema

```vue
<template>
  <div class="ubits-theme-container">
    <h1 :class="themeClasses">{{ currentTheme }}</h1>
    <button @click="toggleTheme" class="ubits-button">
      Cambiar tema
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { ubitsTheme } from '../utils/theme.js';

const currentTheme = computed(() => ubitsTheme.getCurrentTheme());
const isDark = computed(() => ubitsTheme.isDark());

const themeClasses = computed(() => ({
  'text-ubits-text-primary': true,
  'bg-ubits-bg-primary': true
}));

const toggleTheme = () => {
  ubitsTheme.toggleTheme();
};
</script>
```

### Composable de Tema

```javascript
// composables/useTheme.js
import { ref, computed } from 'vue';
import { ubitsTheme } from '../utils/theme.js';

export function useTheme() {
  const currentTheme = ref(ubitsTheme.getCurrentTheme());
  
  const isDark = computed(() => currentTheme.value === 'dark');
  const isLight = computed(() => currentTheme.value === 'light');
  
  const setTheme = (theme) => {
    ubitsTheme.setTheme(theme);
    currentTheme.value = theme;
  };
  
  const toggleTheme = () => {
    ubitsTheme.toggleTheme();
    currentTheme.value = ubitsTheme.getCurrentTheme();
  };
  
  return {
    currentTheme,
    isDark,
    isLight,
    setTheme,
    toggleTheme
  };
}
```

## 💡 Ejemplos de Uso

### Botón con Tema UBITS

```html
<button class="ubits-button">
  <i class="fas fa-plus mr-2"></i>
  Botón UBITS
</button>
```

### Input con Tema UBITS

```html
<input 
  type="text" 
  placeholder="Input UBITS"
  class="ubits-input"
>
```

### Card con Tema UBITS

```html
<div class="ubits-card">
  <h3 class="ubits-heading-3">Título</h3>
  <p class="ubits-body-medium">Contenido de la card</p>
</div>
```

### Alerta con Tema UBITS

```html
<div class="ubits-alert-success">
  <i class="fas fa-check-circle mr-2"></i>
  Mensaje de éxito
</div>
```

## ✅ Mejores Prácticas

### 1. Usar Tokens en Lugar de Colores Hardcodeados

```css
/* ❌ Malo */
.my-component {
  background-color: #0c5bef;
  color: #303a47;
}

/* ✅ Bueno */
.my-component {
  background-color: var(--ubits-accent-brand);
  color: var(--ubits-fg-1-high);
}
```

### 2. Usar Clases de Utilidad UBITS

```html
<!-- ❌ Malo -->
<div style="background-color: var(--ubits-bg-1); color: var(--ubits-fg-1-high);">
  Contenido
</div>

<!-- ✅ Bueno -->
<div class="ubits-bg-primary ubits-text-primary">
  Contenido
</div>
```

### 3. Configurar Tema Automático

```javascript
// ✅ Configurar tema automático
const ubitsTheme = new UBITSTheme({
  auto: true,
  storageKey: 'ubits-theme'
});
```

### 4. Usar Componentes UBITS

```vue
<!-- ✅ Usar componentes UBITS -->
<UBITSButton variant="primary" size="md">
  Botón UBITS
</UBITSButton>

<UBITSInput 
  type="text" 
  placeholder="Input UBITS"
  :required="true"
/>
```

## 🔧 Troubleshooting

### Problema: Los colores no cambian con el tema

**Solución:**
```css
/* Asegurar que se use la variable CSS correcta */
.my-component {
  background-color: var(--ubits-bg-1);
  color: var(--ubits-fg-1-high);
}
```

### Problema: El tema no se aplica automáticamente

**Solución:**
```javascript
// Verificar configuración del tema
const ubitsTheme = new UBITSTheme({
  auto: true,
  storageKey: 'ubits-theme'
});

// Verificar que el tema se aplique al documento
document.documentElement.setAttribute('data-theme', 'dark');
```

### Problema: Los tokens no se cargan en Tailwind

**Solución:**
```javascript
// Verificar configuración de Tailwind
export default {
  theme: {
    extend: {
      colors: {
        'ubits-brand': 'var(--ubits-accent-brand)',
        // ... más colores
      }
    }
  }
}
```

### Problema: Alpine.js no funciona con el tema

**Solución:**
```javascript
// Verificar que el plugin esté configurado
Alpine.plugin(ubitsThemePlugin);

// Verificar que Alpine.js esté iniciado
Alpine.start();
```

## 📚 Recursos Adicionales

- [Documentación de UBITS](https://ubits.com)
- [Guía de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de Alpine.js](https://alpinejs.dev)
- [Guía de Vue.js](https://vuejs.org/guide)
- [Documentación de Vite](https://vitejs.dev/guide)

## 🤝 Contribuir

Para contribuir al sistema de tokens UBITS:

1. Fork el repositorio
2. Crea una rama para tu feature
3. Implementa los cambios
4. Añade tests si es necesario
5. Envía un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.
