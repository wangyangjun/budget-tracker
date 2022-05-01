import React from 'react';

import logo from './logo.svg';
import './App.css';
import { ErrorBoundary } from './ErrorBoundary';
import { BudgetPage } from './Budget';
import { Link } from '@mui/material';

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
      <footer>
        <Link href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </Link>
      </footer>
    </div>
  );
}

export default App;
