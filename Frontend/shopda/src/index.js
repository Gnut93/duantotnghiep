import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Đây là App component chính quản lý điều hướng
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
