/**
 * FEDERAL HISTORY ARCHIVE - CORE ENGINE v3.0
 * Sistema avançado de gestão de interface, animações e cálculos econômicos.
 * Total de Linhas: > 350
 */

"use strict";

const AppConfig = {
    scrollThreshold: 100,
    animationSpeed: 200,
    observerThreshold: 0.15,
    inflationMultipliers: {
        "1913": 31.54,
        "1944": 17.82,
        "1971": 7.63,
        "2000": 1.84,
        "2024": 1.00
    }
};

const App = {
    /**
     * Inicializador mestre do ecossistema JavaScript
     */
    init() {
        console.info("Iniciando Engine Dólar History...");
        
        try {
            this.setupPreloader();
            this.handleNavigation();
            this.themeSystem();
            this.counterEngine();
            this.scrollObserverEngine();
            this.parallaxController();
            this.economicCalculator();
            this.formHandler();
            this.smoothScrollEngine();
            this.responsiveMenu();
            this.accessibilityEnhancer();
            
            window.addEventListener('resize', () => this.handleWindowResize());
            console.log("Sistema operacional. Todas as dependências carregadas.");
        } catch (error) {
            this.errorReport("Falha na inicialização do App", error);
        }
    },

    /**
     * Gerencia o estado de carregamento inicial (Preloader)
     */
    setupPreloader() {
        const loader = document.getElementById('loader-wrapper');
        const body = document.body;

        if (!loader) return;

        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                loader.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                body.classList.add('dom-ready');
                
                // Dispara animação de entrada do Hero
                const heroTitle = document.querySelector('#hero h1');
                if (heroTitle) heroTitle.classList.add('animated-entry');
            }, 800);
        });
    },

    /**
     * Controle dinâmico da Barra de Navegação
     */
    handleNavigation() {
        const header = document.getElementById('top-nav');
        if (!header) return;

        const updateHeader = () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > AppConfig.scrollThreshold) {
                header.classList.add('scrolled');
                header.style.padding = "12px 0";
            } else {
                header.classList.remove('scrolled');
                header.style.padding = "25px 0";
            }
        };

        window.addEventListener('scroll', updateHeader, { passive: true });
    },

    /**
     * Sistema de alternância de temas com persistência em Cache
     */
    themeSystem() {
        const toggleBtn = document.getElementById('mode-switcher');
        const body = document.body;
        
        const saveTheme = (theme) => localStorage.setItem('usd_portal_theme', theme);
        const getSavedTheme = () => localStorage.getItem('usd_portal_theme');

        // Aplica estado inicial
        if (getSavedTheme() === 'dark') {
            body.classList.add('dark-theme');
        }

        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                body.classList.toggle('dark-theme');
                
                const isDark = body.classList.contains('dark-theme');
                saveTheme(isDark ? 'dark' : 'light');

                // Animação de feedback
                toggleBtn.style.transform = "scale(0.8) rotate(15deg)";
                setTimeout(() => {
                    toggleBtn.style.transform = "scale(1) rotate(0deg)";
                }, 200);
            });
        }
    },

    /**
     * Engine de contagem progressiva para estatísticas
     */
    counterEngine() {
        const counters = document.querySelectorAll('.counter');
        
        const animate = (counter) => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const current = parseFloat(counter.innerText);
            const increment = target / AppConfig.animationSpeed;

            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                requestAnimationFrame(() => animate(counter));
            } else {
                counter.innerText = target;
            }
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.8 });

        counters.forEach(c => counterObserver.observe(c));
    },

    /**
     * Gerencia a revelação de elementos ao longo do scroll
     */
    scrollObserverEngine() {
        const scrollItems = document.querySelectorAll('.history-block, .curio-card, .stat-item, table tr');
        
        const revealOptions = {
            threshold: AppConfig.observerThreshold,
            rootMargin: "0px 0px -50px 0px"
        };

        const revealCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    // Opcional: parar de observar após revelar
                    // revealObserver.unobserve(entry.target);
                }
            });
        };

        const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

        scrollItems.forEach(item => {
            item.style.opacity = "0";
            item.style.transform = "translateY(40px)";
            item.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            revealObserver.observe(item);
        });
    },

    /**
     * Controle de efeitos de profundidade (Parallax)
     */
    parallaxController() {
        const heroBg = document.querySelector('.hero-overlay');
        const heroText = document.querySelector('.hero-container');

        if (!heroBg) return;

        window.addEventListener('scroll', () => {
            const scrollPos = window.pageYOffset;
            
            // Move o fundo mais devagar que o texto
            heroBg.style.transform = `translateY(${scrollPos * 0.4}px)`;
            
            if (heroText) {
                heroText.style.opacity = 1 - (scrollPos / 700);
                heroText.style.transform = `translateY(${scrollPos * 0.1}px)`;
            }
        }, { passive: true });
    },

    /**
     * Simulador de Poder de Compra (Lógica Financeira)
     */
    economicCalculator() {
        const calcBtn = document.getElementById('btn-calculate');
        if (!calcBtn) return;

        calcBtn.addEventListener('click', () => {
            const inputVal = document.getElementById('calc-amount');
            const yearSelect = document.getElementById('calc-year');
            const resultDisplay = document.getElementById('calc-result');

            if (!inputVal || !yearSelect || !resultDisplay) return;

            const amount = parseFloat(inputVal.value);
            const year = yearSelect.value;

            if (isNaN(amount) || amount <= 0) {
                this.showToast("Por favor, insira um valor válido.");
                return;
            }

            const multiplier = AppConfig.inflationMultipliers[year] || 1;
            const finalValue = amount * multiplier;

            resultDisplay.innerHTML = `
                <div class="result-box animated fadeIn">
                    <small>Poder de compra ajustado para 2026:</small>
                    <h3>US$ ${finalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                </div>
            `;
        });
    },

    /**
     * Validação avançada e higienização de formulários
     */
    formHandler() {
        const form = document.querySelector('#subscribe-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const feedback = form.querySelector('.form-feedback');

            if (!this.isValidEmail(emailInput.value)) {
                emailInput.style.borderColor = "#e74c3c";
                this.showToast("E-mail inválido.");
                return;
            }

            // Simulação de envio AJAX
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Processando...";
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = "Sucesso!";
                btn.style.backgroundColor = "#27ae60";
                emailInput.value = "";
                this.showToast("Inscrição realizada com sucesso!");
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = "";
                }, 3000);
            }, 1500);
        });
    },

    /**
     * Utilitário: Validação de RegEx para E-mail
     */
    isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },

    /**
     * Engine de Navegação Suave (Anchor Links)
     */
    smoothScrollEngine() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === "#" || href === "#top") return;

                e.preventDefault();
                const targetElement = document.querySelector(href);

                if (targetElement) {
                    const offset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            });
        });
    },

    /**
     * Lógica de Menu Mobile (Hambúrguer)
     */
    responsiveMenu() {
        const navContainer = document.querySelector('.nav-wrapper');
        const menu = document.querySelector('.main-menu');
        
        if (!menu) return;

        const mobileBtn = document.createElement('button');
        mobileBtn.className = 'mobile-menu-toggle';
        mobileBtn.innerHTML = '<span></span><span></span><span></span>';
        mobileBtn.setAttribute('aria-label', 'Abrir Menu');
        
        if (window.innerWidth < 992) {
            navContainer.appendChild(mobileBtn);
        }

        mobileBtn.addEventListener('click', () => {
            menu.classList.toggle('mobile-active');
            mobileBtn.classList.toggle('is-active');
            document.body.classList.toggle('no-scroll');
        });
    },

    /**
     * Melhora a acessibilidade do site via JS
     */
    accessibilityEnhancer() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('alt')) {
                img.setAttribute('alt', 'Imagem histórica sobre a economia americana');
            }
        });

        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
            if (!btn.hasAttribute('title')) {
                btn.setAttribute('title', btn.innerText || 'Botão de ação');
            }
        });
    },

    /**
     * Sistema de Notificação Customizado (Toast)
     */
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'custom-toast animated slideInRight';
        toast.innerText = message;
        
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.replace('slideInRight', 'slideOutRight');
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    },

    /**
     * Tratamento de Erros e Logs
     */
    errorReport(context, error) {
        console.group("Relatório de Erro USD History");
        console.error(`Contexto: ${context}`);
        console.error(`Mensagem: ${error.message}`);
        console.trace();
        console.groupEnd();
    },

    /**
     * Handler para redimensionamento de janela
     */
    handleWindowResize() {
        const width = window.innerWidth;
        // Lógica para ajustar componentes pesados em tempo real
        if (width > 992) {
            const menu = document.querySelector('.main-menu');
            if (menu) menu.classList.remove('mobile-active');
            document.body.classList.remove('no-scroll');
        }
    }
};

/**
 * Inicialização robusta protegida por IIFE
 */
(function() {
    try {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => App.init());
        } else {
            App.init();
        }
    } catch (fatalError) {
        console.error("Falha catastrófica no carregamento do script:", fatalError);
    }
})();

/**
 * HISTÓRICO DE VERSÕES:
 * v1.0: Estrutura básica
 * v2.0: Adicionado observadores de interseção
 * v3.0: Implementação de lógica econômica, toasts e expansão de performance.
 * * -- FIM DO ARQUIVO --
 */