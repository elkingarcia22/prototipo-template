#!/usr/bin/env node

/**
 * Script de setup automático del proyecto
 * Configura el template para un nuevo prototipo
 */

import { writeFileSync, existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';

function createEnvExample() {
  const envExample = `# Variables de entorno para el prototipo
# Copia este archivo a .env.local y configura las variables

# Microsoft Clarity (requerido)
NEXT_PUBLIC_CLARITY_PROJECT_ID=tu_clarity_project_id

# n8n Webhook (requerido)
N8N_WEBHOOK_URL=https://tu-n8n-instance.com/webhook/feedback

# Deploy URLs (opcional)
VERCEL_URL=https://tu-prototipo.vercel.app
RENDER_URL=https://tu-prototipo.onrender.com

# GitHub (opcional)
GITHUB_PAT=tu_github_personal_access_token
`;

  writeFileSync(resolve(process.cwd(), '.env.example'), envExample);
  console.log('✅ Archivo .env.example creado');
}

function createGitignore() {
  const gitignore = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
dist/
build/
.next/
out/

# Environment variables
.env.local
.env.production
.env

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs/

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output/

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port
`;

  writeFileSync(resolve(process.cwd(), '.gitignore'), gitignore);
  console.log('✅ Archivo .gitignore creado');
}

function createVercelConfig() {
  const vercelConfig = {
    "version": 2,
    "builds": [
      {
        "src": "package.json",
        "use": "@vercel/static-build",
        "config": {
          "distDir": "dist"
        }
      }
    ],
    "routes": [
      {
        "src": "/(.*)",
        "dest": "/index.html"
      }
    ],
    "env": {
      "NEXT_PUBLIC_CLARITY_PROJECT_ID": "@clarity_project_id",
      "N8N_WEBHOOK_URL": "@n8n_webhook_url"
    }
  };

  writeFileSync(resolve(process.cwd(), 'vercel.json'), JSON.stringify(vercelConfig, null, 2));
  console.log('✅ Configuración de Vercel creada');
}

function createRenderConfig() {
  const renderConfig = `services:
  - type: web
    name: prototipo-template
    env: static
    buildCommand: npm run build
    staticPublishPath: ./dist
    envVars:
      - key: NEXT_PUBLIC_CLARITY_PROJECT_ID
        sync: false
      - key: N8N_WEBHOOK_URL
        sync: false
`;

  writeFileSync(resolve(process.cwd(), 'render.yaml'), renderConfig);
  console.log('✅ Configuración de Render creada');
}

function createGitHubActions() {
  const deployAction = `name: Deploy to Vercel

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run GATES validation
      run: npm run gate:dir && npm run gate:components
      
    - name: Build project
      run: npm run build
      
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: \${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: \${{ secrets.ORG_ID }}
        vercel-project-id: \${{ secrets.PROJECT_ID }}
        working-directory: ./
`;

  writeFileSync(resolve(process.cwd(), '.github/workflows/deploy.yml'), deployAction);
  console.log('✅ GitHub Actions configurado');
}

function installDependencies() {
  try {
    console.log('📦 Instalando dependencias...');
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencias instaladas');
  } catch (error) {
    console.error('❌ Error instalando dependencias:', error.message);
    process.exit(1);
  }
}

function main() {
  console.log('🚀 Configurando template de prototipo...');
  
  try {
    createEnvExample();
    createGitignore();
    createVercelConfig();
    createRenderConfig();
    createGitHubActions();
    installDependencies();
    
    console.log('\n🎉 Template configurado exitosamente!');
    console.log('\n📋 Próximos pasos:');
    console.log('1. Copia .env.example a .env.local');
    console.log('2. Configura las variables de entorno');
    console.log('3. Ejecuta npm run dev para desarrollo');
    console.log('4. Configura deploy en Vercel o Render');
    
  } catch (error) {
    console.error('\n❌ Error en setup:', error.message);
    process.exit(1);
  }
}

main();
