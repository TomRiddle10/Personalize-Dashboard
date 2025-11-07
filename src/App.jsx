import React from 'react';
import Dashboard from './components/Dashboard';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;