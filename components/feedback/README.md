# 💬 Sistema de Feedback Híbrido

Componente modular para recolección de feedback con respaldo local y integración con webhooks.

## ✨ Características

- 🔄 **Sistema híbrido**: Webhook + respaldo local automático
- 📱 **Responsive**: Se adapta a todos los dispositivos
- 🎯 **Auto-detección**: Detecta automáticamente la sección actual
- 💾 **Persistencia local**: Almacena feedback en localStorage
- 🔧 **Configuración flexible**: Fácil de personalizar
- ⚡ **Ligero**: Sin dependencias externas
- 🔒 **Anónimo**: No requiere identificación del usuario

## 🚀 Uso Básico

### HTML
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="./components/feedback/feedback.css">
</head>
<body>
    <!-- Tu contenido aquí -->
    
    <script src="./components/feedback/feedback.js"></script>
</body>
</html>
```

### JavaScript
```javascript
// Crear sistema de feedback básico
const feedback = createFeedback({
    webhookUrl: 'https://tu-webhook.com/feedback',
    hybridMode: true,
    autoDetectSection: true
});

// El botón y modal se crean automáticamente
```

## 🎯 Configuración Avanzada

### Opciones del Constructor
```javascript
const feedback = new FeedbackSystem({
    webhookUrl: 'https://tu-webhook.com/feedback',  // URL del webhook
    hybridMode: true,                               // Modo híbrido
    developmentMode: false,                         // Modo desarrollo
    storageKey: 'mi_feedback',                      // Clave para localStorage
    autoDetectSection: true,                        // Auto-detección de sección
    onSubmit: (data) => {},                         // Callback al enviar
    onSuccess: (data) => {},                        // Callback al éxito
    onError: (error) => {}                          // Callback al error
});
```

### Sistema Híbrido
```javascript
const feedback = createFeedback({
    webhookUrl: 'https://tu-n8n-webhook.com/feedback',
    hybridMode: true,  // Intenta webhook, fallback a local
    developmentMode: false
});
```

## 🔧 API Completa

### Métodos Principales
```javascript
// Abrir modal
feedback.openModal();

// Cerrar modal
feedback.closeModal();

// Enviar feedback manualmente
feedback.handleSubmit(event);

// Exportar feedback local
feedback.exportFeedback();

// Limpiar feedback local
feedback.clearFeedback();
```

### Métodos de Configuración
```javascript
// Cambiar webhook URL
feedback.setWebhookUrl('https://nueva-url.com/feedback');

// Habilitar/deshabilitar modo híbrido
feedback.setHybridMode(true);

// Configurar modo desarrollo
feedback.setDevelopmentMode(true);
```

### Métodos de Estado
```javascript
// Obtener cantidad de feedback
const count = feedback.getFeedbackCount();

// Verificar si está en modo híbrido
const isHybrid = feedback.isHybridMode();

// Obtener URL del webhook
const url = feedback.getWebhookUrl();
```

### Métodos de Utilidad
```javascript
// Obtener todo el feedback
const allFeedback = feedback.getAllFeedback();

// Obtener feedback por sección
const sectionFeedback = feedback.getFeedbackBySection('Home');

// Obtener feedback reciente
const recentFeedback = feedback.getRecentFeedback(10);
```

## 🌍 Variables de Entorno

### Configuración Automática
```javascript
// Usar variables de entorno
const feedback = createFeedbackFromEnv();
```

### Variables Requeridas
```bash
# .env.local
NEXT_PUBLIC_FEEDBACK_WEBHOOK_URL=https://tu-webhook.com/feedback
```

### Auto-inicialización
```javascript
// Se inicializa automáticamente si encuentra la variable
// No requiere configuración manual
```

## 🔄 Sistema Híbrido

### Flujo de Funcionamiento
1. **Intento webhook**: Envía feedback al webhook configurado
2. **Fallback local**: Si falla, guarda en localStorage
3. **Notificación**: Informa al usuario del resultado
4. **Persistencia**: Los datos se mantienen localmente

### Configuración de Webhook
```javascript
// Para n8n
const feedback = createFeedback({
    webhookUrl: 'https://tu-n8n-instance.com/webhook/feedback',
    hybridMode: true
});

