let translations = {};

async function loadLanguage(lang, page) {
  try {
    const res = await fetch(`/pages/${page}/translations/${lang}.json`);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    translations = await res.json();
    updateTexts();
  } catch (err) {
    console.error(`Failed to load translations for ${page} - ${lang}:`, err);
  }
}

function updateTexts() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[key]) {
      element.textContent = translations[key];
    }
  });
}
