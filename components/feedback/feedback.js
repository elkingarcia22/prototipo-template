/**
 * Sistema de Feedback Híbrido
 * Componente modular para recolección de feedback con respaldo local
 */

class FeedbackSystem {
    constructor(config = {}) {
        this.webhookUrl = config.webhookUrl || null;
        this.hybridMode = config.hybridMode !== false;
        this.developmentMode = config.developmentMode || false;
        this.storageKey = config.storageKey || 'prototype_feedback';
        this.autoDetectSection = config.autoDetectSection !== false;
        this.onSubmit = config.onSubmit || (() => {});
        this.onError = config.onError || (() => {});
        this.onSuccess = config.onSuccess || (() => {});
        
        this.init();
    }

    init() {
        console.log('💬 Inicializando sistema de feedback...');
        
        // Crear elementos del DOM si no existen
        this.createElements();
        
        // Configurar event listeners
        this.setupEventListeners();
        
        // Auto-detectar sección si está habilitado
        if (this.autoDetectSection) {
            this.detectCurrentSection();
        }
    }

    createElements() {
        // Crear botón de feedback si no existe
        if (!document.getElementById('feedbackTrigger')) {
            const trigger = document.createElement('div');
            trigger.id = 'feedbackTrigger';
            trigger.className = 'feedback-trigger';
            trigger.innerHTML = '💬';
            trigger.onclick = () => this.openModal();
            document.body.appendChild(trigger);
        }

        // Crear modal de feedback si no existe
        if (!document.getElementById('feedbackModal')) {
            const modal = document.createElement('div');
            modal.id = 'feedbackModal';
            modal.className = 'feedback-modal';
            modal.innerHTML = `
                <div class="feedback-modal-content">
                    <div class="feedback-modal-header">
                        <h3>Feedback</h3>
                        <button class="feedback-close" onclick="window.feedbackSystem.closeModal()">&times;</button>
                    </div>
                    <div class="feedback-modal-body">
                        <form id="feedbackForm">
                            <div class="feedback-form-group">
                                <label for="feedbackSection">Sección actual:</label>
                                <select id="feedbackSection" name="section" required>
                                    <option value="">Selecciona una sección</option>
                                    <option value="Home">Home</option>
                                    <option value="Onboarding">Onboarding</option>
                                    <option value="Analytics">Analytics</option>
                                    <option value="Feedback">Feedback</option>
                                    <option value="Otra">Otra</option>
                                </select>
                            </div>
                            <div class="feedback-form-group">
                                <label for="feedbackComment">Tu comentario:</label>
                                <textarea id="feedbackComment" name="comment" placeholder="¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?" required></textarea>
                            </div>
                            <div class="feedback-form-actions">
                                <button type="button" class="feedback-cancel" onclick="window.feedbackSystem.closeModal()">Cancelar</button>
                                <button type="submit" class="feedback-submit">Enviar Feedback</button>
                            </div>
                        </form>
                        <div class="feedback-loading">
                            <div class="feedback-spinner"></div>
                            <p>Enviando feedback...</p>
                        </div>
                        <div class="feedback-message"></div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }
    }

    setupEventListeners() {
        // Form submission
        const form = document.getElementById('feedbackForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        // Close modal on outside click
        document.addEventListener('click', (e) => {
            if (e.target.id === 'feedbackModal') {
                this.closeModal();
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    openModal() {
        console.log('💬 Abriendo modal de feedback...');
        const modal = document.getElementById('feedbackModal');
        if (modal) {
            modal.classList.add('show');
            this.detectCurrentSection();
        }
    }

    closeModal() {
        console.log('💬 Cerrando modal de feedback...');
        const modal = document.getElementById('feedbackModal');
        if (modal) {
            modal.classList.remove('show');
            this.resetForm();
            this.hideMessage();
        }
    }

    detectCurrentSection() {
        if (!this.autoDetectSection) return;

        const currentPath = window.location.pathname;
        const sectionSelect = document.getElementById('feedbackSection');
        
        if (!sectionSelect) return;

        // Detectar sección basada en la URL
        if (currentPath.includes('onboarding')) {
            sectionSelect.value = 'Onboarding';
        } else if (currentPath.includes('analytics')) {
            sectionSelect.value = 'Analytics';
        } else if (currentPath.includes('feedback')) {
            sectionSelect.value = 'Feedback';
        } else if (currentPath.includes('home') || currentPath.includes('index')) {
            sectionSelect.value = 'Home';
        } else {
            sectionSelect.value = 'Otra';
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        console.log('📤 Enviando feedback...');
        
        const formData = new FormData(e.target);
        const feedbackData = {
            user: 'Anónimo',
            section: formData.get('section'),
            comment: formData.get('comment'),
            timestamp: new Date().toISOString(),
            url: window.location.href
        };
        
        console.log('📋 Datos del feedback:', feedbackData);
        
        // Mostrar estado de carga
        this.showLoading(true);
        this.hideMessage();
        
        try {
            let result;
            
            if (this.hybridMode && this.webhookUrl) {
                console.log('🔄 SISTEMA HÍBRIDO: Enviando feedback...');
                result = await this.sendFeedbackHybrid(feedbackData);
            } else {
                console.log('💾 SISTEMA LOCAL: Guardando feedback...');
                result = await this.saveFeedbackLocally(feedbackData);
            }
            
            if (result.success) {
                this.showMessage(result.message, 'success');
                this.onSuccess(feedbackData);
                
                setTimeout(() => {
                    this.closeModal();
                }, 2000);
            } else {
                this.showMessage(result.message, 'error');
                this.onError(result.error);
            }
        } catch (error) {
            console.error('❌ Error enviando feedback:', error);
            this.showMessage('Error inesperado. Inténtalo de nuevo.', 'error');
            this.onError(error);
        } finally {
            this.showLoading(false);
        }
    }

    async sendFeedbackHybrid(feedbackData) {
        try {
            // Intentar enviar al webhook
            const response = await fetch(this.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedbackData)
            });

            if (response.ok) {
                console.log('✅ Feedback enviado al webhook');
                return {
                    success: true,
                    message: '¡Feedback enviado exitosamente!',
                    method: 'webhook'
                };
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.warn('⚠️ Error enviando al webhook, guardando localmente:', error);
            
            // Fallback a almacenamiento local
            const localResult = await this.saveFeedbackLocally(feedbackData);
            return {
                success: localResult.success,
                message: localResult.message + ' (Respaldo local)',
                method: 'local_fallback',
                error: error.message
            };
        }
    }

    async saveFeedbackLocally(feedbackData) {
        try {
            const existingFeedback = this.getAllFeedback();
            const newFeedback = {
                ...feedbackData,
                id: Date.now().toString(),
                savedAt: new Date().toISOString()
            };
            
            existingFeedback.push(newFeedback);
            localStorage.setItem(this.storageKey, JSON.stringify(existingFeedback));
            
            console.log('💾 Feedback guardado localmente');
            return {
                success: true,
                message: `¡Feedback guardado! (${existingFeedback.length} comentarios guardados)`,
                method: 'local'
            };
        } catch (error) {
            console.error('❌ Error guardando localmente:', error);
            return {
                success: false,
                message: 'Error guardando feedback',
                error: error.message
            };
        }
    }

    getAllFeedback() {
        try {
            const feedback = localStorage.getItem(this.storageKey);
            return feedback ? JSON.parse(feedback) : [];
        } catch (error) {
            console.error('❌ Error obteniendo feedback:', error);
            return [];
        }
    }

    exportFeedback() {
        const feedback = this.getAllFeedback();
        const dataStr = JSON.stringify(feedback, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `feedback_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        console.log('📤 Feedback exportado');
    }

    clearFeedback() {
        localStorage.removeItem(this.storageKey);
        console.log('🗑️ Feedback local limpiado');
    }

    showLoading(show) {
        const submitBtn = document.querySelector('.feedback-submit');
        const loadingDiv = document.querySelector('.feedback-loading');
        
        if (show) {
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
            }
            if (loadingDiv) {
                loadingDiv.classList.add('show');
            }
        } else {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar Feedback';
            }
            if (loadingDiv) {
                loadingDiv.classList.remove('show');
            }
        }
    }

    showMessage(message, type) {
        let messageDiv = document.querySelector('.feedback-message');
        if (!messageDiv) {
            messageDiv = document.createElement('div');
            messageDiv.className = 'feedback-message';
            document.querySelector('.feedback-modal-body').appendChild(messageDiv);
        }
        
        messageDiv.textContent = message;
        messageDiv.className = `feedback-message ${type}`;
        messageDiv.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.hideMessage();
        }, 5000);
    }

    hideMessage() {
        const messageDiv = document.querySelector('.feedback-message');
        if (messageDiv) {
            messageDiv.style.display = 'none';
        }
    }

    resetForm() {
        const form = document.getElementById('feedbackForm');
        if (form) {
            form.reset();
        }
    }

    // Métodos de configuración
    setWebhookUrl(url) {
        this.webhookUrl = url;
        console.log('🔗 Webhook URL actualizada:', url);
    }

    setHybridMode(enabled) {
        this.hybridMode = enabled;
        console.log('🔄 Modo híbrido:', enabled ? 'habilitado' : 'deshabilitado');
    }

    setDevelopmentMode(enabled) {
        this.developmentMode = enabled;
        console.log('🛠️ Modo desarrollo:', enabled ? 'habilitado' : 'deshabilitado');
    }

    // Métodos de estado
    getFeedbackCount() {
        return this.getAllFeedback().length;
    }

    isHybridMode() {
        return this.hybridMode && !!this.webhookUrl;
    }

    getWebhookUrl() {
        return this.webhookUrl;
    }

    // Métodos de utilidad
    getFeedbackBySection(section) {
        return this.getAllFeedback().filter(f => f.section === section);
    }

    getRecentFeedback(limit = 10) {
        return this.getAllFeedback()
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, limit);
    }
}

