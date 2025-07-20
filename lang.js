const translations = {
  en: {
    dashboard_title: "University Enrollment Dashboard",
    description: "This dashboard shows enrollment statistics for Canadian universities. Select a year and a university.",
    select_year: "Select year:",
    select_university: "Select university:",
    total_students: "Total Students:",
    students: "Students",
    bar_chart_title: "Enrollment by University",
    line_chart_title: "Enrollment Over Time"
  },
  fr: {
    dashboard_title: "Tableau de bord des inscriptions universitaires",
    description: "Ce tableau présente les statistiques d'inscription des universités canadiennes. Sélectionnez une année et une université.",
    select_year: "Sélectionnez une année :",
    select_university: "Sélectionnez une université :",
    total_students: "Nombre total d'étudiants :",
    students: "Étudiants",
    bar_chart_title: "Inscriptions par université",
    line_chart_title: "Évolution des inscriptions"
  }
};

function switchLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = translations[lang][key] || key;
  });

  // Re-rendre les graphiques avec la bonne langue
  renderBarChart(document.getElementById("yearSelect").value);
  renderLineChart(document.getElementById("universitySelect").value);
  document.documentElement.lang = lang;
}

document.querySelectorAll("[data-lang]").forEach(btn => {
  btn.addEventListener("click", () => {
    switchLanguage(btn.getAttribute("data-lang"));
  });
});

switchLanguage("en");
