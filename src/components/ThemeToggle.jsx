import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="text-yellow-500 transition-transform duration-300 rotate-0" size={24} />
      ) : (
        <Moon className="text-indigo-600 transition-transform duration-300 rotate-0" size={24} />
      )}
    </button>
  );
}