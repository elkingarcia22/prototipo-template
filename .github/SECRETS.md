# 🔐 GitHub Secrets Configuration

Este archivo documenta los secrets necesarios para el funcionamiento completo del template.

## 📋 Secrets Requeridos

### 🔧 Variables de Entorno
```
CLARITY_PROJECT_ID=tu_project_id_aqui
N8N_WEBHOOK_URL=https://tu-webhook.com/feedback
```

### 🚀 Vercel
```
VERCEL_TOKEN=tu_vercel_token
VERCEL_ORG_ID=tu_org_id
VERCEL_PROJECT_ID=tu_project_id
```

### 🔧 Render
```
RENDER_SERVICE_ID=tu_service_id
RENDER_API_KEY=tu_api_key
```

### 🌐 Dominio Personalizado (Opcional)
```
CUSTOM_DOMAIN=tu-dominio.com
```

## 🎯 Cómo Configurar

### 1. Ir a GitHub Settings
1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** → **Secrets and variables** → **Actions**
3. Haz clic en **New repository secret**

### 2. Añadir Secrets

#### Microsoft Clarity
1. Ve a [Microsoft Clarity](https://clarity.microsoft.com/)
2. Crea un nuevo proyecto
3. Copia el Project ID del script generado
4. Añade como secret: `CLARITY_PROJECT_ID`

#### n8n Webhook
1. Crea un workflow en n8n
2. Añade un nodo "Webhook"
3. Copia la URL del webhook
4. Añade como secret: `N8N_WEBHOOK_URL`

#### Vercel
1. Ve a [Vercel](https://vercel.com)
2. Ve a **Settings** → **Tokens**
3. Crea un nuevo token
4. Añade como secret: `VERCEL_TOKEN`
5. Obtén tu Org ID y Project ID
6. Añade como secrets: `VERCEL_ORG_ID` y `VERCEL_PROJECT_ID`

#### Render
1. Ve a [Render](https://render.com)
2. Ve a **Account Settings** → **API Keys**
3. Crea una nueva API key
4. Añade como secret: `RENDER_API_KEY`
5. Obtén tu Service ID
6. Añade como secret: `RENDER_SERVICE_ID`

## 🔍 Verificar Configuración

### Script de Verificación
```bash
# Ejecutar en terminal local
npm run gate:env
```

### Verificar en GitHub Actions
1. Ve a **Actions** en tu repositorio
2. Ejecuta el workflow "CI/CD Pipeline"
3. Verifica que todos los jobs pasan

## 🚨 Troubleshooting

### Error: Secret not found
```
Error: Secret CLARITY_PROJECT_ID not found
```
**Solución**: Añade el secret en GitHub Settings

### Error: Invalid token
```
Error: Invalid Vercel token
```
**Solución**: Verifica que el token es correcto y tiene permisos

### Error: Service not found
```
Error: Render service not found
```
**Solución**: Verifica que el Service ID es correcto

## 📚 Recursos Adicionales

### Documentación Oficial
- [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Render API](https://render.com/docs/api)

### Herramientas Recomendadas
- [GitHub CLI](https://cli.github.com/) - Gestión de secrets desde terminal
- [Vercel CLI](https://vercel.com/docs/cli) - Deploy desde terminal
- [Render CLI](https://render.com/docs/cli) - Deploy desde terminal

## 🔒 Seguridad

### Mejores Prácticas
1. **No committear secrets**: Nunca incluyas secrets en el código
2. **Rotar tokens**: Cambia los tokens regularmente
3. **Permisos mínimos**: Usa tokens con permisos mínimos necesarios
4. **Auditoría**: Revisa regularmente los secrets configurados

### Limpieza de Secrets
```bash
# Eliminar secret obsoleto
gh secret delete SECRET_NAME

# Listar todos los secrets
gh secret list
```

## 📄 Licencia

MIT License - Ver [LICENSE](../LICENSE) para detalles.
