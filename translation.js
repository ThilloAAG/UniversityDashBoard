const translations = {
  fr: {
    title: "Tableau de bord des inscriptions",
    "header-title": "Tableau de bord des inscriptions universitaires",
    "chart1-title": "Répartition des inscriptions par province",
    "chart1-button": "Changer l'année",
    "chart2-title": "Répartition par sexe",
    "chart2-toggle": "Afficher en %",
    "footer-text": "Source : Universités Canada"
  },
  en: {
    title: "Enrollment Dashboard",
    "header-title": "University Enrollment Dashboard",
    "chart1-title": "Enrollment by Province",
    "chart1-button": "Change Year",
    "chart2-title": "Gender Distribution",
    "chart2-toggle": "Show in %",
    "footer-text": "Source: Universities Canada"
  }
};

function setLanguage(lang) {
  document.documentElement.lang = lang;
  const strings = translations[lang];
  for (let key in strings) {
    const el = document.getElementById(key);
    if (el) el.textContent = strings[key];
  }
}