// Función de utilidad para crear feedback fácilmente
function createFeedback(config) {
    return new FeedbackSystem(config);
}

// Función para crear feedback con configuración de prototipo
function createPrototypeFeedback(webhookUrl) {
    return new FeedbackSystem({
        webhookUrl,
        hybridMode: true,
        developmentMode: false,
        autoDetectSection: true,
        onSubmit: (data) => {
            console.log('📤 Feedback enviado:', data);
        },
        onSuccess: (data) => {
            console.log('✅ Feedback exitoso:', data);
        },
        onError: (error) => {
            console.error('❌ Error en feedback:', error);
        }
    });
}

// Función para obtener configuración desde variables de entorno
function createFeedbackFromEnv() {
    const webhookUrl = process.env.NEXT_PUBLIC_FEEDBACK_WEBHOOK_URL || 
                      window.FEEDBACK_WEBHOOK_URL || 
                      null;
    
    if (!webhookUrl) {
        console.warn('⚠️ NEXT_PUBLIC_FEEDBACK_WEBHOOK_URL no configurado');
        return new FeedbackSystem({ hybridMode: false });
    }

    return new FeedbackSystem({
        webhookUrl,
        hybridMode: true,
        developmentMode: process.env.NODE_ENV === 'development'
    });
}

// Auto-inicialización si hay variables de entorno
function autoInitFeedback() {
    const webhookUrl = process.env.NEXT_PUBLIC_FEEDBACK_WEBHOOK_URL || 
                      window.FEEDBACK_WEBHOOK_URL || 
                      null;
    
    if (webhookUrl) {
        console.log('💬 Auto-inicializando Feedback con webhook:', webhookUrl);
        return createFeedbackFromEnv();
    }
    
    return new FeedbackSystem({ hybridMode: false });
}

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        FeedbackSystem, 
        createFeedback, 
        createPrototypeFeedback, 
        createFeedbackFromEnv,
        autoInitFeedback
    };
}

// Hacer disponible globalmente
window.FeedbackSystem = FeedbackSystem;
window.createFeedback = createFeedback;
window.createPrototypeFeedback = createPrototypeFeedback;
window.createFeedbackFromEnv = createFeedbackFromEnv;
window.autoInitFeedback = autoInitFeedback;

// Auto-inicializar si está configurado
if (typeof window !== 'undefined') {
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.feedbackSystem = autoInitFeedback();
        });
    } else {
        window.feedbackSystem = autoInitFeedback();
    }
}
