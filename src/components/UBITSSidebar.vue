<!--
  UBITS Sidebar Component - Responsive
  Sidebar que se oculta en mobile y se reemplaza por TabBar
-->
<template>
  <aside 
    :class="sidebarClasses"
    :style="sidebarStyles"
    v-bind="$attrs"
  >
    <!-- Header -->
    <div class="ubits-sidebar__header">
      <div class="ubits-sidebar__logo" @click="handleLogoClick">
        <img :src="logoUrl" :alt="logoAlt" />
      </div>
    </div>
    
    <!-- Navigation -->
    <div class="ubits-sidebar__body">
      <button 
        v-for="item in navigationItems"
        :key="item.id"
        :class="getNavButtonClasses(item)"
        :data-section="item.id"
        :data-tooltip="item.tooltip"
        @click="handleNavClick(item)"
      >
        <i :class="['far', item.icon]"></i>
        <span v-if="showLabels" class="ubits-sidebar__nav-label">{{ item.label }}</span>
      </button>
    </div>
    
    <!-- Footer -->
    <div class="ubits-sidebar__footer">
      <div class="ubits-sidebar__user-avatar" @click="handleUserClick">
        <img :src="userAvatar" :alt="userName" class="ubits-sidebar__avatar-image">
      </div>
      <button 
        class="ubits-sidebar__theme-toggle"
        :data-tooltip="themeToggleTooltip"
        @click="handleThemeToggle"
      >
        <i :class="['far', themeIcon]"></i>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'
import { useResponsive } from '../utils/responsive'

// Props del componente
interface NavigationItem {
  id: string
  label: string
  icon: string
  tooltip: string
  href?: string
  active?: boolean
}

interface Props {
  // Logo
  logoUrl?: string
  logoAlt?: string
  
  // Navigation
  navigationItems?: NavigationItem[]
  activeItem?: string
  
  // User
  userAvatar?: string
  userName?: string
  
  // Theme
  currentTheme?: 'light' | 'dark'
  
  // Responsive
  showLabels?: boolean
  
  // Callbacks
  onLogoClick?: () => void
  onNavClick?: (item: NavigationItem) => void
  onUserClick?: () => void
  onThemeToggle?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  logoUrl: '/images/Ubits-logo.svg',
  logoAlt: 'UBITS Logo',
  navigationItems: () => [
    { id: 'aprendizaje', label: 'Aprendizaje', icon: 'fa-graduation-cap', tooltip: 'Aprendizaje' },
    { id: 'diagnostico', label: 'Diagnóstico', icon: 'fa-chart-mixed', tooltip: 'Diagnóstico' },
    { id: 'desempeno', label: 'Desempeño', icon: 'fa-bars-progress', tooltip: 'Desempeño' },
    { id: 'encuestas', label: 'Encuestas', icon: 'fa-clipboard', tooltip: 'Encuestas', href: 'encuestas.html' },
    { id: 'reclutamiento', label: 'Reclutamiento', icon: 'fa-users', tooltip: 'Reclutamiento' },
    { id: 'tareas', label: 'Tareas', icon: 'fa-layer-group', tooltip: 'Tareas' },
    { id: 'ubits-ai', label: 'UBITS AI', icon: 'fa-sparkles', tooltip: 'UBITS AI' }
  ],
  activeItem: '',
  userAvatar: '/images/Profile-image.jpg',
  userName: 'Usuario',
  currentTheme: 'light',
  showLabels: true
})

// Emits
const emit = defineEmits<{
  logoClick: []
  navClick: [item: NavigationItem]
  userClick: []
  themeToggle: []
}>()

// Sistema responsive
const { state, getResponsiveValue } = useResponsive()

// Computed
const sidebarClasses = computed(() => {
  const classes = ['ubits-sidebar']
  
  // Responsive
  if (state.isMobile) {
    classes.push('ubits-sidebar--mobile')
  } else if (state.isTablet) {
    classes.push('ubits-sidebar--tablet')
  } else if (state.isDesktop) {
    classes.push('ubits-sidebar--desktop')
  }
  
  // Hidden en mobile
  if (state.isMobile) {
    classes.push('ubits-sidebar--hidden')
  }
  
  return classes
})

const sidebarStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  // Ancho responsive
  const width = getResponsiveValue({
    xs: '0px', // Oculto en mobile
    sm: '0px', // Oculto en tablet
    md: '96px', // Visible en desktop
    lg: '96px',
    xl: '96px',
    '2xl': '96px'
  }, '96px')
  
  if (width !== '0px') {
    styles.width = width
  }
  
  return styles
})

const themeIcon = computed(() => {
  return props.currentTheme === 'light' ? 'fa-moon' : 'fa-sun'
})

const themeToggleTooltip = computed(() => {
  return props.currentTheme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'
})

// Methods
const getNavButtonClasses = (item: NavigationItem) => {
  const classes = ['ubits-sidebar__nav-button']
  
  if (item.active || props.activeItem === item.id) {
    classes.push('ubits-sidebar__nav-button--active')
  }
  
  return classes
}

