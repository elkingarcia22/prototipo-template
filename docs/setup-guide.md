# 🚀 Guía de Setup - Prototipo Template

Guía completa para configurar y usar el template de prototipos funcionales.

## 📋 Prerrequisitos

### Herramientas Necesarias
- **Node.js** (v16 o superior)
- **npm** (v8 o superior)
- **Git** (para control de versiones)
- **Cursor** (recomendado) o cualquier editor de código
- **Cuenta de GitHub** (para deploy)

### Cuentas de Servicios (Opcionales)
- **Microsoft Clarity** (para analytics)
- **n8n** (para webhooks de feedback)
- **Vercel/Render** (para deploy)

## 🎯 Setup Rápido

### 1. Clonar el Repositorio
```bash
git clone https://github.com/elkingarcia22/prototipo-template.git
cd prototipo-template
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno
```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar variables
nano .env
```

### 4. Ejecutar Setup Automático
```bash
npm run setup
```

### 5. Iniciar Desarrollo
```bash
npm run dev
```

## ⚙️ Configuración Detallada

### Variables de Entorno

#### Archivo `.env`
```bash
# Microsoft Clarity
VITE_CLARITY_PROJECT_ID=tu_project_id_aqui

# Sistema de Feedback
VITE_N8N_FEEDBACK_WEBHOOK_URL=https://tu-n8n-instance.com/webhook/feedback

# Configuración de Desarrollo
NODE_ENV=development
```

#### Obtener Project ID de Clarity
1. Ve a [Microsoft Clarity](https://clarity.microsoft.com/)
2. Crea un nuevo proyecto
3. Copia el Project ID del script generado
4. Pégalo en `VITE_CLARITY_PROJECT_ID`

#### Configurar Webhook de Feedback
1. Crea un workflow en n8n
2. Añade un nodo "Webhook"
3. Copia la URL del webhook
4. Pégala en `VITE_N8N_FEEDBACK_WEBHOOK_URL`

### Estructura del Proyecto

```
prototipo-template/
├── components/           # Componentes modulares
│   ├── onboarding/       # Sistema de onboarding
│   ├── clarity/          # Microsoft Clarity
│   └── feedback/         # Sistema de feedback
├── templates/            # Templates de ejemplo
├── docs/                 # Documentación
├── scripts/              # Scripts de validación
├── styles/               # Estilos globales
└── index.html            # Página principal
```

## 🔧 Scripts Disponibles

### Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

### Validación (GATES)
```bash
# Verificar estructura de directorios
npm run gate:dir

# Verificar variables de entorno
npm run gate:env

# Verificar componentes
npm run gate:components

# Verificar configuración de deploy
npm run gate:deployment
```

### Setup
```bash
# Configuración automática completa
npm run setup
```

## 🎭 Configuración de Componentes

### Sistema de Onboarding

#### Uso Básico
```javascript
// En tu HTML
<script src="./components/onboarding/onboarding.js"></script>

// En tu JavaScript
const onboarding = createOnboarding({
    steps: [
        {
            title: "Bienvenido",
            content: "Te guiaremos a través del prototipo",
            target: null
        },
        {
            title: "Explora",
            content: "Haz clic en los elementos para explorar",
            target: ".mi-elemento"
        }
    ]
});

