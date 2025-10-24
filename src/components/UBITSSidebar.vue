<template>
  <aside class="sidebar" :data-theme="currentTheme">
    <!-- Contenedor principal -->
    <div class="sidebar-main">
      <!-- Header con logo -->
      <div class="sidebar-header">
        <div class="logo" @click="handleLogoClick">
          <img :src="logoUrl" :alt="logoAlt" />
        </div>
      </div>
      
      <!-- Navegación principal -->
      <div class="sidebar-body">
        <button
          v-for="item in navigationItems"
          :key="item.id"
          :class="['nav-button', { active: activeItem === item.id }]"
          :data-section="item.id"
          :data-tooltip="item.tooltip"
          @click="handleNavClick(item)"
          @mouseenter="showTooltip($event, item.tooltip)"
          @mouseleave="hideTooltip"
        >
          <i :class="item.icon"></i>
        </button>
      </div>
    </div>
    
    <!-- Footer con usuario y modo oscuro -->
    <div class="sidebar-footer">
      <!-- Avatar de usuario -->
      <div class="user-avatar-container">
        <div 
          class="user-avatar"
          @click="handleUserClick"
          @mouseenter="showProfileMenu"
          @mouseleave="hideProfileMenu"
        >
          <img :src="userAvatar" :alt="userName" class="avatar-image" />
        </div>
      </div>
      
      <!-- Botón de modo oscuro -->
      <button 
        class="nav-button"
        id="darkmode-toggle"
        :data-tooltip="isDark ? 'Modo claro' : 'Modo oscuro'"
        @click="handleThemeToggle"
        @mouseenter="showTooltip($event, isDark ? 'Modo claro' : 'Modo oscuro')"
        @mouseleave="hideTooltip"
      >
        <i :class="isDark ? 'far fa-sun' : 'far fa-moon'"></i>
      </button>
    </div>
    
    <!-- Tooltip -->
    <div ref="tooltip" class="tooltip" id="tooltip"></div>
    
    <!-- Profile Menu -->
    <div 
      v-if="showProfileMenuFlag"
      class="sidebar-profile-menu"
      @mouseenter="showProfileMenu"
      @mouseleave="hideProfileMenu"
    >
      <div class="profile-menu-item" @click="handleProfileClick">
        <i class="far fa-user"></i>
        <span>Ver mi perfil</span>
      </div>
      <div class="profile-menu-item" @click="handlePasswordChange">
        <i class="far fa-key"></i>
        <span>Cambio de contraseña</span>
      </div>
      <div class="profile-menu-item" @click="handleLogout">
        <i class="far fa-sign-out"></i>
        <span>Cerrar sesión</span>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../utils/theme'

// Interfaces
interface NavigationItem {
  id: string
  label: string
  icon: string
  tooltip: string
  href?: string
  active?: boolean
}

interface Props {
  logoUrl?: string
  logoAlt?: string
  navigationItems?: NavigationItem[]
  activeItem?: string
  userAvatar?: string
  userName?: string
  currentTheme?: 'light' | 'dark'
  showLabels?: boolean
}

// Props con valores por defecto
const props = withDefaults(defineProps<Props>(), {
  logoUrl: '/images/Ubits-logo.svg',
  logoAlt: 'UBITS Logo',
  navigationItems: () => [
    { id: 'aprendizaje', label: 'Aprendizaje', icon: 'far fa-graduation-cap', tooltip: 'Aprendizaje' },
    { id: 'diagnostico', label: 'Diagnóstico', icon: 'far fa-chart-mixed', tooltip: 'Diagnóstico' },
    { id: 'desempeno', label: 'Desempeño', icon: 'far fa-bars-progress', tooltip: 'Desempeño' },
    { id: 'encuestas', label: 'Encuestas', icon: 'far fa-clipboard', tooltip: 'Encuestas' },
    { id: 'reclutamiento', label: 'Reclutamiento', icon: 'far fa-users', tooltip: 'Reclutamiento' },
    { id: 'tareas', label: 'Tareas', icon: 'far fa-layer-group', tooltip: 'Tareas' },
    { id: 'ubits-ai', label: 'UBITS AI', icon: 'far fa-sparkles', tooltip: 'UBITS AI' }
  ],
  activeItem: '',
  userAvatar: '/images/Profile-image.jpg',
  userName: 'Usuario',
  currentTheme: 'light',
  showLabels: false
})

