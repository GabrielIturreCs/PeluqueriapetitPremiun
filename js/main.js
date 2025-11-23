document.addEventListener('DOMContentLoaded', () => {

    // ===== Sticky Header =====
    const header = document.querySelector('.luxury-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===== Mobile Menu Toggle =====
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');

            // Animate hamburger to X
            const bars = menuToggle.querySelectorAll('.bar');
            if (mainNav.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                bars[1].style.opacity = '0'; // Hide middle bar if there were 3, but we have 2
                // Wait, CSS has 2 bars? Let's check CSS. 
                // CSS has .bar but didn't specify nth-child. 
                // Let's just toggle a class on the button for easier CSS handling if needed, 
                // but for now simple JS rotation is fine.
                // Actually, let's just toggle a class 'open' on the button and handle animation in CSS or here.
                menuToggle.classList.toggle('open');
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                menuToggle.classList.remove('open');
            }
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('open');
        });
    });

    // ===== Carousel Scroll Indicator =====
    const scrollContainer = document.querySelector('.services-scroll-container');
    const dots = document.querySelectorAll('.scroll-dot');

    if (scrollContainer && dots.length > 0) {
        scrollContainer.addEventListener('scroll', () => {
            const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            const scrollLeft = scrollContainer.scrollLeft;
            const percent = scrollLeft / scrollWidth;

            // Calculate active dot index based on percentage
            // We have 5 dots. 
            const activeIndex = Math.min(Math.floor(percent * dots.length), dots.length - 1);

            dots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });
    }

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    // ===== Modals =====
    window.openModal = function (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    };

    window.closeModal = function (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    };

    // Close modal when clicking outside content
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    // ===== Parallax Effect =====
    const parallaxBg = document.querySelector('.hero-bg-parallax');
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }
    // ===== Before/After Slider =====
    const slider = document.querySelector('.comparison-slider');
    if (slider) {
        const beforeImage = slider.querySelector('.before-image');
        const sliderHandle = slider.querySelector('.slider-handle');

        const slide = (x) => {
            const sliderRect = slider.getBoundingClientRect();
            let position = ((x - sliderRect.left) / sliderRect.width) * 100;

            // Clamp between 0 and 100
            position = Math.max(0, Math.min(100, position));

            beforeImage.style.width = `${position}%`;
            sliderHandle.style.left = `${position}%`;
        };

        // Mouse Events
        slider.addEventListener('mousemove', (e) => {
            slide(e.clientX);
        });

        // Touch Events
        slider.addEventListener('touchmove', (e) => {
            slide(e.touches[0].clientX);
        });
    }
});
