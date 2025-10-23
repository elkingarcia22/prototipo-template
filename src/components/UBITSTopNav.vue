<!--
  UBITS TopNav Component - Responsive
  TopNav que se oculta en mobile y se reemplaza por TabBar
-->
<template>
  <nav 
    :class="topNavClasses"
    :style="topNavStyles"
    v-bind="$attrs"
  >
    <div class="ubits-top-nav__content">
      <!-- Logo/Brand -->
      <div class="ubits-top-nav__brand">
        <img :src="logoUrl" :alt="logoAlt" class="ubits-top-nav__logo" />
        <span v-if="showBrandText" class="ubits-top-nav__brand-text">{{ brandText }}</span>
      </div>
      
      <!-- Navigation Tabs -->
      <div class="ubits-top-nav__tabs">
        <button 
          v-for="tab in navigationTabs"
          :key="tab.id"
          :class="getTabClasses(tab)"
          :data-tab="tab.id"
          @click="handleTabClick(tab)"
        >
          <i :class="['far', tab.icon]"></i>
          <span>{{ tab.label }}</span>
        </button>
      </div>
      
      <!-- User Actions -->
      <div class="ubits-top-nav__actions">
        <button 
          class="ubits-top-nav__theme-toggle"
          :data-tooltip="themeToggleTooltip"
          @click="handleThemeToggle"
        >
          <i :class="['far', themeIcon]"></i>
        </button>
        
        <div class="ubits-top-nav__user-menu" @click="handleUserClick">
          <img :src="userAvatar" :alt="userName" class="ubits-top-nav__user-avatar" />
          <span v-if="showUserName" class="ubits-top-nav__user-name">{{ userName }}</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'
import { useResponsive } from '../utils/responsive'

// Props del componente
interface NavigationTab {
  id: string
  label: string
  icon: string
  active?: boolean
  href?: string
}

interface Props {
  // Brand
  logoUrl?: string
  logoAlt?: string
  brandText?: string
  showBrandText?: boolean
  
  // Navigation
  navigationTabs?: NavigationTab[]
  activeTab?: string
  
  // User
  userAvatar?: string
  userName?: string
  showUserName?: boolean
  
  // Theme
  currentTheme?: 'light' | 'dark'
  
  // Responsive
  showOnMobile?: boolean
  showOnTablet?: boolean
  showOnDesktop?: boolean
  
  // Callbacks
  onTabClick?: (tab: NavigationTab) => void
  onUserClick?: () => void
  onThemeToggle?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  logoUrl: '/images/Ubits-logo.svg',
  logoAlt: 'UBITS Logo',
  brandText: 'UBITS',
  showBrandText: true,
  navigationTabs: () => [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-home' },
    { id: 'aprendizaje', label: 'Aprendizaje', icon: 'fa-graduation-cap' },
    { id: 'diagnostico', label: 'Diagnóstico', icon: 'fa-chart-mixed' },
    { id: 'desempeno', label: 'Desempeño', icon: 'fa-bars-progress' }
  ],
  activeTab: '',
  userAvatar: '/images/Profile-image.jpg',
  userName: 'Usuario',
  showUserName: true,
  currentTheme: 'light',
  showOnMobile: false,
  showOnTablet: false,
  showOnDesktop: true
})

// Emits
const emit = defineEmits<{
  tabClick: [tab: NavigationTab]
  userClick: []
  themeToggle: []
}>()

// Sistema responsive
const { state, getResponsiveValue } = useResponsive()

// Computed
const topNavClasses = computed(() => {
  const classes = ['ubits-top-nav']
  
  // Responsive visibility
  if (state.isMobile && props.showOnMobile) {
    classes.push('ubits-top-nav--mobile')
  } else if (state.isTablet && props.showOnTablet) {
    classes.push('ubits-top-nav--tablet')
  } else if (state.isDesktop && props.showOnDesktop) {
    classes.push('ubits-top-nav--desktop')
  } else {
    classes.push('ubits-top-nav--hidden')
  }
  
  return classes
})

const topNavStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  // Altura responsive
  const height = getResponsiveValue({
    xs: '0px', // Oculto en mobile
    sm: '0px', // Oculto en tablet
    md: '60px', // Visible en desktop
    lg: '60px',
    xl: '60px',
    '2xl': '60px'
  }, '60px')
  
  if (height !== '0px') {
    styles.height = height
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
const getTabClasses = (tab: NavigationTab) => {
  const classes = ['ubits-top-nav__tab']
  
  if (tab.active || props.activeTab === tab.id) {
    classes.push('ubits-top-nav__tab--active')
  }
  
  return classes
}

const handleTabClick = (tab: NavigationTab) => {
  emit('tabClick', tab)
  props.onTabClick?.(tab)
  
  // Navegación automática si tiene href
  if (tab.href) {
    window.location.href = tab.href
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

/* Base del top-nav */
.ubits-top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: var(--ubits-bg-1);
  border-bottom: 1px solid var(--ubits-border-1);
  z-index: 1000;
  transition: all 0.3s ease;
}

.ubits-top-nav__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 24px;
  max-width: 100%;
}

/* Brand */
.ubits-top-nav__brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ubits-top-nav__logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.ubits-top-nav__brand-text {
  font-size: 18px;
  font-weight: 600;
  color: var(--ubits-fg-1-high);
}

/* Navigation Tabs */
.ubits-top-nav__tabs {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ubits-top-nav__tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  background: transparent;
  border-radius: var(--ubits-radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  color: var(--ubits-fg-1-medium);
}

.ubits-top-nav__tab:hover {
  background: var(--ubits-bg-2);
  color: var(--ubits-fg-1-high);
}

.ubits-top-nav__tab--active {
  background: var(--ubits-accent-brand);
  color: white;
}

.ubits-top-nav__tab i {
  font-size: 16px;
}

/* User Actions */
.ubits-top-nav__actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.ubits-top-nav__theme-toggle {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  border-radius: var(--ubits-radius-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.ubits-top-nav__theme-toggle:hover {
  background: var(--ubits-bg-2);
}

.ubits-top-nav__theme-toggle i {
  font-size: 16px;
  color: var(--ubits-fg-1-medium);
  transition: color 0.2s ease;
}

.ubits-top-nav__theme-toggle:hover i {
  color: var(--ubits-fg-1-high);
}

.ubits-top-nav__user-menu {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: var(--ubits-radius-sm);
  transition: all 0.2s ease;
}

.ubits-top-nav__user-menu:hover {
  background: var(--ubits-bg-2);
}

.ubits-top-nav__user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--ubits-border-1);
}

.ubits-top-nav__user-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--ubits-fg-1-high);
}

/* Responsive */
.ubits-top-nav--mobile {
  display: none !important;
}

.ubits-top-nav--tablet {
  display: none !important;
}

.ubits-top-nav--desktop {
  display: block;
}

.ubits-top-nav--hidden {
  display: none !important;
}

/* Responsive breakpoints */
@media (max-width: 1023px) {
  .ubits-top-nav {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .ubits-top-nav {
    display: none !important;
  }
}

@media (max-width: 480px) {
  .ubits-top-nav {
    display: none !important;
  }
}

/* Modo oscuro */
[data-theme="dark"] .ubits-top-nav {
  background: var(--ubits-bg-1);
  border-color: var(--ubits-border-1);
}

[data-theme="dark"] .ubits-top-nav__brand-text {
  color: var(--ubits-fg-1-high);
}

[data-theme="dark"] .ubits-top-nav__tab {
  color: var(--ubits-fg-1-medium);
}

[data-theme="dark"] .ubits-top-nav__tab:hover {
  background: var(--ubits-bg-2);
  color: var(--ubits-fg-1-high);
}

[data-theme="dark"] .ubits-top-nav__tab--active {
  background: var(--ubits-accent-brand);
  color: white;
}

[data-theme="dark"] .ubits-top-nav__theme-toggle:hover {
  background: var(--ubits-bg-2);
}

[data-theme="dark"] .ubits-top-nav__theme-toggle i {
  color: var(--ubits-fg-1-medium);
}

[data-theme="dark"] .ubits-top-nav__theme-toggle:hover i {
  color: var(--ubits-fg-1-high);
}

[data-theme="dark"] .ubits-top-nav__user-menu:hover {
  background: var(--ubits-bg-2);
}

[data-theme="dark"] .ubits-top-nav__user-name {
  color: var(--ubits-fg-1-high);
}

/* Animaciones */
.ubits-top-nav {
  transition: all 0.3s ease, transform 0.3s ease, opacity 0.3s ease;
}

.ubits-top-nav--hidden {
  transform: translateY(-100%);
  opacity: 0;
}

/* Utilidades */
.ubits-top-nav--visible {
  display: block !important;
}

.ubits-top-nav--flex {
  display: flex !important;
}

.ubits-top-nav--grid {
  display: grid !important;
}
</style>
