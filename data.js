// Données synthétiques pour le tableau de bord
const provinces = ["QC", "ON", "BC", "AB"];
const provinceNames = {
  fr: {
    QC: "Québec",
    ON: "Ontario",
    BC: "Colombie-Britannique",
    AB: "Alberta",
    all: "Toutes les provinces"
  },
  en: {
    QC: "Quebec",
    ON: "Ontario",
    BC: "British Columbia",
    AB: "Alberta",
    all: "All provinces"
  }
};

// Inscriptions par province et année
const enrollmentByProvince = {
  "2020": [48000, 72000, 40000, 28000],
  "2021": [49000, 73000, 41000, 29000],
  "2022": [50000, 75000, 42000, 30000],
  "2023": [52000, 76000, 45000, 32000]
};

// Calcul des totaux
function calculateTotals() {
  const totals = {};
  for (const year in enrollmentByProvince) {
    totals[year] = enrollmentByProvince[year].reduce((a, b) => a + b, 0);
  }
  return totals;
}

const totalEnrollment = calculateTotals();

// Fonction pour obtenir les données d'évolution par province
function getTrendData(province) {
  const years = Object.keys(enrollmentByProvince).sort();
  if (province === "all") {
    return years.map(year => totalEnrollment[year]);
  } else {
    const index = provinces.indexOf(province);
    return years.map(year => enrollmentByProvince[year][index]);
  }
}

// Fonction pour exporter les données au format CSV
function exportToCSV() {
  const years = Object.keys(enrollmentByProvince).sort();
  let csvContent = "Année/Year,Québec/Quebec,Ontario,Colombie-Britannique/British Columbia,Alberta,Total\n";
  
  years.forEach(year => {
    const row = [
      year,
      ...enrollmentByProvince[year],
      totalEnrollment[year]
    ];
    csvContent += row.join(",") + "\n";
  });
  
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `university_enrollment_${currentLang}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}