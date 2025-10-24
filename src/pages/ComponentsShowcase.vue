<template>
  <div class="components-showcase">
    <!-- Hero Section -->
    <div class="hero-section">
      <h1 class="ubits-display-d2-bold showcase-title">
        🎨 Componentes UBITS
      </h1>
      <p class="ubits-body-md-regular showcase-subtitle">
        Visualiza y prueba todos los componentes del sistema de diseño UBITS
      </p>
    </div>

    <!-- Sidebar Preview -->
    <div class="component-section">
      <h2 class="ubits-heading-h2 section-title">
        <i class="far fa-bars" style="margin-right: 8px; color: var(--ubits-accent-brand);"></i>
        Sidebar Component
      </h2>
      
      <div class="preview-container">
        <div class="preview-description">
          <p class="ubits-body-md-regular">
            Componente de navegación lateral con estados hover, active y menú de perfil desplegable.
          </p>
        </div>
        
        <!-- Sidebar Preview -->
        <div class="sidebar-preview-wrapper">
          <div class="sidebar-preview-container">
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
        </div>

        <!-- Controls -->
        <div class="preview-controls">
          <h3 class="ubits-body-md-bold">Estados de prueba:</h3>
          <div class="control-buttons">
            <button 
              v-for="item in navigationItems" 
              :key="item.id"
              :class="['control-btn', { active: activeItem === item.id }]"
              @click="setActiveItem(item.id)"
            >
              <i :class="item.icon"></i>
              <span>{{ item.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Component Features -->
    <div class="features-section">
      <h2 class="ubits-heading-h2 section-title">
        <i class="far fa-info-circle" style="margin-right: 8px; color: var(--ubits-accent-brand);"></i>
        Características del Sidebar
      </h2>
      
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <i class="far fa-mouse-pointer"></i>
          </div>
          <h3 class="ubits-body-md-bold">Estados Interactivos</h3>
          <p class="ubits-body-sm-regular">Hover, active, pressed y focus con animaciones suaves</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">
            <i class="far fa-user-circle"></i>
          </div>
          <h3 class="ubits-body-md-bold">Menú de Perfil</h3>
          <p class="ubits-body-sm-regular">Desplegable con opciones de usuario y navegación</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">
            <i class="far fa-moon"></i>
          </div>
          <h3 class="ubits-body-md-bold">Modo Oscuro</h3>
          <p class="ubits-body-sm-regular">Toggle con animaciones y persistencia de preferencias</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">
            <i class="far fa-mobile-alt"></i>
          </div>
          <h3 class="ubits-body-md-bold">Responsive</h3>
          <p class="ubits-body-sm-regular">Se adapta automáticamente a diferentes tamaños de pantalla</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import UBITSSidebar from '../components/UBITSSidebar.vue'
import { useTheme } from '../utils/theme'

// Props y configuración
const { currentTheme, toggleTheme } = useTheme()

// Configuración del sidebar
const logoUrl = '/images/Ubits-logo.svg'
const logoAlt = 'UBITS Logo'
const userAvatar = '/images/Profile-image.jpg'
const userName = 'Usuario'

// Items de navegación
const navigationItems = ref([
  { id: 'aprendizaje', label: 'Aprendizaje', icon: 'far fa-graduation-cap', tooltip: 'Aprendizaje' },
  { id: 'diagnostico', label: 'Diagnóstico', icon: 'far fa-chart-mixed', tooltip: 'Diagnóstico' },
  { id: 'desempeno', label: 'Desempeño', icon: 'far fa-bars-progress', tooltip: 'Desempeño' },
  { id: 'encuestas', label: 'Encuestas', icon: 'far fa-clipboard', tooltip: 'Encuestas' },
  { id: 'reclutamiento', label: 'Reclutamiento', icon: 'far fa-users', tooltip: 'Reclutamiento' },
  { id: 'tareas', label: 'Tareas', icon: 'far fa-layer-group', tooltip: 'Tareas' },
  { id: 'ubits-ai', label: 'UBITS AI', icon: 'far fa-sparkles', tooltip: 'UBITS AI' }
])

// Estado activo
const activeItem = ref('aprendizaje')

// Métodos
const setActiveItem = (itemId: string) => {
  activeItem.value = itemId
}

const handleLogoClick = () => {
  console.log('Logo clicked')
}

const handleNavClick = (item: any) => {
  console.log('Navigation clicked:', item)
  activeItem.value = item.id
}

const handleUserClick = () => {
  console.log('User clicked')
}

const handleThemeToggle = () => {
  toggleTheme()
}
</script>

<style scoped>
/* Importar tokens UBITS */
@import '../styles/ubits-tokens.css';

.components-showcase {
  min-height: 100vh;
  background: var(--ubits-bg-1);
  color: var(--ubits-fg-1-high);
  padding: 40px;
}

.hero-section {
  text-align: center;
  margin-bottom: 60px;
  padding: 60px 0;
  background: linear-gradient(135deg, var(--ubits-bg-1) 0%, var(--ubits-bg-2) 100%);
  border-radius: 16px;
  border: 1px solid var(--ubits-border-1);
}

.showcase-title {
  margin-bottom: 24px;
  color: var(--ubits-accent-brand);
}

.showcase-subtitle {
  max-width: 600px;
  margin: 0 auto;
  color: var(--ubits-fg-1-medium);
  line-height: 1.6;
}

.component-section {
  background: var(--ubits-bg-1);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 40px;
  border: 1px solid var(--ubits-border-1);
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.section-title {
  margin-bottom: 24px;
  color: var(--ubits-fg-1-high);
}

.preview-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.preview-description {
  margin-bottom: 16px;
}

.sidebar-preview-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background: var(--ubits-bg-2);
  border-radius: 12px;
  border: 1px solid var(--ubits-border-1);
  padding: 40px;
}

.sidebar-preview-container {
  position: relative;
  width: 96px;
  height: 400px;
  background: var(--ubits-bg-1);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
}

.preview-controls {
  background: var(--ubits-bg-2);
  border-radius: 8px;
  padding: 20px;
  border: 1px solid var(--ubits-border-1);
}

.control-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
}

.control-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--ubits-bg-1);
  border: 1px solid var(--ubits-border-1);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  color: var(--ubits-fg-1-medium);
}

