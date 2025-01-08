import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';

const Header = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:mx-20">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-8 w-auto"
              src="https://valueglance.com/assets/landing_logo-b7aad0b9.png"
              alt="ValueGlance"
            />
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-gray-800 dark:text-yellow-300" />
            ) : (
              <Moon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;