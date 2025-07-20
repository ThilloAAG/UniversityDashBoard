document.addEventListener("DOMContentLoaded", () => {
  // Initialisation
  createCharts();
  
  // Gestionnaire d'événements pour le sélecteur de langue
  document.getElementById("languageSelector").addEventListener("change", (e) => {
    currentLang = e.target.value;
    setLanguage(currentLang);
    updateChart1();
    updateChart2();
  });
  
  // Gestionnaires d'événements pour les contrôles des graphiques
  document.getElementById("yearSelect").addEventListener("change", updateChart1);
  document.getElementById("dataType").addEventListener("change", updateChart1);
  document.getElementById("provinceSelect").addEventListener("change", updateChart2);
  
  // Initialiser les tooltips
  tippy('[data-tippy-content]', {
    theme: 'light-border',
    animation: 'fade'
  });
});

// Fonction pour afficher/masquer le chargement
function setLoading(loading) {
  document.getElementById("loading").style.display = loading ? "block" : "none";
}