.control-btn:hover {
  background: var(--ubits-bg-2);
  border-color: var(--ubits-accent-brand);
  color: var(--ubits-accent-brand);
}

.control-btn.active {
  background: var(--ubits-accent-brand);
  border-color: var(--ubits-accent-brand);
  color: white;
}

.features-section {
  background: var(--ubits-bg-1);
  border-radius: 16px;
  padding: 32px;
  border: 1px solid var(--ubits-border-1);
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.feature-card {
  background: var(--ubits-bg-2);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid var(--ubits-border-1);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  border-color: var(--ubits-accent-brand);
}

.feature-icon {
  width: 60px;
  height: 60px;
  background: var(--ubits-accent-brand);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  color: white;
  font-size: 24px;
}

.feature-card h3 {
  margin-bottom: 12px;
  color: var(--ubits-fg-1-high);
}

.feature-card p {
  color: var(--ubits-fg-1-medium);
  line-height: 1.6;
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .components-showcase {
    padding: 20px;
  }
  
  .hero-section {
    padding: 40px 20px;
  }
  
  .component-section,
  .features-section {
    padding: 24px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .control-buttons {
    flex-direction: column;
  }
  
  .control-btn {
    justify-content: center;
  }
}

/* Dark mode */
[data-theme="dark"] .components-showcase {
  background: var(--ubits-bg-1);
}

[data-theme="dark"] .hero-section {
  background: linear-gradient(135deg, var(--ubits-bg-1) 0%, var(--ubits-bg-2) 100%);
}

[data-theme="dark"] .component-section,
[data-theme="dark"] .features-section {
  background: var(--ubits-bg-1);
  border-color: var(--ubits-border-1);
}

[data-theme="dark"] .feature-card {
  background: var(--ubits-bg-2);
  border-color: var(--ubits-border-1);
}
</style>
