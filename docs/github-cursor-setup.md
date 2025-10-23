# 🔧 Configuración de GitHub y Cursor

Guía completa para configurar GitHub y Cursor para trabajar con el template de prototipos.

## 🎯 Configuración Inicial

### 1. Configurar GitHub

#### Crear Repositorio
```bash
# Crear nuevo repositorio en GitHub
# Luego clonar localmente
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio

# Copiar archivos del template
cp -r /ruta/al/prototipo-template/* .
cp -r /ruta/al/prototipo-template/.* . 2>/dev/null || true

# Inicializar git
git add .
git commit -m "feat: Inicializar template de prototipo"
git push -u origin main
```

#### Configurar Branch Protection
1. Ve a **Settings** → **Branches**
2. Añade regla para `main`:
   - ✅ Require pull request reviews
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date

### 2. Configurar Cursor

#### Instalar Cursor
1. Descarga [Cursor](https://cursor.sh/)
2. Instala la aplicación
3. Configura tu cuenta de GitHub

#### Configurar Workspace
```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "files.associations": {
    "*.html": "html"
  }
}
```

## 🚀 Workflow de Desarrollo

### 1. Flujo de Trabajo Estándar

#### Crear Nueva Feature
```bash
# Crear rama para nueva feature
git checkout -b feature/nueva-funcionalidad

# Hacer cambios
# ... editar archivos ...

# Commit con mensaje descriptivo
git add .
git commit -m "feat: Agregar nueva funcionalidad X"

# Push a GitHub
git push origin feature/nueva-funcionalidad

# Crear Pull Request en GitHub
```

#### Mensajes de Commit
```bash
# Formato: tipo: descripción
feat: nueva funcionalidad
fix: corrección de bug
style: cambios de formato
refactor: refactorización
docs: actualización de documentación
test: agregar o modificar tests
chore: tareas de mantenimiento
```

### 2. Integración Continua

#### GitHub Actions
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run gate:dir
      - run: npm run gate:env
      - run: npm run gate:components
      - run: npm run build
```

#### Verificaciones Automáticas
```bash
# Pre-commit hooks
npm install --save-dev husky lint-staged

# Configurar husky
npx husky install
npx husky add .husky/pre-commit "npm run gate:dir && npm run gate:env"
```

## 🔧 Configuración Avanzada

### 1. Variables de Entorno

#### Desarrollo Local
```bash
# .env.local
VITE_CLARITY_PROJECT_ID=tu_project_id_desarrollo
VITE_N8N_FEEDBACK_WEBHOOK_URL=https://tu-n8n-desarrollo.com/webhook/feedback
NODE_ENV=development
```

#### Producción
```bash
# En Vercel/Render
VITE_CLARITY_PROJECT_ID=tu_project_id_produccion
VITE_N8N_FEEDBACK_WEBHOOK_URL=https://tu-n8n-produccion.com/webhook/feedback
NODE_ENV=production
```

### 2. Configuración de Deploy

#### Vercel
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_CLARITY_PROJECT_ID": "@clarity_project_id",
    "VITE_N8N_FEEDBACK_WEBHOOK_URL": "@n8n_webhook_url"
  }
}
```

#### Render
```yaml
# render.yaml
services:
  - type: web
    name: prototipo-template
    env: static
    buildCommand: npm run build
    staticPublishPath: ./dist
    envVars:
      - key: VITE_CLARITY_PROJECT_ID
        value: tu_project_id
      - key: VITE_N8N_FEEDBACK_WEBHOOK_URL
        value: https://tu-webhook.com/feedback
```

### 3. Configuración de Cursor

#### Extensiones Recomendadas
```json
// .vscode/extensions.json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

#### Configuración de Prettier
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

## 🎯 Mejores Prácticas

### 1. Estructura de Commits

#### Formato Estándar
```bash
# Tipo: Descripción (máximo 50 caracteres)
feat: Agregar sistema de onboarding
fix: Corregir error en feedback modal
docs: Actualizar guía de setup
style: Aplicar formato a archivos CSS
refactor: Simplificar lógica de Clarity
test: Agregar tests para onboarding
chore: Actualizar dependencias
```

#### Ejemplos de Commits
```bash
# ✅ Buenos commits
feat: Agregar sistema de onboarding modular
fix: Corregir error de CORS en feedback
docs: Crear guía de configuración de GitHub
style: Aplicar tokens UBITS en lugar de colores hardcodeados
refactor: Extraer lógica de Clarity a componente modular
test: Agregar tests unitarios para feedback system
chore: Actualizar Vite a versión 5.2.0

# ❌ Malos commits
fix: arreglar bug
update: cambios
wip: trabajo en progreso
misc: varias cosas
```

### 2. Naming Conventions

#### Archivos y Directorios
```bash
# ✅ Buenos nombres
components/onboarding/onboarding.js
components/clarity/clarity.css
templates/feedback.html
docs/setup-guide.md

# ❌ Malos nombres
components/onboarding/onboarding.js
components/clarity/clarity.css
templates/feedback.html
docs/setup-guide.md
```

#### Variables y Funciones
```javascript
// ✅ Buenos nombres
const onboardingSystem = createOnboarding();
const clarityIntegration = createClarity();
const feedbackSystem = createFeedback();

function handleFeedbackSubmit() {}
function trackUserAction() {}
function detectCurrentSection() {}

// ❌ Malos nombres
const os = createOnboarding();
const ci = createClarity();
const fs = createFeedback();

function hfs() {}
function tua() {}
function dcs() {}
```

### 3. Documentación

#### Comentarios en Código
```javascript
/**
 * Sistema de Onboarding Modular
 * Componente reutilizable para guiar usuarios a través de prototipos
 */
class OnboardingSystem {
    /**
     * Inicializar sistema de onboarding
     * @param {Object} config - Configuración del onboarding
     * @param {Array} config.steps - Pasos del onboarding
     * @param {Function} config.onComplete - Callback al completar
     */
    constructor(config = {}) {
        // ... implementación
    }
}
```

#### README de Componentes
```markdown
# 🎭 Sistema de Onboarding

## Uso Básico
```javascript
const onboarding = createOnboarding({
    steps: [...]
});
```

## API Completa
- `start()` - Iniciar onboarding
- `nextStep()` - Siguiente paso
- `skip()` - Saltar onboarding
```

## 🔍 Debugging

### 1. Logs de Desarrollo

#### Habilitar Debug
```javascript
// En cada componente
const onboarding = createOnboarding({ debug: true });
const clarity = createClarity({ debug: true });
const feedback = createFeedback({ developmentMode: true });
```

#### Verificar Estado
```javascript
// En consola del navegador
console.log('Onboarding:', window.OnboardingSystem);
console.log('Clarity:', window.ClarityIntegration);
console.log('Feedback:', window.FeedbackSystem);
```

### 2. Herramientas de Debug

#### Chrome DevTools
```javascript
// Breakpoints en funciones críticas
function startOnboarding() {
    debugger; // Breakpoint aquí
    console.log('Iniciando onboarding...');
}
```

#### Network Tab
- Verificar requests a webhooks
- Verificar carga de componentes
- Verificar errores de CORS

## 🚀 Deploy Automático

### 1. GitHub Actions

#### Workflow Completo
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

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
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### 2. Variables de Entorno

#### Secrets de GitHub
```
VERCEL_TOKEN=tu_token_vercel
ORG_ID=tu_org_id
PROJECT_ID=tu_project_id
CLARITY_PROJECT_ID=tu_clarity_id
N8N_WEBHOOK_URL=tu_webhook_url
```

## 📚 Recursos Adicionales

### Documentación Oficial
- [GitHub Actions](https://docs.github.com/en/actions)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Cursor Documentation](https://cursor.sh/docs)

### Herramientas Recomendadas
- [Husky](https://typicode.github.io/husky/) - Git hooks
- [Lint-staged](https://github.com/okonet/lint-staged) - Lint staged files
- [Prettier](https://prettier.io/) - Code formatter
- [ESLint](https://eslint.org/) - JavaScript linter

## 🆘 Troubleshooting

### Problemas Comunes

#### 1. Git Push Falla
```bash
# Verificar estado
git status

# Verificar remotes
git remote -v

# Forzar push (cuidado)
git push --force-with-lease origin main
```

#### 2. Deploy Falla
```bash
# Verificar build local
npm run build

# Verificar variables de entorno
echo $VITE_CLARITY_PROJECT_ID

# Verificar logs de deploy
# (En dashboard de Vercel/Render)
```

#### 3. Componentes No Cargan
```bash
# Verificar rutas
ls -la components/

# Verificar HTML
grep -r "components/" templates/

# Verificar consola del navegador
# (F12 → Console)
```

## 📄 Licencia

MIT License - Ver [LICENSE](../LICENSE) para detalles.