// Emits
const emit = defineEmits<{
  logoClick: []
  navClick: [item: NavigationItem]
  userClick: []
  themeToggle: []
}>()

// Sistema de tema
const { currentTheme, isDark, toggleTheme } = useTheme()

// Estado reactivo
const showProfileMenuFlag = ref(false)
const tooltip = ref<HTMLElement | null>(null)

// Métodos de navegación
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

const handleUserClick = () => {
  emit('userClick')
}

const handleThemeToggle = () => {
  toggleTheme()
  emit('themeToggle')
}

// Métodos del profile menu
const showProfileMenu = () => {
  showProfileMenuFlag.value = true
}

const hideProfileMenu = () => {
  showProfileMenuFlag.value = false
}

const handleProfileClick = () => {
  console.log('Profile clicked')
  hideProfileMenu()
}

const handlePasswordChange = () => {
  console.log('Password change clicked')
  hideProfileMenu()
}

const handleLogout = () => {
  console.log('Logout clicked')
  hideProfileMenu()
}

// Métodos del tooltip
const showTooltip = (event: MouseEvent, text: string) => {
  if (!tooltip.value) return
  
  const button = event.currentTarget as HTMLElement
  const rect = button.getBoundingClientRect()
  
  tooltip.value.textContent = text
  tooltip.value.style.left = `${rect.right + 8}px`
  tooltip.value.style.top = `${rect.top + rect.height / 2}px`
  tooltip.value.style.opacity = '1'
  tooltip.value.style.transform = 'translateY(-50%)'
}

const hideTooltip = () => {
  if (!tooltip.value) return
  
  tooltip.value.style.opacity = '0'
  tooltip.value.style.transform = 'translateY(-50%) translateX(-4px)'
}

