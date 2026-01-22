// js/main.js (упрощенная версия для главной)
// Использует общий модуль common.js для общих функций

// ===== АНИМАЦИИ ДЛЯ ГЛАВНОЙ =====
function initHomeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Анимируем статистику
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Анимируем карточки проектов
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    if (window.debugLog) {
        window.debugLog('🎯 Инициализация главной страницы...');
    }
    
    // Проверяем тип страницы
    const isHomePage = document.body.classList.contains('home-page');
    const isAboutPage = document.body.classList.contains('about-page');
    const isRegistrationPage = document.body.classList.contains('registration-page');
    
    // Общие функции (из common.js)
    if (window.initBurgerMenu) window.initBurgerMenu();
    if (window.initBackToTop) window.initBackToTop();
    if (window.initSmoothScroll) window.initSmoothScroll();
    
    // Специфичные для страниц
    if (isHomePage) {
        if (window.debugLog) window.debugLog('🏠 Главная страница');
        initHomeAnimations();
    } else if (isAboutPage) {
        if (window.debugLog) window.debugLog('👥 Страница "О нас"');
        // Функции для about.html в modal.js
    } else if (isRegistrationPage) {
        if (window.debugLog) window.debugLog('📝 Страница регистрации');
        // Функции регистрации
    }
    
    if (window.debugLog) {
        window.debugLog('✅ Главная страница инициализирована');
    }
});

// ===== УТИЛИТЫ =====
// Обработчик resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Переинициализация при необходимости
    }, 250);
});

// Функция showNotification теперь в common.js
