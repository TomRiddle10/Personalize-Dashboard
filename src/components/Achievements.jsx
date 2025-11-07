import React from 'react';
import { Lock } from 'lucide-react';

export default function Achievements({ unlockedAchievements, getAllAchievements }) {
  const allAchievements = getAllAchievements();
  const unlockedCount = unlockedAchievements.length;
  const totalCount = allAchievements.length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          Achievements
        </h3>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {unlockedCount}/{totalCount}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {allAchievements.map(achievement => {
          const isUnlocked = unlockedAchievements.includes(achievement.id);
          
          return (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg text-center transition-all ${
                isUnlocked
                  ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 shadow-md scale-100'
                  : 'bg-gray-100 dark:bg-gray-700 opacity-50 grayscale'
              }`}
              title={achievement.description}
            >
              <div className="text-4xl mb-2 relative">
                {isUnlocked ? (
                  <span className="animate-bounce-in">{achievement.icon}</span>
                ) : (
                  <div className="flex items-center justify-center">
                    <Lock className="text-gray-400" size={32} />
                  </div>
                )}
              </div>
              <p className={`text-xs font-semibold ${
                isUnlocked 
                  ? 'text-gray-800 dark:text-yellow-100' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {achievement.name}
              </p>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600 dark:text-gray-400">Collection Progress</span>
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            {Math.round((unlockedCount / totalCount) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
            style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}