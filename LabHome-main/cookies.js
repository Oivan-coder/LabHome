// cookies.js - РАБОЧАЯ версия с красивыми стилями
class CookieConsentManager {
    constructor() {
        this.consentCookieName = 'cookie_consent_accepted';
        this.initialize();
    }

    initialize() {
        if (this.getStoredCookie(this.consentCookieName) === 'true') {
            this.loadYandexMetrika();
        } else {
            setTimeout(() => {
                this.showBanner();
            }, 2000);
        }
    }

    showBanner() {
        const bannerHTML = `
            <div id="cookieConsentBanner" class="cookie-consent-banner">
                <div class="cookie-banner-content">
                    <div class="cookie-banner-text">
                        <h4>🍪 Использование cookies</h4>
                        <p>Мы используем файлы cookie для улучшения работы сайта. Продолжая использование, вы соглашаетесь с нашей <a href="privacy.html" target="_blank">Политикой конфиденциальности</a>.</p>
                    </div>
                    <div class="cookie-banner-buttons">
                        <button class="cookie-banner-btn cookie-accept-btn">Принять</button>
                        <button class="cookie-banner-btn cookie-info-btn">Подробнее</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', bannerHTML);
        this.setupEventHandlers();
    }

    setupEventHandlers() {
        const acceptBtn = document.querySelector('.cookie-accept-btn');
        const infoBtn = document.querySelector('.cookie-info-btn');
        const banner = document.getElementById('cookieConsentBanner');

        acceptBtn.addEventListener('click', () => {
            this.acceptCookies();
            this.hideBanner(banner);
        });

        infoBtn.addEventListener('click', () => {
            window.open('privacy.html', '_blank');
        });
    }

    hideBanner(banner) {
        if (!banner) return;
        
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(100px)';
        
        setTimeout(() => {
            if (banner.parentNode) {
                banner.remove();
            }
        }, 500);
    }

    acceptCookies() {
        // Сохраняем согласие на 1 год
        this.setCookieValue(this.consentCookieName, 'true', 365);
        
        // Запускаем Яндекс.Метрику
        this.loadYandexMetrika();
        
        // Показываем уведомление
        this.showToast('Спасибо! Cookies приняты.');
    }

    loadYandexMetrika() {
        // Проверяем, не загружена ли уже Метрика
        if (window.ym) {
            return;
        }
        
        // Безопасная загрузка Яндекс.Метрики через внешний скрипт
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://mc.yandex.ru/metrika/tag.js';
        
        script.onload = function() {
            // Инициализация после загрузки скрипта
            if (window.ym) {
                window.ym(105271987, 'init', {
                    clickmap: true,
                    trackLinks: true,
                    accurateTrackBounce: true,
                    webvisor: true
                });
            }
        };
        
        // Fallback для старых браузеров
        script.onerror = function() {
            // Если не удалось загрузить, пробуем альтернативный способ
            const fallbackScript = document.createElement('script');
            fallbackScript.type = 'text/javascript';
            fallbackScript.textContent = '(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");if(window.ym){ym(105271987,"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});}';
            document.head.appendChild(fallbackScript);
        };
        
        document.head.appendChild(script);
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'cookie-toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 3000);
    }

    setCookieValue(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
    }

    getStoredCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
}

// Запускаем при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    new CookieConsentManager();
});
