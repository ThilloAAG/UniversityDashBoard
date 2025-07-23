let chart1, chart2;
let currentLang = 'fr';

// Couleurs modernes pour les graphiques
const chartColors = {
  primary: '#4361ee',
  primaryLight: 'rgba(67, 97, 238, 0.1)',
  secondary: '#3a0ca3',
  accent: '#4cc9f0',
  success: '#4ad66d',
  warning: '#f8961e',
  danger: '#ef233c',
  purple: '#7209b7',
  pink: '#f72585'
};

function createCharts() {
  const ctx1 = document.getElementById("chart1");
  const ctx2 = document.getElementById("chart2");

  // Graphique à barres (province)
  chart1 = new Chart(ctx1, {
    type: "bar",
    data: getBarChartData(),
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: translations[currentLang] && translations[currentLang]["chart1-title"] || 'Chart 1',
          font: {
            size: 18,
            weight: 'bold',
            family: 'Inter'
          },
          padding: {
            top: 10,
            bottom: 20
          },
          color: '#2b2d42'
        },
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(43, 45, 66, 0.95)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          titleFont: {
            family: 'Inter',
            size: 14,
            weight: 'bold'
          },
          bodyFont: {
            family: 'Inter',
            size: 13
          },
          padding: 12,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            title: function(context) {
              return provinceNames[currentLang][context[0].label] || context[0].label;
            },
            label: function(context) {
              const value = context.raw;
              const total = totalEnrollment[document.getElementById("yearSelect").value];
              const percentage = ((value / total) * 100).toFixed(1);
              
              if (document.getElementById("dataType").value === "percentage") {
                return `${translations[currentLang]["students"]}: ${percentage}%`;
              }
              return `${translations[currentLang]["students"]}: ${value.toLocaleString()} (${percentage}%)`;
            },
            afterLabel: function(context) {
              const year = document.getElementById("yearSelect").value;
              const total = totalEnrollment[year]; // ✔️ Maintenant correctement défini
              return `${translations[currentLang]["total"]}: ${total.toLocaleString()}`;
            }
          }
        },
        datalabels: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
            drawBorder: false
          },
          title: {
            display: true,
            text: document.getElementById("dataType").value === "percentage" ? 
                  translations[currentLang]["percentage"] : 
                  translations[currentLang]["students"],
            font: {
              family: 'Inter',
              weight: 'bold',
              size: 13
            },
            color: '#6c757d'
          },
          ticks: {
            font: {
              family: 'Inter',
              size: 12
            },
            color: '#6c757d',
            callback: function(value) {
              if (document.getElementById("dataType").value === "percentage") {
                return value + '%';
              }
              return value.toLocaleString();
            }
          }
        },
        x: {
          grid: {
            display: false,
            drawBorder: false
          },
          title: {
            display: true,
            text: translations[currentLang]["province-label"],
            font: {
              family: 'Inter',
              weight: 'bold',
              size: 13
            },
            color: '#6c757d'
          },
          ticks: {
            font: {
              family: 'Inter',
              size: 12
            },
            color: '#6c757d'
          }
        }
      },
      onClick: (e, elements) => {
        if (elements.length > 0) {
          const index = elements[0].index;
          document.getElementById("provinceSelect").value = provinces[index];
          updateChart2();
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeOutQuart',
        onComplete: () => {
          chart1.update();
        }
      }
    }
  });

  // Graphique linéaire (évolution)
  chart2 = new Chart(ctx2, {
    type: "line",
    data: getLineChartData(),
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: translations[currentLang] && translations[currentLang]["chart2-title"] || 'Chart 2',
          font: {
            size: 18,
            weight: 'bold',
            family: 'Inter'
          },
          padding: {
            top: 10,
            bottom: 20
          },
          color: '#2b2d42'
        },
        tooltip: {
          backgroundColor: 'rgba(43, 45, 66, 0.95)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          titleFont: {
            family: 'Inter',
            size: 14,
            weight: 'bold'
          },
          bodyFont: {
            family: 'Inter',
            size: 13
          },
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: function(context) {
              const label = provinceNames[currentLang][context.dataset.label] || 
                           (context.dataset.label === 'all' ? translations[currentLang]["all"] : context.dataset.label);
              return `${label}: ${context.raw.toLocaleString()}`;
            }
          }
        },
        legend: {
          position: 'top',
          labels: {
            font: {
              family: 'Inter',
              size: 12
            },
            padding: 20,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
            drawBorder: false
          },
          title: {
            display: true,
            text: translations[currentLang]["students"],
            font: {
              family: 'Inter',
              weight: 'bold',
              size: 13
            },
            color: '#6c757d'
          },
          ticks: {
            font: {
              family: 'Inter',
              size: 12
            },
            color: '#6c757d',
            callback: function(value) {
              return value.toLocaleString();
            }
          }
        },
        x: {
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
            drawBorder: false
          },
          title: {
            display: true,
            text: translations[currentLang]["year-label"],
            font: {
              family: 'Inter',
              weight: 'bold',
              size: 13
            },
            color: '#6c757d'
          },
          ticks: {
            font: {
              family: 'Inter',
              size: 12
            },
            color: '#6c757d'
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      },
      animation: {
        duration: 1000,
        easing: 'easeOutQuart',
        onComplete: () => {
          chart2.update();
        }
      }
    }
  });
}

