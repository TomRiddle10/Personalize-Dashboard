import React from 'react';
import { Briefcase, User, Home, ShoppingCart } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All', icon: null, color: 'gray' },
  { id: 'work', name: 'Work', icon: Briefcase, color: 'blue' },
  { id: 'personal', name: 'Personal', icon: User, color: 'green' },
  { id: 'home', name: 'Home', icon: Home, color: 'orange' },
  { id: 'shopping', name: 'Shopping', icon: ShoppingCart, color: 'purple' }
];

export default function CategoryFilter({ selected, onSelect, getCategoryCount }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map(category => {
        const Icon = category.icon;
        const isSelected = selected === category.id;
        const count = category.id === 'all' ? null : getCategoryCount(category.id);
        
        return (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
              isSelected
                ? `bg-${category.color}-500 text-white shadow-md`
                : `bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600`
            }`}
            style={{
              backgroundColor: isSelected ? getCategoryColor(category.color) : undefined
            }}
          >
            {Icon && <Icon size={16} />}
            <span>{category.name}</span>
            {count > 0 && (
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                isSelected ? 'bg-white bg-opacity-30' : 'bg-gray-200 dark:bg-gray-600'
              }`}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function getCategoryColor(color) {
  const colors = {
    gray: '#6B7280',
    blue: '#3B82F6',
    green: '#10B981',
    orange: '#F97316',
    purple: '#A855F7'
  };
  return colors[color] || colors.gray;
}