# 🔧 Troubleshooting

Guía completa para solucionar problemas comunes en el template de prototipos.

## 🚨 Problemas Comunes

### 1. Variables de Entorno

#### ❌ Problema: Variables no se cargan
```bash
# Error: Variables de entorno no están disponibles
console.log(import.meta.env.VITE_CLARITY_PROJECT_ID); // undefined
```

#### ✅ Solución:
```bash
# 1. Verificar que el archivo .env existe
ls -la .env

# 2. Verificar contenido del archivo
cat .env

# 3. Verificar que las variables empiezan con VITE_
echo "VITE_CLARITY_PROJECT_ID=tu_project_id" >> .env
echo "VITE_N8N_FEEDBACK_WEBHOOK_URL=https://tu-webhook.com/feedback" >> .env

# 4. Reiniciar servidor de desarrollo
npm run dev
```

#### 🔍 Debug:
```javascript
// Verificar todas las variables de entorno
console.log('All env vars:', import.meta.env);

// Verificar variables específicas
console.log('Clarity ID:', import.meta.env.VITE_CLARITY_PROJECT_ID);
console.log('Webhook URL:', import.meta.env.VITE_N8N_FEEDBACK_WEBHOOK_URL);
```

### 2. Componentes No Cargan

#### ❌ Problema: Componentes no se inicializan
```javascript
// Error: Componentes no están disponibles
console.log(window.OnboardingSystem); // undefined
console.log(window.ClarityIntegration); // undefined
console.log(window.FeedbackSystem); // undefined
```

#### ✅ Solución:
```html
<!-- 1. Verificar que los scripts se cargan en el orden correcto -->
<script src="./components/onboarding/onboarding.js"></script>
<script src="./components/clarity/clarity.js"></script>
<script src="./components/feedback/feedback.js"></script>

<!-- 2. Verificar que los archivos existen -->
<!-- 3. Verificar que no hay errores de JavaScript en la consola -->
```

#### 🔍 Debug:
```javascript
// Verificar que los scripts se cargan
console.log('Scripts loaded:', {
    onboarding: typeof window.OnboardingSystem,
    clarity: typeof window.ClarityIntegration,
    feedback: typeof window.FeedbackSystem
});

// Verificar errores en la consola
// F12 → Console → Buscar errores en rojo
```

### 3. Sistema de Onboarding

#### ❌ Problema: Onboarding no inicia
```javascript
// Error: Onboarding no se muestra
const onboarding = createOnboarding({ steps: [...] });
onboarding.start(); // No pasa nada
```

#### ✅ Solución:
```javascript
// 1. Verificar que los elementos del DOM existen
console.log('Overlay:', document.getElementById('onboardingOverlay'));
console.log('Spotlight:', document.getElementById('onboardingSpotlight'));
console.log('Tooltip:', document.getElementById('onboardingTooltip'));

// 2. Verificar que los pasos están configurados correctamente
const steps = [
    {
        title: "Paso 1",
        content: "Descripción del paso",
        target: ".mi-elemento" // Verificar que el elemento existe
    }
];

// 3. Verificar que el onboarding no se completó antes
console.log('Onboarding completed:', localStorage.getItem('onboarding_completed'));

// 4. Resetear onboarding si es necesario
localStorage.removeItem('onboarding_completed');
```

#### 🔍 Debug:
```javascript
// Habilitar debug mode
const onboarding = createOnboarding({
    steps: [...],
    debug: true
});

// Verificar estado del onboarding
console.log('Onboarding state:', {
    currentStep: onboarding.currentStep,
    totalSteps: onboarding.steps.length,
    isCompleted: onboarding.isCompleted()
});
```

### 4. Microsoft Clarity

#### ❌ Problema: Clarity no trackea eventos
```javascript
// Error: Eventos no se registran en Clarity
clarity.trackEvent('custom_event', { data: 'value' });
// No aparece en el dashboard de Clarity
```

