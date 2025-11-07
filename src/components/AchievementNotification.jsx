import React from 'react';
import { Trophy } from 'lucide-react';

export default function AchievementNotification({ achievement }) {
  if (!achievement) return null;

  return (
    <div className="fixed top-20 right-6 z-50 animate-slide-up">
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg shadow-2xl p-4 min-w-[300px] border-4 border-yellow-300">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white bg-opacity-30 rounded-full animate-bounce">
            <Trophy size={24} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide">Achievement Unlocked!</p>
            <h4 className="text-lg font-bold flex items-center gap-2">
              <span>{achievement.icon}</span>
              {achievement.name}
            </h4>
            <p className="text-sm opacity-90">{achievement.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}