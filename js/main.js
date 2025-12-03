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
            menuToggle.classList.toggle('open');
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('open');
        });
    });

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

    // ===== Parallax Effect =====
    const parallaxBg = document.querySelector('.hero-bg-parallax');
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }

    // ===== Before/After Sliders (Multiple) =====
    const sliders = document.querySelectorAll('.comparison-slider');
    sliders.forEach(slider => {
        const beforeImage = slider.querySelector('.before-image');
        const sliderHandle = slider.querySelector('.slider-handle');

        const slide = (x) => {
            const sliderRect = slider.getBoundingClientRect();
            let position = ((x - sliderRect.left) / sliderRect.width) * 100;

            // Clamp between 0 and 100
            position = Math.max(0, Math.min(100, position));

            // Use clip-path for "sliding door" effect
            beforeImage.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
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
    });
});

// ===== Global Functions for HTML Interaction =====

// Accordion Toggle
// Accordion Toggle (Senior Friendly)
window.toggleAccordion = function (button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('.fa-chevron-down');

    // Toggle active class on content
    content.classList.toggle('active');

    // Rotate icon
    if (content.classList.contains('active')) {
        icon.style.transform = 'rotate(180deg)';
        content.style.maxHeight = content.scrollHeight + "px";
    } else {
        icon.style.transform = 'rotate(0deg)';
        content.style.maxHeight = "0";
    }
};

// Initialize Accordions (Open ALL by Default for Marketing/Visibility)
document.addEventListener('DOMContentLoaded', () => {
    // Open ALL accordions by default so users see everything immediately
    const allAccordions = document.querySelectorAll('.accordion-header');
    allAccordions.forEach(btn => {
        // Add a small delay to ensure styles are loaded and scrollHeight is correct
        setTimeout(() => {
            // Only open if not already open (though logic handles toggle, we assume they start closed in HTML)
            toggleAccordion(btn);
        }, 100);
    });
});

// Service Selection (WhatsApp Integration)
window.selectService = function (serviceName, price) {
    // Format price
    const formattedPrice = price > 0
        ? price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 })
        : 'Consultar';

    // Construct WhatsApp Message
    let message = `Hola, quiero reservar el servicio: *${serviceName}*`;
    if (price > 0) {
        message += ` por ${formattedPrice}`;
    }
    message += `. ¿Tienen disponibilidad?`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/543884461948?text=${encodedMessage}`;

    // Open in new tab
    window.open(whatsappUrl, '_blank');
};

// Testimonials Scroll Logic
window.scrollTestimonials = function (direction) {
    const container = document.getElementById('testimonials-scroll');
    const scrollAmount = 350; // Approx card width + gap

    if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
};

// Transformations Scroll Logic
window.scrollTransformations = function (direction) {
    const container = document.getElementById('transformations-scroll');
    const scrollAmount = container.offsetWidth; // Scroll one full screen width

    if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
};
