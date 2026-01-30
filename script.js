/**
 * FEDERAL HISTORY ARCHIVE - CORE ENGINE v5.0
 * Sistema Avançado de Interface e Cálculos Econômicos
 * Sincronizado com CSS Premium e HTML de Alta Densidade
 */

"use strict";

const AppConfig = {
    scrollThreshold: 100,
    animationDuration: 2000,
    observerThreshold: 0.15,
    // Dados históricos para o simulador de poder de compra
    inflationMultipliers: {
        "1913": 31.54, // Fundação do FED
        "1944": 17.82, // Bretton Woods
        "1971": 7.63,  // Fim do padrão ouro
        "2000": 1.84   // Virada do milênio
    }
};

const App = {
    /**
     * Inicialização mestre
     */
    init() {
        console.info("Federal History Engine: Iniciando...");
        
        try {
            this.setupPreloader();
            this.handleNavigation();
            this.themeSystem();
            this.counterEngine();
            this.scrollObserverEngine();
            this.smoothScrollEngine();
            this.setupCalculadora();
            this.parallaxHero();
            
            console.log("Sistema operacional. Todas as dependências carregadas.");
        } catch (error) {
            console.error("Falha na inicialização do App:", error);
        }
    },

    /**
     * Gerencia o carregamento inicial (Preloader)
     */
    setupPreloader() {
        const loader = document.getElementById('preloader');
        const body = document.body;

        if (!loader) return;

        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    loader.style.display = 'none';
                    body.classList.remove('loading');
                    this.launchEntryAnimations();
                }, 800);
            }, 1000);
        });
    },

    /**
     * Animações de entrada após carregamento
     */
    launchEntryAnimations() {
        const heroText = document.querySelector('.hero-text-content');
        if (heroText) {
            heroText.style.opacity = "1";
            heroText.style.transform = "translateY(0)";
        }
    },

    /**
     * Controle da Barra de Navegação e Progresso
     */
    handleNavigation() {
        const header = document.getElementById('site-header');
        const progress = document.getElementById('progress-bar');

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Estilização do Header ao rolar
            if (currentScroll > AppConfig.scrollThreshold) {
                header.classList.add('scrolled');
                header.style.padding = "10px 0";
                header.style.background = "rgba(0,0,0,0.95)";
            } else {
                header.classList.remove('scrolled');
                header.style.padding = "20px 0";
                header.style.background = "rgba(0,0,0,0.8)";
            }

            // Lógica da Barra de Progresso
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            if (progress) progress.style.width = scrolled + "%";
            
        }, { passive: true });
    },

    /**
     * Sistema de Alternância de Temas (Persistence)
     */
    themeSystem() {
        const btn = document.getElementById('btn-theme');
        const body = document.body;

        // Recuperar preferência do usuário
        const savedTheme = localStorage.getItem('fed_theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-theme');
            if(btn) btn.innerText = "MODO CLARO";
        }

        if (!btn) return;

        btn.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const isDark = body.classList.contains('dark-theme');
            
            // Salvar no LocalStorage
            localStorage.setItem('fed_theme', isDark ? 'dark' : 'light');
            
            // Feedback visual no botão
            btn.innerText = isDark ? "MODO CLARO" : "MODO ESCURO";
            btn.style.transform = "scale(0.95)";
            setTimeout(() => btn.style.transform = "scale(1)", 100);
        });
    },

    /**
     * Engine de Contagem Numérica para Estatísticas
     */
    counterEngine() {
        const stats = document.querySelectorAll('.stat-value');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseFloat(entry.target.innerText);
                    this.countUp(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(s => observer.observe(s));
    },

    countUp(el, target) {
        let start = 0;
        const duration = AppConfig.animationDuration;
        const stepTime = Math.abs(Math.floor(duration / target));
        
        const timer = setInterval(() => {
            start += (target / 100); // Incremento suave
            if (start >= target) {
                el.innerText = target.toLocaleString('en-US');
                clearInterval(timer);
            } else {
                el.innerText = Math.floor(start).toLocaleString('en-US');
            }
        }, 20);
    },

    /**
     * Revelação Suave de Elementos (Scroll Reveal)
     */
    scrollObserverEngine() {
        const revealItems = document.querySelectorAll('.content-block, .stat-card, .timeline-item, .curio-card');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    // Descomente abaixo se quiser que a animação ocorra apenas uma vez
                    // revealObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: AppConfig.observerThreshold,
            rootMargin: "0px 0px -50px 0px"
        });

        revealItems.forEach(item => {
            item.style.opacity = "0";
            item.style.transform = "translateY(40px)";
            item.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
            revealObserver.observe(item);
        });
    },

    /**
     * Lógica da Calculadora de Inflação
     */
    setupCalculadora() {
        const btnCalc = document.querySelector('#calculadora button');
        if (!btnCalc) return;

        btnCalc.onclick = () => {
            const valorInput = document.getElementById('calc-amount').value;
            const anoSelect = document.getElementById('calc-year').value;
            const resultDiv = document.getElementById('calc-result');

            if (!valorInput || valorInput <= 0) {
                resultDiv.innerHTML = "<p style='color: #e74c3c;'>Insira um valor válido.</p>";
                return;
            }

            const multiplicador = AppConfig.inflationMultipliers[anoSelect];
            const valorFinal = (valorInput * multiplicador).toFixed(2);

            resultDiv.style.opacity = "0";
            setTimeout(() => {
                resultDiv.innerHTML = `
                    <div class="res-box" style="margin-top: 20px; padding: 20px; background: rgba(212,175,55,0.1); border-radius: 4px;">
                        <small>Poder de compra ajustado para 2026:</small>
                        <h3 style="color: #d4af37; font-size: 1.8rem;">US$ ${parseFloat(valorFinal).toLocaleString('en-US')}</h3>
                    </div>
                `;
                resultDiv.style.opacity = "1";
            }, 300);
        };
    },

    /**
     * Scroll Suave para Âncoras
     */
    smoothScrollEngine() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    /**
     * Efeito Parallax Sutil no Hero
     */
    parallaxHero() {
        const heroOverlay = document.querySelector('.hero-overlay');
        window.addEventListener('scroll', () => {
            const scroll = window.pageYOffset;
            if (heroOverlay) {
                heroOverlay.style.transform = `translateY(${scroll * 0.3}px)`;
            }
        });
    }
};

// Inicialização sob proteção de escopo
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

/**
 * FIM DO CORE ENGINE
 * Federal History Archive - 2026
 */