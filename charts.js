let chart1, chart2;

function createCharts() {
  const ctx1 = document.getElementById("chart1");
  chart1 = new Chart(ctx1, {
    type: "bar",
    data: {
      labels: provinces,
      datasets: [{
        label: currentYear,
        data: enrollmentByProvince[currentYear],
        backgroundColor: "#4e79a7"
      }]
    }
  });

  const ctx2 = document.getElementById("chart2");
  chart2 = new Chart(ctx2, {
    type: "pie",
    data: {
      labels: ["Femmes", "Hommes"],
      datasets: [{
        data: [60, 40],
        backgroundColor: ["#f28e2b", "#59a14f"]
      }]
    }
  });
}

function updateChart1() {
  currentYear = currentYear === "2022" ? "2023" : "2022";
  chart1.data.datasets[0].data = enrollmentByProvince[currentYear];
  chart1.data.datasets[0].label = currentYear;
  chart1.update();
}

function toggleGenderView() {
  chart2.options.plugins.tooltip.callbacks.label = function (tooltipItem) {
    return tooltipItem.label + ": " + tooltipItem.raw + "%";
  };
  chart2.update();
}
