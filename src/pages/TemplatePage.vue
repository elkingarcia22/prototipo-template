<template>
  <div class="template-page" :data-theme="currentTheme">
    <!-- Dashboard Container -->
    <div class="dashboard-container">
      <!-- Tooltip Global -->
      <div class="tooltip" id="tooltip"></div>
      
      <!-- Sidebar Container -->
      <div id="sidebar-container">
        <UBITSSidebar
          :logo-url="logoUrl"
          :logo-alt="logoAlt"
          :navigation-items="navigationItems"
          :active-item="activeItem"
          :user-avatar="userAvatar"
          :user-name="userName"
          :current-theme="currentTheme"
          :show-labels="false"
          @logo-click="handleLogoClick"
          @nav-click="handleNavClick"
          @user-click="handleUserClick"
          @theme-toggle="handleThemeToggle"
        />
      </div>

      <!-- Main Content - Solo fondo con colores UBITS -->
      <main class="main-content">
        <!-- Área de contenido vacía para debuggear sidebar -->
        <div class="content-area">
          <!-- Solo logs, sin contenido visual -->
        </div>
      </main>
    </div>

    <!-- Tab Bar Container (Mobile) -->
    <div id="tab-bar-container">
      <!-- TODO: Implementar TabBar para móvil -->
    </div>

    <!-- Floating Menu Container -->
    <div id="floating-menu-container">
      <!-- TODO: Implementar Floating Menu -->
    </div>
    
    <!-- Profile Menu Container -->
    <div id="profile-menu-container">
      <!-- TODO: Implementar Profile Menu -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import UBITSSidebar from '../components/UBITSSidebar.vue'
import { useTheme } from '../utils/theme'
import { useResponsive } from '../utils/responsive'

// Interfaces
interface NavigationItem {
  id: string
  label: string
  icon: string
  tooltip: string
  href?: string
  active?: boolean
}

interface NavigationTab {
  id: string
  label: string
  icon: string
  active?: boolean
}

// Sistema de tema - Forzar modo light
const { currentTheme, isDark, toggleTheme } = useTheme()

// Sistema responsive
const { isMobile, isTablet, isDesktop } = useResponsive()

// Estado de la aplicación
const activeItem = ref('template')
const activeTab = ref('template')

// Configuración
const logoUrl = ref('/images/Ubits-logo.svg')
const logoAlt = ref('UBITS Logo')
const userAvatar = ref('/images/Profile-image.jpg')
const userName = ref('Usuario')

// Navegación del sidebar
const navigationItems = ref<NavigationItem[]>([
  { id: 'template', label: 'Template', icon: 'far fa-home', tooltip: 'Template Principal' },
  { id: 'aprendizaje', label: 'Aprendizaje', icon: 'far fa-graduation-cap', tooltip: 'Aprendizaje' },
  { id: 'diagnostico', label: 'Diagnóstico', icon: 'far fa-chart-mixed', tooltip: 'Diagnóstico' },
  { id: 'desempeno', label: 'Desempeño', icon: 'far fa-bars-progress', tooltip: 'Desempeño' },
  { id: 'encuestas', label: 'Encuestas', icon: 'far fa-clipboard', tooltip: 'Encuestas' },
  { id: 'reclutamiento', label: 'Reclutamiento', icon: 'far fa-users', tooltip: 'Reclutamiento' },
  { id: 'tareas', label: 'Tareas', icon: 'far fa-layer-group', tooltip: 'Tareas' },
  { id: 'ubits-ai', label: 'UBITS AI', icon: 'far fa-sparkles', tooltip: 'UBITS AI' }
])

// Solo sidebar navigation

// Computed
const showSidebarLabels = computed(() => {
  return !isMobile.value && !isTablet.value
})

// Handlers
const handleLogoClick = () => {
  console.log('Logo clicked')
  activeItem.value = 'template'
  activeTab.value = 'template'
}

