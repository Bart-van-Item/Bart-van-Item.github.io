const birthDate = new Date(2001, 9, 18);
const currentPage = "home";

// The browser's own list of preferred content languages, most wanted first.
// Not the keyboard layout: Dutch keyboards are QWERTY, so a layout says
// nothing about whether someone reads Dutch.
function detectLanguage() {
  const prefs =
    navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || "en"];

  return prefs.some((lang) => lang.toLowerCase().startsWith("nl")) ? "nl" : "en";
}

// A stored choice wins: using the toggle once settles it for good.
let currentLang = localStorage.getItem("lang") || detectLanguage();

function calculateAge(date) {
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const beforeBirthday =
    today.getMonth() < date.getMonth() ||
    (today.getMonth() === date.getMonth() && today.getDate() < date.getDate());

  if (beforeBirthday) {
    age -= 1;
  }

  return age;
}

function getThemeButtonLabel(theme) {
  const labels = {
    nl: {
      light: "Donkere modus",
      dark: "Lichte modus",
    },
    en: {
      light: "Dark mode",
      dark: "Light mode",
    },
  };

  return labels[currentLang][theme];
}

function applyTheme(theme) {
  document.body.classList.remove("light", "dark");
  document.body.classList.add(theme);
  document.documentElement.style.colorScheme = theme;

  const themeBtn = document.getElementById("toggle-theme");
  if (themeBtn) {
    const label = getThemeButtonLabel(theme);
    // Write to the label span, not to the button: the button also holds the
    // two icons, and textContent on the button would wipe them.
    const labelEl = themeBtn.querySelector(".theme-label");
    if (labelEl) {
      labelEl.textContent = label;
    }
    // The label is hidden on narrow screens, so the button is icon-only
    // there. aria-label carries the meaning for anyone who cannot see it.
    themeBtn.setAttribute("aria-label", label);
  }
}

async function applyLanguage() {
  document.documentElement.lang = currentLang;

  const langBtn = document.getElementById("toggle-lang");
  if (langBtn) {
    langBtn.textContent = currentLang === "nl" ? "EN" : "NL";
  }

  await loadLanguage(currentLang, currentPage);

  const activeTheme = document.body.classList.contains("dark") ? "dark" : "light";
  applyTheme(activeTheme);
}

function initScrollNav() {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return;

  function onScroll() {
    if (window.scrollY > 40) {
      topbar.classList.add("scrolled");
    } else {
      topbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

document.addEventListener("DOMContentLoaded", async () => {
  const ageSpan = document.getElementById("age");
  if (ageSpan) {
    ageSpan.textContent = calculateAge(birthDate);
  }

  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);
  await applyLanguage();

  const langBtn = document.getElementById("toggle-lang");
  const themeBtn = document.getElementById("toggle-theme");

  if (langBtn) {
    langBtn.addEventListener("click", async () => {
      currentLang = currentLang === "nl" ? "en" : "nl";
      localStorage.setItem("lang", currentLang);
      await applyLanguage();
    });
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
      localStorage.setItem("theme", nextTheme);
      applyTheme(nextTheme);
    });
  }

  initScrollNav();
});
