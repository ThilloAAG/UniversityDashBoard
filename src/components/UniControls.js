import React from 'react';
import { useTranslation } from '../context/LanguageContext';

const UniversityControls = ({
  selectedUniversities,
  setSelectedUniversities,
  selectedMetrics,
  setSelectedMetrics,
  timeRange,
  setTimeRange
}) => {
  const { t } = useTranslation();
  
  const allUniversities = [
    'University of Toronto',
    'McGill University',
    'University of British Columbia',
    'University of Alberta',
    'Université de Montréal',
    'University of Waterloo',
    'McMaster University'
  ];
  
  const allMetrics = ['undergrad', 'graduate', 'international'];

  const handleUniversityChange = (university) => {
    if (selectedUniversities.includes(university)) {
      setSelectedUniversities(selectedUniversities.filter(u => u !== university));
    } else {
      setSelectedUniversities([...selectedUniversities, university]);
    }
  };

  const handleMetricChange = (metric) => {
    if (selectedMetrics.includes(metric)) {
      setSelectedMetrics(selectedMetrics.filter(m => m !== metric));
    } else {
      setSelectedMetrics([...selectedMetrics, metric]);
    }
  };

  return (
    <div className="data-controls">
      <div className="control-group">
        <h3>{t('selectUniversities')}</h3>
        <div className="checkbox-container">
          {allUniversities.map(university => (
            <label key={university} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedUniversities.includes(university)}
                onChange={() => handleUniversityChange(university)}
              />
              {university}
            </label>
          ))}
        </div>
      </div>
      
      <div className="control-group">
        <h3>{t('selectMetrics')}</h3>
        <div className="checkbox-container">
          {allMetrics.map(metric => (
            <label key={metric} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedMetrics.includes(metric)}
                onChange={() => handleMetricChange(metric)}
              />
              {t(metric)}
            </label>
          ))}
        </div>
      </div>
      
      <div className="control-group">
        <h3>{t('selectYears')}</h3>
        <div className="range-slider">
          <span>{timeRange[0]}</span>
          <input
            type="range"
            min="2015"
            max="2023"
            value={timeRange[0]}
            onChange={(e) => setTimeRange([parseInt(e.target.value), timeRange[1]])}
          />
          <input
            type="range"
            min="2015"
            max="2023"
            value={timeRange[1]}
            onChange={(e) => setTimeRange([timeRange[0], parseInt(e.target.value)])}
          />
          <span>{timeRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default UniversityControls;