/**
 * FEDERAL HISTORY ARCHIVE - CORE ENGINE v3.0
 * Sincronizado para compatibilidade total com HTML5/CSS3 Premium
 */

"use strict";

const AppConfig = {
    scrollThreshold: 50,
    animationSpeed: 200,
    observerThreshold: 0.10,
    inflationMultipliers: {
        "1913": 31.54,
        "1944": 17.82,
        "1971": 7.63,
        "2000": 1.84,
        "2024": 1.00
    }
};

const App = {
    init() {
        console.info("U.S. Dollar Archive: Engine Iniciada.");
        
        this.setupPreloader();
        this.handleNavigation();
        this.themeSystem();
        this.counterEngine();
        this.scrollObserverEngine();
        this.smoothScrollEngine();
        this.accessibilityEnhancer();
        
        // Listener para barra de progresso
        window.addEventListener('scroll', () => this.updateProgressBar());
    },

    /**
     * Remove o preloader e libera o site
     */
    setupPreloader() {
        const loader = document.getElementById('preloader');
        const body = document.body;

        window.addEventListener('load', () => {
            setTimeout(() => {
                if (loader) {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        loader.style.display = 'none';
                        body.classList.remove('loading');
                    }, 500);
                }
            }, 1000);
        });
    },

    /**
     * Atualiza a barra de progresso no topo
     */
    updateProgressBar() {
        const progressBar = document.getElementById('progress-bar');
        if (!progressBar) return;
        
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    },

    /**
     * Controle do Header (muda ao rolar)
     */
    handleNavigation() {
        const header = document.getElementById('site-header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > AppConfig.scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    },

    /**
     * Alternador de Tema (Dark/Light)
     */
    themeSystem() {
        const toggleBtn = document.getElementById('btn-theme');
        const body = document.body;
        
        // Verifica preferência salva
        if (localStorage.getItem('usd_theme') === 'dark') {
            body.classList.add('dark-theme');
            if(toggleBtn) toggleBtn.innerText = "MODO CLARO";
        }

        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                body.classList.toggle('dark-theme');
                const isDark = body.classList.contains('dark-theme');
                localStorage.setItem('usd_theme', isDark ? 'dark' : 'light');
                toggleBtn.innerText = isDark ? "MODO CLARO" : "MODO ESCURO";
                
                this.showToast(isDark ? "Modo Escuro Ativado" : "Modo Claro Ativado");
            });
        }
    },

    /**
     * Animação de números (Ex: Estatísticas)
     */
    counterEngine() {
        const counters = document.querySelectorAll('.stat-value');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseFloat(entry.target.innerText);
                    if (isNaN(target)) return;
                    
                    this.animateValue(entry.target, 0, target, 2000);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => observer.observe(c));
    },

    animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = (progress * (end - start)).toFixed(progress === 1 ? 2 : 0);
            obj.innerHTML = current;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    },

    /**
     * Revelação de conteúdo On-Scroll
     */
    scrollObserverEngine() {
        const revealItems = document.querySelectorAll('.content-block, .curio-card, .stat-card, figure');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    // Aplicando estilo via JS para garantir a animação caso o CSS falhe
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        }, { threshold: AppConfig.observerThreshold });

        revealItems.forEach(item => {
            item.style.opacity = "0";
            item.style.transform = "translateY(30px)";
            item.style.transition = "all 0.8s ease-out";
            revealObserver.observe(item);
        });
    },

    /**
     * Scroll Suave para links internos
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
     * Notificações Toast
     */
    showToast(message) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.style.cssText = `
            position: fixed; bottom: 20px; right: 20px; 
            background: var(--gold); color: #000; 
            padding: 12px 25px; border-radius: 5px; 
            font-weight: bold; z-index: 9999;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease-out;
        `;
        toast.innerText = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    },

    accessibilityEnhancer() {
        // Garante que links vazios não quebrem a navegação
        document.querySelectorAll('a[href="#"]').forEach(a => {
            a.addEventListener('click', e => e.preventDefault());
        });
    }
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => App.init());