/**
 * UBITS App - Punto de Entrada Principal
 * Aplicación principal que replica el playground UBITS
 */

import { createApp } from 'vue'
import App from './App.vue'

// Crear aplicación Vue
const app = createApp(App)

// Configurar aplicación
app.config.globalProperties.$ubits = {
  version: '1.0.0',
  theme: 'light',
  responsive: true
}

// Montar aplicación
app.mount('#app')

// Configurar tema inicial
document.documentElement.setAttribute('data-theme', 'light')

// Cargar Google Fonts
const link = document.createElement('link')
link.rel = 'preconnect'
link.href = 'https://fonts.googleapis.com'
document.head.appendChild(link)

const link2 = document.createElement('link')
link2.rel = 'preconnect'
link2.href = 'https://fonts.gstatic.com'
link2.crossOrigin = 'anonymous'
document.head.appendChild(link2)

const link3 = document.createElement('link')
link3.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap'
link3.rel = 'stylesheet'
document.head.appendChild(link3)

// Cargar Font Awesome
const faLink = document.createElement('link')
faLink.rel = 'stylesheet'
faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
document.head.appendChild(faLink)

console.log('🚀 UBITS App iniciada correctamente')
console.log('🎯 Template robusto con tecnologías modernas')
console.log('🔧 Font Awesome API integrado')
console.log('📱 Sistema responsive activo')
console.log('🌙 Modo claro/oscuro disponible')
