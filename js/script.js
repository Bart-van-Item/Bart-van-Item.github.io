// Birth date: 2001-10-18
const birthDate = new Date(2001, 9, 18);
let currentLang = localStorage.getItem('lang') || 'nl';
const currentPage = 'home';

function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const beforeBirthday =
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());
    if (beforeBirthday) age--;
    return age;
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.fade-in, .stagger').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', async () => {
    // Age
    const ageSpan = document.getElementById('age');
    if (ageSpan) ageSpan.textContent = calculateAge(birthDate);

    // Theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(savedTheme);

    const themeBtn = document.getElementById('toggle-theme');
    const langBtn  = document.getElementById('toggle-lang');

    if (themeBtn) themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

    // Language
    await loadLanguage(currentLang, currentPage);
    if (langBtn) langBtn.textContent = currentLang === 'nl' ? 'EN' : 'NL';

    // Language toggle
    if (langBtn) {
        langBtn.addEventListener('click', async () => {
            currentLang = currentLang === 'nl' ? 'en' : 'nl';
            localStorage.setItem('lang', currentLang);
            langBtn.textContent = currentLang === 'nl' ? 'EN' : 'NL';
            await loadLanguage(currentLang, currentPage);
        });
    }

    // Theme toggle
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark');
            document.body.classList.toggle('light', !isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            themeBtn.textContent = isDark ? '☀️' : '🌙';
        });
    }

    // Smooth scroll for hero CTA
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Scroll animations
    initScrollAnimations();
});
