// Traductions
const translations = {
  fr: {
    "title": "Tableau de bord des inscriptions",
    "header-title": "Inscriptions universitaires au Canada",
    "dashboard-description": "Statistiques d'inscription par province (2020-2023).",
    "year-label": "Année :",
    "province-label": "Province :",
    "chart1-title": "Répartition par province",
    "chart2-title": "Évolution 2020-2023",
    "footer-text": "Source : Universités Canada",
    "all": "Toutes provinces",
    "students": "Étudiants",
    "total": "Total"
  },
  en: {
    "title": "Enrollment Dashboard",
    "header-title": "Canadian University Enrollment",
    "dashboard-description": "Enrollment statistics by province (2020-2023).",
    "year-label": "Year:",
    "province-label": "Province:",
    "chart1-title": "Distribution by Province",
    "chart2-title": "Trend 2020-2023",
    "footer-text": "Source: Universities Canada",
    "all": "All provinces",
    "students": "Students",
    "total": "Total"
  }
};

// Variable globale
let currentLang = 'fr';

// Appliquer les traductions à tous les éléments
function translatePage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.innerText = translations[lang][key];
    }
  });
}

// Changer de langue et relancer les graphiques
function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  translatePage(lang);
  if (typeof chart1 !== "undefined" && chart1) chart1.destroy();
  if (typeof chart2 !== "undefined" && chart2) chart2.destroy();
  createCharts();
}
