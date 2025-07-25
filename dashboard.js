// Sample data - in a real project, this would come from an API or JSON file
const universities = [
    { name: "Université d'Ottawa", enrollments: { "2015": 32000, "2016": 33500, "2017": 34500, "2018": 35500, "2019": 36500, "2020": 37500, "2021": 38500, "2022": 39500, "2023": 40500, "2024": 41500, "2025": 42500 } },
    { name: "Université de Montréal", enrollments: { "2015": 45000, "2016": 46000, "2017": 47000, "2018": 48000, "2019": 49000, "2020": 50000, "2021": 51000, "2022": 52000, "2023": 53000, "2024": 54000, "2025": 55000 } },
    { name: "University of Toronto", enrollments: { "2015": 75000, "2016": 77000, "2017": 79000, "2018": 81000, "2019": 83000, "2020": 85000, "2021": 87000, "2022": 89000, "2023": 91000, "2024": 93000, "2025": 95000 } },
    { name: "University of British Columbia", enrollments: { "2015": 55000, "2016": 57000, "2017": 59000, "2018": 61000, "2019": 63000, "2020": 65000, "2021": 67000, "2022": 69000, "2023": 71000, "2024": 73000, "2025": 75000 } },
    { name: "McGill University", enrollments: { "2015": 35000, "2016": 36000, "2017": 37000, "2018": 38000, "2019": 39000, "2020": 40000, "2021": 41000, "2022": 42000, "2023": 43000, "2024": 44000, "2025": 45000 } }
];

// Language content
const translations = {
    fr: {
        title: "Statistiques des universités canadiennes",
        description: "Ce tableau de bord présente les statistiques d'inscription dans les universités canadiennes. Utilisez les filtres ci-dessous pour explorer les données.",
        chart1Title: "Effectifs par université",
        chart2Title: "Évolution des inscriptions",
        universityLabel: "Sélectionnez jusqu'à 5 universités:",
        yearLabel: "Période:"
    },
    en: {
        title: "Canadian Universities Statistics",
        description: "This dashboard displays enrollment statistics for Canadian universities. Use the filters below to explore the data.",
        chart1Title: "Enrollment by University",
        chart2Title: "Enrollment Trends",
        universityLabel: "Select up to 5 universities:",
        yearLabel: "Time period:"
    }
};

// Initialize charts
let enrollmentChart, trendChart;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize language switcher
    document.getElementById('lang-fr').addEventListener('click', () => switchLanguage('fr'));
    document.getElementById('lang-en').addEventListener('click', () => switchLanguage('en'));
    
    // Populate university select
    const select = document.getElementById('university-select');
    universities.forEach(univ => {
        const option = document.createElement('option');
        option.value = univ.name;
        option.textContent = univ.name;
        select.appendChild(option);
    });
    
    // Initialize year slider
    const yearSlider = document.getElementById('year-range');
    const yearValue = document.getElementById('year-value');
    yearSlider.addEventListener('input', function() {
        yearValue.textContent = this.value;
        updateTrendChart(parseInt(this.value));
    });
    
    // Initialize charts
    createEnrollmentChart();
    createTrendChart(2025);
    
    // Update enrollment chart when universities are selected
    select.addEventListener('change', updateEnrollmentChart);
});

function createEnrollmentChart() {
    const ctx = document.getElementById('enrollmentChart').getContext('2d');
    enrollmentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Inscriptions',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Inscriptions en 2025'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Nombre d'étudiants"
                    }
                }
            }
        }
    });
}

function createTrendChart(year) {
    const ctx = document.getElementById('trendChart').getContext('2d');
    trendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: year - 2015 + 1}, (_, i) => 2015 + i),
            datasets: []
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Évolution des inscriptions'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Nombre d'étudiants"
                    }
                }
            }
        }
    });
}

function updateEnrollmentChart() {
    const selected = Array.from(document.getElementById('university-select').selectedOptions)
        .map(option => option.value)
        .slice(0, 5); // Limit to 5 universities
    
    const data = universities.filter(univ => selected.includes(univ.name))
        .map(univ => univ.enrollments["2025"]);
    
    enrollmentChart.data.labels = selected;
    enrollmentChart.data.datasets[0].data = data;
    enrollmentChart.update();
}

function updateTrendChart(year) {
    const selected = Array.from(document.getElementById('university-select').selectedOptions)
        .map(option => option.value);
    
    const years = Array.from({length: year - 2015 + 1}, (_, i) => 2015 + i);
    trendChart.data.labels = years;
    
    // Update datasets
    trendChart.data.datasets = selected.map((univName, i) => {
        const univ = universities.find(u => u.name === univName);
        const colors = [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)'
        ];
        
        return {
            label: univName,
            data: years.map(y => univ.enrollments[y]),
            borderColor: colors[i % colors.length],
            backgroundColor: colors[i % colors.length],
            tension: 0.1,
            fill: false
        };
    });
    
    trendChart.update();
}

function switchLanguage(lang) {
    // Update UI text
    document.getElementById('dashboard-title').textContent = translations[lang].title;
    document.getElementById('dashboard-description').textContent = translations[lang].description;
    document.getElementById('chart1-title').textContent = translations[lang].chart1Title;
    document.getElementById('chart2-title').textContent = translations[lang].chart2Title;
    document.getElementById('university-label').textContent = translations[lang].universityLabel;
    document.getElementById('year-label').textContent = translations[lang].yearLabel;
    
    // Update active language button
    document.getElementById('lang-fr').classList.toggle('active', lang === 'fr');
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
    
    // Update chart labels (simplified - in a real app you'd need to update all chart text)
    if (enrollmentChart) {
        enrollmentChart.options.plugins.title.text = lang === 'fr' ? 'Inscriptions en 2025' : '2025 Enrollments';
        enrollmentChart.options.scales.y.title.text = lang === 'fr' ? "Nombre d'étudiants" : "Number of students";
        enrollmentChart.update();
    }
    
    if (trendChart) {
        trendChart.options.plugins.title.text = lang === 'fr' ? 'Évolution des inscriptions' : 'Enrollment Trends';
        trendChart.options.scales.y.title.text = lang === 'fr' ? "Nombre d'étudiants" : "Number of students";
        trendChart.update();
    }
}