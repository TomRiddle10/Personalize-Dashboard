import React, { useState } from 'react';
import { CheckCircle, Circle, Droplet, Book, Dumbbell, Star, Heart, Zap, Coffee, Moon, Sun, Music, Smile, Plus, Trash2 } from 'lucide-react';
import AddHabitModal from './AddHabitModal';

const iconMap = {
  dumbbell: Dumbbell,
  book: Book,
  droplet: Droplet,
  star: Star,
  heart: Heart,
  zap: Zap,
  coffee: Coffee,
  moon: Moon,
  sun: Sun,
  music: Music,
  smile: Smile
};

export default function HabitsCard({ habits, toggleHabit, incrementCounter, decrementCounter, addCustomHabit, deleteHabit }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderHabit = (habit) => {
    const Icon = iconMap[habit.icon] || Star;
    const isComplete = habit.type === 'counter' ? habit.current >= habit.target : habit.completed;

    // Counter type habit (like water)
    if (habit.type === 'counter') {
      return (
        <div key={habit.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors group">
          <Icon className={isComplete ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'} />
          <span className="flex-1 text-gray-800 dark:text-gray-200">
            {habit.name} ({habit.target} {habit.duration || 'glasses'})
          </span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => decrementCounter(habit.id)}
              className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center font-bold transition-all transform hover:scale-110"
            >
              -
            </button>
            <span className="font-semibold text-lg w-8 text-center text-gray-800 dark:text-gray-200">
              {habit.current}
            </span>
            <button 
              onClick={() => incrementCounter(habit.id)}
              className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center font-bold transition-all transform hover:scale-110"
            >
              +
            </button>
          </div>
          {habit.custom && (
            <button
              onClick={() => deleteHabit(habit.id)}
              className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-all"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      );
    }

    // Regular toggle habit
    return (
      <div 
        key={habit.id}
        onClick={() => toggleHabit(habit.id)}
        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-all transform hover:scale-102 group"
      >
        <Icon className={isComplete ? 'text-green-600 dark:text-green-400' : 'text-gray-400'} />
        {isComplete ? 
          <CheckCircle className="text-green-600 dark:text-green-400 animate-bounce-in" size={24} /> : 
          <Circle className="text-gray-400" size={24} />
        }
        <span className={`flex-1 ${isComplete ? 'text-gray-800 dark:text-gray-300 line-through' : 'text-gray-800 dark:text-gray-200'}`}>
          {habit.name} ({habit.duration})
        </span>
        {habit.custom && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteHabit(habit.id);
            }}
            className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-all"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Daily Habits</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all transform hover:scale-110"
          title="Add custom habit"
        >
          <Plus size={20} />
        </button>
      </div>
      
      <div className="space-y-4">
        {habits.map(habit => renderHabit(habit))}
      </div>

      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addCustomHabit}
      />
    </div>
  );
}