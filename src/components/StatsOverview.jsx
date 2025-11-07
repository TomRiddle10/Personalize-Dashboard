import React from 'react';
import MoodSelector from './MoodSelector';

export default function StatsOverview({ completedTasks, totalTasks, completedHabits, mood, setMood }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Tasks Completed Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tasks Completed</div>
        <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 transition-colors">
          {completedTasks}/{totalTasks}
        </div>
      </div>

      {/* Habits Done Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Habits Done</div>
        <div className="text-3xl font-bold text-green-600 dark:text-green-400 transition-colors">
          {completedHabits}/3
        </div>
      </div>

      {/* Mood Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Today's Mood</div>
        <MoodSelector mood={mood} setMood={setMood} />
      </div>
    </div>
  );
}