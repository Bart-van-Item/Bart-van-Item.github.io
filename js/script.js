const birthDate = new Date(2001, 9, 18);
const currentPage = "home";
let currentLang = localStorage.getItem("lang") || "nl";

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
    themeBtn.textContent = label;
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
});
