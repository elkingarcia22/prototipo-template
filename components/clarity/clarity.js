/**
 * Microsoft Clarity Integration
 * Componente modular para integración de analytics
 */

class ClarityIntegration {
    constructor(config = {}) {
        this.projectId = config.projectId || null;
        this.enabled = config.enabled !== false;
        this.debug = config.debug || false;
        this.customEvents = config.customEvents || {};
        this.autoStart = config.autoStart !== false;
        
        this.init();
    }

    init() {
        console.log('📊 Inicializando Microsoft Clarity...');
        
        if (!this.projectId) {
            console.warn('⚠️ Project ID de Clarity no configurado');
            return;
        }

        if (!this.enabled) {
            console.log('📊 Clarity deshabilitado');
            return;
        }

        this.loadClarityScript();
        this.setupCustomEvents();
        
        if (this.autoStart) {
            this.start();
        }
    }

    loadClarityScript() {
        // Verificar si ya está cargado
        if (window.clarity) {
            console.log('📊 Clarity ya está cargado');
            return;
        }

        // Crear script de Clarity
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${this.projectId}");
        `;
        
        document.head.appendChild(script);
        
        console.log('📊 Script de Clarity cargado con ID:', this.projectId);
    }

    setupCustomEvents() {
        // Eventos personalizados del proyecto
        Object.keys(this.customEvents).forEach(eventName => {
            const eventConfig = this.customEvents[eventName];
            this.trackCustomEvent(eventName, eventConfig);
        });
    }

    start() {
        if (!window.clarity) {
            console.error('❌ Clarity no está disponible');
            return;
        }

        console.log('📊 Clarity iniciado');
        this.trackEvent('clarity_started', {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        });
    }

    // Métodos de tracking
    trackEvent(eventName, data = {}) {
        if (!window.clarity) {
            console.warn('⚠️ Clarity no está disponible para tracking');
            return;
        }

        try {
            window.clarity('event', eventName, data);
            
            if (this.debug) {
                console.log('📊 Clarity Event:', eventName, data);
            }
        } catch (error) {
            console.error('❌ Error tracking event:', error);
        }
    }

    trackCustomEvent(eventName, eventConfig) {
        const { selector, eventType = 'click', data = {} } = eventConfig;
        
        if (!selector) return;

        document.addEventListener(eventType, (e) => {
            if (e.target.matches(selector)) {
                this.trackEvent(eventName, {
                    ...data,
                    element: e.target.tagName,
                    text: e.target.textContent?.trim(),
                    timestamp: new Date().toISOString()
                });
            }
        });
    }

    // Métodos de utilidad
    trackPageView(pageName, data = {}) {
        this.trackEvent('page_view', {
            page: pageName,
            url: window.location.href,
            ...data
        });
    }

    trackUserAction(action, data = {}) {
        this.trackEvent('user_action', {
            action,
            timestamp: new Date().toISOString(),
            ...data
        });
    }

    trackError(error, data = {}) {
        this.trackEvent('error', {
            error: error.message || error,
            stack: error.stack,
            timestamp: new Date().toISOString(),
            ...data
        });
    }

    trackConversion(conversionType, data = {}) {
        this.trackEvent('conversion', {
            type: conversionType,
            timestamp: new Date().toISOString(),
            ...data
        });
    }

    // Métodos de configuración
    setProjectId(projectId) {
        this.projectId = projectId;
        console.log('📊 Project ID actualizado:', projectId);
    }

    enable() {
        this.enabled = true;
        console.log('📊 Clarity habilitado');
    }

    disable() {
        this.enabled = false;
        console.log('📊 Clarity deshabilitado');
    }

    setDebug(debug) {
        this.debug = debug;
        console.log('📊 Debug mode:', debug ? 'habilitado' : 'deshabilitado');
    }

    // Métodos de estado
    isEnabled() {
        return this.enabled && !!this.projectId;
    }

    isLoaded() {
        return !!window.clarity;
    }

    getProjectId() {
        return this.projectId;
    }

    // Métodos de limpieza
    destroy() {
        // Clarity no se puede "destruir" fácilmente, pero podemos deshabilitarlo
        this.disable();
        console.log('📊 Clarity integration destruida');
    }
}

// Función de utilidad para crear Clarity fácilmente
function createClarity(config) {
    return new ClarityIntegration(config);
}

// Función para crear Clarity con configuración de prototipo
function createPrototypeClarity(projectId) {
    return new ClarityIntegration({
        projectId,
        enabled: true,
        debug: false,
        customEvents: {
            'prototype_start': {
                selector: '[data-prototype-start]',
                eventType: 'click'
            },
            'prototype_feedback': {
                selector: '.feedback-trigger',
                eventType: 'click'
            },
            'prototype_onboarding': {
                selector: '[data-onboarding-start]',
                eventType: 'click'
            }
        }
    });
}

// Función para obtener configuración desde variables de entorno
function createClarityFromEnv() {
    const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || 
                     window.CLARITY_PROJECT_ID || 
                     null;
    
    if (!projectId) {
        console.warn('⚠️ NEXT_PUBLIC_CLARITY_PROJECT_ID no configurado');
        return null;
    }

    return new ClarityIntegration({
        projectId,
        enabled: true,
        debug: process.env.NODE_ENV === 'development'
    });
}

// Auto-inicialización si hay variables de entorno
function autoInitClarity() {
    const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || 
                     window.CLARITY_PROJECT_ID || 
                     null;
    
    if (projectId) {
        console.log('📊 Auto-inicializando Clarity con ID:', projectId);
        return createClarityFromEnv();
    }
    
    return null;
}

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        ClarityIntegration, 
        createClarity, 
        createPrototypeClarity, 
        createClarityFromEnv,
        autoInitClarity
    };
}

// Hacer disponible globalmente
window.ClarityIntegration = ClarityIntegration;
window.createClarity = createClarity;
window.createPrototypeClarity = createPrototypeClarity;
window.createClarityFromEnv = createClarityFromEnv;
window.autoInitClarity = autoInitClarity;

// Auto-inicializar si está configurado
if (typeof window !== 'undefined') {
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoInitClarity);
    } else {
        autoInitClarity();
    }
}
