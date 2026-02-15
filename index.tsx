
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Não foi possível encontrar o elemento root no HTML.");
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Erro ao renderizar a aplicação:", error);
    rootElement.innerHTML = `<div style="padding: 20px; text-align: center;"><h1>Ops! Algo deu errado.</h1><p>Verifique o console do navegador para mais detalhes.</p></div>`;
  }
}
