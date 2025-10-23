# 🚀 Guía de Deployment

Guía completa para desplegar el template de prototipos en diferentes plataformas.

## 🎯 Plataformas Soportadas

### Recomendadas
- **Vercel** (Recomendado para prototipos)
- **Render** (Alternativa robusta)
- **Netlify** (Para sitios estáticos)

### Alternativas
- **GitHub Pages** (Gratuito)
- **Firebase Hosting** (Google)
- **AWS S3 + CloudFront** (Enterprise)

## 🚀 Vercel (Recomendado)

### 1. Configuración Inicial

#### Conectar Repositorio
1. Ve a [Vercel](https://vercel.com)
2. Inicia sesión con GitHub
3. Haz clic en "New Project"
4. Selecciona tu repositorio
5. Configura las opciones de deploy

#### Configuración del Proyecto
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

### 2. Variables de Entorno

#### Configurar en Vercel Dashboard
1. Ve a **Settings** → **Environment Variables**
2. Añade las siguientes variables:

```
VITE_CLARITY_PROJECT_ID=tu_project_id
VITE_N8N_FEEDBACK_WEBHOOK_URL=https://tu-webhook.com/feedback
NODE_ENV=production
```

#### Configurar por Entorno
```bash
# Desarrollo
VITE_CLARITY_PROJECT_ID=dev_project_id
VITE_N8N_FEEDBACK_WEBHOOK_URL=https://dev-webhook.com/feedback

# Producción
VITE_CLARITY_PROJECT_ID=prod_project_id
VITE_N8N_FEEDBACK_WEBHOOK_URL=https://prod-webhook.com/feedback
```

### 3. Deploy Automático

#### GitHub Integration
- **Push a `main`** → Deploy automático a producción
- **Push a `develop`** → Deploy automático a preview
- **Pull Request** → Deploy automático a preview

#### Configuración de Branches
```bash
# Branch principal
main → https://tu-proyecto.vercel.app

# Branch de desarrollo
develop → https://tu-proyecto-git-develop.vercel.app

# Pull requests
feature/nueva-funcionalidad → https://tu-proyecto-git-feature-nueva-funcionalidad.vercel.app
```

### 4. Dominio Personalizado

#### Configurar Dominio
1. Ve a **Settings** → **Domains**
2. Añade tu dominio personalizado
3. Configura DNS según las instrucciones

#### Ejemplo de DNS
```
# A record
@ → 76.76.19.19

# CNAME record
www → cname.vercel-dns.com
```

## 🔧 Render

### 1. Configuración Inicial

#### Crear Servicio
1. Ve a [Render](https://render.com)
2. Haz clic en "New +"
3. Selecciona "Static Site"
4. Conecta tu repositorio de GitHub

#### Configuración del Servicio
```yaml
# render.yaml
services:
  - type: web
    name: prototipo-template
    env: static
    buildCommand: npm run build
    staticPublishPath: ./dist
    pullRequestPreviewsEnabled: true
    envVars:
      - key: VITE_CLARITY_PROJECT_ID
        value: tu_project_id
      - key: VITE_N8N_FEEDBACK_WEBHOOK_URL
        value: https://tu-webhook.com/feedback
```

### 2. Variables de Entorno

#### Configurar en Render Dashboard
1. Ve a **Environment** → **Environment Variables**
2. Añade las variables necesarias

#### Variables Requeridas
```
VITE_CLARITY_PROJECT_ID=tu_project_id
VITE_N8N_FEEDBACK_WEBHOOK_URL=https://tu-webhook.com/feedback
NODE_ENV=production
```

### 3. Deploy Automático

#### GitHub Integration
- **Push a `main`** → Deploy automático
- **Pull Request** → Preview automático

#### Configuración de Branches
```bash
# Branch principal
main → https://tu-proyecto.onrender.com

# Pull requests
feature/nueva-funcionalidad → https://tu-proyecto-pr-123.onrender.com
```

## 📱 GitHub Pages

### 1. Configuración Inicial

#### Habilitar GitHub Pages
1. Ve a **Settings** → **Pages**
2. Selecciona "Deploy from a branch"
3. Elige `gh-pages` como branch
4. Selecciona `/ (root)` como folder

#### Configurar GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 2. Variables de Entorno

#### Secrets de GitHub
1. Ve a **Settings** → **Secrets and variables** → **Actions**
2. Añade los siguientes secrets:

```
CLARITY_PROJECT_ID=tu_project_id
N8N_WEBHOOK_URL=https://tu-webhook.com/feedback
```

#### Configurar en GitHub Actions
```yaml
- name: Build with environment variables
  run: |
    echo "VITE_CLARITY_PROJECT_ID=${{ secrets.CLARITY_PROJECT_ID }}" >> .env
    echo "VITE_N8N_FEEDBACK_WEBHOOK_URL=${{ secrets.N8N_WEBHOOK_URL }}" >> .env
    npm run build
```

## 🔍 Configuración de Componentes

### 1. Microsoft Clarity

#### Obtener Project ID
1. Ve a [Microsoft Clarity](https://clarity.microsoft.com/)
2. Crea un nuevo proyecto
3. Copia el Project ID del script generado

#### Configurar en Deploy
```javascript
// En tu código
const clarity = createClarityFromEnv();
// Se configura automáticamente con VITE_CLARITY_PROJECT_ID
```

### 2. Sistema de Feedback

#### Configurar n8n Webhook
1. Crea un workflow en n8n
2. Añade un nodo "Webhook"
3. Configura el nodo para recibir POST requests
4. Copia la URL del webhook

#### Configurar en Deploy
```javascript
// En tu código
const feedback = createFeedbackFromEnv();
// Se configura automáticamente con VITE_N8N_FEEDBACK_WEBHOOK_URL
```

### 3. Sistema de Onboarding

#### Configuración Automática
```javascript
// El onboarding se configura automáticamente
// No requiere variables de entorno adicionales
const onboarding = createOnboarding({
    steps: [
        // ... tus pasos
    ]
});
```

## 🎯 Configuración por Entorno

### 1. Desarrollo Local

#### Variables de Entorno
```bash
# .env.local
VITE_CLARITY_PROJECT_ID=dev_project_id
VITE_N8N_FEEDBACK_WEBHOOK_URL=https://dev-webhook.com/feedback
NODE_ENV=development
```

#### Configuración de Vite
```javascript
// vite.config.js
export default defineConfig({
  define: {
    __DEV__: process.env.NODE_ENV === 'development'
  }
});
```

### 2. Staging

#### Variables de Entorno
```bash
# .env.staging
VITE_CLARITY_PROJECT_ID=staging_project_id
VITE_N8N_FEEDBACK_WEBHOOK_URL=https://staging-webhook.com/feedback
NODE_ENV=staging
```

#### Deploy a Staging
```bash
# Deploy automático desde branch develop
git push origin develop
```

### 3. Producción

#### Variables de Entorno
```bash
# .env.production
VITE_CLARITY_PROJECT_ID=prod_project_id
VITE_N8N_FEEDBACK_WEBHOOK_URL=https://prod-webhook.com/feedback
NODE_ENV=production
```

#### Deploy a Producción
```bash
# Deploy automático desde branch main
git push origin main
```

## 🔧 Configuración Avanzada

### 1. Headers de Seguridad

#### Configurar en Vercel
```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

#### Configurar en Render
```yaml
# render.yaml
services:
  - type: web
    name: prototipo-template
    headers:
      - path: /*
        name: X-Content-Type-Options
        value: nosniff
      - path: /*
        name: X-Frame-Options
        value: DENY
```

### 2. Redirecciones

#### Configurar en Vercel
```json
// vercel.json
{
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ]
}
```

#### Configurar en Render
```yaml
# render.yaml
services:
  - type: web
    name: prototipo-template
    redirects:
      - from: /old-path
        to: /new-path
        status: 301
```

### 3. Cache Headers

#### Configurar en Vercel
```json
// vercel.json
{
  "headers": [
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## 🔍 Troubleshooting

### 1. Deploy Falla

#### Verificar Build Local
```bash
# Verificar que el build funciona localmente
npm run build

# Verificar que dist/ se creó
ls -la dist/

# Verificar contenido de dist/
ls -la dist/
```

#### Verificar Variables de Entorno
```bash
# Verificar que las variables están configuradas
echo $VITE_CLARITY_PROJECT_ID
echo $VITE_N8N_FEEDBACK_WEBHOOK_URL
```

#### Verificar Logs de Deploy
```bash
# En Vercel
vercel logs

# En Render
# Ve a dashboard → Logs
```

### 2. Componentes No Cargan

#### Verificar Rutas
```bash
# Verificar que los archivos existen
ls -la components/
ls -la templates/

# Verificar rutas en HTML
grep -r "components/" templates/
```

#### Verificar Consola del Navegador
```javascript
// F12 → Console
// Verificar errores de JavaScript
// Verificar que los componentes se cargan
console.log('Onboarding:', window.OnboardingSystem);
console.log('Clarity:', window.ClarityIntegration);
console.log('Feedback:', window.FeedbackSystem);
```

### 3. Variables de Entorno No Cargadas

#### Verificar Configuración
```bash
# Verificar que el archivo .env existe
ls -la .env

# Verificar contenido
cat .env

# Verificar que las variables están en el deploy
# (En dashboard de Vercel/Render)
```

#### Verificar en Código
```javascript
// Verificar que las variables se cargan
console.log('Clarity ID:', import.meta.env.VITE_CLARITY_PROJECT_ID);
console.log('Webhook URL:', import.meta.env.VITE_N8N_FEEDBACK_WEBHOOK_URL);
```

## 📚 Recursos Adicionales

### Documentación Oficial
- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

### Herramientas Recomendadas
- [Vercel CLI](https://vercel.com/docs/cli) - Deploy desde terminal
- [Render CLI](https://render.com/docs/cli) - Deploy desde terminal
- [GitHub CLI](https://cli.github.com/) - Gestión de GitHub desde terminal

## 📄 Licencia

MIT License - Ver [LICENSE](../LICENSE) para detalles.