const handleNavClick = (item: NavigationItem) => {
  console.log('Navigation clicked:', item)
  activeItem.value = item.id
  
  // Actualizar tabs si corresponde
  if (navigationTabs.value.some(tab => tab.id === item.id)) {
    activeTab.value = item.id
  }
}

// Solo sidebar navigation

const handleUserClick = () => {
  console.log('User clicked')
}

const handleThemeToggle = () => {
  console.log('Theme toggle clicked')
  toggleTheme()
}

// Lifecycle
onMounted(() => {
  console.log('🚀 ===== TEMPLATE PAGE MOUNTED =====')
  console.log('📊 Navigation items:', navigationItems.value)
  console.log('🎯 Active item:', activeItem.value)
  console.log('👤 User avatar:', userAvatar.value)
  console.log('🌙 Current theme:', currentTheme.value)

  // Forzar modo light
  document.documentElement.setAttribute('data-theme', 'light')
  console.log('🎨 Forced light theme applied to document')
  
  // Verificar colores del fondo
  const bodyStyles = getComputedStyle(document.body)
  const htmlStyles = getComputedStyle(document.documentElement)
  const appStyles = getComputedStyle(document.getElementById('app')!)
  
  console.log('🎨 Background colors check:', {
    body: {
      backgroundColor: bodyStyles.backgroundColor,
      height: bodyStyles.height,
      minHeight: bodyStyles.minHeight
    },
    html: {
      backgroundColor: htmlStyles.backgroundColor,
      height: htmlStyles.height,
      minHeight: htmlStyles.minHeight
    },
    app: {
      backgroundColor: appStyles.backgroundColor,
      height: appStyles.height,
      minHeight: appStyles.minHeight,
      width: appStyles.width
    },
    expected: '#1a1a1a',
    currentTheme: currentTheme.value
  })
  
  // Verificar tema actual
  console.log('🌙 Template theme:', {
    currentTheme: currentTheme.value,
    isDark: isDark.value,
    isLight: !isDark.value,
    documentTheme: document.documentElement.getAttribute('data-theme'),
    bodyTheme: document.body.getAttribute('data-theme')
  })

  // Cargar configuración desde localStorage si existe
  const savedActiveItem = localStorage.getItem('ubits-active-item')
  if (savedActiveItem) {
    activeItem.value = savedActiveItem
    console.log('💾 Loaded active item from localStorage:', savedActiveItem)
  }

  const savedActiveTab = localStorage.getItem('ubits-active-tab')
  if (savedActiveTab) {
    activeTab.value = savedActiveTab
    console.log('💾 Loaded active tab from localStorage:', savedActiveTab)
  }

  // Verificar que el sidebar se esté renderizando
  console.log('🔍 ===== SIDEBAR RENDERING CHECK =====')
  setTimeout(() => {
    const sidebar = document.querySelector('.sidebar')
    const sidebarContainer = document.getElementById('sidebar-container')
    console.log('🔍 Sidebar element found:', sidebar)
    console.log('🔍 Sidebar container found:', sidebarContainer)
    
    if (sidebar) {
      console.log('✅ Sidebar is in DOM')
      const styles = getComputedStyle(sidebar)
      console.log('📏 Sidebar dimensions:', {
        width: sidebar.offsetWidth,
        height: sidebar.offsetHeight,
        display: styles.display,
        position: styles.position,
        visibility: styles.visibility,
        opacity: styles.opacity,
        backgroundColor: styles.backgroundColor
      })
      
      // Verificar si el sidebar es visible
      const rect = sidebar.getBoundingClientRect()
      console.log('📏 Sidebar bounding rect:', {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        visible: rect.width > 0 && rect.height > 0
      })
      
      // Verificar elementos internos del sidebar
      const sidebarMain = sidebar.querySelector('.sidebar-main')
      const navButtons = sidebar.querySelectorAll('.nav-button')
      console.log('🔍 Sidebar internal elements:', {
        sidebarMain: !!sidebarMain,
        navButtons: navButtons.length
      })
      
    } else {
      console.log('❌ Sidebar NOT found in DOM')
      console.log('🔍 Available elements:', document.querySelectorAll('*'))
    }
  }, 1000)
})

