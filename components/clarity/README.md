# 📊 Microsoft Clarity Integration

Componente modular para integración de Microsoft Clarity en prototipos funcionales.

## ✨ Características

- 🎯 **Integración automática**: Configuración simple con variables de entorno
- 📊 **Eventos personalizados**: Tracking de eventos específicos del prototipo
- 🔧 **Debug mode**: Panel de debug para desarrollo
- 📱 **Responsive**: Funciona en todos los dispositivos
- ⚡ **Ligero**: Sin dependencias externas
- 🔒 **Privacidad**: Cumple con políticas de privacidad

## 🚀 Uso Básico

### HTML
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="./components/clarity/clarity.css">
</head>
<body>
    <!-- Tu contenido aquí -->
    
    <script src="./components/clarity/clarity.js"></script>
</body>
</html>
```

### JavaScript
```javascript
// Crear Clarity básico
const clarity = createClarity({
    projectId: 'tu_project_id',
    enabled: true,
    debug: false
});

// Iniciar tracking
clarity.start();
```

## 🎯 Configuración Avanzada

### Opciones del Constructor
```javascript
const clarity = new ClarityIntegration({
    projectId: 'tu_project_id',     // ID del proyecto en Clarity
    enabled: true,                  // Habilitar/deshabilitar
    debug: false,                  // Modo debug
    customEvents: {},              // Eventos personalizados
    autoStart: true                // Iniciar automáticamente
});
```

### Eventos Personalizados
```javascript
const clarity = createClarity({
    projectId: 'tu_project_id',
    customEvents: {
        'prototype_start': {
            selector: '[data-prototype-start]',
            eventType: 'click',
            data: { section: 'home' }
        },
        'feedback_submit': {
            selector: '.feedback-submit',
            eventType: 'click',
            data: { type: 'feedback' }
        }
    }
});
```

## 🔧 API Completa

### Métodos de Tracking
```javascript
// Trackear evento personalizado
clarity.trackEvent('custom_event', { data: 'value' });

// Trackear vista de página
clarity.trackPageView('home', { section: 'hero' });

// Trackear acción de usuario
clarity.trackUserAction('button_click', { button: 'start' });

// Trackear error
clarity.trackError(error, { context: 'onboarding' });

// Trackear conversión
clarity.trackConversion('signup', { source: 'prototype' });
```

### Métodos de Configuración
```javascript
// Cambiar Project ID
clarity.setProjectId('nuevo_project_id');

// Habilitar/deshabilitar
clarity.enable();
clarity.disable();

// Configurar debug
clarity.setDebug(true);
```

### Métodos de Estado
```javascript
// Verificar si está habilitado
const isEnabled = clarity.isEnabled();

// Verificar si está cargado
const isLoaded = clarity.isLoaded();