#### ✅ Solución:
```javascript
// 1. Verificar que Clarity está cargado
console.log('Clarity loaded:', typeof window.clarity);

// 2. Verificar Project ID
console.log('Project ID:', clarity.getProjectId());

// 3. Verificar que está habilitado
console.log('Clarity enabled:', clarity.isEnabled());

// 4. Habilitar debug mode
const clarity = createClarity({
    projectId: 'tu_project_id',
    debug: true
});
```

#### 🔍 Debug:
```javascript
// Verificar estado de Clarity
console.log('Clarity state:', {
    loaded: typeof window.clarity,
    projectId: clarity.getProjectId(),
    enabled: clarity.isEnabled()
});

// Verificar eventos en la consola
// Los eventos aparecerán en la consola si debug está habilitado
```

### 5. Sistema de Feedback

#### ❌ Problema: Feedback no se envía
```javascript
// Error: Feedback no se envía al webhook
feedback.handleSubmit(event);
// Error en la consola o no se envía
```

#### ✅ Solución:
```javascript
// 1. Verificar que el webhook URL está configurado
console.log('Webhook URL:', feedback.getWebhookUrl());

// 2. Verificar que está en modo híbrido
console.log('Hybrid mode:', feedback.isHybridMode());

// 3. Verificar que el modal existe
console.log('Modal:', document.getElementById('feedbackModal'));

// 4. Habilitar modo desarrollo
const feedback = createFeedback({
    webhookUrl: 'https://tu-webhook.com/feedback',
    developmentMode: true
});
```

#### 🔍 Debug:
```javascript
// Verificar estado del feedback
console.log('Feedback state:', {
    webhookUrl: feedback.getWebhookUrl(),
    hybridMode: feedback.isHybridMode(),
    feedbackCount: feedback.getFeedbackCount()
});

// Verificar feedback local
console.log('Local feedback:', feedback.getAllFeedback());
```

## 🔍 Debugging Avanzado

### 1. Herramientas de Debug

#### Chrome DevTools
```javascript
// Breakpoints en funciones críticas
function startOnboarding() {
    debugger; // Breakpoint aquí
    console.log('Iniciando onboarding...');
}

// Network tab para verificar requests
// F12 → Network → Verificar requests a webhooks
```

#### Console Logs
```javascript
// Habilitar logs detallados
const onboarding = createOnboarding({ debug: true });
const clarity = createClarity({ debug: true });
const feedback = createFeedback({ developmentMode: true });
```

### 2. Verificación de Estado

#### Verificar Componentes
```javascript
// Verificar que todos los componentes están disponibles
const components = {
    onboarding: typeof window.OnboardingSystem,
    clarity: typeof window.ClarityIntegration,
    feedback: typeof window.FeedbackSystem
};

console.log('Components status:', components);

// Verificar que no hay errores
// F12 → Console → Buscar errores en rojo
```

#### Verificar Variables de Entorno
```javascript
// Verificar todas las variables de entorno
const envVars = {
    clarityId: import.meta.env.VITE_CLARITY_PROJECT_ID,
    webhookUrl: import.meta.env.VITE_N8N_FEEDBACK_WEBHOOK_URL,
    nodeEnv: import.meta.env.NODE_ENV
};

console.log('Environment variables:', envVars);
```

### 3. Verificación de Deploy

#### Verificar Build Local
```bash
# Verificar que el build funciona localmente
npm run build

# Verificar que dist/ se creó
ls -la dist/

# Verificar contenido de dist/
ls -la dist/
```

#### Verificar Deploy
```bash
# Verificar que el deploy funciona
npm run preview

# Verificar que no hay errores en la consola
# Abrir http://localhost:4173 en el navegador
```

## 🚨 Errores Específicos

### 1. CORS Errors

#### ❌ Error: CORS policy blocks request
```
Access to fetch at 'https://script.google.com/macros/s/...' 
from origin 'https://tu-sitio.com' has been blocked by CORS policy
```

