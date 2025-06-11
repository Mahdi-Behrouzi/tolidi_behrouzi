// 3D Slider Animation
const slider = {
    init() {
        this.slides = document.querySelectorAll('.slide');
        this.progress = document.querySelector('.slider-progress');
        this.current = 0;
        this.autoPlay();
        this.createProgress();
    },
    autoPlay() {
        setInterval(() => {
            this.nextSlide();
        }, 5000);
    },
    nextSlide() {
        this.current = (this.current + 1) % this.slides.length;
        this.animateSlides();
    },
    animateSlides() {
        gsap.to('.slider-container', {
            rotationY: this.current * 120,
            duration: 1.5,
            ease: 'power3.inOut'
        });

        // Update progress
        gsap.to(this.progress, {
            width: `${(this.current + 1) * (100 / this.slides.length)}%`,
            duration: 0.5
        });
    },
    createProgress() {
        this.slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('progress-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.progress.appendChild(dot);
        });
    },
    goToSlide(index) {
        this.current = index;
        this.animateSlides();
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    slider.init();
    
    // Advanced Sidebar
    const sidebar = new AdvancedSidebar({
        menuButton: '.menu-toggle',
        closeButton: '.close-sidebar',
        overlay: '.sidebar-overlay'
    });

    // 3D Hover Effects
    Hover3DEffect.init('.product-card');
});
