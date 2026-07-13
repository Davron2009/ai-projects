document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header');
    const bookingForm = document.getElementById('booking-form');

    const menuBtn = document.createElement('div');
    menuBtn.classList.add('mobile-menu-btn');
    menuBtn.innerHTML = '<span></span><span></span><span></span>';
    header.querySelector('.container').appendChild(menuBtn);

    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuBtn.classList.toggle('open');
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            nav.classList.remove('active');
            menuBtn.classList.remove('open');
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('fade-in'); });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden-scroll');
        observer.observe(section);
    });

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = bookingForm.querySelectorAll('input, select');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'var(--error)';
                isValid = false;
            } else {
                input.style.borderColor = 'var(--muted)';
            }
        });

        if (isValid) {
            alert('Arizangiz qabul qilindi. Siz bilan tez orada bog\'lanamiz!');
            bookingForm.reset();
        }
    });
});

const style = document.createElement('style');
style.textContent = `
    .hidden-scroll { opacity: 0; transform: translateY(30px); transition: all 0.6s ease-out; }
    .fade-in { opacity: 1; transform: translateY(0); }
    .mobile-menu-btn { display: none; cursor: pointer; flex-direction: column; gap: 5px; }
    .mobile-menu-btn span { width: 25px; height: 3px; background: #fff; transition: 0.3s; }
    @media (max-width: 768px) { .mobile-menu-btn { display: flex; } }
`;
document.head.appendChild(style);