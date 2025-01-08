import React from 'react';
import Header from './components/Header';
import FinancialDataTable from './components/FinancialDataTable';
import { DarkModeProvider } from './contexts/DarkModeContext';

const App = () => {
  return (
    <DarkModeProvider>
      <div className="min-h-screen min-w-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="pt-16">
          <FinancialDataTable />
        </div>
      </div>
    </DarkModeProvider>
  );
};

export default App;