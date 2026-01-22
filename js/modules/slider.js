// ===== МОДУЛЬ СЛАЙДЕРА ФОТО =====

let currentPhotoSlide = 0;
let photoAutoSlideInterval;

function initPhotoSlider() {
    const photoSlider = document.getElementById('photoSlider');
    const photoDots = document.getElementById('photoDots');
    if (!photoSlider || !photoDots) return;

    const photos = [
        'images/hero/1.jpg','images/hero/2.jpg','images/hero/3.jpg','images/hero/4.jpg','images/hero/5.jpg',
        'images/hero/6.jpg','images/hero/7.jpg','images/hero/8.jpg','images/hero/9.jpg','images/hero/10.jpg',
        'images/hero/11.jpg','images/hero/12.jpg','images/hero/13.jpg','images/hero/14.jpg','images/hero/15.jpg'
    ];

    photos.forEach((photoPath, index) => {
        const slideElement = document.createElement('div');
        slideElement.className = `photo-slide ${index === 0 ? 'active' : ''}`;
        const img = document.createElement('img');
        img.src = photoPath;
        img.alt = `Фото с конференции ${index + 1}`;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.loading = 'lazy';
        
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
        
        slideElement.appendChild(img);
        photoSlider.appendChild(slideElement);

        const dot = document.createElement('button');
        dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToPhotoSlide(index));
        photoDots.appendChild(dot);
    });

    const prevBtn = document.getElementById('photoPrev');
    const nextBtn = document.getElementById('photoNext');
    if (prevBtn) prevBtn.addEventListener('click', () => movePhotoSlide(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => movePhotoSlide(1));
    
    startPhotoAutoSlide();
}

function movePhotoSlide(direction) {
    const slides = document.querySelectorAll('.photo-slide');
    if (slides.length === 0) return;
    currentPhotoSlide = (currentPhotoSlide + direction + slides.length) % slides.length;
    updatePhotoSlides();
    resetPhotoAutoSlide();
}

function goToPhotoSlide(index) {
    const slides = document.querySelectorAll('.photo-slide');
    if (index >= 0 && index < slides.length) {
        currentPhotoSlide = index;
        updatePhotoSlides();
        resetPhotoAutoSlide();
    }
}

function updatePhotoSlides() {
    const slides = document.querySelectorAll('.photo-slide');
    const dots = document.querySelectorAll('.slider-dot');
    slides.forEach((slide, index) => slide.classList.toggle('active', index === currentPhotoSlide));
    dots.forEach((dot, index) => dot.classList.toggle('active', index === currentPhotoSlide));
}

function startPhotoAutoSlide() {
    photoAutoSlideInterval = setInterval(() => movePhotoSlide(1), 5000);
}

function stopPhotoAutoSlide() {
    if (photoAutoSlideInterval) clearInterval(photoAutoSlideInterval);
}

function resetPhotoAutoSlide() {
    stopPhotoAutoSlide();
    startPhotoAutoSlide();
}

// Экспорт функций
window.initPhotoSlider = initPhotoSlider;
window.stopPhotoAutoSlide = stopPhotoAutoSlide;
