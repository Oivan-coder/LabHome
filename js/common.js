// ===== ОБЩИЙ МОДУЛЬ ДЛЯ ВСЕХ СТРАНИЦ =====
// Содержит общие функции, используемые на всех страницах

// ===== КОНФИГУРАЦИЯ =====
const DEBUG = false; // Установить в true для отладки

// ===== УТИЛИТЫ БЕЗОПАСНОСТИ =====
/**
 * Безопасная функция экранирования HTML
 * @param {string} text - Текст для экранирования
 * @returns {string} Экранированный HTML
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Безопасная функция создания URL
 * @param {string} type - Тип контакта (phone, whatsapp, telegram, email)
 * @param {string} value - Значение контакта
 * @returns {string} Безопасный URL
 */
function createSafeUrl(type, value) {
    switch(type) {
        case 'phone':
            return `tel:${encodeURIComponent(value)}`;
        case 'whatsapp':
            return `https://wa.me/${value.replace(/[^0-9]/g, '')}`;
        case 'telegram':
            return `https://t.me/${encodeURIComponent(value.replace(/^@/, ''))}`;
        case 'email':
            return `mailto:${encodeURIComponent(value)}`;
        default:
            return '#';
    }
}

/**
 * Безопасная функция создания элемента с текстом
 * @param {string} tag - HTML тег
 * @param {string} className - CSS класс
 * @param {string} text - Текст содержимого
 * @returns {HTMLElement} Созданный элемент
 */
function createElementWithText(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
}

/**
 * Условный console.log (только в development)
 * @param {...any} args - Аргументы для логирования
 */
function debugLog(...args) {
    if (DEBUG) {
        console.log(...args);
    }
}

// ===== ОБЩИЕ ФУНКЦИИ НАВИГАЦИИ =====

/**
 * Инициализация бургер-меню
 */
function initBurgerMenu() {
    const burgerMenu = document.getElementById('burgerMenu');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;
    
    if (!burgerMenu || !navMenu) return;
    
    // Защита от повторной инициализации
    if (burgerMenu.hasAttribute('data-initialized')) {
        return;
    }
    burgerMenu.setAttribute('data-initialized', 'true');
    
    // Открытие/закрытие меню
    burgerMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        burgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    // Закрытие при клике вне меню
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !burgerMenu.contains(e.target)) {
            burgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    // Закрытие при клике на ссылку (кроме dropdown-toggle)
    const navLinks = navMenu.querySelectorAll('a:not(.dropdown-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
    
    // Обработка выпадающего списка конференций на мобильных
    const dropdownToggle = navMenu.querySelector('.dropdown-toggle');
    const dropdownMenu = navMenu.querySelector('.dropdown-menu');
    const menuDropdown = navMenu.querySelector('.menu-dropdown');
    
    if (dropdownToggle && dropdownMenu && menuDropdown) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Переключаем активное состояние
            menuDropdown.classList.toggle('active');
        });
        
        // Закрытие dropdown при клике на ссылку внутри
        const dropdownLinks = dropdownMenu.querySelectorAll('a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuDropdown.classList.remove('active');
                burgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }
}

/**
 * Инициализация плавной прокрутки
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#top') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.photo-header')?.offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
}

/**
 * Инициализация кнопки "Наверх"
 */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== СИСТЕМА УВЕДОМЛЕНИЙ =====

/**
 * Показывает уведомление пользователю
 * @param {string} message - Текст сообщения
 * @param {string} type - Тип уведомления (success, error, info)
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const content = document.createElement('div');
    content.className = 'notification-content';
    
    const messageSpan = document.createElement('span');
    messageSpan.className = 'notification-message';
    messageSpan.textContent = message;
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'notification-close';
    closeBtn.textContent = '×';
    closeBtn.setAttribute('aria-label', 'Закрыть уведомление');
    
    content.appendChild(messageSpan);
    content.appendChild(closeBtn);
    notification.appendChild(content);
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2e7d32' : type === 'error' ? '#c62828' : '#0d47a1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    closeBtn.addEventListener('click', () => closeNotification(notification));
    setTimeout(() => closeNotification(notification), 5000);
}

/**
 * Закрывает уведомление
 * @param {HTMLElement} notification - Элемент уведомления
 */
function closeNotification(notification) {
    if (!notification || !notification.parentNode) return;
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ===== ДОБАВЛЕНИЕ СТИЛЕЙ ДЛЯ УВЕДОМЛЕНИЙ =====
if (!document.getElementById('notification-styles')) {
    const styles = document.createElement('style');
    styles.id = 'notification-styles';
    styles.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            margin-left: 1rem;
        }
    `;
    document.head.appendChild(styles);
}

// Экспорт функций в глобальную область видимости
window.escapeHtml = escapeHtml;
window.createSafeUrl = createSafeUrl;
window.createElementWithText = createElementWithText;
window.debugLog = debugLog;
window.initBurgerMenu = initBurgerMenu;
window.initSmoothScroll = initSmoothScroll;
window.initBackToTop = initBackToTop;
window.showNotification = showNotification;
window.closeNotification = closeNotification;