// Para Google Apps Script
const feedback = createFeedback({
    webhookUrl: 'https://script.google.com/macros/s/TU_SCRIPT_ID/exec',
    hybridMode: true
});
```

## 📱 Responsive

El componente se adapta automáticamente a diferentes tamaños de pantalla:

- **Desktop**: Modal centrado con ancho fijo
- **Tablet**: Modal adaptado con márgenes
- **Mobile**: Modal de pantalla completa

## 🎯 Ejemplos de Uso

### Feedback Básico
```javascript
const feedback = createPrototypeFeedback('https://tu-webhook.com/feedback');
```

### Con Callbacks Personalizados
```javascript
const feedback = createFeedback({
    webhookUrl: 'https://tu-webhook.com/feedback',
    onSubmit: (data) => {
        console.log('Enviando feedback:', data);
    },
    onSuccess: (data) => {
        console.log('Feedback enviado exitosamente:', data);
    },
    onError: (error) => {
        console.error('Error enviando feedback:', error);
    }
});
```

### Solo Local (Sin Webhook)
```javascript
const feedback = createFeedback({
    hybridMode: false,
    autoDetectSection: true
});
```

## 🔍 Auto-detección de Sección

### Secciones Detectadas Automáticamente
- **Home**: Páginas con 'home' o 'index' en la URL
- **Onboarding**: Páginas con 'onboarding' en la URL
- **Analytics**: Páginas con 'analytics' en la URL
- **Feedback**: Páginas con 'feedback' en la URL
- **Otra**: Cualquier otra página

### Personalizar Detección
```javascript
// Deshabilitar auto-detección
const feedback = createFeedback({
    autoDetectSection: false
});

// Detectar manualmente
feedback.detectCurrentSection();
```

## 🚀 Integración con Otros Componentes

### Con Sistema de Onboarding
```javascript
// El onboarding se integra automáticamente con el feedback
const onboarding = createOnboarding({
    steps: [...],
    onComplete: () => {
        feedback.openModal();
    }
});
```

### Con Microsoft Clarity
```javascript
// El feedback se integra automáticamente con Clarity
const clarity = createClarity({
    customEvents: {
        'feedback_submitted': {
            selector: '.feedback-submit',
            eventType: 'click'
        }
    }
});
```

## 📊 Estructura de Datos

### Formato del Feedback
```javascript
{
    user: 'Anónimo',
    section: 'Home',
    comment: 'Tu comentario aquí',
    timestamp: '2025-01-01T12:00:00.000Z',
    url: 'https://tu-sitio.com/pagina',
    id: '1234567890',
    savedAt: '2025-01-01T12:00:00.000Z'
}
```

### Webhook Payload
```javascript
// El mismo formato se envía al webhook
POST https://tu-webhook.com/feedback
Content-Type: application/json

{
    "user": "Anónimo",
    "section": "Home",
    "comment": "Tu comentario aquí",
    "timestamp": "2025-01-01T12:00:00.000Z",
    "url": "https://tu-sitio.com/pagina"
}
```

## 🎨 Personalización

### Temas
```javascript
// Aplicar tema oscuro
document.getElementById('feedbackModal').classList.add('theme-dark');
```

### Colores del Botón
```javascript
// Cambiar color del botón
document.getElementById('feedbackTrigger').classList.add('success');
document.getElementById('feedbackTrigger').classList.add('warning');
document.getElementById('feedbackTrigger').classList.add('error');
```

### Estilos CSS
```css
/* Personalizar colores */
.feedback-trigger {
    background: linear-gradient(135deg, #tu-color-1, #tu-color-2);
}

.feedback-modal-content {
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
```

## 🔍 Debug Mode

### Habilitar Debug
```javascript
const feedback = createFeedback({
    developmentMode: true,
    webhookUrl: 'https://tu-webhook.com/feedback'
});
```

### Logs de Consola
```javascript
// El componente incluye logs detallados para debugging
console.log('Feedback count:', feedback.getFeedbackCount());
console.log('Is hybrid mode:', feedback.isHybridMode());
console.log('Webhook URL:', feedback.getWebhookUrl());
```

## 🐛 Troubleshooting

### Webhook no responde
```javascript
// Verificar URL del webhook
console.log('Webhook URL:', feedback.getWebhookUrl());

// Verificar modo híbrido
console.log('Hybrid mode:', feedback.isHybridMode());
```

### Feedback no se guarda
```javascript
// Verificar localStorage
console.log('Local storage:', localStorage.getItem('prototype_feedback'));

// Verificar permisos del navegador
console.log('Local storage available:', typeof Storage !== 'undefined');
```

### Modal no aparece
```javascript
// Verificar que el modal existe
console.log('Modal element:', document.getElementById('feedbackModal'));

// Verificar que el botón existe
console.log('Trigger element:', document.getElementById('feedbackTrigger'));
```

## 📚 Mejores Prácticas

1. **Configurar webhook**: Usar n8n o Google Apps Script
2. **Modo híbrido**: Siempre habilitar para respaldo
3. **Auto-detección**: Habilitar para mejor UX
4. **Responsive**: Probar en diferentes dispositivos
5. **Privacidad**: El sistema es anónimo por defecto

## 🔧 Configuración de Producción

### Variables de Entorno
```bash
# .env.production
NEXT_PUBLIC_FEEDBACK_WEBHOOK_URL=https://tu-webhook-produccion.com/feedback
```

### Configuración de Deploy
```javascript
// En Vercel/Render
const feedback = createFeedbackFromEnv();
```

## 📄 Licencia

MIT License - Ver [LICENSE](../../LICENSE) para detalles.
