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
      logoUrl: './images/Ubits-logo.svg',
      logoAlt: 'UBITS Logo',
      brandText: 'UBITS',
      showBrandText: true,
      userAvatar: './images/Profile-image.jpg',
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
          <div class="sidebar">
            <!-- Header -->
            <div class="sidebar-header">
              <div class="logo" @click="handleLogoClick">
                <img :src="logoUrl" :alt="logoAlt" />
              </div>
            </div>
            
            <!-- Navigation -->
            <div class="sidebar-body">
              <button 
                v-for="item in navigationItems"
                :key="item.id"
                :class="['sidebar-nav-button', { 'active': activeItem === item.id }]"
                :data-section="item.id"
                :data-tooltip="item.tooltip"
                @click="handleNavClick(item)"
              >
                <i :class="['far', 'fa-' + item.icon]"></i>
                <span class="sidebar-nav-label">{{ item.label }}</span>
              </button>
            </div>
            
            <!-- Footer -->
            <div class="sidebar-footer">
              <div class="sidebar-user-avatar" @click="handleUserClick">
                <img :src="userAvatar" :alt="userName" class="sidebar-avatar-image">
              </div>
              <button 
                class="sidebar-theme-toggle"
                :data-tooltip="currentTheme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'"
                @click="handleThemeToggle"
              >
                <i :class="['far', currentTheme === 'light' ? 'fa-moon' : 'fa-sun']"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <main class="main-content">
          <!-- Top Navigation -->
          <div id="top-nav-container" v-if="isDesktop">
            <div class="top-nav">
              <div class="top-nav-content">
                <!-- Logo/Brand -->
                <div class="top-nav-brand">
                  <img :src="logoUrl" :alt="logoAlt" class="top-nav-logo" />
                  <span v-if="showBrandText" class="top-nav-brand-text">{{ brandText }}</span>
                </div>
                
                <!-- Navigation Tabs -->
                <div class="top-nav-tabs">
                  <button 
                    v-for="tab in navigationTabs"
                    :key="tab.id"
                    :class="['top-nav-tab', { 'active': activeTab === tab.id }]"
                    :data-tab="tab.id"
                    @click="handleTabClick(tab)"
                  >
                    <i :class="['far', 'fa-' + tab.icon]"></i>
                    <span>{{ tab.label }}</span>
                  </button>
                </div>
                
                <!-- User Actions -->
                <div class="top-nav-actions">
                  <button 
                    class="top-nav-theme-toggle"
                    :data-tooltip="currentTheme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'"
                    @click="handleThemeToggle"
                  >
                    <i :class="['far', currentTheme === 'light' ? 'fa-moon' : 'fa-sun']"></i>
                  </button>
                  
                  <div class="top-nav-user-menu" @click="handleUserClick">
                    <img :src="userAvatar" :alt="userName" class="top-nav-user-avatar" />
                    <span v-if="showUserName" class="top-nav-user-name">{{ userName }}</span>
                  </div>
                </div>
              </div>
            </div>
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
        <div class="tab-bar">
          <div class="tab-bar-content">
            <button 
              v-for="item in navigationItems.slice(0, 4)"
              :key="item.id"
              :class="['tab-bar-item', { 'active': activeItem === item.id }]"
              :data-tab="item.id"
              @click="handleNavClick(item)"
            >
              <i :class="['far', 'fa-' + item.icon]"></i>
              <span class="tab-bar-text">{{ item.label }}</span>
            </button>
            
            <!-- Theme Toggle -->
            <button
              class="tab-bar-item"
              @click="handleThemeToggle"
            >
              <i :class="['far', currentTheme === 'light' ? 'fa-moon' : 'fa-sun']"></i>
              <span class="tab-bar-text">{{ currentTheme === 'light' ? 'Oscuro' : 'Claro' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `
});

// Componentes de páginas - TEMPLATE VACÍO
app.component('DashboardPage', {
  template: `
    <div class="dashboard-page">
      <div class="section-single">
        <div class="widget-contenido-principal">
          <p class="ubits-body-md-regular">Contenido principal</p>
          <br><br><br><br><br><br><br><br><br><br><br>
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
          <p class="ubits-body-md-regular">Contenido principal</p>
          <br><br><br><br><br><br><br><br><br><br><br>
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