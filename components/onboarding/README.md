# 🎭 Sistema de Onboarding

Componente modular para guiar usuarios a través de prototipos funcionales.

## ✨ Características

- 🎯 **Enmascaramiento inteligente**: Destaca elementos específicos
- 📱 **Responsive**: Se adapta a diferentes tamaños de pantalla
- 💾 **Persistencia**: Recuerda si ya se completó
- 🎨 **Personalizable**: Temas y estilos configurables
- ⚡ **Ligero**: Sin dependencias externas
- 🔧 **Modular**: Fácil de integrar en cualquier proyecto

## 🚀 Uso Básico

### HTML
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="./components/onboarding/onboarding.css">
</head>
<body>
    <!-- Tu contenido aquí -->
    
    <script src="./components/onboarding/onboarding.js"></script>
</body>
</html>
```

### JavaScript
```javascript
// Crear onboarding básico
const onboarding = createOnboarding({
    steps: [
        {
            title: "Bienvenido",
            content: "Te guiaremos a través de este prototipo",
            target: null
        },
        {
            title: "Explora",
            content: "Haz clic en los elementos para explorar",
            target: ".mi-elemento"
        }
    ],
    onComplete: () => {
        console.log('Onboarding completado');
    }
});

// Iniciar
onboarding.start();
```

## 🎯 Configuración Avanzada

### Opciones del Constructor
```javascript
const onboarding = new OnboardingSystem({
    steps: [],                    // Array de pasos
    onComplete: () => {},        // Callback al completar
    onSkip: () => {},           // Callback al saltar
    autoStart: true,            // Iniciar automáticamente
    storageKey: 'mi_onboarding'  // Clave para localStorage
});
```

### Estructura de Pasos
```javascript
const step = {
    title: "Título del paso",           // Título visible
    content: "Descripción del paso",    // Contenido descriptivo
    target: ".selector-css",            // Elemento a destacar
    action: "highlight",               // Acción a realizar
    openModal: false,                  // Abrir modal (opcional)
    delay: 0                          // Delay antes de mostrar (opcional)
};
```

## 🎨 Personalización

### Temas
```javascript
// Aplicar tema oscuro
document.getElementById('onboardingTooltip').classList.add('theme-dark');

// Aplicar variantes de color
document.getElementById('onboardingTooltip').classList.add('primary');
document.getElementById('onboardingTooltip').classList.add('success');
```

### Estilos CSS
```css
/* Personalizar colores */
.onboarding-tooltip {
    --primary-color: #your-color;
    --secondary-color: #your-color;
}

/* Personalizar animaciones */
.onboarding-tooltip {
    animation: your-custom-animation 0.3s ease-out;
}
```

## 🔧 API Completa

### Métodos Principales
```javascript
// Iniciar onboarding
onboarding.start();

// Siguiente paso
onboarding.nextStep();

// Saltar onboarding
onboarding.skip();

// Completar onboarding
onboarding.complete();

// Ocultar onboarding
onboarding.hide();

// Resetear onboarding
onboarding.reset();
```

### Métodos de Configuración
```javascript
// Configurar pasos
onboarding.setSteps(newSteps);

// Agregar paso
onboarding.addStep(newStep);

// Ir a paso específico
onboarding.goToStep(2);

// Obtener paso actual
const currentStep = onboarding.getCurrentStep();
```

### Métodos de Estado
```javascript
// Verificar si está completado
const isCompleted = onboarding.isCompleted();

// Obtener paso actual
const currentStep = onboarding.currentStep;

// Obtener total de pasos
const totalSteps = onboarding.steps.length;
```

## 📱 Responsive

El componente se adapta automáticamente a diferentes tamaños de pantalla:

- **Desktop**: Tooltip completo con posicionamiento inteligente
- **Tablet**: Tooltip adaptado con márgenes
- **Mobile**: Tooltip de ancho completo con botones apilados

## 🎯 Ejemplos de Uso

### Onboarding de Prototipo
```javascript
const prototypeOnboarding = createPrototypeOnboarding();
```

### Onboarding Personalizado
```javascript
const customOnboarding = createOnboarding({
    steps: [
        {
            title: "Paso 1",
            content: "Descripción del primer paso",
            target: ".elemento-1"
        },
        {
            title: "Paso 2",
            content: "Descripción del segundo paso",
            target: ".elemento-2"
        }
    ],
    onComplete: () => {
        console.log('Onboarding personalizado completado');
    },
    onSkip: () => {
        console.log('Onboarding saltado');
    }
});
```

### Onboarding con Modal
```javascript
const modalOnboarding = createOnboarding({
    steps: [
        {
            title: "Abrir Modal",
            content: "Haz clic para abrir el modal",
            target: ".modal-trigger",
            openModal: true
        }
    ]
});
```

## 🔍 Debugging

### Logs de Consola
El componente incluye logs detallados para debugging:

```javascript
// Habilitar logs detallados
console.log('Onboarding state:', onboarding.currentStep);
console.log('Available steps:', onboarding.steps);
```

### Eventos Personalizados
```javascript
// Escuchar eventos del onboarding
document.addEventListener('onboarding:start', (e) => {
    console.log('Onboarding iniciado');
});

document.addEventListener('onboarding:complete', (e) => {
    console.log('Onboarding completado');
});
```

## 🚀 Integración con Otros Componentes

### Con Sistema de Feedback
```javascript
const onboarding = createOnboarding({
    steps: [
        {
            title: "Feedback",
            content: "Usa el botón de feedback para compartir tus comentarios",
            target: ".feedback-trigger"
        }
    ]
});
```

### Con Microsoft Clarity
```javascript
// El onboarding se integra automáticamente con Clarity
// Los eventos se registran automáticamente
```

## 📚 Mejores Prácticas

1. **Pasos concisos**: Máximo 3-4 pasos por onboarding
2. **Targets específicos**: Usar selectores CSS precisos
3. **Contenido claro**: Instrucciones simples y directas
4. **Responsive**: Probar en diferentes dispositivos
5. **Accesibilidad**: Incluir navegación por teclado

## 🐛 Troubleshooting

### Elemento no encontrado
```javascript
// Verificar que el selector sea correcto
console.log('Elementos disponibles:', document.querySelectorAll('.mi-clase'));
```

### Onboarding no inicia
```javascript
// Verificar que los elementos del DOM existan
console.log('Overlay:', document.getElementById('onboardingOverlay'));
console.log('Spotlight:', document.getElementById('onboardingSpotlight'));
console.log('Tooltip:', document.getElementById('onboardingTooltip'));
```

### Problemas de posicionamiento
```javascript
// Verificar dimensiones del elemento
const element = document.querySelector('.mi-elemento');
console.log('Rect:', element.getBoundingClientRect());
```

## 📄 Licencia

MIT License - Ver [LICENSE](../../LICENSE) para detalles.
