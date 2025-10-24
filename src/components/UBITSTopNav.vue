<template>
  <div class="ubits-top-nav" :data-theme="currentTheme">
    <!-- Top Navigation -->
    <div class="top-nav">
      <!-- Logo y Brand -->
      <div class="nav-brand" @click="handleLogoClick">
        <img :src="logoUrl" :alt="logoAlt" class="brand-logo" />
        <span v-if="showBrandText" class="brand-text">{{ brandText }}</span>
      </div>
      
      <!-- Navigation Tabs -->
      <div class="nav-tabs">
        <button
          v-for="tab in navigationTabs"
          :key="tab.id"
          :class="['nav-tab', { active: activeTab === tab.id }]"
          @click="handleTabClick(tab)"
        >
          <i :class="tab.icon"></i>
          <span>{{ tab.label }}</span>
        </button>
      </div>
      
      <!-- User Actions -->
      <div class="nav-actions">
        <!-- Theme Toggle -->
        <button 
          class="theme-toggle"
          :data-tooltip="isDark ? 'Modo claro' : 'Modo oscuro'"
          @click="handleThemeToggle"
        >
          <i :class="isDark ? 'far fa-sun' : 'far fa-moon'"></i>
        </button>
        
        <!-- User Profile -->
        <div class="user-profile" @click="handleUserClick">
          <img :src="userAvatar" :alt="userName" class="user-avatar" />
          <span v-if="showUserName" class="user-name">{{ userName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '../utils/theme'

// Interfaces
interface NavigationTab {
  id: string
  label: string
  icon: string
  active?: boolean
}

interface Props {
  logoUrl?: string
  logoAlt?: string
  brandText?: string
  showBrandText?: boolean
  navigationTabs?: NavigationTab[]
  activeTab?: string
  userAvatar?: string
  userName?: string
  currentTheme?: 'light' | 'dark'
  showUserName?: boolean
}

// Props con valores por defecto
const props = withDefaults(defineProps<Props>(), {
  logoUrl: '/images/Ubits-logo.svg',
  logoAlt: 'UBITS Logo',
  brandText: 'UBITS',
  showBrandText: true,
  navigationTabs: () => [
    { id: 'template', label: 'Template', icon: 'home' },
    { id: 'aprendizaje', label: 'Aprendizaje', icon: 'graduation-cap' },
    { id: 'diagnostico', label: 'Diagnóstico', icon: 'chart-line' },
    { id: 'desempeno', label: 'Desempeño', icon: 'chart-bar' }
  ],
  activeTab: '',
  userAvatar: '/images/Profile-image.jpg',
  userName: 'Usuario',
  currentTheme: 'light',
  showUserName: true
})

// Emits
const emit = defineEmits<{
  logoClick: []
  tabClick: [tab: NavigationTab]
  userClick: []
  themeToggle: []
}>()

// Sistema de tema
const { currentTheme, isDark, toggleTheme } = useTheme()

// Métodos
const handleLogoClick = () => {
  emit('logoClick')
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
</script>

<style scoped>
/* Importar todos los estilos UBITS */
@import '../styles/ubits-tokens.css';
@import '../styles/ubits-styles.css';
@import '../styles/ubits-colors.css';
@import '../styles/ubits-layout.css';

/* Top Navigation */
.ubits-top-nav {
  background-color: var(--ubits-bg-1);
  height: 40px;
  border-radius: 8px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--ubits-border-1);
  transition: all 0.3s ease;
}

.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

/* Brand Section */
.nav-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 4px 8px;
  border-radius: 6px;
}

.nav-brand:hover {
  background: rgba(12, 91, 239, 0.05);
}

.brand-logo {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.brand-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--ubits-fg-1-high);
  font-family: 'Noto Sans', sans-serif;
}

/* Navigation Tabs */
.nav-tabs {
  display: flex;
  gap: 8px;
  align-items: center;
  height: 100%;
}

.nav-tab {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  border-radius: 0;
  color: var(--ubits-fg-1-medium);
}

.nav-tab i {
  font-size: 16px;
  color: var(--ubits-fg-1-medium);
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Efecto sutil para los nav-tab */
.nav-tab::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(12, 91, 239, 0.03);
  border-radius: 0;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.nav-tab:hover::before {
  opacity: 1;
}

.nav-tab span {
  color: var(--ubits-fg-1-medium);
  text-align: left;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 400;
  transition: all 0.3s ease;
}

/* Estado activo del tab */
.nav-tab.active span {
  font-weight: 600;
  color: var(--ubits-accent-brand);
}

.nav-tab.active i {
  color: var(--ubits-accent-brand);
}

.nav-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: var(--ubits-accent-brand);
  border-radius: 2px;
}

/* Hover effects para nav-tab */
.nav-tab:hover {
  background: rgba(12, 91, 239, 0.05);
}

.nav-tab:hover i {
  color: var(--ubits-accent-brand);
}

.nav-tab:hover span {
  color: var(--ubits-accent-brand);
}

/* User Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.theme-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  color: var(--ubits-fg-1-medium);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

.theme-toggle:hover {
  background: rgba(12, 91, 239, 0.1);
  color: var(--ubits-accent-brand);
  transform: scale(1.1);
}

.theme-toggle i {
  font-size: 16px;
  transition: all 0.3s ease;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.user-profile:hover {
  background: rgba(12, 91, 239, 0.05);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid transparent;
  transition: border-color 0.2s ease;
}

.user-profile:hover .user-avatar {
  border-color: var(--ubits-accent-brand);
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--ubits-fg-1-high);
  font-family: 'Noto Sans', sans-serif;
}

/* Responsive */
@media (max-width: 768px) {
  .ubits-top-nav {
    height: 36px;
    padding: 0 8px;
  }
  
  .nav-tab {
    padding: 6px;
  }
  
  .nav-tab span {
    font-size: 12px;
    line-height: 20px;
  }
  
  .nav-tab i {
    font-size: 14px;
  }
  
  .brand-text {
    font-size: 14px;
  }
  
  .user-name {
    display: none;
  }
  
  .user-avatar {
    width: 28px;
    height: 28px;
  }
}

@media (max-width: 480px) {
  .nav-tabs {
    gap: 4px;
  }
  
  .nav-tab {
    padding: 4px;
  }
  
  .nav-tab span {
    display: none;
  }
  
  .nav-actions {
    gap: 8px;
  }
}

/* Dark mode */
[data-theme="dark"] .ubits-top-nav {
  background-color: var(--ubits-bg-1);
  border-color: var(--ubits-border-1);
}

[data-theme="dark"] .nav-tab span {
  color: var(--ubits-fg-2-medium-static-inverted);
}

[data-theme="dark"] .nav-tab i {
  color: var(--ubits-fg-2-medium-static-inverted);
}

[data-theme="dark"] .brand-text {
  color: var(--ubits-fg-1-high);
}

[data-theme="dark"] .user-name {
  color: var(--ubits-fg-1-high);
}

/* Transiciones suaves */
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
</style>
