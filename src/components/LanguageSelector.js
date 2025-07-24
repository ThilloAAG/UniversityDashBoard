import React from 'react';
import { useTranslation } from '../context/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="language-selector">
      <select 
        value={language} 
        onChange={(e) => setLanguage(e.target.value)}
        aria-label="Select language"
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
    </div>
  );
};

export default LanguageSelector;