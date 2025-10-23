/**
 * UBITS App - Punto de Entrada Principal (JavaScript)
 * Aplicación principal que replica el playground UBITS
 */

// Importar Vue desde CDN
const { createApp } = Vue;

// Crear aplicación Vue
const app = createApp({
  data() {
    return {
      // Estado de la aplicación
      activeItem: 'dashboard',
      activeTab: 'dashboard',
      currentTheme: 'light',
      
      // Configuración
      logoUrl: '/images/Ubits-logo.svg',
      logoAlt: 'UBITS Logo',
      brandText: 'UBITS',
      showBrandText: true,
      userAvatar: '/images/Profile-image.jpg',
      userName: 'Usuario',
      showUserName: true,
      
      // Navegación
      navigationItems: [
        { id: 'dashboard', label: 'Dashboard', icon: 'home', tooltip: 'Dashboard' },
        { id: 'aprendizaje', label: 'Aprendizaje', icon: 'graduation-cap', tooltip: 'Aprendizaje' },
        { id: 'diagnostico', label: 'Diagnóstico', icon: 'chart-line', tooltip: 'Diagnóstico' },
        { id: 'desempeno', label: 'Desempeño', icon: 'chart-bar', tooltip: 'Desempeño' },
        { id: 'encuestas', label: 'Encuestas', icon: 'clipboard', tooltip: 'Encuestas', href: 'encuestas.html' },
        { id: 'reclutamiento', label: 'Reclutamiento', icon: 'users', tooltip: 'Reclutamiento' },
        { id: 'tareas', label: 'Tareas', icon: 'layer-group', tooltip: 'Tareas' },
        { id: 'ubits-ai', label: 'UBITS AI', icon: 'sparkles', tooltip: 'UBITS AI' }
      ],
      
      navigationTabs: [
        { id: 'dashboard', label: 'Dashboard', icon: 'home' },
        { id: 'aprendizaje', label: 'Aprendizaje', icon: 'graduation-cap' },
        { id: 'diagnostico', label: 'Diagnóstico', icon: 'chart-line' },
        { id: 'desempeno', label: 'Desempeño', icon: 'chart-bar' }
      ],
      
      // Responsive
      isMobile: false,
      isTablet: false,
      isDesktop: true
    }
  },
  
  computed: {
    showSidebarLabels() {
      return !this.isMobile && !this.isTablet;
    },
    
    currentPageComponent() {
      switch (this.activeItem) {
        case 'dashboard':
          return 'DashboardPage';
        case 'aprendizaje':
          return 'AprendizajePage';
        case 'diagnostico':
          return 'DashboardPage';
        case 'desempeno':
          return 'DashboardPage';
        default:
          return 'DashboardPage';
      }
    }
  },
  
  methods: {
    handleLogoClick() {
      console.log('Logo clicked');
      this.activeItem = 'dashboard';
      this.activeTab = 'dashboard';
    },
    
    handleNavClick(item) {
      console.log('Navigation clicked:', item);
      this.activeItem = item.id;
      
      if (this.navigationTabs.some(tab => tab.id === item.id)) {
        this.activeTab = item.id;
      }
    },
    
    handleTabClick(tab) {
      console.log('Tab clicked:', tab);
      this.activeTab = tab.id;
      this.activeItem = tab.id;
    },
    
    handleUserClick() {
      console.log('User clicked');
    },
    
    handleThemeToggle() {
      console.log('Theme toggle clicked');
      this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', this.currentTheme);
    },
    
    updateResponsive() {
      const width = window.innerWidth;
      this.isMobile = width <= 768;
      this.isTablet = width > 768 && width <= 1024;
      this.isDesktop = width > 1024;
    }
  },
  
  mounted() {
    console.log('UBITS App mounted');
    
    // Aplicar tema inicial
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    
    // Cargar configuración desde localStorage
    const savedActiveItem = localStorage.getItem('ubits-active-item');
    if (savedActiveItem) {
      this.activeItem = savedActiveItem;
    }
    
    const savedActiveTab = localStorage.getItem('ubits-active-tab');
    if (savedActiveTab) {
      this.activeTab = savedActiveTab;
    }
    
    // Configurar responsive
    this.updateResponsive();
    window.addEventListener('resize', this.updateResponsive);
    
    // Ocultar loading
    setTimeout(() => {
      document.body.classList.add('app-loaded');
      const spinner = document.getElementById('loading-spinner');
      if (spinner) {
        spinner.style.display = 'none';
      }
    }, 1000);
  },
  
  beforeUnmount() {
    window.removeEventListener('resize', this.updateResponsive);
  },
  
  watch: {
    activeItem(newValue) {
      localStorage.setItem('ubits-active-item', newValue);
    },
    
    activeTab(newValue) {
      localStorage.setItem('ubits-active-tab', newValue);
    }
  },
  
  template: `
    <div class="ubits-layout" :data-theme="currentTheme">
      <!-- Tooltip Global -->
      <div id="tooltip" class="ubits-tooltip"></div>
      
      <!-- Dashboard Container -->
      <div class="dashboard-container">
        <!-- Sidebar Container -->
        <div id="sidebar-container" v-if="isDesktop">
          <aside class="ubits-sidebar">
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
                :class="['ubits-sidebar__nav-button', { 'ubits-sidebar__nav-button--active': activeItem === item.id }]"
                :data-section="item.id"
                :data-tooltip="item.tooltip"
                @click="handleNavClick(item)"
              >
                <i :class="['far', 'fa-' + item.icon]"></i>
                <span v-if="showSidebarLabels" class="ubits-sidebar__nav-label">{{ item.label }}</span>
              </button>
            </div>
            
            <!-- Footer -->
            <div class="ubits-sidebar__footer">
              <div class="ubits-sidebar__user-avatar" @click="handleUserClick">
                <img :src="userAvatar" :alt="userName" class="ubits-sidebar__avatar-image">
              </div>
              <button 
                class="ubits-sidebar__theme-toggle"
                :data-tooltip="currentTheme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'"
                @click="handleThemeToggle"
              >
                <i :class="['far', currentTheme === 'light' ? 'fa-moon' : 'fa-sun']"></i>
              </button>
            </div>
          </aside>
        </div>

        <!-- Main Content -->
        <main class="main-content">
          <!-- Top Navigation -->
          <div id="top-nav-container" v-if="isDesktop">
            <nav class="ubits-top-nav">
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
                    :class="['ubits-top-nav__tab', { 'ubits-top-nav__tab--active': activeTab === tab.id }]"
                    :data-tab="tab.id"
                    @click="handleTabClick(tab)"
                  >
                    <i :class="['far', 'fa-' + tab.icon]"></i>
                    <span>{{ tab.label }}</span>
                  </button>
                </div>
                
                <!-- User Actions -->
                <div class="ubits-top-nav__actions">
                  <button 
                    class="ubits-top-nav__theme-toggle"
                    :data-tooltip="currentTheme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'"
                    @click="handleThemeToggle"
                  >
                    <i :class="['far', currentTheme === 'light' ? 'fa-moon' : 'fa-sun']"></i>
                  </button>
                  
                  <div class="ubits-top-nav__user-menu" @click="handleUserClick">
                    <img :src="userAvatar" :alt="userName" class="ubits-top-nav__user-avatar" />
                    <span v-if="showUserName" class="ubits-top-nav__user-name">{{ userName }}</span>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          <!-- Content Area -->
          <div class="content-area">
            <!-- Content wrapper con secciones de widgets -->
            <div class="content-sections">
              <!-- Contenido dinámico basado en la página activa -->
              <component :is="currentPageComponent" />
            </div>
          </div>
        </main>
      </div>

      <!-- Tab Bar Container (Mobile) -->
      <div id="tab-bar-container" v-if="isMobile || isTablet">
        <div class="ubits-tab-bar">
          <div class="ubits-tab-bar__content">
            <button 
              v-for="item in navigationItems.slice(0, 4)"
              :key="item.id"
              :class="['ubits-tab-bar__item', { 'ubits-tab-bar__item--active': activeItem === item.id }]"
              :data-tab="item.id"
              @click="handleNavClick(item)"
            >
              <i :class="['far', 'fa-' + item.icon]"></i>
              <span class="ubits-tab-bar__text">{{ item.label }}</span>
            </button>
            
            <!-- Theme Toggle -->
            <div
              class="ubits-tab-bar__item"
              :class="{ 'ubits-tab-bar__item--active': false }"
              @click="handleThemeToggle"
            >
              <i :class="['far', currentTheme === 'light' ? 'fa-moon' : 'fa-sun']"></i>
              <span class="ubits-tab-bar__text">{{ currentTheme === 'light' ? 'Oscuro' : 'Claro' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
});

// Componentes de páginas
app.component('DashboardPage', {
  template: `
    <div class="dashboard-page">
      <div class="section-single">
        <div class="widget-contenido-principal">
          <h1 class="ubits-heading-h1">Dashboard Principal</h1>
          <p class="ubits-body-md-regular">
            Bienvenido al sistema UBITS. Esta es la página principal del dashboard.
          </p>
          
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
  `
});

app.component('AprendizajePage', {
  template: `
    <div class="aprendizaje-page">
      <div class="section-single">
        <div class="widget-contenido-principal">
          <h1 class="ubits-heading-h1">Módulo de Aprendizaje</h1>
          <p class="ubits-body-md-regular">
            Gestiona el aprendizaje y desarrollo de tu equipo.
          </p>
          
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
  `
});

// Montar aplicación
app.mount('#app');

// Configurar tema inicial
document.documentElement.setAttribute('data-theme', 'light');

console.log('🚀 UBITS App iniciada correctamente');
console.log('🎯 Template robusto con tecnologías modernas');
console.log('🔧 Font Awesome API integrado');
console.log('📱 Sistema responsive activo');
console.log('🌙 Modo claro/oscuro disponible');