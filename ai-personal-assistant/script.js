document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .how-it-works, .hero').forEach(el => {
        el.classList.add('fade-transition');
        observer.observe(el);
    });

    if (window.innerWidth <= 768) {
        const nav = document.querySelector('nav');
        const menuBtn = document.createElement('button');
        menuBtn.className = 'menu-toggle';
        menuBtn.innerHTML = '<span></span><span></span><span></span>';
        nav.appendChild(menuBtn);
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('menu-open');
        });
    }
});