// Lifecycle
onMounted(() => {
  console.log('🚀 ===== UBITSSIDEBAR MOUNTED =====')
  console.log('📊 Props received:', {
    logoUrl: props.logoUrl,
    logoAlt: props.logoAlt,
    navigationItems: props.navigationItems,
    activeItem: props.activeItem,
    userAvatar: props.userAvatar,
    userName: props.userName,
    currentTheme: props.currentTheme
  })

  // Aplicar tema inicial
  document.documentElement.setAttribute('data-theme', currentTheme.value)
  console.log('🎨 Sidebar theme applied:', currentTheme.value)
  
  // Forzar el color del sidebar
  const sidebarElement = document.querySelector('.sidebar')
  if (sidebarElement) {
    sidebarElement.style.backgroundColor = 'var(--ubits-sidebar-bg)'
    console.log('🎨 Sidebar background forced to:', getComputedStyle(sidebarElement).backgroundColor)
  }

  // Verificar estilos CSS inmediatamente
  console.log('🔍 Checking sidebar styles immediately...')
  const sidebar = document.querySelector('.sidebar')
  if (sidebar) {
    console.log('✅ Sidebar element found in DOM')
    const styles = getComputedStyle(sidebar)
    console.log('🎨 Sidebar CSS styles:', {
      backgroundColor: styles.backgroundColor,
      width: styles.width,
      height: styles.height,
      display: styles.display,
      position: styles.position,
      left: styles.left,
      top: styles.top,
      zIndex: styles.zIndex,
      visibility: styles.visibility,
      opacity: styles.opacity,
      transform: styles.transform,
      transition: styles.transition
    })
    
    // Verificar altura específicamente
    console.log('📏 Sidebar height verification:', {
      cssHeight: styles.height,
      offsetHeight: sidebar.offsetHeight,
      clientHeight: sidebar.clientHeight,
      scrollHeight: sidebar.scrollHeight,
      expectedHeight: 'calc(100vh - 32px)',
      matches: styles.height === 'calc(100vh - 32px)',
      viewportHeight: window.innerHeight + 'px',
      calculatedHeight: (window.innerHeight - 32) + 'px'
    })
    
    // Verificar posición
    console.log('📍 Sidebar position verification:', {
      left: styles.left,
      top: styles.top,
      position: styles.position,
      expectedLeft: '24px',
      expectedTop: '16px',
      matches: styles.left === '24px' && styles.top === '16px'
    })
    
    // Verificar elementos internos
    const sidebarMain = sidebar.querySelector('.sidebar-main')
    const sidebarHeader = sidebar.querySelector('.sidebar-header')
    const sidebarBody = sidebar.querySelector('.sidebar-body')
    const sidebarFooter = sidebar.querySelector('.sidebar-footer')
    const navButtons = sidebar.querySelectorAll('.nav-button')
    const userAvatar = sidebar.querySelector('.user-avatar')
    
    console.log('🔍 Sidebar internal elements:', {
      sidebarMain: !!sidebarMain,
      sidebarHeader: !!sidebarHeader,
      sidebarBody: !!sidebarBody,
      sidebarFooter: !!sidebarFooter,
      navButtons: navButtons.length,
      userAvatar: !!userAvatar
    })
    
    // Verificar estilos de elementos internos
    if (sidebarMain) {
      const mainStyles = getComputedStyle(sidebarMain)
      console.log('🎨 Sidebar Main styles:', {
        display: mainStyles.display,
        flexDirection: mainStyles.flexDirection,
        gap: mainStyles.gap,
        alignItems: mainStyles.alignItems
      })
    }
    
    if (navButtons.length > 0) {
      const firstButton = navButtons[0]
      const buttonStyles = getComputedStyle(firstButton)
      console.log('🎨 First nav button styles:', {
        display: buttonStyles.display,
        width: buttonStyles.width,
        height: buttonStyles.height,
        backgroundColor: buttonStyles.backgroundColor,
        color: buttonStyles.color,
        borderRadius: buttonStyles.borderRadius,
        cursor: buttonStyles.cursor
      })
    }
    
    // Verificar si los estilos UBITS están cargados
    const rootStyles = getComputedStyle(document.documentElement)
    console.log('🎨 UBITS CSS variables check:', {
      '--ubits-sidebar-bg': rootStyles.getPropertyValue('--ubits-sidebar-bg'),
      '--ubits-sidebar-button-fg-default': rootStyles.getPropertyValue('--ubits-sidebar-button-fg-default'),
      '--ubits-sidebar-button-bg-active': rootStyles.getPropertyValue('--ubits-sidebar-button-bg-active'),
      '--ubits-bg-1': rootStyles.getPropertyValue('--ubits-bg-1'),
      '--ubits-fg-1-high': rootStyles.getPropertyValue('--ubits-fg-1-high')
    })
    
    // Verificar el color de fondo del sidebar específicamente
    console.log('🎨 Sidebar background color:', {
      computed: styles.backgroundColor,
      expected: '#202837',
      matches: styles.backgroundColor === 'rgb(32, 40, 55)' || styles.backgroundColor === '#202837',
      hexValue: styles.backgroundColor,
      currentTheme: currentTheme.value
    })
    
    // Verificar si el color es el correcto del playground
    if (styles.backgroundColor === 'rgb(32, 40, 55)' || styles.backgroundColor === '#202837') {
      console.log('✅ Sidebar color is CORRECT (blue like playground)')
    } else {
      console.log('❌ Sidebar color is WRONG. Expected blue #202837, got:', styles.backgroundColor)
    }
    
    // Verificar tema actual
    console.log('🌙 Current theme:', {
      currentTheme: currentTheme.value,
      isDark: isDark.value,
      isLight: !isDark.value,
      documentTheme: document.documentElement.getAttribute('data-theme')
    })
    
    // Verificar si el sidebar tiene los márgenes correctos
    if (styles.left === '24px' && styles.top === '16px') {
      console.log('✅ Sidebar position is CORRECT (with margins like playground)')
    } else {
      console.log('❌ Sidebar position is WRONG. Expected left: 24px, top: 16px, got:', styles.left, styles.top)
    }
    
  } else {
    console.log('❌ Sidebar element NOT found in DOM')
    console.log('🔍 Available elements with class "sidebar":', document.querySelectorAll('.sidebar'))
    console.log('🔍 All elements in document:', document.querySelectorAll('*'))
  }

  // Verificar después de un delay
  setTimeout(() => {
    console.log('⏰ ===== DELAYED SIDEBAR CHECK =====')
    const delayedSidebar = document.querySelector('.sidebar')
    if (delayedSidebar) {
      console.log('✅ Sidebar found after delay')
      const delayedStyles = getComputedStyle(delayedSidebar)
      console.log('🎨 Delayed sidebar styles:', {
        backgroundColor: delayedStyles.backgroundColor,
        width: delayedStyles.width,
        height: delayedStyles.height,
        display: delayedStyles.display,
        position: delayedStyles.position,
        visibility: delayedStyles.visibility,
        opacity: delayedStyles.opacity
      })
      
      // Verificar si es visible
      const rect = delayedSidebar.getBoundingClientRect()
      console.log('📏 Sidebar bounding rect:', {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        visible: rect.width > 0 && rect.height > 0
      })
      
    } else {
      console.log('❌ Sidebar still not found after delay')
    }
  }, 1000)
})

