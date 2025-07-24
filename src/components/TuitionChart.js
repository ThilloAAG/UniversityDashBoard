import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useTranslation } from '../context/LanguageContext';

Chart.register(...registerables);

const TuitionChart = ({ data, title, description }) => {
  const { t } = useTranslation();
  
  // Calculate average tuition by university
  const universityTuitions = data.reduce((acc, item) => {
    if (!acc[item.university]) {
      acc[item.university] = { sum: 0, count: 0 };
    }
    acc[item.university].sum += item.tuition;
    acc[item.university].count++;
    return acc;
  }, {});

  const universities = Object.keys(universityTuitions);
  const averages = universities.map(univ => 
    (universityTuitions[univ].sum / universityTuitions[univ].count).toFixed(0)
  );

  const chartData = {
    labels: universities,
    datasets: [{
      label: t('tuitionFees'),
      data: averages,
      backgroundColor: universities.map(univ => 
        getColorForUniversity(univ)
      ),
      borderColor: '#fff',
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
        font: { size: 18 }
      },
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${t('tuitionFees')}: $${context.raw} CAD`;
          }
        }
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: `${t('tuitionFees')} (CAD)`
        }
      },
      x: {
        title: {
          display: true,
          text: t('university')
        }
      }
    }
  };

  return (
    <div className="chart-container">
      <Bar data={chartData} options={options} />
      <p className="chart-description">{description}</p>
    </div>
  );
};

// Helper function for consistent colors
function getColorForUniversity(university) {
  const colors = {
    'University of Toronto': '#002A5C',
    'McGill University': '#ED1C24',
    'University of British Columbia': '#002145',
    'University of Alberta': '#007C41',
    'Université de Montréal': '#BF2B45',
    'University of Waterloo': '#FFD54F',
    'McMaster University': '#7A003C'
  };
  return colors[university] || '#95A5A6';
}

export default TuitionChart;