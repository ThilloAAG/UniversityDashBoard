let chart1, chart2;
let currentLang = 'fr';

function createCharts() {
  const ctx1 = document.getElementById("chart1");
  const ctx2 = document.getElementById("chart2");

  // Graphique à barres (province)
  chart1 = new Chart(ctx1, {
    type: "bar",
    data: getBarChartData(),
    options: {
      responsive: true,
      plugins: {
        title: {
          display: false
        },
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = provinceNames[currentLang][context.label] || context.label;
              const value = context.raw;
              const total = totalEnrollment[document.getElementById("yearSelect").value];
              const percentage = ((value / total) * 100).toFixed(1);
              
              if (document.getElementById("dataType").value === "percentage") {
                return `${label}: ${percentage}%`;
              }
              return `${label}: ${value.toLocaleString()} (${percentage}%)`;
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
          ticks: {
            callback: function(value) {
              if (document.getElementById("dataType").value === "percentage") {
                return value + '%';
              }
              return value.toLocaleString();
            }
          }
        }
      },
      onClick: (e, elements) => {
        if (elements.length > 0) {
          const index = elements[0].index;
          document.getElementById("provinceSelect").value = provinces[index];
          updateChart2();
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
      plugins: {
        title: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${provinceNames[currentLang][context.dataset.label] || context.dataset.label}: ${context.raw.toLocaleString()}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false
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
    labels: provinces,
    datasets: [{
      data: showPercentage 
        ? enrollmentByProvince[year].map(v => (v / total) * 100)
        : enrollmentByProvince[year],
      backgroundColor: [
        'rgba(78, 121, 167, 0.7)',
        'rgba(242, 142, 43, 0.7)',
        'rgba(89, 161, 79, 0.7)',
        'rgba(158, 102, 171, 0.7)'
      ],
      borderColor: [
        'rgba(78, 121, 167, 1)',
        'rgba(242, 142, 43, 1)',
        'rgba(89, 161, 79, 1)',
        'rgba(158, 102, 171, 1)'
      ],
      borderWidth: 1
    }]
  };
}

function getLineChartData() {
  const province = document.getElementById("provinceSelect").value;
  const isAll = province === "all";
  
  if (isAll) {
    return {
      labels: Object.keys(enrollmentByProvince).sort(),
      datasets: [{
        label: provinceNames[currentLang].all,
        data: getTrendData(province),
        borderColor: 'rgba(78, 121, 167, 1)',
        backgroundColor: 'rgba(78, 121, 167, 0.1)',
        borderWidth: 2,
        tension: 0.1,
        fill: true
      }]
    };
  } else {
    return {
      labels: Object.keys(enrollmentByProvince).sort(),
      datasets: [{
        label: province,
        data: getTrendData(province),
        borderColor: 'rgba(242, 142, 43, 1)',
        backgroundColor: 'rgba(242, 142, 43, 0.1)',
        borderWidth: 2,
        tension: 0.1,
        fill: true
      }]
    };
  }
}

function updateChart1() {
  chart1.data = getBarChartData();
  
  // Mise à jour de l'axe Y selon le type de données
  chart1.options.scales.y.ticks.callback = function(value) {
    if (document.getElementById("dataType").value === "percentage") {
      return value + '%';
    }
    return value.toLocaleString();
  };
  
  chart1.update();
}

function updateChart2() {
  chart2.data = getLineChartData();
  chart2.update();
}
