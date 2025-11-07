import React from 'react';
import { Award, Zap } from 'lucide-react';

export default function LevelProgress({ level, totalPoints, getPointsToNextLevel }) {
  const { progress, needed, percentage } = getPointsToNextLevel();

  return (
    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg shadow-lg p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white bg-opacity-20 rounded-full">
            <Award size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Level {level}</h3>
            <p className="text-sm opacity-90">{totalPoints} XP</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-yellow-300">
            <Zap size={20} fill="currentColor" />
            <span className="text-2xl font-bold">+{progress}</span>
          </div>
          <p className="text-xs opacity-90">/ {needed} to Level {level + 1}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="h-3 bg-white bg-opacity-20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <p className="text-xs mt-2 text-center opacity-90">
          {Math.round(percentage)}% to next level
        </p>
      </div>
    </div>
  );
}