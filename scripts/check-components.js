#!/usr/bin/env node

/**
 * Script de validación de componentes
 * Verifica que todos los componentes estén presentes y configurados
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { resolve } from 'path';

const REQUIRED_COMPONENTS = [
  'components/onboarding/onboarding.js',
  'components/onboarding/onboarding.css',
  'components/clarity/clarity.js',
  'components/feedback/feedback.js',
  'components/feedback/feedback.css'
];

const REQUIRED_TEMPLATES = [
  'templates/basic.html',
  'templates/onboarding.html',
  'templates/clarity.html',
  'templates/feedback.html',
  'templates/full-featured.html'
];

function checkComponents() {
  console.log('🔍 Verificando componentes...');
  
  const missingComponents = [];
  const presentComponents = [];
  
  REQUIRED_COMPONENTS.forEach(componentPath => {
    const fullPath = resolve(process.cwd(), componentPath);
    if (!existsSync(fullPath)) {
      missingComponents.push(componentPath);
    } else {
      presentComponents.push(componentPath);
    }
  });
  
  console.log(`✅ Componentes presentes: ${presentComponents.length}/${REQUIRED_COMPONENTS.length}`);
  
  if (missingComponents.length > 0) {
    console.error('❌ Componentes faltantes:');
    missingComponents.forEach(component => {
      console.error(`   - ${component}`);
    });
    return false;
  }
  
  return true;
}

function checkTemplates() {
  console.log('🔍 Verificando templates...');
  
  const missingTemplates = [];
  const presentTemplates = [];
  
  REQUIRED_TEMPLATES.forEach(templatePath => {
    const fullPath = resolve(process.cwd(), templatePath);
    if (!existsSync(fullPath)) {
      missingTemplates.push(templatePath);
    } else {
      presentTemplates.push(templatePath);
    }
  });
  
  console.log(`✅ Templates presentes: ${presentTemplates.length}/${REQUIRED_TEMPLATES.length}`);
  
  if (missingTemplates.length > 0) {
    console.error('❌ Templates faltantes:');
    missingTemplates.forEach(template => {
      console.error(`   - ${template}`);
    });
    return false;
  }
  
  return true;
}

function checkComponentContent() {
  console.log('🔍 Verificando contenido de componentes...');
  
  const componentsToCheck = [
    'components/onboarding/onboarding.js',
    'components/feedback/feedback.js'
  ];
  
  for (const componentPath of componentsToCheck) {
    const fullPath = resolve(process.cwd(), componentPath);
    if (existsSync(fullPath)) {
      const content = readFileSync(fullPath, 'utf8');
      
      // Verificar que no esté vacío
      if (content.trim().length === 0) {
        console.error(`❌ Componente vacío: ${componentPath}`);
        return false;
      }
      
      // Verificar que tenga funciones básicas
      if (componentPath.includes('onboarding') && !content.includes('function')) {
        console.error(`❌ Componente onboarding sin funciones: ${componentPath}`);
        return false;
      }
      
      if (componentPath.includes('feedback') && !content.includes('function')) {
        console.error(`❌ Componente feedback sin funciones: ${componentPath}`);
        return false;
      }
    }
  }
  
  console.log('✅ Contenido de componentes válido');
  return true;
}

function main() {
  console.log('🔍 Verificando componentes del template...');
  
  try {
    const componentsOk = checkComponents();
    const templatesOk = checkTemplates();
    const contentOk = checkComponentContent();
    
    if (componentsOk && templatesOk && contentOk) {
      console.log('\n🎉 Todos los componentes están configurados correctamente');
    } else {
      console.error('\n❌ Algunos componentes necesitan configuración');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Error en validación de componentes:', error.message);
    process.exit(1);
  }
}

main();