// Guardar estado en localStorage
const saveState = () => {
  localStorage.setItem('ubits-active-item', activeItem.value)
  localStorage.setItem('ubits-active-tab', activeTab.value)
}

// Watchers para guardar estado
import { watch } from 'vue'
watch(activeItem, saveState)
watch(activeTab, saveState)
</script>

<style scoped>
/* Importar todos los estilos UBITS */
@import '../styles/ubits-tokens.css';
@import '../styles/ubits-styles.css';
@import '../styles/ubits-colors.css';
@import '../styles/ubits-layout.css';

    /* Layout principal - Modo Light UBITS */
    .template-page {
      min-height: 100vh;
      height: 100vh;
      width: 100%;
      background: var(--ubits-bg-2);
      color: var(--ubits-fg-1-high);
      font-family: 'Noto Sans', sans-serif;
      transition: all 0.3s ease;
      overflow: hidden;
    }

/* Forzar modo light */
.template-page[data-theme="light"] {
  background: var(--ubits-bg-1);
  color: var(--ubits-fg-1-high);
}

    /* Dashboard Container */
    .dashboard-container {
      display: flex;
      min-height: 100vh;
      height: 100vh;
      width: 100%;
      overflow: visible;
      background: var(--ubits-bg-2);
    }

    /* Main Content - Simplificado */
    .main-content {
      position: relative;
      flex: 1;
      margin: 16px 24px 0 143px;
      width: calc(100% - 143px - 24px);
      height: 100vh;
      overflow: visible;
      max-height: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 5;
      background: var(--ubits-bg-2);
    }

/* Centrado para pantallas grandes */
@media (min-width: 1440px) {
  .main-content {
    margin: 16px auto 0 auto;
    padding-left: 143px;
    padding-right: 24px;
    width: 1607px;
    max-width: 1607px;
    box-sizing: border-box;
  }
}

/* Ajustar gap en móvil cuando no hay subnav */
@media (max-width: 1023px) {
  .main-content {
    gap: 20px;
    margin: 16px 12px 0 12px;
    width: calc(100% - 24px);
  }
  
  /* Eliminar margen superior del primer elemento para compensar el gap */
  .main-content > *:first-child {
    margin-top: -20px;
  }
}

/* Content Area - Simplificado */
.content-area {
  background-color: transparent !important;
  border-radius: 10px;
  border: none !important;
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  box-sizing: border-box;
  max-height: none;
  box-shadow: none !important;
}

/* Área de contenido vacía para debuggear */
.content-area {
  /* Solo para debuggear sidebar */
}

/* Responsive simplificado */
@media (max-width: 1023px) {
  .main-content {
    margin: 16px 12px 0 12px;
    width: calc(100% - 24px);
  }
}

@media (max-width: 480px) {
  .welcome-message {
    padding: 20px;
  }
}

/* Dark mode */
[data-theme="dark"] .template-page {
  background: var(--ubits-bg-1);
  color: var(--ubits-fg-1-high);
}

[data-theme="dark"] .widget-contenido-principal {
  background: var(--ubits-bg-1);
  border-color: var(--ubits-border-1);
}

[data-theme="dark"] .welcome-widget,
[data-theme="dark"] .status-widget,
[data-theme="dark"] .navigation-widget {
  background: var(--ubits-bg-2);
  border-color: var(--ubits-border-1);
}

/* Tooltip Global */
.tooltip {
  position: fixed;
  background: var(--ubits-sidebar-bg);
  color: var(--ubits-fg-1-high-static-inverted);
  padding: 8px 12px;
  border-radius: 6px;
  white-space: nowrap;
  z-index: 10000;
  box-shadow: 0px 2px 8px rgba(0,0,0,0.15);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
  font-family: 'Noto Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
}

.tooltip::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
  border: 6px solid transparent;
  border-right-color: var(--ubits-sidebar-bg);
}
</style>
