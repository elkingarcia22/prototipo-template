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

// Sistema responsive
const { isMobile, isTablet, isDesktop } = useResponsive()

// Estado de la aplicación
const activeItem = ref('dashboard')
const activeTab = ref('dashboard')

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
  { id: 'dashboard', label: 'Dashboard', icon: 'home', tooltip: 'Dashboard' },
  { id: 'aprendizaje', label: 'Aprendizaje', icon: 'graduation-cap', tooltip: 'Aprendizaje' },
  { id: 'diagnostico', label: 'Diagnóstico', icon: 'chart-line', tooltip: 'Diagnóstico' },
  { id: 'desempeno', label: 'Desempeño', icon: 'chart-bar', tooltip: 'Desempeño' },
  { id: 'encuestas', label: 'Encuestas', icon: 'clipboard', tooltip: 'Encuestas', href: 'encuestas.html' },
  { id: 'reclutamiento', label: 'Reclutamiento', icon: 'users', tooltip: 'Reclutamiento' },
  { id: 'tareas', label: 'Tareas', icon: 'layer-group', tooltip: 'Tareas' },
  { id: 'ubits-ai', label: 'UBITS AI', icon: 'sparkles', tooltip: 'UBITS AI' }
])

const navigationTabs = ref<NavigationTab[]>([
  { id: 'dashboard', label: 'Dashboard', icon: 'home' },
  { id: 'aprendizaje', label: 'Aprendizaje', icon: 'graduation-cap' },
  { id: 'diagnostico', label: 'Diagnóstico', icon: 'chart-line' },
  { id: 'desempeno', label: 'Desempeño', icon: 'chart-bar' }
])

// Computed
const showSidebarLabels = computed(() => {
  return !isMobile.value && !isTablet.value
})

const currentPageComponent = computed(() => {
  switch (activeItem.value) {
    case 'dashboard':
      return DashboardPage
    case 'aprendizaje':
      return AprendizajePage
    case 'diagnostico':
      return DashboardPage // Placeholder
    case 'desempeno':
      return DashboardPage // Placeholder
    default:
      return DashboardPage
  }
})

// Handlers
const handleLogoClick = () => {
  console.log('Logo clicked')
  activeItem.value = 'dashboard'
  activeTab.value = 'dashboard'
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
  console.log('UBITS App mounted')
  
  // Aplicar tema inicial
  document.documentElement.setAttribute('data-theme', currentTheme.value)
  
  // Cargar configuración desde localStorage si existe
  const savedActiveItem = localStorage.getItem('ubits-active-item')
  if (savedActiveItem) {
    activeItem.value = savedActiveItem
  }
  
  const savedActiveTab = localStorage.getItem('ubits-active-tab')
  if (savedActiveTab) {
    activeTab.value = savedActiveTab
  }
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
@import './styles/globals.css';

/* Reset global */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
