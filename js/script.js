// Geboortedatum: 2001-10-18
const birthDate = new Date(2001, 9, 18); // oktober = maand 9
let currentLang = 'nl';
const currentPage = 'index';

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

    await loadLanguage(currentLang, currentPage);

    const langBtn = document.getElementById('toggle-lang');
    const themeBtn = document.getElementById('toggle-theme');

    if (langBtn) {
        langBtn.addEventListener('click', async () => {
            currentLang = currentLang === 'nl' ? 'en' : 'nl';
            langBtn.textContent = currentLang === 'nl' ? 'EN' : 'NL';
            await loadLanguage(currentLang, currentPage);
        });
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            document.body.classList.toggle('light');
            themeBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
        });
    }
});
