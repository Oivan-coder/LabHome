// ==================== ГЛАВНЫЙ ФАЙЛ СКРИПТА ====================
// Использует модульную архитектуру для лучшей организации кода

// ==================== ИНИЦИАЛИЗАЦИЯ ====================

document.addEventListener('DOMContentLoaded', function() {
    if (window.debugLog) {
        window.debugLog('🚀 Инициализация Форума лабораторных инноваций');
    }
    
    const isAboutPage = document.body.classList.contains('about-page');
    const isRegistrationPage = document.body.classList.contains('registration-page');
    const pageContext = document.body.dataset.page || '';
    const isConferencePage = pageContext.startsWith('conf-');
    
    // Общие функции (из common.js)
    if (window.initBurgerMenu) window.initBurgerMenu();
    if (window.initSmoothScroll) window.initSmoothScroll();
    if (window.initBackToTop) window.initBackToTop();
    if (window.initMediaFallbacks) window.initMediaFallbacks();
    
    if (isAboutPage) {
        // Страница "О нас"
        if (window.initAboutPageAnimations) window.initAboutPageAnimations();
        initAboutPageContacts();
    } else if (isRegistrationPage) {
        return;
    } else if (isConferencePage) {
        // Страницы конференций
        if (window.initSpeakersCarousel) window.initSpeakersCarousel();
        initScrollAnimations();
        if (window.initCalendarButtons) window.initCalendarButtons();
        if (window.initMapFunctions) window.initMapFunctions();
        initProgramAccordion();
        initFeedbackSystem();
    }
});

// ==================== ФУНКЦИИ СТРАНИЦЫ "О НАС" ====================

function initAboutPageContacts() {
    if (window.debugLog) {
        window.debugLog('📞 Контакты в модальных окнах');
    }
    // Функционал уже в modal.js
}

// ==================== АНИМАЦИИ ====================

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.feature-card, .program-block, .partner-card, .speaker-slide, .stat-item, .session-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ==================== ПРОГРАММА ====================

function initProgramAccordion() {
    const accordionBlocks = document.querySelectorAll('.accordion-block');
    accordionBlocks.forEach((block, index) => {
        const header = block.querySelector('.accordion-header');
        if (!header) return;
        
        header.addEventListener('click', () => {
            accordionBlocks.forEach(otherBlock => {
                if (otherBlock !== block && otherBlock.classList.contains('active')) {
                    otherBlock.classList.remove('active');
                }
            });
            block.classList.toggle('active');
        });
    });
    
    const blocksToAutoOpen = document.querySelectorAll('.accordion-block:not([data-auto-open="false"])');
    if (blocksToAutoOpen[0]) {
        blocksToAutoOpen[0].classList.add('active');
    }
}

// Функционал фильтрации программы
function initProgramFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const timeBlocks = document.querySelectorAll('.time-block');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            timeBlocks.forEach(block => {
                if (filter === 'all' || block.getAttribute('data-block') === filter) {
                    block.style.display = 'block';
                    setTimeout(() => {
                        block.style.opacity = '1';
                        block.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    block.style.opacity = '0';
                    block.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        block.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Анимация появления блоков программы
function initProgramAnimations() {
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
    
    const timeBlocks = document.querySelectorAll('.time-block');
    timeBlocks.forEach(block => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(30px)';
        block.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(block);
    });
}

// Переключение программы
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggleProgram');
    const programFull = document.getElementById('programFull');
    
    if (toggleBtn && programFull) {
        toggleBtn.addEventListener('click', function() {
            const isExpanded = programFull.style.display === 'block';
            
            if (isExpanded) {
                programFull.style.display = 'none';
                toggleBtn.classList.remove('expanded');
                const btnText = toggleBtn.querySelector('.btn-text');
                if (btnText) btnText.textContent = 'Показать программу';
            } else {
                programFull.style.display = 'block';
                toggleBtn.classList.add('expanded');
                const btnText = toggleBtn.querySelector('.btn-text');
                if (btnText) btnText.textContent = 'Скрыть программу';
                
                // Инициализируем фильтры при первом открытии
                if (!window.programFiltersInitialized) {
                    initProgramFilters();
                    initProgramAnimations();
                    window.programFiltersInitialized = true;
                }
            }
        });
    }
});

// ==================== СИСТЕМА ОТЗЫВОВ ====================

function initFeedbackSystem() {
    const popup = document.getElementById('feedbackPopup');
    if (!popup) {
        return;
    }

    const activationDate = popup.dataset.enableAfter || '2025-11-21';
    const conferenceDate = new Date(activationDate);
    const currentDate = new Date();
    
    if (currentDate < conferenceDate) {
        if (window.debugLog) {
            window.debugLog('📅 Конференция еще не прошла - отзывы отключены');
        }
        return;
    }
    
    if (window.debugLog) {
        window.debugLog('💬 Система отзывов активирована');
    }
    initFeedbackPopup();
}

function initFeedbackPopup() {
    const popup = document.getElementById('feedbackPopup');
    const closeBtn = document.getElementById('popupClose');
    const laterBtn = document.getElementById('popupLater');
    
    if (!popup || !closeBtn) return;
    
    let popupShown = false;

    const lastShownTime = sessionStorage.getItem('feedbackPopupLastShown');
    if (lastShownTime) {
        const timePassed = Date.now() - parseInt(lastShownTime);
        const oneHour = 60 * 60 * 1000;
        if (timePassed < oneHour) {
            return;
        }
    }

    function showPopup() {
        if (!popupShown) {
            popup.classList.add('active');
            popupShown = true;
            sessionStorage.setItem('feedbackPopupLastShown', Date.now().toString());
        }
    }

    function closePopup() {
        popup.classList.remove('active');
    }

    function remindLater() {
        closePopup();
        setTimeout(() => {
            sessionStorage.removeItem('feedbackPopupLastShown');
        }, 60 * 60 * 1000);
    }

    setTimeout(showPopup, 10000);

    document.addEventListener('mouseout', (e) => {
        if (e.clientY < 50 && !popupShown) {
            showPopup();
        }
    });

    closeBtn.addEventListener('click', closePopup);
    if (laterBtn) {
        laterBtn.addEventListener('click', remindLater);
    }

    popup.addEventListener('click', (e) => {
        if (e.target === popup || e.target.classList.contains('popup-overlay')) {
            closePopup();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closePopup();
        }
    });
}

// ==================== ОБРАБОТЧИКИ СОБЫТИЙ ====================

function handleResize() {
    if (window.updateSpeakerCarousel) {
        window.updateSpeakerCarousel();
    }
}

function cleanup() {
    if (window.stopPhotoAutoSlide) window.stopPhotoAutoSlide();
    if (window.stopSpeakerAutoSlide) window.stopSpeakerAutoSlide();
}

window.addEventListener('resize', handleResize);
window.addEventListener('beforeunload', cleanup);

// Экспорт функций для использования в других модулях
window.initProgramFilters = initProgramFilters;
window.initProgramAnimations = initProgramAnimations;
