// js/url-cleaner.js
// Убирает .html из URL на GitHub Pages

(function() {
    'use strict';
    
    // Функция для очистки URL от .html
    function cleanUrl() {
        const currentPath = window.location.pathname;
        
        // Если URL содержит .html, перенаправляем без него
        if (currentPath.includes('.html')) {
            const cleanPath = currentPath.replace(/\.html$/, '').replace(/\/$/, '') || '/';
            const newUrl = window.location.origin + cleanPath + window.location.search + window.location.hash;
            
            // Используем replace вместо push, чтобы не создавать запись в истории
            window.history.replaceState({}, '', newUrl);
        }
    }
    
    // Обработка всех ссылок на странице
    function updateLinks() {
        const links = document.querySelectorAll('a[href]');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            
            // Обрабатываем только относительные ссылки с .html
            if (href && !href.startsWith('http') && !href.startsWith('//') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                // Убираем .html из относительных ссылок
                if (href.endsWith('.html')) {
                    const cleanHref = href.replace(/\.html$/, '');
                    link.setAttribute('href', cleanHref);
                }
                // Обрабатываем index.html
                if (href === 'index.html' || href === '/index.html') {
                    link.setAttribute('href', '/');
                }
            }
        });
    }
    
    // Обработка навигации
    function handleNavigation(e) {
        const target = e.target.closest('a[href]');
        if (!target) return;
        
        const href = target.getAttribute('href');
        
        // Пропускаем внешние ссылки, якоря, mailto, tel
        if (!href || href.startsWith('http') || href.startsWith('//') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
            return;
        }
        
        // Если ссылка содержит .html, убираем его
        if (href.includes('.html')) {
            e.preventDefault();
            const cleanHref = href.replace(/\.html$/, '').replace(/^\/+/, '/');
            const newUrl = cleanHref === '/index.html' || cleanHref === 'index.html' ? '/' : cleanHref;
            window.location.href = newUrl;
        }
    }
    
    // Инициализация при загрузке страницы
    document.addEventListener('DOMContentLoaded', function() {
        // Очищаем текущий URL
        cleanUrl();
        
        // Обновляем все ссылки на странице
        updateLinks();
        
        // Обрабатываем клики по ссылкам
        document.addEventListener('click', handleNavigation, true);
    });
    
    // Обработка при изменении истории браузера (назад/вперед)
    window.addEventListener('popstate', function() {
        cleanUrl();
        updateLinks();
    });
})();
