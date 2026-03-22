document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Sticky Navbar shadow on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '0.8rem 0';
        } else {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
            navbar.style.padding = '1rem 0';
        }
    });

    // Animate Statistics Counter
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateStats = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = Math.ceil(target / (duration / 16)); // ~60fps
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    // Format with commas
                    stat.innerText = current.toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.innerText = target.toLocaleString();
                }
            };
            updateCounter();
        });
    };

    // Use Intersection Observer to trigger animation when stats are in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                animateStats();
                hasAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.statistics');
    if (statsSection) {
        observer.observe(statsSection);
    }
});
