#!/usr/bin/env node

/**
 * Script para verificar que todos los tokens UBITS usados en los componentes
 * estén correctamente definidos en el archivo de tokens
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colores para la consola
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function extractTokensFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const tokenRegex = /var\(--ubits-[^)]+\)/g;
    const tokens = content.match(tokenRegex) || [];
    return tokens.map(token => token.replace('var(', '').replace(')', ''));
  } catch (error) {
    log(`Error leyendo archivo ${filePath}: ${error.message}`, 'red');
    return [];
  }
}

function extractDefinedTokens(tokensFilePath) {
  try {
    const content = fs.readFileSync(tokensFilePath, 'utf8');
    const tokenRegex = /--ubits-[^:]+:/g;
    const tokens = content.match(tokenRegex) || [];
    return tokens.map(token => token.replace(':', ''));
  } catch (error) {
    log(`Error leyendo archivo de tokens ${tokensFilePath}: ${error.message}`, 'red');
    return [];
  }
}

function main() {
  log('🔍 Verificando tokens UBITS en componentes...', 'blue');
  log('', 'reset');
  
  const componentsDir = path.join(__dirname, '../src/components');
  const tokensFile = path.join(__dirname, '../src/styles/ubits-tokens.css');
  
  // Verificar que el archivo de tokens existe
  if (!fs.existsSync(tokensFile)) {
    log('❌ Archivo de tokens no encontrado: src/styles/ubits-tokens.css', 'red');
    process.exit(1);
  }
  
  // Extraer tokens definidos
  const definedTokens = extractDefinedTokens(tokensFile);
  log(`📋 Tokens definidos: ${definedTokens.length}`, 'green');
  
  // Buscar archivos de componentes
  const componentFiles = fs.readdirSync(componentsDir)
    .filter(file => file.endsWith('.vue'))
    .map(file => path.join(componentsDir, file));
  
  if (componentFiles.length === 0) {
    log('⚠️  No se encontraron archivos de componentes Vue.js', 'yellow');
    return;
  }
  
  log(`📁 Archivos de componentes encontrados: ${componentFiles.length}`, 'blue');
  log('', 'reset');
  
  let totalUsedTokens = new Set();
  let missingTokens = new Set();
  
  // Verificar cada componente
  componentFiles.forEach(filePath => {
    const fileName = path.basename(filePath);
    log(`🔍 Verificando ${fileName}...`, 'blue');
    
    const usedTokens = extractTokensFromFile(filePath);
    const uniqueTokens = [...new Set(usedTokens)];
    
    log(`   Tokens usados: ${uniqueTokens.length}`, 'green');
    
    // Verificar tokens faltantes
    const missing = uniqueTokens.filter(token => !definedTokens.includes(token));
    
    if (missing.length > 0) {
      log(`   ❌ Tokens faltantes: ${missing.length}`, 'red');
      missing.forEach(token => {
        log(`      - ${token}`, 'red');
        missingTokens.add(token);
      });
    } else {
      log(`   ✅ Todos los tokens están definidos`, 'green');
    }
    
    // Agregar a total
    uniqueTokens.forEach(token => totalUsedTokens.add(token));
    
    log('', 'reset');
  });
  
  // Resumen final
  log('📊 RESUMEN DE VERIFICACIÓN', 'bold');
  log('='.repeat(50), 'blue');
  log(`📋 Tokens definidos: ${definedTokens.length}`, 'green');
  log(`🔍 Tokens únicos usados: ${totalUsedTokens.size}`, 'blue');
  log(`❌ Tokens faltantes: ${missingTokens.size}`, missingTokens.size > 0 ? 'red' : 'green');
  
  if (missingTokens.size > 0) {
    log('', 'reset');
    log('🚨 TOKENS FALTANTES:', 'red');
    missingTokens.forEach(token => {
      log(`   - ${token}`, 'red');
    });
    log('', 'reset');
    log('💡 Solución: Agregar los tokens faltantes al archivo src/styles/ubits-tokens.css', 'yellow');
    process.exit(1);
  } else {
    log('', 'reset');
    log('🎉 ¡Todos los tokens están correctamente definidos!', 'green');
    log('✅ Los componentes pueden usar todos los tokens UBITS sin problemas', 'green');
  }
}

// Ejecutar verificación
main();
