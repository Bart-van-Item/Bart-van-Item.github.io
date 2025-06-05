// "i18n" means "internationalization" (first letter 'i', last letter 'n', 18 letters in between)
// This file handles the language switching logic for the site

let translations = {};

async function loadLanguage(lang, page) {
    try {
        const res = await fetch(`/pages/${page}/translations/${lang}.json`);
        translations = await res.json();
        updateTexts();
    } catch (err) {
        console.error(`Failed to load translations for ${page} – ${lang}:`, err);
    }
}

function updateTexts() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
            el.textContent = translations[key];
        }
    });
}
