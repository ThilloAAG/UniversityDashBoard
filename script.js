let currentYear = "2022";

document.addEventListener("DOMContentLoaded", () => {
  createCharts();
  setLanguage("fr");

  document.getElementById("languageSelector").addEventListener("change", (e) => {
    setLanguage(e.target.value);
  });

  document.getElementById("chart1-button").addEventListener("click", updateChart1);
  document.getElementById("toggleGender").addEventListener("change", toggleGenderView);
});
