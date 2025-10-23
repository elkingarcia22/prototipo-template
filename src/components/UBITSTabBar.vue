<!--
  UBITS TabBar Component - Responsive
  TabBar que reemplaza al sidebar en mobile/tablet
-->
<template>
  <div 
    :class="tabBarClasses"
    :style="tabBarStyles"
    v-bind="$attrs"
  >
    <div class="ubits-tab-bar__content">
      <div 
        v-for="item in tabItems"
        :key="item.id"
        :class="getTabItemClasses(item)"
        :data-tab="item.id"
        @click="handleTabClick(item)"
      >
        <!-- Icon o Avatar -->
        <i 
          v-if="!item.isAvatar"
          :class="['far', item.icon, 'ubits-tab-bar__icon']"
        ></i>
        <img 
          v-else
          :src="item.avatarUrl"
          :alt="item.avatarAlt"
          class="ubits-tab-bar__avatar"
        >
        
        <!-- Label -->
        <span class="ubits-tab-bar__text">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'
import { useResponsive } from '../utils/responsive'

// Props del componente
interface TabItem {
  id: string
  label: string
  icon?: string
  isAvatar?: boolean
  avatarUrl?: string
  avatarAlt?: string
  active?: boolean
  href?: string
}

interface Props {
  // Tabs
  tabItems?: TabItem[]
  activeTab?: string
  
  // Responsive
  showOnMobile?: boolean
  showOnTablet?: boolean
  showOnDesktop?: boolean
  
  // Callbacks
  onTabClick?: (item: TabItem) => void
}

const props = withDefaults(defineProps<Props>(), {
  tabItems: () => [
    { 
      id: 'modulos', 
      label: 'Módulos', 
      icon: 'fa-grid-2',
      href: 'index.html'
    },
    { 
      id: 'perfil', 
      label: 'Mi perfil', 
      isAvatar: true,
      avatarUrl: '/images/Profile-image.jpg',
      avatarAlt: 'Mi perfil',
      href: 'profile.html'
    },
    { 
      id: 'modo-oscuro', 
      label: 'Modo oscuro', 
      icon: 'fa-moon',
      href: '#'
    }
  ],
  activeTab: '',
  showOnMobile: true,
  showOnTablet: true,
  showOnDesktop: false
})

// Emits
const emit = defineEmits<{
  tabClick: [item: TabItem]
}>()

// Sistema responsive
const { state, getResponsiveValue } = useResponsive()

// Computed
const tabBarClasses = computed(() => {
  const classes = ['ubits-tab-bar']
  
  // Responsive visibility
  if (state.isMobile && props.showOnMobile) {
    classes.push('ubits-tab-bar--mobile')
  } else if (state.isTablet && props.showOnTablet) {
    classes.push('ubits-tab-bar--tablet')
  } else if (state.isDesktop && props.showOnDesktop) {
    classes.push('ubits-tab-bar--desktop')
  } else {
    classes.push('ubits-tab-bar--hidden')
  }
  
  return classes
})

const tabBarStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  // Altura responsive
  const height = getResponsiveValue({
    xs: '60px',
    sm: '60px',
    md: '0px', // Oculto en desktop
    lg: '0px',
    xl: '0px',
    '2xl': '0px'
  }, '60px')
  
  if (height !== '0px') {
    styles.height = height
  }
  
  return styles
})

// Methods
const getTabItemClasses = (item: TabItem) => {
  const classes = ['ubits-tab-bar__item']
  
  if (item.active || props.activeTab === item.id) {
    classes.push('ubits-tab-bar__item--active')
  }
  
  return classes
}

const handleTabClick = (item: TabItem) => {
  emit('tabClick', item)
  props.onTabClick?.(item)
  
  // Navegación automática si tiene href
  if (item.href && item.href !== '#') {
    window.location.href = item.href
  }
}
</script>

<style scoped>
/* Importar tokens UBITS */
@import '../styles/ubits-tokens.css';

