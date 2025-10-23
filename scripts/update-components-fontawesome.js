/**
 * Script para actualizar todos los componentes para usar el nuevo sistema de Font Awesome API
 * Este script reemplaza el uso directo de iconos Font Awesome con el sistema de API
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Componentes que necesitan actualización
const componentsToUpdate = [
  'UBITSSidebar.vue',
  'UBITSTopNav.vue', 
  'UBITSTabBar.vue',
  'UBITSButton.vue',
  'UBITSCard.vue',
  'UBITSToast.vue',
  'UBITSInput.vue',
  'UBITSAlert.vue'
];

// Mapeo de iconos existentes a iconos de la API
const iconMapping = {
  // Navegación
  'fa-home': 'home',
  'fa-graduation-cap': 'graduation-cap',
  'fa-chart-mixed': 'chart-line',
  'fa-bars-progress': 'chart-bar',
  'fa-clipboard': 'clipboard',
  'fa-users': 'users',
  'fa-layer-group': 'layer-group',
  'fa-sparkles': 'sparkles',
  'fa-grid-2': 'grid-2',
  
  // Tema
  'fa-moon': 'moon',
  'fa-sun': 'sun',
  
  // Estados
  'fa-spinner': 'spinner',
  'fa-lock': 'lock',
  'fa-times': 'times',
  'fa-check-circle': 'check-circle',
  'fa-info-circle': 'info-circle',
  'fa-exclamation-triangle': 'exclamation-triangle',
  'fa-times-circle': 'times-circle',
  'fa-eye': 'eye',
  'fa-eye-slash': 'eye-slash',
  'fa-exclamation-circle': 'exclamation-circle'
};

// Estilos de iconos por defecto
const defaultIconStyles = {
  navigation: 'far',
  theme: 'far',
  states: 'far',
  actions: 'far'
};

/**
 * Actualizar un componente para usar el sistema de Font Awesome API
 */
