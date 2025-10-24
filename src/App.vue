<!--
  UBITS App - Aplicación Principal
  Aplicación principal que replica el playground UBITS
-->
<template>
  <MainLayout
    :logo-url="logoUrl"
    :logo-alt="logoAlt"
    :brand-text="brandText"
    :show-brand-text="showBrandText"
    :navigation-items="navigationItems"
    :navigation-tabs="navigationTabs"
    :active-item="activeItem"
    :active-tab="activeTab"
    :user-avatar="userAvatar"
    :user-name="userName"
    :current-theme="currentTheme"
    :show-user-name="showUserName"
    :show-sidebar-labels="showSidebarLabels"
    @logo-click="handleLogoClick"
    @nav-click="handleNavClick"
    @tab-click="handleTabClick"
    @user-click="handleUserClick"
    @theme-toggle="handleThemeToggle"
  >
    <!-- Contenido dinámico basado en la página activa -->
    <component :is="currentPageComponent" />
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import MainLayout from './layouts/MainLayout.vue'
import DashboardPage from './pages/DashboardPage.vue'
import AprendizajePage from './pages/AprendizajePage.vue'
import ComponentsShowcase from './pages/ComponentsShowcase.vue'
import TemplatePage from './pages/TemplatePage.vue'
import { useTheme } from './utils/theme'
import { useResponsive } from './utils/responsive'

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

// Sistema de tema
const { currentTheme, isDark, toggleTheme } = useTheme()

// Sistema responsive - Implementación simple
const isMobile = ref(false)
const isTablet = ref(false)
const isDesktop = ref(true)

// Detectar tamaño de pantalla
const updateResponsive = () => {
  const width = window.innerWidth
  isMobile.value = width < 768
  isTablet.value = width >= 768 && width < 1024
  isDesktop.value = width >= 1024
}

// Estado de la aplicación
const activeItem = ref('template')
const activeTab = ref('template')

// Configuración
const logoUrl = ref('/images/Ubits-logo.svg')
const logoAlt = ref('UBITS Logo')
const brandText = ref('UBITS')
const showBrandText = ref(true)
const userAvatar = ref('/images/Profile-image.jpg')
const userName = ref('Usuario')
const showUserName = ref(true)

// Navegación
const navigationItems = ref<NavigationItem[]>([
  { id: 'template', label: 'Template', icon: 'home', tooltip: 'Template Principal' },
  { id: 'dashboard', label: 'Dashboard', icon: 'chart-line', tooltip: 'Dashboard' },
  { id: 'aprendizaje', label: 'Aprendizaje', icon: 'graduation-cap', tooltip: 'Aprendizaje' },
  { id: 'diagnostico', label: 'Diagnóstico', icon: 'chart-mixed', tooltip: 'Diagnóstico' },
  { id: 'desempeno', label: 'Desempeño', icon: 'bars-progress', tooltip: 'Desempeño' },
  { id: 'encuestas', label: 'Encuestas', icon: 'clipboard', tooltip: 'Encuestas', href: 'encuestas.html' },
  { id: 'reclutamiento', label: 'Reclutamiento', icon: 'users', tooltip: 'Reclutamiento' },
  { id: 'tareas', label: 'Tareas', icon: 'layer-group', tooltip: 'Tareas' },
  { id: 'ubits-ai', label: 'UBITS AI', icon: 'sparkles', tooltip: 'UBITS AI' },
  { id: 'components', label: 'Componentes', icon: 'puzzle-piece', tooltip: 'Showcase de Componentes' }
])

const navigationTabs = ref<NavigationTab[]>([
  { id: 'template', label: 'Template', icon: 'home' },
  { id: 'dashboard', label: 'Dashboard', icon: 'chart-line' },
  { id: 'aprendizaje', label: 'Aprendizaje', icon: 'graduation-cap' },
  { id: 'diagnostico', label: 'Diagnóstico', icon: 'chart-mixed' },
  { id: 'desempeno', label: 'Desempeño', icon: 'bars-progress' }
])