onUnmounted(() => {
  // Cleanup si es necesario
})
</script>

<style scoped>
/* Importar todos los estilos UBITS */
@import '../styles/ubits-tokens.css';
@import '../styles/ubits-styles.css';
@import '../styles/ubits-colors.css';
@import '../styles/ubits-layout.css';

/* Sidebar principal - Los estilos se heredan de ubits-styles.css */
.sidebar {
  /* Estilos base del sistema UBITS ya aplicados */
}

/* Contenedor principal */
.sidebar-main {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  flex-shrink: 0;
}

/* Header */
.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-shrink: 0;
}

.logo {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 4px;
  border-radius: 6px;
}

.logo:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.05);
}

.logo img {
  width: 24px;
  height: 25px;
  object-fit: contain;
}

/* Body de navegación */
.sidebar-body {
  flex: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
  min-height: 0;
  min-width: 0;
  flex-shrink: 0;
}

/* Footer */
.sidebar-footer {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
  margin-top: auto;
  padding: 16px 0 0 0;
  width: 100%;
  flex-shrink: 0;
  border-top: 1px solid var(--ubits-sidebar-button-fg-default);
  position: relative;
}

.sidebar-footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: var(--ubits-fg-1-medium);
}

/* Botones de navegación */
.nav-button {
  background: rgba(255, 255, 255, 0);
  border: none;
  padding: 8px;
  border-radius: 1000px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  overflow: hidden;
}

.nav-button i {
  font-size: 16px;
  color: var(--ubits-sidebar-button-fg-default);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Efecto de brillo */
.nav-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
  pointer-events: none;
}

.nav-button:hover::before {
  left: 100%;
}

/* Estados de los botones */
.nav-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.08);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
}

.nav-button:hover i {
  color: var(--ubits-sidebar-button-fg-hover);
  transform: scale(1.1);
}

.nav-button:active {
  background: var(--ubits-sidebar-button-bg-pressed);
  transform: scale(0.95);
}

