// lang-switcher.js

document.addEventListener("DOMContentLoaded", () => {
  const languageSwitcher = document.getElementById("language-switcher");
  const currentLangDisplay = document.getElementById("current-lang");

  const setLanguage = (lang) => {
    // Find all elements that need translation
    const elements = document.querySelectorAll("[data-translate-key]");

    elements.forEach((el) => {
      const key = el.getAttribute("data-translate-key");
      if (translations[lang] && translations[lang][key]) {
        // Handle different element types
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          if (el.placeholder) {
            el.placeholder = translations[lang][key];
          }
        } else {
          el.innerHTML = translations[lang][key];
        }
      }
    });

    // Update the main HTML lang attribute for accessibility
    document.documentElement.lang = lang;

    // Update the language switcher display
    currentLangDisplay.textContent = lang.toUpperCase();

    // Store the user's preference
    localStorage.setItem("language", lang);
  };

  // Handle clicks on the language options
  languageSwitcher.addEventListener("click", (e) => {
    if (e.target.matches(".lang-option")) {
      e.preventDefault();
      const selectedLang = e.target.getAttribute("data-lang");
      setLanguage(selectedLang);
      languageSwitcher
        .querySelector(".dropdown-content")
        .classList.remove("show");
    }
  });

  // Toggle dropdown
  currentLangDisplay.parentElement.addEventListener("click", (e) => {
    e.preventDefault();
    languageSwitcher
      .querySelector(".dropdown-content")
      .classList.toggle("show");
  });

  // Close the dropdown if clicking outside
  window.addEventListener("click", (e) => {
    if (!languageSwitcher.contains(e.target)) {
      languageSwitcher
        .querySelector(".dropdown-content")
        .classList.remove("show");
    }
  });

  // Set initial language
  // 1. Check localStorage
  // 2. Check browser navigator language
  // 3. Default to Russian
  const savedLang = localStorage.getItem("language");
  const browserLang = navigator.language.slice(0, 2);

  let initialLang = "ru"; // Default
  if (savedLang && ["en", "kz", "ru"].includes(savedLang)) {
    initialLang = savedLang;
  } else if (["en", "kz"].includes(browserLang)) {
    initialLang = browserLang;
  }

  setLanguage(initialLang);
});
