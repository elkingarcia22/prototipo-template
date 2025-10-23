#!/usr/bin/env node

/**
 * Script de validación de configuración de deploy
 * Verifica que la configuración de deploy esté lista
 */

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

function checkVercelConfig() {
  const vercelPath = resolve(process.cwd(), 'vercel.json');
  
  if (existsSync(vercelPath)) {
    console.log('✅ Configuración de Vercel encontrada');
    return true;
  }
  
  console.log('⚠️  Configuración de Vercel no encontrada (opcional)');
  return true; // No es requerido
}

function checkRenderConfig() {
  const renderPath = resolve(process.cwd(), 'render.yaml');
  
  if (existsSync(renderPath)) {
    console.log('✅ Configuración de Render encontrada');
    return true;
  }
  
  console.log('⚠️  Configuración de Render no encontrada (opcional)');
  return true; // No es requerido
}

function checkGitHubActions() {
  const actionsPath = resolve(process.cwd(), '.github/workflows');
  
  if (!existsSync(actionsPath)) {
    console.error('❌ Directorio .github/workflows no encontrado');
    return false;
  }
  
  const files = readdirSync(actionsPath);
  const ymlFiles = files.filter(file => file.endsWith('.yml') || file.endsWith('.yaml'));
  
  if (ymlFiles.length === 0) {
    console.error('❌ No se encontraron archivos de GitHub Actions');
    return false;
  }
  
  console.log(`✅ GitHub Actions configurado: ${ymlFiles.length} archivo(s)`);
  return true;
}

function checkPackageJson() {
  const packagePath = resolve(process.cwd(), 'package.json');
  
  if (!existsSync(packagePath)) {
    console.error('❌ package.json no encontrado');
    return false;
  }
  
  const packageContent = readFileSync(packagePath, 'utf8');
  const packageJson = JSON.parse(packageContent);
  
  // Verificar scripts de deploy
  const requiredScripts = ['build', 'deploy'];
  const missingScripts = requiredScripts.filter(script => !packageJson.scripts[script]);
  
  if (missingScripts.length > 0) {
    console.error('❌ Scripts de deploy faltantes:', missingScripts.join(', '));
    return false;
  }
  
  console.log('✅ Scripts de deploy configurados');
  return true;
}

function checkEnvVars() {
  const envPath = resolve(process.cwd(), '.env.local');
  
  if (!existsSync(envPath)) {
    console.error('❌ Archivo .env.local no encontrado');
    return false;
  }
  
  const envContent = readFileSync(envPath, 'utf8');
  
  // Verificar variables de deploy
  const deployVars = ['VERCEL_URL', 'RENDER_URL'];
  const presentDeployVars = deployVars.filter(varName => 
    envContent.includes(varName) && !envContent.includes(`${varName}=`)
  );
  
  if (presentDeployVars.length === 0) {
    console.log('⚠️  Variables de deploy no configuradas (opcional)');
  } else {
    console.log(`✅ Variables de deploy configuradas: ${presentDeployVars.length}`);
  }
  
  return true;
}

function main() {
  console.log('🔍 Verificando configuración de deploy...');
  
  try {
    const vercelOk = checkVercelConfig();
    const renderOk = checkRenderConfig();
    const actionsOk = checkGitHubActions();
    const packageOk = checkPackageJson();
    const envOk = checkEnvVars();
    
    if (vercelOk && renderOk && actionsOk && packageOk && envOk) {
      console.log('\n🎉 Configuración de deploy lista');
    } else {
      console.error('\n❌ Configuración de deploy incompleta');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Error en validación de deploy:', error.message);
    process.exit(1);
  }
}

main();
