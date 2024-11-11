import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App';  // This is the correct path - make sure this line matches exactly
import './styles.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);