import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ErrorBoundary } from './ErrorBoundary';
import { BudgetPage } from './Budget';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="App-body">
        <div className="budget-container">
          <ErrorBoundary>
            <BudgetPage />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

export default App;
