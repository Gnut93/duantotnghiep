import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Đây là App component chính quản lý điều hướng
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {' '}
    <App />
  </Provider>
);

reportWebVitals();