// Computed
const showSidebarLabels = computed(() => {
  return !isMobile.value && !isTablet.value
})

const currentPageComponent = computed(() => {
  switch (activeItem.value) {
    case 'template':
      return TemplatePage
    case 'dashboard':
      return DashboardPage
    case 'aprendizaje':
      return AprendizajePage
    case 'components':
      return ComponentsShowcase
    case 'diagnostico':
      return DashboardPage // Placeholder
    case 'desempeno':
      return DashboardPage // Placeholder
    default:
      return TemplatePage
  }
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

const handleTabClick = (tab: NavigationTab) => {
  console.log('Tab clicked:', tab)
  activeTab.value = tab.id
  activeItem.value = tab.id
}

const handleUserClick = () => {
  console.log('User clicked')
}

const handleThemeToggle = () => {
  console.log('Theme toggle clicked')
  toggleTheme()
}

// Lifecycle
onMounted(() => {
  console.log('🚀 UBITS App mounted')
  console.log('📊 Current page component:', currentPageComponent.value)
  console.log('🎯 Active item:', activeItem.value)
  console.log('🌙 Current theme:', currentTheme.value)
  
  // Inicializar responsive
  updateResponsive()
  window.addEventListener('resize', updateResponsive)
  console.log('📱 Responsive initialized:', { isMobile: isMobile.value, isTablet: isTablet.value, isDesktop: isDesktop.value })
  
  // Aplicar tema inicial
  document.documentElement.setAttribute('data-theme', currentTheme.value)
  console.log('🎨 App theme applied:', currentTheme.value)
  
  // Cargar configuración desde localStorage si existe
  const savedActiveItem = localStorage.getItem('ubits-active-item')
  if (savedActiveItem) {
    activeItem.value = savedActiveItem
    console.log('💾 App loaded active item:', savedActiveItem)
  }
  
  const savedActiveTab = localStorage.getItem('ubits-active-tab')
  if (savedActiveTab) {
    activeTab.value = savedActiveTab
    console.log('💾 App loaded active tab:', savedActiveTab)
  }
  
  // Verificar que los componentes se estén renderizando
  setTimeout(() => {
    console.log('🔍 Checking components in DOM...')
    const sidebar = document.querySelector('.sidebar')
    const topNav = document.querySelector('.ubits-top-nav')
    const templatePage = document.querySelector('.template-page')
    
    console.log('🧭 Sidebar found:', !!sidebar)
    console.log('📊 TopNav found:', !!topNav)
    console.log('📄 TemplatePage found:', !!templatePage)
    
    if (sidebar) {
      console.log('✅ Sidebar is rendered')
    } else {
      console.log('❌ Sidebar is NOT rendered')
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

<style>
/* Importar tokens UBITS globales */
@import './styles/ubits-tokens.css';
@import './styles/ubits-styles.css';
@import './styles/ubits-colors.css';
@import './styles/ubits-layout.css';

/* Reset global */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Asegurar que el fondo cubra toda la pantalla */
#app {
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  background: var(--ubits-bg-2);
  overflow: hidden;
}

html {
  font-family: 'Noto Sans', sans-serif;
  font-size: 16px;
  line-height: 1.5;
}

body {
  background: var(--ubits-bg-1);
  color: var(--ubits-fg-1-high);
  transition: all 0.3s ease;
}

/* Aplicar tema al body */
[data-theme="light"] body {
  background: var(--ubits-bg-1);
  color: var(--ubits-fg-1-high);
}

[data-theme="dark"] body {
  background: var(--ubits-bg-1);
  color: var(--ubits-fg-1-high);
}

/* Scrollbar personalizado */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--ubits-bg-2);
}

::-webkit-scrollbar-thumb {
  background: var(--ubits-border-1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--ubits-fg-1-medium);
}

/* Selección de texto */
::selection {
  background: var(--ubits-accent-brand);
  color: white;
}

/* Focus visible */
:focus-visible {
  outline: 2px solid var(--ubits-accent-brand);
  outline-offset: 2px;
}

/* Transiciones suaves */
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
</style>
