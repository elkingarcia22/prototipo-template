# 🚀 Prototipo Template

Template robusto para prototipos funcionales con onboarding, analytics y feedback system.

## ✨ Características

- 🎭 **Onboarding System**: Sistema de pasos guiados con enmascaramiento
- 📊 **Microsoft Clarity**: Analytics automático integrado
- 💬 **Feedback System**: Sistema híbrido con n8n + localStorage
- 🎨 **Design System**: Tokens y componentes consistentes
- 🚀 **Deploy Automático**: GitHub Actions + Vercel/Render
- 🔧 **GATES System**: Validaciones automáticas

## 🛠️ Stack Tecnológico

- **Vite**: Build tool moderno y rápido
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Utility-first CSS
- **Alpine.js**: JavaScript reactivo ligero
- **Style Dictionary**: Sistema de tokens
- **GitHub Actions**: CI/CD automático

## 🚀 Quick Start

### 1. Clonar y configurar
```bash
git clone https://github.com/elkingarcia22/prototipo-template.git
cd prototipo-template
npm install
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env.local
# Editar .env.local con tus credenciales
```

### 3. Ejecutar setup automático
```bash
npm run setup
```

### 4. Desarrollo
```bash
npm run dev
```

## 📁 Estructura del Proyecto

```
prototipo-template/
├── 📦 package.json                    # Dependencias y scripts
├── 🛠️ vite.config.js                  # Configuración de Vite
├── 🎨 tailwind.config.js              # Configuración de Tailwind
├── 🔧 scripts/                        # Scripts de validación
│   ├── check-env.js                   # Validar variables de entorno
│   ├── check-deployment.js            # Validar deploy config
│   └── setup-project.js               # Setup automático
├── 📚 docs/                           # Documentación
│   ├── setup-guide.md                 # Guía de configuración
│   ├── deployment-guide.md             # Guía de deploy
│   └── troubleshooting.md             # Solución de problemas
├── 🧩 components/                     # Componentes modulares
│   ├── onboarding/                    # Sistema de onboarding
│   ├── clarity/                       # Integración Clarity
│   └── feedback/                      # Sistema de feedback
├── 🎭 features/                         # Features modulares
└── 🚀 templates/                      # Templates listos
```

## 🎯 Componentes Incluidos

### 🎭 Onboarding System
- Sistema de pasos guiados
- Enmascaramiento con spotlight
- Tooltips informativos
- Configuración JSON

### 📊 Microsoft Clarity
- Integración automática
- Configuración por proyecto
- Analytics de comportamiento

### 💬 Feedback System
- Integración con n8n
- Sistema híbrido (n8n + localStorage)
- Export de datos
- Análisis de feedback

## 🔧 GATES System

El template incluye un sistema de validaciones automáticas:

- **gate:dir**: Verifica estructura de directorios
- **gate:env**: Valida variables de entorno
- **gate:components**: Verifica componentes
- **gate:deployment**: Valida configuración de deploy

## 📚 Documentación

- [Guía de Configuración](docs/setup-guide.md)
- [Guía de Deploy](docs/deployment-guide.md)
- [Troubleshooting](docs/troubleshooting.md)
- [Componentes](components/README.md)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

Si tienes problemas:
1. Revisa [Troubleshooting](docs/troubleshooting.md)
2. Abre un [Issue](https://github.com/elkingarcia22/prototipo-template/issues)
3. Contacta al equipo

---

**Creado con ❤️ para acelerar el desarrollo de prototipos funcionales**