// Obtener Project ID
const projectId = clarity.getProjectId();
```

## 🌍 Variables de Entorno

### Configuración Automática
```javascript
// Usar variables de entorno
const clarity = createClarityFromEnv();
```

### Variables Requeridas
```bash
# .env.local
NEXT_PUBLIC_CLARITY_PROJECT_ID=tu_project_id
```

### Auto-inicialización
```javascript
// Se inicializa automáticamente si encuentra la variable
// No requiere configuración manual
```

## 🎨 Debug Mode

### Habilitar Debug
```javascript
const clarity = createClarity({
    projectId: 'tu_project_id',
    debug: true
});
```

### Panel de Debug
```javascript
// El panel de debug se muestra automáticamente en modo debug
// Incluye:
// - Estado de conexión
// - Eventos trackeados
// - Errores
// - Configuración actual
```

### Indicadores Visuales
```css
/* Elementos trackeados se marcan visualmente en debug mode */
[data-clarity-track] {
    outline: 2px dashed #10b981;
}
```

## 📱 Responsive

El componente se adapta automáticamente a diferentes tamaños de pantalla:

- **Desktop**: Panel de debug completo
- **Tablet**: Panel adaptado con scroll
- **Mobile**: Indicadores compactos

## 🎯 Ejemplos de Uso

### Prototipo Básico
```javascript
const clarity = createPrototypeClarity('tu_project_id');
```

### Con Eventos Personalizados
```javascript
const clarity = createClarity({
    projectId: 'tu_project_id',
    customEvents: {
        'onboarding_start': {
            selector: '[data-onboarding-start]',
            eventType: 'click'
        },
        'feedback_submit': {
            selector: '.feedback-submit',
            eventType: 'submit'
        }
    }
});
```

### Con Debug Habilitado
```javascript
const clarity = createClarity({
    projectId: 'tu_project_id',
    debug: true,
    customEvents: {
        'prototype_interaction': {
            selector: '.prototype-button',
            eventType: 'click'
        }
    }
});
```

## 🔍 Eventos Predefinidos

### Eventos del Prototipo
```javascript
// Se configuran automáticamente con createPrototypeClarity()
'prototype_start'     // Inicio del prototipo
'prototype_feedback'  // Uso del sistema de feedback
'prototype_onboarding' // Inicio del onboarding
```

### Eventos del Sistema
```javascript
'clarity_started'     // Clarity iniciado
'page_view'          // Vista de página
'user_action'        // Acción de usuario
'error'              // Error capturado
'conversion'         // Conversión
```

## 🚀 Integración con Otros Componentes

### Con Sistema de Onboarding
```javascript
// El onboarding se integra automáticamente con Clarity
const onboarding = createOnboarding({
    steps: [...],
    onComplete: () => {
        clarity.trackEvent('onboarding_completed');
    }
});
```

### Con Sistema de Feedback
```javascript
// El feedback se integra automáticamente con Clarity
const feedback = createFeedback({
    onSubmit: (data) => {
        clarity.trackEvent('feedback_submitted', data);
    }
});
```

## 📊 Métricas Disponibles

### En Microsoft Clarity Dashboard
- **Session Recordings**: Grabaciones de sesiones
- **Heatmaps**: Mapas de calor
- **User Journeys**: Rutas de usuario
- **Custom Events**: Eventos personalizados
- **Performance**: Métricas de rendimiento

### Eventos Trackeados Automáticamente
- Clicks en elementos
- Scroll behavior
- Form interactions
- Page navigation
- Error occurrences

## 🔒 Privacidad y Cumplimiento

### GDPR Compliance
```javascript
// El componente respeta las preferencias de privacidad
const clarity = createClarity({
    projectId: 'tu_project_id',
    enabled: userConsent.given
});
```

### Configuración de Privacidad
```javascript
// Deshabilitar en modo privado
if (window.location.hostname === 'localhost') {
    clarity.disable();
}
```

## 🐛 Troubleshooting

### Clarity no se carga
```javascript
// Verificar Project ID
console.log('Project ID:', clarity.getProjectId());

// Verificar si está habilitado
console.log('Enabled:', clarity.isEnabled());

// Verificar si está cargado
console.log('Loaded:', clarity.isLoaded());
```

### Eventos no se trackean
```javascript
// Verificar modo debug
clarity.setDebug(true);

// Verificar selectores
console.log('Elements found:', document.querySelectorAll('.mi-selector'));
```

### Debug Panel no aparece
```javascript
// Verificar CSS
console.log('Debug panel:', document.querySelector('.clarity-debug-panel'));

// Verificar modo debug
console.log('Debug mode:', clarity.debug);
```

## 📚 Mejores Prácticas

1. **Configurar Project ID**: Usar variables de entorno
2. **Eventos específicos**: Trackear eventos relevantes del prototipo
3. **Debug en desarrollo**: Habilitar debug solo en desarrollo
4. **Privacidad**: Respetar preferencias del usuario
5. **Performance**: No trackear eventos excesivos

## 🔧 Configuración de Producción

### Variables de Entorno
```bash
# .env.production
NEXT_PUBLIC_CLARITY_PROJECT_ID=tu_project_id_production
```

### Configuración de Deploy
```javascript
// En Vercel/Render
const clarity = createClarityFromEnv();
```

## 📄 Licencia

MIT License - Ver [LICENSE](../../LICENSE) para detalles.
