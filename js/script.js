// Geboortedatum: 2001-10-18
const birthDate = new Date(2001, 9, 18); // oktober = maand 9
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

document.addEventListener('DOMContentLoaded', async () => {
    const ageSpan = document.getElementById('age');
    if (ageSpan) {
        ageSpan.textContent = calculateAge(birthDate);
    }

    // Herstel opgeslagen thema
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(savedTheme);
    document.getElementById('toggle-theme').textContent = savedTheme === 'dark' ? '☀️' : '🌙';

    // Laad taal
    await loadLanguage(currentLang, currentPage);

    const langBtn = document.getElementById('toggle-lang');
    const themeBtn = document.getElementById('toggle-theme');

    if (langBtn) {
        langBtn.textContent = currentLang === 'nl' ? 'EN' : 'NL';
        langBtn.addEventListener('click', async () => {
            currentLang = currentLang === 'nl' ? 'en' : 'nl';
            localStorage.setItem('lang', currentLang);
            langBtn.textContent = currentLang === 'nl' ? 'EN' : 'NL';
            await loadLanguage(currentLang, currentPage);
        });
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark');
            document.body.classList.toggle('light', !isDark);
            const theme = isDark ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
            themeBtn.textContent = isDark ? '☀️' : '🌙';
        });
    }
});
