document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${index * 100}ms`;
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });
    const heroSection = document.getElementById('hero');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    const heroObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroContent.classList.add('visible');
                heroImage.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
    const createCharts = () => {
        const pieCtx = document.getElementById('featuresPieChart');
        const barCtx = document.getElementById('toolUsageBarChart');
        if (!pieCtx || !barCtx) {
            return;
        }
        Chart.defaults.font.family = 'Poppins, sans-serif';
        Chart.defaults.font.size = 13;
        Chart.defaults.color = '#666';
        Chart.defaults.plugins.tooltip.enabled = true;
        Chart.defaults.plugins.tooltip.mode = 'index';
        Chart.defaults.plugins.tooltip.intersect = false;
        Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        Chart.defaults.plugins.tooltip.titleFont.size = 14;
        Chart.defaults.plugins.tooltip.bodyFont.size = 12;
        Chart.defaults.plugins.tooltip.padding = 10;
        Chart.defaults.plugins.tooltip.cornerRadius = 4;
        const pieChart = new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: ['Gestão de Tarefas', 'Lembretes de prazo', 'Hub de Recursos', 'Colaboração'],
                datasets: [{
                    label: 'Recursos mais desejados',
                    data: [40, 30, 20, 10],
                    backgroundColor: [
                        'rgba(9, 167, 3, 0.85)',
                        'rgba(226, 122, 37, 0.85)',
                        'rgba(53, 122, 189, 0.85)',
                        'rgba(130, 174, 192, 0.85)'
                    ],
                    borderColor: [
                        '#FFFFFF',
                        '#FFFFFF',
                        '#FFFFFF',
                        '#FFFFFF'
                    ],
                    borderWidth: 3,
                    hoverOffset: 15
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 1200
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return ` ${context.label}: ${context.formattedValue}%`;
                            }
                        }
                    }
                }
            }
        });
        const barChart = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Note Apps', 'Aplicações de Calendário', 'Listas de Tarefas', 'Planilhas eletrônicas'],
                datasets: [{
                    label: 'Usage Percentage',
                    data: [85, 70, 60, 30],
                    backgroundColor: [
                        'rgba(9, 167, 3, 0.85)', 
                        'rgba(53, 122, 189, 0.85)', 
                        'rgba(226, 122, 37, 0.85)', 
                        'rgba(130, 174, 192, 0.7)'
                    ],
                    borderColor: [
                         'rgba(4, 130, 67, 1)',
                        'rgba(53, 122, 189, 1)',
                        'rgba(246, 163, 89, 1)',
                        'rgba(130, 174, 192, 1)'
                    ],
                    borderWidth: 2,
                    borderRadius: 5,
                    hoverBackgroundColor: [
                        'rgba(4, 130, 67, 0.9)',
                        'rgba(53, 122, 189, 0.9)',
                        'rgba(246, 163, 89, 0.9)',
                        'rgba(130, 174, 192, 0.9)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                animation: {
                    duration: 1000,
                    easing: 'easeOutCubic'
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: {
                            drawOnChartArea: false,
                            drawBorder: false,
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            },
                            maxTicksLimit: 6
                        }
                    },
                    y: {
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return ` ${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        });
    };
    const chartObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                createCharts();
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.25 });
    const chartSection = document.getElementById('research-results');
    if (chartSection) {
        chartObserver.observe(chartSection);
    }
    const charts = document.querySelectorAll(".percentage-chart");
    const legacyObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chart = entry.target;
                const percentage = parseInt(chart.style.getPropertyValue("--percentage"));
                const color = chart.style.getPropertyValue("--color");
                const number = chart.querySelector(".percentage-value");
                let current = 0;
                const counter = setInterval(() => {
                    if (current >= percentage) {
                        clearInterval(counter);
                    } else {
                        current++;
                        number.innerText = current + "%";
                    }
                }, 15);
                let progress = 0;
                const fill = setInterval(() => {
                    if (progress >= percentage) {
                        clearInterval(fill);
                    } else {
                        progress++;
                        chart.style.background = `conic-gradient(${color} ${progress * 3.6}deg, #e6e6e6 0deg)`;
                    }
                }, 10);
                legacyObserver.unobserve(chart);
            }
        });
    }, { threshold: 0.4 });
    charts.forEach(chart => legacyObserver.observe(chart));
    const nav = document.querySelector('nav');
    const ul = nav.querySelector('ul');
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'mobile-toggle';
    toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    toggleBtn.setAttribute('aria-label', 'Menu');
    nav.insertBefore(toggleBtn, ul);
    toggleBtn.addEventListener('click', () => {
        nav.classList.toggle('mobile-menu-open');
        const icon = toggleBtn.querySelector('i');
        if (nav.classList.contains('mobile-menu-open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
             nav.classList.remove('mobile-menu-open');
             const icon = toggleBtn.querySelector('i');
             icon.classList.remove('fa-times');
             icon.classList.add('fa-bars');
        });
    });
});