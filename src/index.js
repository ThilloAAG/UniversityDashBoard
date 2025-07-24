import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';  // Important: This must match your filename exactly
import { LanguageProvider } from './context/LanguageContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);