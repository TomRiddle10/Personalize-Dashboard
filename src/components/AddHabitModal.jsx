import React, { useState } from 'react';
import { X, Star, Heart, Zap, Coffee, Moon, Sun, Music, Smile } from 'lucide-react';

const iconOptions = [
  { name: 'star', Icon: Star },
  { name: 'heart', Icon: Heart },
  { name: 'zap', Icon: Zap },
  { name: 'coffee', Icon: Coffee },
  { name: 'moon', Icon: Moon },
  { name: 'sun', Icon: Sun },
  { name: 'music', Icon: Music },
  { name: 'smile', Icon: Smile }
];

export default function AddHabitModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('star');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && duration.trim()) {
      onAdd(name, duration, selectedIcon);
      setName('');
      setDuration('');
      setSelectedIcon('star');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Add Custom Habit</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="text-gray-600 dark:text-gray-300" size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Habit Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Habit Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Meditation"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Duration */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Duration / Target
            </label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 10 min"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Icon Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Choose Icon
            </label>
            <div className="grid grid-cols-4 gap-2">
              {iconOptions.map(({ name, Icon }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setSelectedIcon(name)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedIcon === name
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900'
                      : 'border-gray-300 dark:border-gray-600 hover:border-indigo-300'
                  }`}
                >
                  <Icon className={selectedIcon === name ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400'} size={24} />
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Add Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}