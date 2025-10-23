<!--
  UBITS Main Layout - Layout Principal
  Replica la estructura del playground UBITS con tecnologías modernas
-->
<template>
  <div class="ubits-layout" :data-theme="currentTheme">
    <!-- Tooltip Global -->
    <div id="tooltip" class="ubits-tooltip"></div>
    
    <!-- Dashboard Container -->
    <div class="dashboard-container">
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
          :show-labels="showSidebarLabels"
          @logo-click="handleLogoClick"
          @nav-click="handleNavClick"
          @user-click="handleUserClick"
          @theme-toggle="handleThemeToggle"
        />
      </div>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Top Navigation -->
        <div id="top-nav-container">
          <UBITSTopNav
            :logo-url="logoUrl"
            :logo-alt="logoAlt"
            :brand-text="brandText"
            :show-brand-text="showBrandText"
            :navigation-tabs="navigationTabs"
            :active-tab="activeTab"
            :user-avatar="userAvatar"
            :user-name="userName"
            :current-theme="currentTheme"
            :show-user-name="showUserName"
            @logo-click="handleLogoClick"
            @tab-click="handleTabClick"
            @user-click="handleUserClick"
            @theme-toggle="handleThemeToggle"
          />
        </div>

        <!-- Content Area -->
        <div class="content-area">
          <!-- Content wrapper con secciones de widgets -->
          <div class="content-sections">
            <slot></slot>
          </div>
        </div>
      </main>
    </div>

    <!-- Tab Bar Container (Mobile) -->
    <div id="tab-bar-container">
      <UBITSTabBar
        :navigation-items="navigationItems"
        :active-item="activeItem"
        :current-theme="currentTheme"
        @nav-click="handleNavClick"
        @theme-toggle="handleThemeToggle"
      />
    </div>

    <!-- Floating Menu Container -->
    <div id="floating-menu-container">
      <!-- Floating Menu Component -->
    </div>
    
    <!-- Profile Menu Container -->
    <div id="profile-menu-container">
      <!-- Profile Menu Component -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import UBITSSidebar from '../components/UBITSSidebar.vue'
import UBITSTopNav from '../components/UBITSTopNav.vue'
import UBITSTabBar from '../components/UBITSTabBar.vue'
import { useTheme } from '../utils/theme'
import { useResponsive } from '../utils/responsive'

// Props del layout
interface Props {
  // Logo
  logoUrl?: string
  logoAlt?: string
  brandText?: string
  showBrandText?: boolean
  
  // Navigation
  navigationItems?: NavigationItem[]
  navigationTabs?: NavigationTab[]
  activeItem?: string
  activeTab?: string
  
  // User
  userAvatar?: string
  userName?: string
  showUserName?: boolean
  
  // Theme
  currentTheme?: 'light' | 'dark'
  
  // Responsive
  showSidebarLabels?: boolean
}

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

const props = withDefaults(defineProps<Props>(), {
  logoUrl: '/images/Ubits-logo.svg',
  logoAlt: 'UBITS Logo',
  brandText: 'UBITS',
  showBrandText: true,
  navigationItems: () => [
    { id: 'aprendizaje', label: 'Aprendizaje', icon: 'graduation-cap', tooltip: 'Aprendizaje' },
    { id: 'diagnostico', label: 'Diagnóstico', icon: 'chart-line', tooltip: 'Diagnóstico' },
    { id: 'desempeno', label: 'Desempeño', icon: 'chart-bar', tooltip: 'Desempeño' },
    { id: 'encuestas', label: 'Encuestas', icon: 'clipboard', tooltip: 'Encuestas', href: 'encuestas.html' },
    { id: 'reclutamiento', label: 'Reclutamiento', icon: 'users', tooltip: 'Reclutamiento' },
    { id: 'tareas', label: 'Tareas', icon: 'layer-group', tooltip: 'Tareas' },
    { id: 'ubits-ai', label: 'UBITS AI', icon: 'sparkles', tooltip: 'UBITS AI' }
  ],
  navigationTabs: () => [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'aprendizaje', label: 'Aprendizaje', icon: 'graduation-cap' },
    { id: 'diagnostico', label: 'Diagnóstico', icon: 'chart-line' },
    { id: 'desempeno', label: 'Desempeño', icon: 'chart-bar' }
  ],
  activeItem: '',
  activeTab: '',
  userAvatar: '/images/Profile-image.jpg',
  userName: 'Usuario',
  showUserName: true,
  currentTheme: 'light',
  showSidebarLabels: true
})

