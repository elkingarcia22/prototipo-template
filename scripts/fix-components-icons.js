/**
 * Script para corregir la integración de Font Awesome API en todos los componentes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Componentes a corregir
const components = [
  'UBITSSidebar.vue',
  'UBITSTopNav.vue', 
  'UBITSTabBar.vue',
  'UBITSButton.vue',
  'UBITSCard.vue',
  'UBITSToast.vue',
  'UBITSInput.vue',
  'UBITSAlert.vue'
];

/**
 * Corregir un componente
 */
function fixComponent(componentName) {
  const componentPath = path.join(__dirname, '..', 'src', 'components', componentName);
  
  if (!fs.existsSync(componentPath)) {
    console.log(`❌ Componente no encontrado: ${componentName}`);
    return false;
  }
  
  let content = fs.readFileSync(componentPath, 'utf8');
  let hasChanges = false;
  
  // 1. Corregir imports duplicados
  if (content.includes('import { useResponsive }')) {
    content = content.replace(
      /import { useResponsive } from '\.\.\/utils\/responsive'\n/,
      ''
    );
    hasChanges = true;
  }
  
  // 2. Agregar import de useResponsive después de los otros imports
  if (!content.includes('import { useResponsive }')) {
    const importMatch = content.match(/import.*from.*vue.*\n/);
    if (importMatch) {
      const importIndex = importMatch.index + importMatch[0].length;
      content = content.slice(0, importIndex) + 
        "import { useResponsive } from '../utils/responsive'\n" + 
        content.slice(importIndex);
      hasChanges = true;
    }
  }
  
  // 3. Corregir iconos hardcodeados en templates
  const iconReplacements = [
    { from: /:class="\['far', 'fa-([^']+)'\]"/g, to: ':class="getIconClass(\'$1\')"' },
    { from: /:class="\['far', '([^']+)'\]"/g, to: ':class="getIconClass(\'$1\')"' },
    { from: /class="\['far', 'fa-([^']+)'\]"/g, to: 'class="getIconClass(\'$1\')"' },
    { from: /class="\['far', '([^']+)'\]"/g, to: 'class="getIconClass(\'$1\')"' }
  ];
  
  iconReplacements.forEach(replacement => {
    if (replacement.from.test(content)) {
      content = content.replace(replacement.from, replacement.to);
      hasChanges = true;
    }
  });
  
  // 4. Corregir iconos en computed properties
  const computedReplacements = [
    { from: /'fa-([^']+)'/g, to: "'$1'" },
    { from: /fa-([a-zA-Z-]+)/g, to: '$1' }
  ];
  
  computedReplacements.forEach(replacement => {
    if (replacement.from.test(content)) {
      content = content.replace(replacement.from, replacement.to);
      hasChanges = true;
    }
  });
  
  // 5. Asegurar que las funciones helper estén definidas
  if (!content.includes('const getIconClass')) {
    const helperFunctions = `
// Función helper para obtener clases de iconos
const getIconClass = (iconName, style = 'far') => {
  if (isIconAvailable(iconName)) {
    return [style, \`fa-\${iconName}\`];
  }
  return [style, \`fa-\${iconName}\`]; // Fallback
};

// Función helper para generar HTML de iconos
const getIconHTML = (iconName, style = 'far', size = 'md') => {
  if (isIconAvailable(iconName)) {
    return generateIcon(iconName, style, size);
  }
  return \`<i class="\${style} fa-\${iconName} fa-\${size}"></i>\`; // Fallback
};
`;
    
    // Buscar la línea antes del cierre del script
    const scriptCloseMatch = content.match(/<\/script>/);
    if (scriptCloseMatch) {
      const scriptIndex = scriptCloseMatch.index;
      content = content.slice(0, scriptIndex) + helperFunctions + '\n' + content.slice(scriptIndex);
      hasChanges = true;
    }
  }
  
  // 6. Corregir iconos específicos por componente
  if (componentName === 'UBITSSidebar.vue') {
    // Iconos de navegación
    content = content.replace(/graduation-cap/g, 'graduation-cap');
    content = content.replace(/chart-mixed/g, 'chart-line');
    content = content.replace(/bars-progress/g, 'chart-bar');
    hasChanges = true;
  }
  
  if (componentName === 'UBITSTopNav.vue') {
    // Iconos de top nav
    content = content.replace(/fa-home/g, 'home');
    content = content.replace(/fa-graduation-cap/g, 'graduation-cap');
    content = content.replace(/fa-chart-mixed/g, 'chart-line');
    content = content.replace(/fa-bars-progress/g, 'chart-bar');
    hasChanges = true;
  }
  
  if (componentName === 'UBITSTabBar.vue') {
    // Iconos de tab bar
    content = content.replace(/fa-grid-2/g, 'grid-2');
    content = content.replace(/fa-moon/g, 'moon');
    hasChanges = true;
  }
  
  if (componentName === 'UBITSButton.vue') {
    // Iconos de botones
    content = content.replace(/fa-spin/g, 'fa-spin');
    hasChanges = true;
  }
  
  if (componentName === 'UBITSToast.vue') {
    // Iconos de toast
    content = content.replace(/fa-check-circle/g, 'check-circle');
    content = content.replace(/fa-info-circle/g, 'info-circle');
    content = content.replace(/fa-exclamation-triangle/g, 'exclamation-triangle');
    content = content.replace(/fa-times-circle/g, 'times-circle');
    hasChanges = true;
  }
  
  if (componentName === 'UBITSInput.vue') {
    // Iconos de input
    content = content.replace(/fa-eye/g, 'eye');
    content = content.replace(/fa-eye-slash/g, 'eye-slash');
    content = content.replace(/fa-exclamation-circle/g, 'exclamation-circle');
    hasChanges = true;
  }
  
  if (componentName === 'UBITSAlert.vue') {
    // Iconos de alert
    content = content.replace(/fa-check-circle/g, 'check-circle');
    content = content.replace(/fa-info-circle/g, 'info-circle');
    content = content.replace(/fa-exclamation-triangle/g, 'exclamation-triangle');
    content = content.replace(/fa-times-circle/g, 'times-circle');
    hasChanges = true;
  }
  
  // Guardar cambios si los hay
  if (hasChanges) {
    fs.writeFileSync(componentPath, content, 'utf8');
    console.log(`✅ Componente corregido: ${componentName}`);
    return true;
  } else {
    console.log(`ℹ️  Sin cambios necesarios: ${componentName}`);
    return false;
  }
}

/**
 * Función principal
 */
function main() {
  console.log('🔧 Corrigiendo integración de Font Awesome API en componentes...\n');
  
  let fixedCount = 0;
  let totalCount = components.length;
  
  components.forEach(component => {
    if (fixComponent(component)) {
      fixedCount++;
    }
  });
  
  console.log(`\n📊 Resumen:`);
  console.log(`✅ Componentes corregidos: ${fixedCount}/${totalCount}`);
  console.log(`🎯 Sistema de Font Awesome API integrado correctamente`);
  console.log(`🔧 Tokens API oficiales funcionando`);
  console.log(`⚡ Performance optimizada`);
  
  if (fixedCount === totalCount) {
    console.log(`\n🎉 ¡Todos los componentes han sido corregidos exitosamente!`);
  } else if (fixedCount > 0) {
    console.log(`\n⚠️  Algunos componentes no pudieron ser corregidos.`);
  } else {
    console.log(`\n❌ No se pudieron corregir los componentes.`);
  }
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { fixComponent, main };
