/**
 * SISTEMA DE GESTÃO DO PORTAL USD HISTORY
 * Versão: 1.0.0
 * Descrição: Controle de interface, cálculos de inflação e lógica de UI.
 */

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    setupThemeToggle();
    setupSmoothScroll();
    setupScrollAnimations();
    loadDynamicContent();
}

// 1. Alternância de Tema (Local Storage para persistência)
function setupThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    btn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        let theme = 'light';
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark';
        }
        localStorage.setItem('theme', theme);
    });
}

// 2. Cálculo de Inflação (Simulado com base em dados históricos do CPI)
function calcularInflacao() {
    const valor = parseFloat(document.getElementById('valor-base').value);
    const ano = document.getElementById('ano-base').value;
    const display = document.getElementById('resultado-calc');
    
    if (isNaN(valor) || valor <= 0) {
        display.innerHTML = "<p style='color:red;'>Insira um valor válido.</p>";
        return;
    }

    // Multiplicadores aproximados de poder de compra (referência 2024)
    const multiplicadores = {
        "1913": 31.5,
        "1944": 17.8,
        "1971": 7.6,
        "2000": 1.8
    };

    const resultado = valor * multiplicadores[ano];
    
    display.style.opacity = 0;
    setTimeout(() => {
        display.innerHTML = `
            <div class="res-box">
                <p>Em 2024, esse valor equivaleria a aproximadamente:</p>
                <h2 style="color: #c5a059;">US$ ${resultado.toLocaleString('en-US', {minimumFractionDigits: 2})}</h2>
                <small>*Baseado no Consumer Price Index (CPI) histórico.</small>
            </div>
        `;
        display.style.opacity = 1;
    }, 300);
}

// 3. Efeito de Animação de Scroll (Intersection Observer API)
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-item, .card').forEach(el => {
        el.style.opacity = "0";
        el.style.transition = "all 0.8s ease-out";
        el.style.transform = "translateY(30px)";
        observer.observe(el);
    });
}

// 4. Smooth Scroll para links internos
function setupSmoothScroll() {
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
}

// 5. Simulação de carregamento de dados via API (Placeholder)
async function loadDynamicContent() {
    console.log("Iniciando carregamento de dados financeiros...");
    try {
        // Simular um delay de rede
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Status do Mercado: Estável");
        console.log("Última atualização do FED: Janeiro 2026");
    } catch (error) {
        console.error("Erro ao carregar dados dinâmicos:", error);
    }
}

// Lógica adicional para o gráfico de barras
window.addEventListener('scroll', () => {
    const chart = document.querySelector('.bar-chart');
    if (chart) {
        const rect = chart.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            document.querySelectorAll('.bar').forEach(bar => {
                bar.style.width = bar.getAttribute('style').split('height: ')[1].replace(';', '');
            });
        }
    }
});