.nav-button:active i {
  color: var(--ubits-sidebar-button-fg-pressed);
  transform: scale(0.9);
}

.nav-button.active {
  background: var(--ubits-sidebar-button-bg-active);
}

.nav-button.active i {
  color: var(--ubits-sidebar-button-fg-active);
}

.nav-button:focus-visible {
  background: rgba(255, 255, 255, 0);
  box-shadow: 0px 0px 0px 4px rgba(82, 151, 244, 0.3);
  outline: none;
}

.nav-button:focus-visible i {
  color: var(--ubits-sidebar-button-fg-default);
}

/* Botón de modo oscuro especial */
#darkmode-toggle {
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

#darkmode-toggle i {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

#darkmode-toggle:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}

/* Avatar de usuario */
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ubits-fg-1-medium);
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.user-avatar:hover {
  background: var(--ubits-fg-1-medium);
  transform: scale(1.05);
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid transparent;
  transition: border-color 0.2s ease;
}

.user-avatar:hover .avatar-image {
  border-color: var(--ubits-fg-bold);
}

/* Tooltip */
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

/* Profile Menu */
.sidebar-profile-menu {
  position: fixed;
  left: 120px;
  bottom: 80px;
  width: 200px;
  background: var(--ubits-sidebar-bg);
  border: 1px solid var(--ubits-border-1);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 2000;
  padding: 8px 0;
}

.sidebar-profile-menu .profile-menu-item {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  color: var(--ubits-sidebar-button-fg-default);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sidebar-profile-menu .profile-menu-item span {
  color: inherit;
  font-family: 'Noto Sans', sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 19.5px;
}

.sidebar-profile-menu .profile-menu-item:hover {
  background: var(--ubits-sidebar-button-bg-pressed);
  color: var(--ubits-sidebar-button-fg-hover);
}

.sidebar-profile-menu .profile-menu-item i {
  font-size: 14px;
  margin-right: 10px;
  color: var(--ubits-sidebar-button-fg-default);
  width: 16px;
  text-align: center;
}

.sidebar-profile-menu .profile-menu-item:hover i {
  color: var(--ubits-sidebar-button-fg-hover);
}

/* Responsive */
@media (max-width: 768px) {
  .ubits-sidebar {
    width: 80px;
    min-width: 80px;
    padding: 16px 22px;
  }
  
  .nav-button {
    width: 36px;
    height: 36px;
  }
  
  .nav-button i {
    width: 20px;
    height: 20px;
    font-size: 14px;
  }
}

@media (max-height: 600px) {
  .ubits-sidebar {
    height: 500px;
    padding: 12px 22px;
    gap: 12px;
  }
  
  .sidebar-body {
    gap: 6px;
  }
  
  .sidebar-footer {
    gap: 12px;
    padding: 12px 0 0 0;
  }
  
  .nav-button {
    width: 36px;
    height: 36px;
    padding: 6px;
  }
  
  .nav-button i {
    width: 20px;
    height: 20px;
    font-size: 14px;
  }
}

/* Dark mode */
[data-theme="dark"] .ubits-sidebar {
  background-color: var(--ubits-sidebar-bg);
}

[data-theme="dark"] .sidebar-profile-menu {
  background: var(--ubits-sidebar-bg);
  border-color: var(--ubits-border-1);
}

[data-theme="dark"] .sidebar-profile-menu .profile-menu-item {
  color: var(--ubits-sidebar-button-fg-default);
}

[data-theme="dark"] .sidebar-profile-menu .profile-menu-item:hover {
  color: var(--ubits-sidebar-button-fg-hover);
}

[data-theme="dark"] .sidebar-profile-menu .profile-menu-item i {
  color: var(--ubits-sidebar-button-fg-default);
}

[data-theme="dark"] .sidebar-profile-menu .profile-menu-item:hover i {
  color: var(--ubits-sidebar-button-fg-hover);
}
</style>
