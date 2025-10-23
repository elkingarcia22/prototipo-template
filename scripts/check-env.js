#!/usr/bin/env node

/**
 * Script de validación de variables de entorno
 * Verifica que las variables necesarias estén configuradas
 */

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const REQUIRED_ENV_VARS = [
  'NEXT_PUBLIC_CLARITY_PROJECT_ID',
  'N8N_WEBHOOK_URL'
];

const OPTIONAL_ENV_VARS = [
  'VERCEL_URL',
  'RENDER_URL',
  'GITHUB_PAT'
];

function checkEnvFile() {
  const envPath = resolve(process.cwd(), '.env.local');
  
  if (!existsSync(envPath)) {
    console.error('❌ Archivo .env.local no encontrado');
    console.log('💡 Crea el archivo .env.local basado en .env.example');
    process.exit(1);
  }
  
  console.log('✅ Archivo .env.local encontrado');
  return true;
}

function checkEnvVariables() {
  const envPath = resolve(process.cwd(), '.env.local');
  const envContent = readFileSync(envPath, 'utf8');
  
  const missingVars = [];
  const presentVars = [];
  
  // Verificar variables requeridas
  REQUIRED_ENV_VARS.forEach(varName => {
    if (!envContent.includes(varName) || envContent.includes(`${varName}=`)) {
      missingVars.push(varName);
    } else {
      presentVars.push(varName);
    }
  });
  
  // Verificar variables opcionales
  const optionalPresent = OPTIONAL_ENV_VARS.filter(varName => 
    envContent.includes(varName) && !envContent.includes(`${varName}=`)
  );
  
  console.log('\n📋 Estado de variables de entorno:');
  console.log('✅ Variables requeridas presentes:', presentVars.length, '/', REQUIRED_ENV_VARS.length);
  console.log('🔧 Variables opcionales presentes:', optionalPresent.length, '/', OPTIONAL_ENV_VARS.length);
  
  if (missingVars.length > 0) {
    console.error('\n❌ Variables requeridas faltantes:');
    missingVars.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    console.log('\n💡 Configura estas variables en .env.local');
    process.exit(1);
  }
  
  console.log('\n✅ Todas las variables requeridas están configuradas');
  return true;
}

function main() {
  console.log('🔍 Verificando configuración de variables de entorno...');
  
  try {
    checkEnvFile();
    checkEnvVariables();
    console.log('\n🎉 Configuración de entorno válida');
  } catch (error) {
    console.error('\n❌ Error en validación de entorno:', error.message);
    process.exit(1);
  }
}

main();
