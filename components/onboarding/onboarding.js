/**
 * Sistema de Onboarding Modular
 * Componente reutilizable para guiar usuarios a través de prototipos
 */

class OnboardingSystem {
    constructor(config = {}) {
        this.currentStep = 0;
        this.steps = config.steps || [];
        this.onComplete = config.onComplete || (() => {});
        this.onSkip = config.onSkip || (() => {});
        this.autoStart = config.autoStart !== false;
        this.storageKey = config.storageKey || 'onboarding_completed';
        
        this.init();
    }

    init() {
        console.log('🎭 Inicializando sistema de onboarding...');
        
        // Verificar si ya se completó
        if (this.isCompleted()) {
            console.log('✅ Onboarding ya completado');
            return;
        }

        // Crear elementos del DOM si no existen
        this.createElements();
        
        // Configurar event listeners
        this.setupEventListeners();
        
        // Iniciar automáticamente si está configurado
        if (this.autoStart) {
            setTimeout(() => this.start(), 1000);
        }
    }

    createElements() {
        // Crear overlay si no existe
        if (!document.getElementById('onboardingOverlay')) {
            const overlay = document.createElement('div');
            overlay.id = 'onboardingOverlay';
            overlay.className = 'onboarding-overlay';
            document.body.appendChild(overlay);
        }

        // Crear spotlight si no existe
        if (!document.getElementById('onboardingSpotlight')) {
            const spotlight = document.createElement('div');
            spotlight.id = 'onboardingSpotlight';
            spotlight.className = 'onboarding-spotlight';
            document.body.appendChild(spotlight);
        }

        // Crear tooltip si no existe
        if (!document.getElementById('onboardingTooltip')) {
            const tooltip = document.createElement('div');
            tooltip.id = 'onboardingTooltip';
            tooltip.className = 'onboarding-tooltip';
            tooltip.innerHTML = `
                <h3 id="tooltipStep">Paso 1</h3>
                <h4 id="tooltipTitle">Título del paso</h4>
                <p id="tooltipContent">Contenido del paso</p>
                <div class="tooltip-actions">
                    <button class="btn-next">Siguiente</button>
                </div>
            `;
            document.body.appendChild(tooltip);
        }
    }

