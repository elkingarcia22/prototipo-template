<!--
  UBITS Dashboard Page - Página Principal
  Replica la funcionalidad del playground UBITS
-->
<template>
  <div class="dashboard-page">
    <!-- Sección contenido principal -->
    <div class="section-single">
      <div class="widget-contenido-principal">
        <h1 class="ubits-heading-h1">Dashboard Principal</h1>
        <p class="ubits-body-md-regular">
          Bienvenido al sistema UBITS. Esta es la página principal del dashboard.
        </p>
        
        <!-- Widgets de ejemplo -->
        <div class="section-dual">
          <div class="widget-stats">
            <h3 class="ubits-heading-h2">Estadísticas</h3>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-value">1,234</div>
                <div class="stat-label">Usuarios Activos</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">567</div>
                <div class="stat-label">Cursos Completados</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">89%</div>
                <div class="stat-label">Satisfacción</div>
              </div>
            </div>
          </div>
          
          <div class="widget-recent">
            <h3 class="ubits-heading-h2">Actividad Reciente</h3>
            <div class="activity-list">
              <div class="activity-item">
                <i class="far fa-user"></i>
                <span>Nuevo usuario registrado</span>
                <span class="time">hace 2 horas</span>
              </div>
              <div class="activity-item">
                <i class="far fa-graduation-cap"></i>
                <span>Curso completado</span>
                <span class="time">hace 4 horas</span>
              </div>
              <div class="activity-item">
                <i class="far fa-chart-line"></i>
                <span>Reporte generado</span>
                <span class="time">hace 6 horas</span>
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
  console.log('Dashboard page mounted')
})
</script>

<style scoped>
/* Importar tokens UBITS */
@import '../styles/ubits-tokens.css';

/* Dashboard Page */
.dashboard-page {
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

.widget-stats,
.widget-recent {
  background: var(--ubits-bg-2);
  border: 1px solid var(--ubits-border-1);
  border-radius: 8px;
  padding: 20px;
  width: 100%;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.stat-item {
  text-align: center;
  padding: 16px;
  background: var(--ubits-bg-1);
  border-radius: 6px;
  border: 1px solid var(--ubits-border-1);
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--ubits-accent-brand);
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: var(--ubits-fg-1-medium);
  font-weight: 500;
}

/* Activity List */
.activity-list {
  margin-top: 16px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--ubits-border-1);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-item i {
  color: var(--ubits-accent-brand);
  font-size: 16px;
  width: 20px;
  text-align: center;
}

.activity-item span {
  flex: 1;
  color: var(--ubits-fg-1-high);
  font-size: 14px;
}

.activity-item .time {
  color: var(--ubits-fg-1-low);
  font-size: 12px;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .section-dual {
    flex-direction: column;
  }
}
</style>