#### ✅ Solución:
```javascript
// 1. Verificar que el webhook está configurado correctamente
// 2. Verificar que el webhook permite CORS
// 3. Usar sistema híbrido como respaldo
const feedback = createFeedback({
    webhookUrl: 'https://tu-webhook.com/feedback',
    hybridMode: true // Fallback a local storage
});
```

### 2. Module Not Found

#### ❌ Error: Module not found
```
Module not found: Error: Can't resolve './components/onboarding/onboarding.js'
```

#### ✅ Solución:
```bash
# 1. Verificar que los archivos existen
ls -la components/onboarding/onboarding.js

# 2. Verificar rutas en HTML
grep -r "components/" templates/

# 3. Verificar que las rutas son correctas
# Usar rutas relativas correctas
```

### 3. localStorage Errors

#### ❌ Error: localStorage is not available
```
localStorage is not available
```

#### ✅ Solución:
```javascript
// Verificar que localStorage está disponible
if (typeof Storage !== 'undefined') {
    // localStorage está disponible
    console.log('localStorage available');
} else {
    // localStorage no está disponible
    console.error('localStorage not available');
}
```

## 🔧 Soluciones Rápidas

### 1. Reset Completo

#### Resetear Todo
```bash
# 1. Limpiar node_modules
rm -rf node_modules package-lock.json

# 2. Reinstalar dependencias
npm install

# 3. Limpiar localStorage
localStorage.clear();

# 4. Reiniciar servidor
npm run dev
```

#### Resetear Componentes
```javascript
// Resetear onboarding
localStorage.removeItem('onboarding_completed');

// Resetear feedback
localStorage.removeItem('prototype_feedback');

// Reiniciar página
location.reload();
```

### 2. Verificación Rápida

#### Script de Verificación
```javascript
// Ejecutar en consola del navegador
function verifySetup() {
    const checks = {
        onboarding: typeof window.OnboardingSystem,
        clarity: typeof window.ClarityIntegration,
        feedback: typeof window.FeedbackSystem,
        envVars: {
            clarityId: import.meta.env.VITE_CLARITY_PROJECT_ID,
            webhookUrl: import.meta.env.VITE_N8N_FEEDBACK_WEBHOOK_URL
        }
    };
    
    console.log('Setup verification:', checks);
    return checks;
}

verifySetup();
```

### 3. Logs de Debug

#### Habilitar Todos los Logs
```javascript
// En tu código principal
const onboarding = createOnboarding({ debug: true });
const clarity = createClarity({ debug: true });
const feedback = createFeedback({ developmentMode: true });

// Verificar en consola
console.log('All components initialized');
```

## 📚 Recursos Adicionales

### Documentación
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)
- [Vite Debugging](https://vitejs.dev/guide/troubleshooting.html)
- [JavaScript Debugging](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Debugging)

### Herramientas
- [Console API](https://developer.mozilla.org/en-US/docs/Web/API/Console)
- [Network Tab](https://developers.google.com/web/tools/chrome-devtools/network)
- [Sources Tab](https://developers.google.com/web/tools/chrome-devtools/sources)

## 🆘 Obtener Ayuda

### 1. Verificar Documentación
- Revisar [Setup Guide](./setup-guide.md)
- Revisar [GitHub Cursor Setup](./github-cursor-setup.md)
- Revisar [Deployment Guide](./deployment-guide.md)

### 2. Verificar Logs
- Consola del navegador (F12)
- Logs de deploy (Vercel/Render dashboard)
- Logs de build (terminal)

### 3. Crear Issue
1. Ve al repositorio de GitHub
2. Crea un nuevo issue
3. Incluye:
   - Descripción del problema
   - Pasos para reproducir
   - Logs de error
   - Configuración actual

## 📄 Licencia

MIT License - Ver [LICENSE](../LICENSE) para detalles.