onboarding.start();
```

#### Configuración Avanzada
```javascript
const onboarding = new OnboardingSystem({
    steps: customSteps,
    onComplete: () => console.log('Onboarding completado'),
    onSkip: () => console.log('Onboarding saltado'),
    autoStart: true,
    storageKey: 'mi_onboarding'
});
```

### Microsoft Clarity

#### Uso Básico
```javascript
// Se inicializa automáticamente con variables de entorno
// No requiere configuración manual
```

#### Configuración Manual
```javascript
const clarity = createClarity({
    projectId: 'tu_project_id',
    enabled: true,
    debug: false,
    customEvents: {
        'prototype_start': {
            selector: '[data-prototype-start]',
            eventType: 'click'
        }
    }
});
```

### Sistema de Feedback

#### Uso Básico
```javascript
// Se inicializa automáticamente con variables de entorno
// El botón y modal se crean automáticamente
```

#### Configuración Manual
```javascript
const feedback = createFeedback({
    webhookUrl: 'https://tu-webhook.com/feedback',
    hybridMode: true,
    autoDetectSection: true,
    onSubmit: (data) => console.log('Feedback enviado:', data)
});
```

## 🚀 Deploy

### Vercel (Recomendado)

#### 1. Conectar Repositorio
1. Ve a [Vercel](https://vercel.com)
2. Conecta tu repositorio de GitHub
3. Configura las variables de entorno

#### 2. Variables de Entorno en Vercel
```
VITE_CLARITY_PROJECT_ID=tu_project_id
VITE_N8N_FEEDBACK_WEBHOOK_URL=https://tu-webhook.com/feedback
```

#### 3. Deploy Automático
- Push a `main` → Deploy automático
- Push a `develop` → Preview automático

### Render

#### 1. Conectar Repositorio
1. Ve a [Render](https://render.com)
2. Conecta tu repositorio de GitHub
3. Selecciona "Static Site"

#### 2. Configuración
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: `18`

#### 3. Variables de Entorno
```
VITE_CLARITY_PROJECT_ID=tu_project_id
VITE_N8N_FEEDBACK_WEBHOOK_URL=https://tu-webhook.com/feedback
```

## 🔍 Troubleshooting

### Problemas Comunes

#### 1. Variables de Entorno No Cargadas
```bash
# Verificar que el archivo .env existe
ls -la .env

# Verificar contenido
cat .env

# Reiniciar servidor de desarrollo
npm run dev
```

#### 2. Componentes No Cargan
```bash
# Verificar que los archivos existen
ls -la components/

# Verificar rutas en HTML
grep -r "components/" templates/
```

#### 3. GATES Fallan
```bash
# Ejecutar GATES individualmente
npm run gate:dir
npm run gate:env
npm run gate:components
npm run gate:deployment
```

#### 4. Deploy Falla
```bash
# Verificar build local
npm run build

# Verificar que dist/ se creó
ls -la dist/

# Verificar logs de deploy
# (En Vercel/Render dashboard)
```

### Logs de Debug

#### Habilitar Debug en Componentes
```javascript
// Onboarding
const onboarding = createOnboarding({
    debug: true
});

// Clarity
const clarity = createClarity({
    debug: true
});

// Feedback
const feedback = createFeedback({
    developmentMode: true
});
```

#### Verificar Estado de Componentes
```javascript
// En consola del navegador
console.log('Onboarding:', window.OnboardingSystem);
console.log('Clarity:', window.ClarityIntegration);
console.log('Feedback:', window.FeedbackSystem);
```

## 📚 Recursos Adicionales

### Documentación de Componentes
- [Onboarding](./components/onboarding/README.md)
- [Clarity](./components/clarity/README.md)
- [Feedback](./components/feedback/README.md)

### Templates de Ejemplo
- [Onboarding](./templates/onboarding.html)
- [Clarity](./templates/clarity.html)
- [Feedback](./templates/feedback.html)

### Guías Específicas
- [GitHub Cursor Setup](./github-cursor-setup.md)
- [Deployment Guide](./deployment-guide.md)
- [Troubleshooting](./troubleshooting.md)

## 🆘 Soporte

### Obtener Ayuda
1. **Revisar documentación**: Lee las guías específicas
2. **Verificar logs**: Usa la consola del navegador
3. **Ejecutar GATES**: Verifica la configuración
4. **Crear issue**: En el repositorio de GitHub

### Contribuir
1. Fork el repositorio
2. Crea una rama para tu feature
3. Haz commit de tus cambios
4. Crea un Pull Request

## 📄 Licencia

MIT License - Ver [LICENSE](../LICENSE) para detalles.
