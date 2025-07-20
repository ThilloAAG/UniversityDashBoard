const translations = {
  fr: {
    "title": "Tableau de bord des inscriptions universitaires",
    "header-title": "Tableau de bord des inscriptions universitaires",
    "dashboard-description": "Ce tableau présente les statistiques d'inscription des universités canadiennes. Utilisez les contrôles pour explorer les données.",
    "language-label": "Langue:",
    "chart1-title": "Répartition des inscriptions par province",
    "year-label": "Année:",
    "data-label": "Type de données:",
    "chart1-note": "Cliquez sur les barres pour plus de détails",
    "chart2-title": "Évolution des inscriptions 2020-2023",
    "province-label": "Province:",
    "chart2-note": "Passez la souris sur les points pour voir les valeurs",
    "footer-text": "Source : Universités Canada",
    "data-warning": "Note : Données synthétiques à des fins de démonstration",
    "absolute": "Valeurs absolues",
    "percentage": "Pourcentages",
    "all": "Toutes les provinces"
  },
  en: {
    "title": "University Enrollment Dashboard",
    "header-title": "University Enrollment Dashboard",
    "dashboard-description": "This dashboard shows enrollment statistics for Canadian universities. Use the controls to explore the data.",
    "language-label": "Language:",
    "chart1-title": "Enrollment by Province",
    "year-label": "Year:",
    "data-label": "Data type:",
    "chart1-note": "Click on bars for details",
    "chart2-title": "Enrollment Trend 2020-2023",
    "province-label": "Province:",
    "chart2-note": "Hover over points to see values",
    "footer-text": "Source: Universities Canada",
    "data-warning": "Note: Synthetic data for demonstration purposes",
    "absolute": "Absolute values",
    "percentage": "Percentages",
    "all": "All provinces"
  }
};

function setLanguage(lang) {
  document.documentElement.lang = lang;
  
  // Mettre à jour tous les éléments avec des attributs data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  
  // Mettre à jour les éléments avec des IDs spécifiques
  for (const key in translations[lang]) {
    const el = document.getElementById(key);
    if (el) {
      if (el.tagName === 'INPUT' && el.type === 'placeholder') {
        el.placeholder = translations[lang][key];
      } else {
        el.textContent = translations[lang][key];
      }
    }
  }
  
  // Mettre à jour les options des select
  document.getElementById("dataType").options[0].text = translations[lang]["absolute"];
  document.getElementById("dataType").options[1].text = translations[lang]["percentage"];
  document.getElementById("provinceSelect").options[0].text = translations[lang]["all"];
}
