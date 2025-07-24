import React, { useState } from 'react';  
import EnrollmentChart from './components/EnrollmentChart';
import TuitionChart from './components/TuitionChart';
import LanguageSelector from './components/LanguageSelector';
import UniversityControls from './components/UniversityControls';
import { universityData } from './data/Data';
import { useTranslation } from './context/LanguageContext';

function App() {
  const { t } = useTranslation();
  const [selectedUniversities, setSelectedUniversities] = useState(['University of Toronto', 'McGill University']);
  const [selectedMetrics, setSelectedMetrics] = useState(['undergrad', 'international']);
  const [timeRange, setTimeRange] = useState([2018, 2020]);

  const filteredData = universityData.filter(item => 
    selectedUniversities.includes(item.university) && 
    item.year >= timeRange[0] && 
    item.year <= timeRange[1]
  );

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>{t('dashboardTitle')}</h1>
        <LanguageSelector />
      </header>
      
      <div className="dashboard-description">
        <p>{t('dashboardDescription')}</p>
      </div>
      
      <UniversityControls 
        selectedUniversities={selectedUniversities}
        setSelectedUniversities={setSelectedUniversities}
        selectedMetrics={selectedMetrics}
        setSelectedMetrics={setSelectedMetrics}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
      />
      
      <div className="charts-container">
        <EnrollmentChart 
          data={filteredData}
          metrics={selectedMetrics}
          title={t('enrollmentChartTitle')}
          description={t('enrollmentChartDescription')}
        />
        
        <TuitionChart 
          data={filteredData}
          title={t('tuitionChartTitle')}
          description={t('tuitionChartDescription')}
        />
      </div>
      
      <footer className="dashboard-footer">
        <p>{t('dataSource')}</p>
      </footer>
    </div>
  );
}

export default App;