/* Base del tab-bar */
.ubits-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: var(--ubits-sidebar-bg);
  border-top: 1px solid var(--ubits-sidebar-button-fg-default);
  z-index: 1000;
  padding: 8px 0;
  transition: all 0.3s ease;
}

.ubits-tab-bar__content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  max-width: 100%;
}

.ubits-tab-bar__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 4px 8px;
  border-radius: var(--ubits-radius-sm);
  min-width: 60px;
  flex: 1;
  max-width: 120px;
}

.ubits-tab-bar__item:hover {
  background: var(--ubits-sidebar-button-bg-pressed);
}

.ubits-tab-bar__item--active {
  background: transparent;
}

.ubits-tab-bar__item--active .ubits-tab-bar__text {
  color: var(--ubits-sidebar-button-bg-active);
  font-weight: 700;
}

.ubits-tab-bar__icon {
  font-size: 20px;
  color: var(--ubits-sidebar-button-fg-default);
  margin-bottom: 2px;
  transition: color 0.2s ease;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ubits-tab-bar__item:hover .ubits-tab-bar__icon {
  color: var(--ubits-sidebar-button-fg-hover);
}

.ubits-tab-bar__avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 2px;
  border: 2px solid transparent;
  transition: border-color 0.2s ease;
}

.ubits-tab-bar__item:hover .ubits-tab-bar__avatar {
  border-color: var(--ubits-sidebar-button-fg-hover);
}

.ubits-tab-bar__item--active .ubits-tab-bar__avatar {
  border-color: var(--ubits-sidebar-button-bg-active);
}

.ubits-tab-bar__text {
  color: var(--ubits-sidebar-button-fg-default);
  text-align: center;
  line-height: 1.2;
  transition: color 0.2s ease;
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 12px;
  font-weight: 400;
}

.ubits-tab-bar__item:hover .ubits-tab-bar__text {
  color: var(--ubits-sidebar-button-fg-hover);
}

/* Responsive */
.ubits-tab-bar--mobile {
  display: block;
}

.ubits-tab-bar--tablet {
  display: block;
}

.ubits-tab-bar--desktop {
  display: none;
}

.ubits-tab-bar--hidden {
  display: none !important;
}

/* Responsive breakpoints */
@media (max-width: 1023px) {
  .ubits-tab-bar {
    display: block;
  }
}

@media (min-width: 1024px) {
  .ubits-tab-bar {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .ubits-tab-bar {
    display: block;
  }
}

@media (max-width: 480px) {
  .ubits-tab-bar {
    display: block;
  }
}

/* Modo oscuro */
[data-theme="dark"] .ubits-tab-bar {
  background: var(--ubits-sidebar-bg);
  border-color: var(--ubits-sidebar-button-fg-default);
}

[data-theme="dark"] .ubits-tab-bar__item:hover {
  background: var(--ubits-sidebar-button-bg-pressed);
}

[data-theme="dark"] .ubits-tab-bar__icon {
  color: var(--ubits-sidebar-button-fg-default);
}

[data-theme="dark"] .ubits-tab-bar__item:hover .ubits-tab-bar__icon {
  color: var(--ubits-sidebar-button-fg-hover);
}

[data-theme="dark"] .ubits-tab-bar__text {
  color: var(--ubits-sidebar-button-fg-default);
}

[data-theme="dark"] .ubits-tab-bar__item:hover .ubits-tab-bar__text {
  color: var(--ubits-sidebar-button-fg-hover);
}

[data-theme="dark"] .ubits-tab-bar__item--active .ubits-tab-bar__text {
  color: var(--ubits-sidebar-button-bg-active);
}

[data-theme="dark"] .ubits-tab-bar__avatar {
  border-color: transparent;
}

/* Animaciones */
.ubits-tab-bar {
  transition: all 0.3s ease, transform 0.3s ease, opacity 0.3s ease;
}

.ubits-tab-bar--hidden {
  transform: translateY(100%);
  opacity: 0;
}

/* Utilidades */
.ubits-tab-bar--visible {
  display: block !important;
}

.ubits-tab-bar--flex {
  display: flex !important;
}

.ubits-tab-bar--grid {
  display: grid !important;
}
</style>
