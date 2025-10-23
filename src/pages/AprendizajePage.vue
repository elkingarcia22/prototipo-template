<!--
  UBITS Aprendizaje Page - Módulo de Aprendizaje
  Replica la funcionalidad del playground UBITS
-->
<template>
  <div class="aprendizaje-page">
    <!-- Sección contenido principal -->
    <div class="section-single">
      <div class="widget-contenido-principal">
        <h1 class="ubits-heading-h1">Módulo de Aprendizaje</h1>
        <p class="ubits-body-md-regular">
          Gestiona el aprendizaje y desarrollo de tu equipo.
        </p>
        
        <!-- Widgets de aprendizaje -->
        <div class="section-dual">
          <div class="widget-cursos">
            <h3 class="ubits-heading-h2">Cursos Disponibles</h3>
            <div class="cursos-grid">
              <div class="curso-item">
                <div class="curso-icon">
                  <i class="far fa-laptop-code"></i>
                </div>
                <div class="curso-content">
                  <h4>Desarrollo Web</h4>
                  <p>Fundamentos de HTML, CSS y JavaScript</p>
                  <div class="curso-progress">
                    <div class="progress-bar">
                      <div class="progress-fill" style="width: 75%"></div>
                    </div>
                    <span>75% completado</span>
                  </div>
                </div>
              </div>
              
              <div class="curso-item">
                <div class="curso-icon">
                  <i class="far fa-chart-line"></i>
                </div>
                <div class="curso-content">
                  <h4>Análisis de Datos</h4>
                  <p>Herramientas y técnicas de análisis</p>
                  <div class="curso-progress">
                    <div class="progress-bar">
                      <div class="progress-fill" style="width: 45%"></div>
                    </div>
                    <span>45% completado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="widget-progreso">
            <h3 class="ubits-heading-h2">Progreso General</h3>
            <div class="progreso-stats">
              <div class="progreso-item">
                <div class="progreso-value">12</div>
                <div class="progreso-label">Cursos Completados</div>
              </div>
              <div class="progreso-item">
                <div class="progreso-value">8</div>
                <div class="progreso-label">En Progreso</div>
              </div>
              <div class="progreso-item">
                <div class="progreso-value">156</div>
                <div class="progreso-label">Horas de Estudio</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

// Lifecycle
onMounted(() => {
  console.log('Aprendizaje page mounted')
})
</script>

<style scoped>
/* Importar tokens UBITS */
@import '../styles/ubits-tokens.css';

/* Aprendizaje Page */
.aprendizaje-page {
  width: 100%;
  min-height: 100vh;
}

/* Widgets */
.widget-contenido-principal {
  background: var(--ubits-bg-1);
  border: 1px solid var(--ubits-border-1);
  border-radius: 8px;
  padding: 24px;
  width: 100%;
}

.widget-cursos,
.widget-progreso {
  background: var(--ubits-bg-2);
  border: 1px solid var(--ubits-border-1);
  border-radius: 8px;
  padding: 20px;
  width: 100%;
}

/* Cursos Grid */
.cursos-grid {
  margin-top: 16px;
}

.curso-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: var(--ubits-bg-1);
  border-radius: 6px;
  border: 1px solid var(--ubits-border-1);
  margin-bottom: 12px;
}

.curso-item:last-child {
  margin-bottom: 0;
}

.curso-icon {
  width: 48px;
  height: 48px;
  background: var(--ubits-accent-brand);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
}

.curso-content {
  flex: 1;
}

.curso-content h4 {
  font-size: 16px;
  font-weight: 600;
  color: var(--ubits-fg-1-high);
  margin-bottom: 4px;
}

.curso-content p {
  font-size: 14px;
  color: var(--ubits-fg-1-medium);
  margin-bottom: 12px;
}

.curso-progress {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: var(--ubits-bg-3);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--ubits-accent-brand);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.curso-progress span {
  font-size: 12px;
  color: var(--ubits-fg-1-medium);
  font-weight: 500;
  white-space: nowrap;
}

/* Progreso Stats */
.progreso-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.progreso-item {
  text-align: center;
  padding: 16px;
  background: var(--ubits-bg-1);
  border-radius: 6px;
  border: 1px solid var(--ubits-border-1);
}

.progreso-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--ubits-accent-brand);
  margin-bottom: 8px;
}

.progreso-label {
  font-size: 12px;
  color: var(--ubits-fg-1-medium);
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .section-dual {
    flex-direction: column;
  }
  
  .curso-item {
    flex-direction: column;
    text-align: center;
  }
  
  .curso-icon {
    align-self: center;
  }
  
  .progreso-stats {
    grid-template-columns: 1fr;
  }
}
</style>