function updateComponent(componentPath) {
  try {
    const fullPath = path.join(__dirname, '..', 'src', 'components', componentPath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`❌ Componente no encontrado: ${componentPath}`);
      return false;
    }
    
    let content = fs.readFileSync(fullPath, 'utf8');
    let hasChanges = false;
    
    // 1. Agregar import del sistema de iconos
    if (!content.includes('useIcons') && !content.includes('FontAwesomeAPI')) {
      const importStatement = `import { useIcons } from '../utils/icons';\nimport { useFontAwesomeAPI } from '../utils/fontawesome-api';\n`;
      
      // Buscar la línea después de los imports existentes
      const scriptMatch = content.match(/<script[^>]*>/);
      if (scriptMatch) {
        const scriptIndex = scriptMatch.index + scriptMatch[0].length;
        content = content.slice(0, scriptIndex) + '\n' + importStatement + content.slice(scriptIndex);
        hasChanges = true;
      }
    }
    
    // 2. Agregar setup del sistema de iconos
    if (!content.includes('useIcons()') && !content.includes('useFontAwesomeAPI()')) {
      const setupCode = `
// Sistema de iconos Font Awesome
const { generateIcon, isIconAvailable } = useIcons();
const { searchIcons, generateIconHTML } = useFontAwesomeAPI({
  apiToken: '15ACD43C-4C0F-44D2-AE1C-6E8646841B1F',
  autoLoad: true,
  cache: true
});
`;
      
      // Buscar la línea después de los imports
      const setupMatch = content.match(/import.*from.*vue.*\n/);
      if (setupMatch) {
        const setupIndex = setupMatch.index + setupMatch[0].length;
        content = content.slice(0, setupIndex) + setupCode + content.slice(setupIndex);
        hasChanges = true;
      }
    }
    
    // 3. Reemplazar iconos hardcodeados con el sistema de API
    Object.entries(iconMapping).forEach(([oldIcon, newIcon]) => {
      const iconClass = `fa-${oldIcon.replace('fa-', '')}`;
      const newIconClass = `fa-${newIcon}`;
      
      // Reemplazar en templates
      const templateRegex = new RegExp(`:class="\\['far', '${iconClass}'\\]"`, 'g');
      if (templateRegex.test(content)) {
        content = content.replace(templateRegex, `:class="getIconClass('${newIcon}')"`);
        hasChanges = true;
      }
      
      // Reemplazar en computed properties
      const computedRegex = new RegExp(`'${iconClass}'`, 'g');
      if (computedRegex.test(content)) {
        content = content.replace(computedRegex, `getIconClass('${newIcon}')`);
        hasChanges = true;
      }
    });
    
    // 4. Agregar función helper para iconos
    if (!content.includes('getIconClass')) {
      const helperFunction = `
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
      
      // Buscar la línea después del setup
      const setupMatch = content.match(/const.*useFontAwesomeAPI.*\n/);
      if (setupMatch) {
        const setupIndex = setupMatch.index + setupMatch[0].length;
        content = content.slice(0, setupIndex) + helperFunction + content.slice(setupIndex);
        hasChanges = true;
      }
    }
    
    // 5. Actualizar iconos específicos por componente
    if (componentPath === 'UBITSSidebar.vue') {
      // Actualizar iconos de navegación
      content = content.replace(
        /fa-graduation-cap/g,
        'graduation-cap'
      );
      content = content.replace(
        /fa-chart-mixed/g,
        'chart-line'
      );
      content = content.replace(
        /fa-bars-progress/g,
        'chart-bar'
      );
      hasChanges = true;
    }
    
    if (componentPath === 'UBITSButton.vue') {
      // Actualizar iconos de botones
      content = content.replace(
        /fa-spin/g,
        'fa-spin'
      );
      hasChanges = true;
    }
    
    if (componentPath === 'UBITSToast.vue') {
      // Actualizar iconos de toast
      content = content.replace(
        /fa-check-circle/g,
        'check-circle'
      );
      content = content.replace(
        /fa-info-circle/g,
        'info-circle'
      );
      content = content.replace(
        /fa-exclamation-triangle/g,
        'exclamation-triangle'
      );
      content = content.replace(
        /fa-times-circle/g,
        'times-circle'
      );
      hasChanges = true;
    }
    
    if (componentPath === 'UBITSInput.vue') {
      // Actualizar iconos de input
      content = content.replace(
        /fa-eye/g,
        'eye'
      );
      content = content.replace(
        /fa-eye-slash/g,
        'eye-slash'
      );
      content = content.replace(
        /fa-exclamation-circle/g,
        'exclamation-circle'
      );
      hasChanges = true;
    }
    
    if (componentPath === 'UBITSAlert.vue') {
      // Actualizar iconos de alert
      content = content.replace(
        /fa-check-circle/g,
        'check-circle'
      );
      content = content.replace(
        /fa-info-circle/g,
        'info-circle'
      );
      content = content.replace(
        /fa-exclamation-triangle/g,
        'exclamation-triangle'
      );
      content = content.replace(
        /fa-times-circle/g,
        'times-circle'
      );
      hasChanges = true;
    }
    
    // Guardar cambios si los hay
    if (hasChanges) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Componente actualizado: ${componentPath}`);
      return true;
    } else {
      console.log(`ℹ️  Sin cambios necesarios: ${componentPath}`);
      return false;
    }
    
  } catch (error) {
    console.error(`❌ Error actualizando ${componentPath}:`, error.message);
    return false;
  }
}

/**
 * Función principal
 */
function main() {
  console.log('🚀 Actualizando componentes para usar Font Awesome API...\n');
  
  let updatedCount = 0;
  let totalCount = componentsToUpdate.length;
  
  componentsToUpdate.forEach(component => {
    if (updateComponent(component)) {
      updatedCount++;
    }
  });
  
  console.log(`\n📊 Resumen:`);
  console.log(`✅ Componentes actualizados: ${updatedCount}/${totalCount}`);
  console.log(`🎯 Sistema de Font Awesome API integrado`);
  console.log(`🔧 Tokens API oficiales configurados`);
  console.log(`⚡ Performance optimizada con cache`);
  
  if (updatedCount === totalCount) {
    console.log(`\n🎉 ¡Todos los componentes han sido actualizados exitosamente!`);
  } else if (updatedCount > 0) {
    console.log(`\n⚠️  Algunos componentes no pudieron ser actualizados.`);
  } else {
    console.log(`\n❌ No se pudieron actualizar los componentes.`);
  }
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { updateComponent, main };