const handleLogoClick = () => {
  emit('logoClick')
  props.onLogoClick?.()
}

const handleNavClick = (item: NavigationItem) => {
  emit('navClick', item)
  props.onNavClick?.(item)
  
  // Navegación automática si tiene href
  if (item.href) {
    window.location.href = item.href
  }
}

const handleUserClick = () => {
  emit('userClick')
  props.onUserClick?.()
}

const handleThemeToggle = () => {
  emit('themeToggle')
  props.onThemeToggle?.()
}
</script>

<style scoped>
/* Importar tokens UBITS */
@import '../styles/ubits-tokens.css';

/* Base del sidebar */
.ubits-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 96px;
  background: var(--ubits-sidebar-bg);
  border-right: 1px solid var(--ubits-sidebar-button-fg-default);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 16px 28px;
  gap: 16px;
  transition: all 0.3s ease;
}

/* Header */
.ubits-sidebar__header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.ubits-sidebar__logo {
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.ubits-sidebar__logo:hover {
  opacity: 0.8;
}

.ubits-sidebar__logo img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

/* Body */
.ubits-sidebar__body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  align-items: center;
}

.ubits-sidebar__nav-button {
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: var(--ubits-radius-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: relative;
}

.ubits-sidebar__nav-button:hover {
  background: var(--ubits-sidebar-button-bg-pressed);
}

.ubits-sidebar__nav-button--active {
  background: var(--ubits-sidebar-button-bg-active);
}

.ubits-sidebar__nav-button i {
  font-size: 18px;
  color: var(--ubits-sidebar-button-fg-default);
  transition: color 0.2s ease;
}

.ubits-sidebar__nav-button:hover i {
  color: var(--ubits-sidebar-button-fg-hover);
}

.ubits-sidebar__nav-button--active i {
  color: var(--ubits-sidebar-button-fg-active);
}

.ubits-sidebar__nav-label {
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: var(--ubits-bg-1);
  color: var(--ubits-fg-1-high);
  padding: 4px 8px;
  border-radius: var(--ubits-radius-sm);
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  margin-left: 8px;
  box-shadow: var(--ubits-shadow-md);
  z-index: 1001;
}

.ubits-sidebar__nav-button:hover .ubits-sidebar__nav-label {
  opacity: 1;
}

/* Footer */
.ubits-sidebar__footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--ubits-sidebar-button-fg-default);
}

.ubits-sidebar__user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.ubits-sidebar__user-avatar:hover {
  border-color: var(--ubits-sidebar-button-fg-hover);
}

.ubits-sidebar__avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.ubits-sidebar__theme-toggle {
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: var(--ubits-radius-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.ubits-sidebar__theme-toggle:hover {
  background: var(--ubits-sidebar-button-bg-pressed);
}

.ubits-sidebar__theme-toggle i {
  font-size: 18px;
  color: var(--ubits-sidebar-button-fg-default);
  transition: color 0.2s ease;
}

.ubits-sidebar__theme-toggle:hover i {
  color: var(--ubits-sidebar-button-fg-hover);
}

/* Responsive */
.ubits-sidebar--mobile {
  display: none !important;
}

.ubits-sidebar--tablet {
  display: none !important;
}

.ubits-sidebar--desktop {
  display: flex;
}

.ubits-sidebar--hidden {
  display: none !important;
}

/* Responsive breakpoints */
@media (max-width: 1023px) {
  .ubits-sidebar {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .ubits-sidebar {
    display: none !important;
  }
}

@media (max-width: 480px) {
  .ubits-sidebar {
    display: none !important;
  }
}

/* Modo oscuro */
[data-theme="dark"] .ubits-sidebar {
  background: var(--ubits-sidebar-bg);
  border-color: var(--ubits-sidebar-button-fg-default);
}

[data-theme="dark"] .ubits-sidebar__nav-button:hover {
  background: var(--ubits-sidebar-button-bg-pressed);
}

[data-theme="dark"] .ubits-sidebar__nav-button--active {
  background: var(--ubits-sidebar-button-bg-active);
}

[data-theme="dark"] .ubits-sidebar__nav-button i {
  color: var(--ubits-sidebar-button-fg-default);
}

[data-theme="dark"] .ubits-sidebar__nav-button:hover i {
  color: var(--ubits-sidebar-button-fg-hover);
}

[data-theme="dark"] .ubits-sidebar__nav-button--active i {
  color: var(--ubits-sidebar-button-fg-active);
}

[data-theme="dark"] .ubits-sidebar__theme-toggle:hover {
  background: var(--ubits-sidebar-button-bg-pressed);
}

[data-theme="dark"] .ubits-sidebar__theme-toggle i {
  color: var(--ubits-sidebar-button-fg-default);
}

[data-theme="dark"] .ubits-sidebar__theme-toggle:hover i {
  color: var(--ubits-sidebar-button-fg-hover);
}

/* Animaciones */
.ubits-sidebar {
  transition: width 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
}

.ubits-sidebar--hidden {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
