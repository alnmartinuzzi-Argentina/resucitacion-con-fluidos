import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('Intentando montar aplicación...');

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("No se encontró el elemento root");
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('Aplicación montada exitosamente');
} catch (error) {
  console.error('Error fatal al montar React:', error);
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `<div style="padding:20px;color:red">Error crítico al iniciar la aplicación: ${error}</div>`;
  }
}