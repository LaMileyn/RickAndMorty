import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Импорт стилей для бутстрапа
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);

