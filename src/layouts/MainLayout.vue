<!--
  UBITS Main Layout - Layout Principal
  Replica la estructura del playground UBITS con tecnologías modernas
-->
<template>
  <div class="ubits-layout" :data-theme="currentTheme">
    <!-- Layout simplificado - solo clarity, feedback y onboarding -->
    <div class="main-container">
      <main class="main-content">
        <!-- Content Area -->
        <div class="content-area">
          <div class="content-sections">
            <slot></slot>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
// Componentes UBITS eliminados - solo mantener clarity, feedback y onboarding
import { useTheme } from '../utils/theme'
import { useResponsive } from '../utils/responsive'

// Layout simplificado - solo para clarity, feedback y onboarding
// Sistema de tema
const { currentTheme, isDark, toggleTheme } = useTheme()

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

/* Main Container */
.main-container {
  min-height: 100vh;
  transition: all 0.3s ease;
}

/* Main Content */
.main-content {
  display: flex;
  flex-direction: column;
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
