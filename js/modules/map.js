// ===== МОДУЛЬ РАБОТЫ С КАРТАМИ =====

// Конфигурация локации
const MAP_CONFIG = {
    location: {
        coordinates: [55.817062, 37.383687],
        address: 'б-р Строителей, 7, Красногорск, Московская область, 143407',
        name: 'БЦ "Новатор"'
    },
    event: {
        title: 'Форум лабораторных инноваций',
        description: 'Лабораторная служба будущего: практика и перспективы',
        date: '2025-11-21',
        time: '11:00',
        duration: 7
    }
};

let yandexMap = null;

/**
 * Инициализация функций карты
 */
function initMapFunctions() {
    const navBtn = document.getElementById('openNavigationMap');
    if (navBtn) {
        navBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openNavigation();
        });
    }
    
    // Загружаем карту только если есть контейнер
    const mapContainer = document.getElementById('yandexMapFull');
    if (mapContainer) {
        // Проверяем, загружен ли API Яндекс.Карт
        if (typeof ymaps !== 'undefined') {
            initYandexMap();
        } else {
            // Если API не загружен, показываем fallback
            showMapFallback();
        }
    }
}

/**
 * Инициализация Яндекс.Карты
 */
function initYandexMap() {
    const mapContainer = document.getElementById('yandexMapFull');
    if (!mapContainer) return;
    
    if (typeof ymaps === 'undefined') {
        showMapFallback();
        return;
    }
    
    ymaps.ready(() => {
        try {
            yandexMap = new ymaps.Map('yandexMapFull', {
                center: MAP_CONFIG.location.coordinates,
                zoom: 16,
                controls: ['zoomControl', 'fullscreenControl']
            });

            const placemark = new ymaps.Placemark(MAP_CONFIG.location.coordinates, {
                hintContent: MAP_CONFIG.location.name,
                balloonContent: `
                    <div class="map-balloon">
                        <h3>${MAP_CONFIG.location.name}</h3>
                        <p>${MAP_CONFIG.location.address}</p>
                        <p><strong>Форум лабораторных инноваций</strong></p>
                        <p>21 ноября, 11:00</p>
                    </div>
                `
            }, { preset: 'islands#blueIcon', iconColor: '#0d47a1' });

            yandexMap.geoObjects.add(placemark);
        } catch (error) {
            console.error('Ошибка инициализации карты:', error);
            showMapFallback();
        }
    });
}

/**
 * Показывает fallback для карты
 */
function showMapFallback() {
    const mapContainer = document.getElementById('yandexMapFull');
    if (!mapContainer) return;
    
    // Очищаем контейнер
    mapContainer.textContent = '';
    
    const fallback = document.createElement('div');
    fallback.className = 'map-fallback';
    
    const content = document.createElement('div');
    content.className = 'fallback-content';
    
    const icon = document.createElement('span');
    icon.className = 'fallback-icon';
    icon.textContent = '🗺️';
    
    const h3 = document.createElement('h3');
    h3.textContent = 'Интерактивная карта';
    
    const p = document.createElement('p');
    p.textContent = 'БЦ "Новатор", б-р Строителей, 7, Красногорск';
    
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'fallback-buttons';
    
    const yandexLink = document.createElement('a');
    yandexLink.href = 'https://yandex.ru/maps/org/bc_novator/1125366325/?ll=37.383687%2C55.817062&z=17';
    yandexLink.target = '_blank';
    yandexLink.rel = 'noopener noreferrer';
    yandexLink.className = 'fallback-btn';
    yandexLink.textContent = 'Открыть в Яндекс.Картах';
    
    const routeBtn = document.createElement('button');
    routeBtn.className = 'fallback-btn secondary';
    routeBtn.textContent = 'Проложить маршрут';
    routeBtn.addEventListener('click', openNavigation);
    
    buttonsDiv.appendChild(yandexLink);
    buttonsDiv.appendChild(routeBtn);
    
    content.appendChild(icon);
    content.appendChild(h3);
    content.appendChild(p);
    content.appendChild(buttonsDiv);
    fallback.appendChild(content);
    mapContainer.appendChild(fallback);
}

/**
 * Открывает навигацию в Яндекс.Картах
 */
function openNavigation() {
    const url = `https://yandex.ru/maps/?pt=${MAP_CONFIG.location.coordinates[1]},${MAP_CONFIG.location.coordinates[0]}&z=17&l=map`;
    window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Инициализация кнопок календаря
 */
function initCalendarButtons() {
    const heroCalendarBtn = document.getElementById('addToCalendarHero');
    if (heroCalendarBtn) {
        heroCalendarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            addToCalendar();
        });
    }
}

/**
 * Добавление события в календарь
 */
function addToCalendar() {
    try {
        const startDate = new Date(`${MAP_CONFIG.event.date}T${MAP_CONFIG.event.time}`);
        const endDate = new Date(startDate.getTime() + MAP_CONFIG.event.duration * 60 * 60 * 1000);
        
        const formatDate = (date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Форум лабораторных инноваций//Conference 2025//RU
BEGIN:VEVENT
UID:${Date.now()}@labforum2025.ru
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${MAP_CONFIG.event.title}
DESCRIPTION:${MAP_CONFIG.event.description}\\\\n\\\\n📅 Дата: 21 ноября 2025 г.\\\\n⏰ Время: 11:00\\\\n📍 Место: ${MAP_CONFIG.location.address}
LOCATION:${MAP_CONFIG.location.address}
ORGANIZER;CN="Форум лабораторных инноваций":mailto:info@rclsmo.ru
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Форум_лабораторных_инноваций_2025.ics';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        if (window.showNotification) {
            window.showNotification('📅 Файл календаря скачан! Импортируйте его в ваш календарь.', 'success');
        }
    } catch (error) {
        console.error('Ошибка создания календаря:', error);
        if (window.showNotification) {
            window.showNotification('❌ Произошла ошибка при создании файла календаря', 'error');
        }
    }
}

// Экспорт функций
window.initMapFunctions = initMapFunctions;
window.initYandexMap = initYandexMap;
window.openNavigation = openNavigation;
window.initCalendarButtons = initCalendarButtons;
window.addToCalendar = addToCalendar;
window.MAP_CONFIG = MAP_CONFIG;