function getBarChartData() {
  const year = document.getElementById("yearSelect").value;
  const showPercentage = document.getElementById("dataType").value === "percentage";
  const total = totalEnrollment[year];
  
  return {
    labels: provinces.map(p => provinceNames[currentLang][p]),
    datasets: [{
      label: translations[currentLang]["students"],
      data: showPercentage 
        ? enrollmentByProvince[year].map(v => (v / total) * 100)
        : enrollmentByProvince[year],
      backgroundColor: [
        chartColors.primary,
        chartColors.purple,
        chartColors.accent,
        chartColors.pink
      ],
      borderColor: [
        chartColors.primary,
        chartColors.purple,
        chartColors.accent,
        chartColors.pink
      ],
      borderWidth: 0,
      borderRadius: 6,
      hoverBackgroundColor: [
        '#3a56d5',
        '#5f08a0',
        '#3ab8d9',
        '#e5177a'
      ],
      hoverBorderWidth: 0
    }]
  };
}

function getLineChartData() {
  const province = document.getElementById("provinceSelect").value;
  const compareProvince = document.getElementById("compareSelect").value;
  const isAll = province === "all";
  
  const datasets = [];
  
  // Dataset principal
  datasets.push({
    label: province,
    data: getTrendData(province),
    borderColor: chartColors.primary,
    backgroundColor: chartColors.primaryLight,
    borderWidth: 3,
    tension: 0.3,
    fill: true,
    pointBackgroundColor: chartColors.primary,
    pointRadius: 5,
    pointHoverRadius: 7,
    pointBorderWidth: 2,
    pointBorderColor: '#ffffff'
  });
  
  // Dataset de comparaison si sélectionné
  if (compareProvince !== "none" && compareProvince !== province) {
    datasets.push({
      label: compareProvince,
      data: getTrendData(compareProvince),
      borderColor: chartColors.purple,
      backgroundColor: 'rgba(114, 9, 183, 0.1)',
      borderWidth: 3,
      tension: 0.3,
      fill: false,
      borderDash: [5, 5],
      pointBackgroundColor: chartColors.purple,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBorderWidth: 2,
      pointBorderColor: '#ffffff'
    });
  }
  
  return {
    labels: Object.keys(enrollmentByProvince).sort(),
    datasets: datasets
  };
}

function updateChart1() {
  chart1.data = getBarChartData();
  
  // Update Y axis based on data type
  chart1.options.scales.y.title.text = document.getElementById("dataType").value === "percentage" ? 
                                      translations[currentLang]["percentage"] : 
                                      translations[currentLang]["students"];
  
  chart1.options.scales.y.ticks.callback = function(value) {
    if (document.getElementById("dataType").value === "percentage") {
      return value + '%';
    }
    return value.toLocaleString();
  };
  
  chart1.options.plugins.title.text = translations[currentLang]["chart1-title"];
  chart1.update();
}

function updateChart2() {
  chart2.data = getLineChartData();
  chart2.options.plugins.title.text = translations[currentLang]["chart2-title"];
  chart2.update();
}