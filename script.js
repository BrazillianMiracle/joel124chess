"use strict";

const App = {
    init() {
        this.setupPreloader();
        this.handleScroll();
        this.themeSystem();
        this.animateStats();
        this.revealOnScroll();
    },

    setupPreloader() {
        const loader = document.getElementById('preloader');
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (loader) {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        loader.style.display = 'none';
                        document.body.classList.remove('loading');
                    }, 500);
                }
            }, 1000);
        });
    },

    handleScroll() {
        const header = document.getElementById('site-header');
        const progress = document.getElementById('progress-bar');

        window.addEventListener('scroll', () => {
            // Header Color
            if (window.scrollY > 50) {
                header.style.background = "#000";
            } else {
                header.style.background = "rgba(0,0,0,0.9)";
            }

            // Progress Bar
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            if (progress) progress.style.width = scrolled + "%";
        });
    },

    themeSystem() {
        const btn = document.getElementById('btn-theme');
        if (!btn) return;

        btn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            btn.innerText = isDark ? "MODO CLARO" : "MODO ESCURO";
        });
    },

    animateStats() {
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
        let current = 0;
        const inc = target / 50;
        const timer = setInterval(() => {
            current += inc;
            if (current >= target) {
                el.innerText = target;
                clearInterval(timer);
            } else {
                el.innerText = Math.ceil(current);
            }
        }, 30);
    },

    revealOnScroll() {
        const items = document.querySelectorAll('.content-block, .stat-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        }, { threshold: 0.1 });

        items.forEach(item => {
            item.style.opacity = "0";
            item.style.transform = "translateY(30px)";
            item.style.transition = "all 0.8s ease-out";
            observer.observe(item);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());