import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useTranslation } from '../context/LanguageContext';

Chart.register(...registerables);

const EnrollmentChart = ({ data, metrics, title, description }) => {
  const { t } = useTranslation();
  
  // Group data by university and year
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.university]) {
      acc[item.university] = {};
    }
    metrics.forEach(metric => {
      if (!acc[item.university][metric]) {
        acc[item.university][metric] = {};
      }
      acc[item.university][metric][item.year] = item[metric];
    });
    return acc;
  }, {});

  const years = [...new Set(data.map(item => item.year))].sort();
  const universities = Object.keys(groupedData);

  const chartData = {
    labels: years,
    datasets: universities.flatMap(university => 
      metrics.map(metric => ({
        label: `${university} - ${t(metric)}`,
        data: years.map(year => groupedData[university][metric][year] || null),
        borderColor: getColorForUniversity(university, metric),
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 4
      }))
    )
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
        font: { size: 18 }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.raw.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: t('numberOfStudents')
        }
      },
      x: {
        title: {
          display: true,
          text: t('year')
        }
      }
    }
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
      <p className="chart-description">{description}</p>
    </div>
  );
};

// Helper function for consistent colors
function getColorForUniversity(university, metric) {
  const universityColors = {
    'University of Toronto': '#002A5C',
    'McGill University': '#ED1C24',
    'University of British Columbia': '#002145',
    'University of Alberta': '#007C41',
    'Université de Montréal': '#BF2B45'
  };
  
  const metricShades = {
    'undergrad': '100%',
    'graduate': '70%',
    'international': '40%'
  };
  
  const baseColor = universityColors[university] || '#666666';
  return adjustShade(baseColor, metricShades[metric] || '100%');
}

function adjustShade(color, percent) {
  // Simplified color adjustment for demo
  return color.replace(/\)$/, `, ${percent})`).replace(/rgb\(/, 'rgba(');
}

export default EnrollmentChart;