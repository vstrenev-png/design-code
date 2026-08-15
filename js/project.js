// Project slider functionality
(function() {
    const slider = document.querySelector('.project-slider');
    if (!slider) return;

    // Make slider full width
    function setFullWidth() {
        slider.style.width = window.innerWidth + 'px';
        slider.style.marginLeft = '0';
        slider.style.marginRight = '0';
        slider.style.left = '0';
        slider.style.right = '0';
    }

    setFullWidth();
    window.addEventListener('resize', setFullWidth);

    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.slider-dots .dot');
    const prevBtn = slider.querySelector('.slider-nav .prev');
    const nextBtn = slider.querySelector('.slider-nav .next');
    let current = 0;
    let autoTimer;

    function showSlide(n) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        current = (n + slides.length) % slides.length;
        slides[current].classList.add('active');
        if (dots[current]) dots[current].classList.add('active');
    }

    function nextSlide() { showSlide(current + 1); }
    function prevSlide() { showSlide(current - 1); }

    function startAuto() {
        stopAuto();
        autoTimer = setInterval(nextSlide, 5000);
    }

    function stopAuto() {
        if (autoTimer) clearInterval(autoTimer);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { stopAuto(); prevSlide(); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { stopAuto(); nextSlide(); startAuto(); });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => { stopAuto(); showSlide(i); startAuto(); });
    });

    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);

    showSlide(0);
    startAuto();
})();
