import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { FSContext, createDefaultFS } from './react/ctx.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FSContext.Provider value={createDefaultFS()}>
      <App />
    </FSContext.Provider>
  </React.StrictMode>,
);
