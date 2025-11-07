import React from 'react';
import { Flame, Trophy } from 'lucide-react';

export default function StreakCounter({ currentStreak, bestStreak }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Current Streak */}
      <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Flame size={28} className="animate-pulse" />
          <h3 className="text-lg font-semibold">Current Streak</h3>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold">{currentStreak}</span>
          <span className="text-xl opacity-90">days</span>
        </div>
        <p className="mt-2 text-sm opacity-90">
          {currentStreak === 0 
            ? "Complete all habits to start your streak!" 
            : currentStreak === 1
            ? "Great start! Keep it going!"
            : "You're on fire! Keep it up! 🔥"}
        </p>
      </div>

      {/* Best Streak */}
      <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Trophy size={28} />
          <h3 className="text-lg font-semibold">Best Streak</h3>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold">{bestStreak}</span>
          <span className="text-xl opacity-90">days</span>
        </div>
        <p className="mt-2 text-sm opacity-90">
          {bestStreak === 0 
            ? "Your record will appear here!" 
            : currentStreak === bestStreak
            ? "🎉 New personal record!"
            : "Can you beat this record?"}
        </p>
      </div>
    </div>
  );
}