document.addEventListener("DOMContentLoaded", () => {
  createCharts();
  setLanguage('fr');
  
  // Gestionnaire pour le changement de langue
  document.getElementById("languageSelector").addEventListener("change", (e) => {
    setLanguage(e.target.value);
  });
  
  // Gestionnaires d'événements pour les contrôles des graphiques
  document.getElementById("yearSelect").addEventListener("change", updateChart1);
  document.getElementById("dataType").addEventListener("change", updateChart1);
  document.getElementById("provinceSelect").addEventListener("change", updateChart2);
  document.getElementById("compareSelect").addEventListener("change", updateChart2);
  
  // Bouton d'export
  document.getElementById("exportBtn").addEventListener("click", exportToCSV);
  
  // Initialiser la langue
  setLanguage('fr');
});

// Fonction pour afficher/masquer le chargement
function setLoading(loading) {
  const loader = document.createElement("div");
  loader.id = "loading";
  loader.style.position = "fixed";
  loader.style.top = "0";
  loader.style.left = "0";
  loader.style.width = "100%";
  loader.style.height = "100%";
  loader.style.backgroundColor = "rgba(255,255,255,0.7)";
  loader.style.display = "flex";
  loader.style.justifyContent = "center";
  loader.style.alignItems = "center";
  loader.style.zIndex = "1000";
  loader.innerHTML = '<div style="font-size: 1.5rem; font-weight: bold;">Chargement...</div>';
  
  if (loading) {
    document.body.appendChild(loader);
  } else {
    const existingLoader = document.getElementById("loading");
    if (existingLoader) {
      existingLoader.remove();
    }
  }
}