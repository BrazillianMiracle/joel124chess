/**
 * FEDERAL HISTORY ARCHIVE - CORE ENGINE v5.0
 * Sistema de Gestão de Interface e Cálculos Econômicos
 * Totalmente sincronizado com o Design System Premium
 */

"use strict";

const AppConfig = {
    scrollThreshold: 80,
    animationDuration: 2000,
    observerThreshold: 0.15,
    // Multiplicadores baseados no poder de compra acumulado (Dados Históricos)
    inflationMultipliers: {
        "1913": 31.54, // Ano de fundação do FED
        "1944": 17.82, // Bretton Woods
        "1971": 7.63,  // Fim do Padrão Ouro
        "2000": 1.84,  // Era Moderna
        "2024": 1.05   // Ajuste Projetado
    }
};

const App = {
    init() {
        console.info("Federal History Engine: Ativa.");
        
        // Inicialização de Módulos
        this.setupPreloader();
        this.handleNavigation();
        this.themeSystem();
        this.counterEngine();
        this.scrollObserverEngine();
        this.smoothScrollEngine();
        
        // Listener Global de Redimensionamento
        window.addEventListener('resize', () => this.handleResize());
    },

    /**
     * Gerencia o estado de carregamento e desbloqueio da interface
     */
    setupPreloader() {
        const loader = document.getElementById('preloader');
        const body = document.body;

        window.addEventListener('load', () => {
            setTimeout(() => {
                if (loader) {
                    loader.style.opacity = '0';
                    loader.style.pointerEvents = 'none';
                    setTimeout(() => {
                        loader.style.display = 'none';
                        body.classList.remove('loading');
                        this.launchHeroAnimations();
                    }, 800);
                }
            }, 1200);
        });
    },

    /**
     * Dispara animações iniciais no Hero Section
     */
    launchHeroAnimations() {
        const heroTitle = document.querySelector('.hero-text-content');
        if (heroTitle) {
            heroTitle.style.opacity = "1";
            heroTitle.style.transform = "translateY(0)";
        }