// Emits
const emit = defineEmits<{
  logoClick: []
  navClick: [item: NavigationItem]
  tabClick: [tab: NavigationTab]
  userClick: []
  themeToggle: []
}>()

// Sistema de tema
const { currentTheme, isDark, toggleTheme } = useTheme()

// Sistema responsive
const { isMobile, isTablet, isDesktop } = useResponsive()

// Computed
const showSidebarLabels = computed(() => {
  return !isMobile.value && !isTablet.value
})

// Handlers
const handleLogoClick = () => {
  emit('logoClick')
}

const handleNavClick = (item: NavigationItem) => {
  emit('navClick', item)
  
  // Navegación automática si hay href
  if (item.href) {
    window.location.href = item.href
  }
}

const handleTabClick = (tab: NavigationTab) => {
  emit('tabClick', tab)
}

const handleUserClick = () => {
  emit('userClick')
}

const handleThemeToggle = () => {
  toggleTheme()
  emit('themeToggle')
}

// Lifecycle
onMounted(() => {
  // Aplicar tema inicial
  document.documentElement.setAttribute('data-theme', currentTheme.value)
})

onUnmounted(() => {
  // Cleanup si es necesario
})
</script>

<style scoped>
/* Importar tokens UBITS */
@import '../styles/ubits-tokens.css';

/* Layout principal */
.ubits-layout {
  min-height: 100vh;
  background: var(--ubits-bg-1);
  color: var(--ubits-fg-1-high);
  font-family: 'Noto Sans', sans-serif;
  transition: all 0.3s ease;
}

/* Dashboard Container */
.dashboard-container {
  display: flex;
  min-height: 100vh;
  transition: all 0.3s ease;
}

/* Main Content */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 96px; /* Ancho del sidebar */
  transition: all 0.3s ease;
}

/* Content Area */
.content-area {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  background: var(--ubits-bg-1);
  transition: all 0.3s ease;
}

/* Content Sections */
.content-sections {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  min-width: 0;
  width: 100%;
  overflow: visible;
  max-height: none;
}

/* Espaciador para alinear elementos */
.content-sections > *:not(:last-child):not(.section-dual):not(.section-single):not(.section-triple):not(.section-quad) {
  margin-bottom: 16px;
}

/* Espaciador final */
.content-sections::after {
  content: '';
  height: 0px;
  flex-shrink: 0;
}

/* Reducir el gap del último elemento */
.content-sections > *:last-child {
  margin-bottom: 0;
}

/* Secciones de widgets */
.section-single {
  display: flex;
  width: 100%;
}

.section-dual {
  display: flex;
  gap: 20px;
}

.section-triple {
  display: flex;
  gap: 20px;
}

.section-quad {
  display: flex;
  gap: 20px;
}

/* Widgets en secciones */
.section-single > div,
.section-dual > div,
.section-triple > div,
.section-quad > div {
  background-color: var(--ubits-bg-1);
  border: none;
  border-radius: 8px;
  padding: 16px !important;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

/* Responsive */
@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
  
  .content-area {
    padding: 16px;
  }
  
  .section-dual,
  .section-triple,
  .section-quad {
    flex-direction: column;
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .content-area {
    padding: 12px;
  }
  
  .section-single > div,
  .section-dual > div,
  .section-triple > div,
  .section-quad > div {
    padding: 12px !important;
  }
}

/* Tooltip Global */
.ubits-tooltip {
  position: fixed;
  background: var(--ubits-bg-2);
  color: var(--ubits-fg-1-high);
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  z-index: 9999;
  pointer-events: none;
  opacity: 0;
  transform: translateY(-4px);
  transition: all 0.2s ease;
  box-shadow: var(--ubits-shadow-md);
  border: 1px solid var(--ubits-border-1);
}

.ubits-tooltip.show {
  opacity: 1;
  transform: translateY(0);
}

/* Dark Mode */
[data-theme="dark"] .ubits-layout {
  background: var(--ubits-bg-1);
  color: var(--ubits-fg-1-high);
}

[data-theme="dark"] .content-area {
  background: var(--ubits-bg-1);
}

[data-theme="dark"] .section-single > div,
[data-theme="dark"] .section-dual > div,
[data-theme="dark"] .section-triple > div,
[data-theme="dark"] .section-quad > div {
  background-color: var(--ubits-bg-1);
}
</style>
