import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App';
import './styles.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red' }}>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

const renderApp = () => {
  try {
    console.log('Starting to render app...');
    const container = document.getElementById('root');
    if (!container) {
      throw new Error('Root container not found');
    }
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Error rendering app:', error);
    document.body.innerHTML = `
      <div style="padding: 20px; color: red;">
        Error loading app: ${error.message}
        <pre>${error.stack}</pre>
      </div>
    `;
  }
};

// Add load event listener
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired');
  renderApp();
});

// Add error logging
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

// Add unhandled promise rejection handling
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});