    setupEventListeners() {
        // Botón siguiente
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-next')) {
                this.nextStep();
            }
        });

        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.skip();
            }
        });

        // Cerrar al hacer clic fuera del tooltip
        document.addEventListener('click', (e) => {
            if (e.target.id === 'onboardingOverlay') {
                this.skip();
            }
        });
    }

    start() {
        console.log('🚀 Iniciando onboarding...');
        this.currentStep = 0;
        this.showStep();
    }

    showStep() {
        const step = this.steps[this.currentStep];
        if (!step) {
            console.error('❌ No hay paso disponible para:', this.currentStep);
            return;
        }

        console.log('📍 Mostrando paso:', this.currentStep + 1, step.title);

        // Mostrar overlay
        const overlay = document.getElementById('onboardingOverlay');
        if (overlay) {
            overlay.style.display = 'block';
            overlay.classList.add('show');
        }

        // Actualizar contenido del tooltip
        this.updateTooltip(step);

        // Destacar elemento si hay target
        if (step.target) {
            this.highlightElement(step.target);
        } else {
            this.centerTooltip();
        }
    }

    updateTooltip(step) {
        const stepElement = document.getElementById('tooltipStep');
        const titleElement = document.getElementById('tooltipTitle');
        const contentElement = document.getElementById('tooltipContent');
        const nextButton = document.querySelector('.btn-next');

        if (stepElement) {
            stepElement.textContent = `Paso ${this.currentStep + 1}`;
        }

        if (titleElement) {
            titleElement.textContent = step.title;
        }

        if (contentElement) {
            contentElement.textContent = step.content;
        }

        if (nextButton) {
            if (this.currentStep === this.steps.length - 1) {
                nextButton.textContent = 'Finalizar';
            } else {
                nextButton.textContent = 'Siguiente';
            }
        }
    }

    highlightElement(selector) {
        console.log('🔍 Buscando elemento:', selector);
        const element = document.querySelector(selector);
        
        if (!element) {
            console.error('❌ Elemento no encontrado:', selector);
            return;
        }

        const rect = element.getBoundingClientRect();
        const spotlight = document.getElementById('onboardingSpotlight');

        if (spotlight) {
            // Posicionar spotlight
            spotlight.style.left = (rect.left - 3) + 'px';
            spotlight.style.top = (rect.top - 3) + 'px';
            spotlight.style.width = (rect.width + 6) + 'px';
            spotlight.style.height = (rect.height + 6) + 'px';
            spotlight.style.display = 'block';

            // Posicionar tooltip
            this.positionTooltip(rect);
        }
    }

    positionTooltip(rect) {
        const tooltip = document.getElementById('onboardingTooltip');
        if (!tooltip) return;

        const tooltipRect = tooltip.getBoundingClientRect();
        
        // Posición por defecto: abajo del elemento
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        let top = rect.bottom + 20;

        // Ajustar si se sale de la pantalla
        if (left < 20) left = 20;
        if (left + tooltipRect.width > window.innerWidth - 20) {
            left = window.innerWidth - tooltipRect.width - 20;
        }
        if (top + tooltipRect.height > window.innerHeight - 20) {
            top = rect.top - tooltipRect.height - 20;
        }

        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
    }

    centerTooltip() {
        const tooltip = document.getElementById('onboardingTooltip');
        if (!tooltip) return;

        const tooltipRect = tooltip.getBoundingClientRect();
        tooltip.style.left = (window.innerWidth / 2) - (tooltipRect.width / 2) + 'px';
        tooltip.style.top = (window.innerHeight / 2) - (tooltipRect.height / 2) + 'px';
    }

    nextStep() {
        console.log('➡️ Siguiente paso del onboarding');
        
        this.currentStep++;
        
        if (this.currentStep >= this.steps.length) {
            this.complete();
        } else {
            this.showStep();
        }
    }

    skip() {
        console.log('⏭️ Saltando onboarding');
        this.onSkip();
        this.hide();
    }

    complete() {
        console.log('✅ Onboarding completado');
        this.markAsCompleted();
        this.onComplete();
        this.hide();
    }

    hide() {
        const overlay = document.getElementById('onboardingOverlay');
        const spotlight = document.getElementById('onboardingSpotlight');
        const tooltip = document.getElementById('onboardingTooltip');

        if (overlay) {
            overlay.style.display = 'none';
            overlay.classList.remove('show');
        }

        if (spotlight) {
            spotlight.style.display = 'none';
        }

        if (tooltip) {
            tooltip.style.display = 'none';
        }
    }

    markAsCompleted() {
        localStorage.setItem(this.storageKey, 'true');
    }

    isCompleted() {
        return localStorage.getItem(this.storageKey) === 'true';
    }

    reset() {
        localStorage.removeItem(this.storageKey);
        this.currentStep = 0;
    }

    // Método para configurar pasos dinámicamente
    setSteps(steps) {
        this.steps = steps;
    }

    // Método para agregar un paso
    addStep(step) {
        this.steps.push(step);
    }

    // Método para obtener el paso actual
    getCurrentStep() {
        return this.steps[this.currentStep];
    }

    // Método para ir a un paso específico
    goToStep(stepIndex) {
        if (stepIndex >= 0 && stepIndex < this.steps.length) {
            this.currentStep = stepIndex;
            this.showStep();
        }
    }
}

// Función de utilidad para crear onboarding fácilmente
function createOnboarding(config) {
    return new OnboardingSystem(config);
}

// Función para crear onboarding con pasos predefinidos
function createPrototypeOnboarding() {
    return new OnboardingSystem({
        steps: [
            {
                title: "Bienvenido al Prototipo",
                content: "Te guiaremos a través de las principales funcionalidades de este prototipo.",
                target: null,
                action: "center"
            },
            {
                title: "Explora las Funcionalidades",
                content: "Haz clic en los diferentes elementos para explorar las funcionalidades disponibles.",
                target: null,
                action: "center"
            },
            {
                title: "Sistema de Feedback",
                content: "Usa el botón de feedback para compartir tus comentarios y sugerencias.",
                target: ".feedback-trigger",
                action: "highlight"
            }
        ],
        onComplete: () => {
            console.log('🎉 Onboarding completado');
        },
        onSkip: () => {
            console.log('⏭️ Onboarding saltado');
        }
    });
}

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { OnboardingSystem, createOnboarding, createPrototypeOnboarding };
}

// Hacer disponible globalmente
window.OnboardingSystem = OnboardingSystem;
window.createOnboarding = createOnboarding;
window.createPrototypeOnboarding = createPrototypeOnboarding;
