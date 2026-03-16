// Script para interactividad del portafolio

document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar is no longer fixed, so we don't need a scroll listener for it.

    // 2. Menú Móvil
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Cerrar menú al clickear un enlace (móvil)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // 3. Animaciones al hacer scroll (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in, .slide-in-right');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });


    // 5. Efecto parallax sutil en elementos de fondo
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        const blobs = document.querySelectorAll('.blob-bg');
        blobs.forEach((blob, index) => {
            const speed = `-${(index + 1) * 20}`;
            blob.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
        });
    });
    // 6. WhatsApp floating button copy to clipboard logic
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const toast = document.getElementById('toast');

    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            const phoneNumber = "+58 426 471-2564";
            
            // Try using modern clipboard API
            navigator.clipboard.writeText(phoneNumber).then(() => {
                showToast();
            }).catch(err => {
                console.error("Failed to copy text: ", err);
                // Fallback approach if needed could be added here
            });
        });
    }

    function showToast() {
        if (!toast) return;
        toast.classList.add('show');
        
        // Remove class after 3 seconds (animation handles 0.5s fade in + 2.5s wait + 0.5 fadeout)
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Smooth scroll and prevent "#" in URL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            // Check if it's just '#' to avoid errors
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Clear the hash from the URL
                history.replaceState(null, null, ' ');
            }
        });
    });
});
