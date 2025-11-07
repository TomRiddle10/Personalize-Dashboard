import React from 'react';
import { Smile, Meh, Frown } from 'lucide-react';

export default function MoodSelector({ mood, setMood }) {
  return (
    <div className="flex gap-2 mt-2">
      <button 
        onClick={() => setMood('happy')}
        className={`p-2 rounded-lg transition-all transform hover:scale-110 ${
          mood === 'happy' 
            ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 animate-bounce-in' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
        aria-label="Happy mood"
      >
        <Smile size={24} />
      </button>

      <button 
        onClick={() => setMood('neutral')}
        className={`p-2 rounded-lg transition-all transform hover:scale-110 ${
          mood === 'neutral' 
            ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 animate-bounce-in' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
        aria-label="Neutral mood"
      >
        <Meh size={24} />
      </button>

      <button 
        onClick={() => setMood('sad')}
        className={`p-2 rounded-lg transition-all transform hover:scale-110 ${
          mood === 'sad' 
            ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 animate-bounce-in' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
        aria-label="Sad mood"
      >
        <Frown size={24} />
      </button>
    </div>
  );
}