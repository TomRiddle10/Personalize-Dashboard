import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

const POINTS_PER_HABIT = 10;
const POINTS_PER_TASK = 5;
const POINTS_PER_STREAK_DAY = 15;
const LEVEL_MULTIPLIER = 100; // Points needed for each level

export function useGamification(completedHabits, completedTasks, currentStreak) {
  const [totalPoints, setTotalPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState(null);

  // Load saved data on mount
  useEffect(() => {
    const savedPoints = storage.load('gamification_points', 0);
    const savedLevel = storage.load('gamification_level', 1);
    const savedAchievements = storage.load('gamification_achievements', []);
    
    setTotalPoints(savedPoints);
    setLevel(savedLevel);
    setUnlockedAchievements(savedAchievements);
  }, []);

  // Calculate points when habits/tasks complete
  useEffect(() => {
    const habitPoints = completedHabits * POINTS_PER_HABIT;
    const taskPoints = completedTasks * POINTS_PER_TASK;
    const streakBonus = currentStreak * POINTS_PER_STREAK_DAY;
    
    const newTotal = habitPoints + taskPoints + streakBonus;
    
    if (newTotal > totalPoints) {
      setTotalPoints(newTotal);
      storage.save('gamification_points', newTotal);
      
      // Check for level up
      const newLevel = Math.floor(newTotal / LEVEL_MULTIPLIER) + 1;
      if (newLevel > level) {
        setLevel(newLevel);
        storage.save('gamification_level', newLevel);
      }
    }
  }, [completedHabits, completedTasks, currentStreak]);

  // Check for new achievements
  useEffect(() => {
    checkAchievements();
  }, [completedHabits, completedTasks, currentStreak, totalPoints]);

  const checkAchievements = () => {
    const achievements = [
      { id: 'first_habit', name: 'First Steps', description: 'Complete your first habit', icon: '👶', condition: completedHabits >= 1 },
      { id: 'habit_master', name: 'Habit Master', description: 'Complete all habits in a day', icon: '🏆', condition: completedHabits >= 3 },
      { id: 'task_warrior', name: 'Task Warrior', description: 'Complete 5 tasks in a day', icon: '⚔️', condition: completedTasks >= 5 },
      { id: 'streak_3', name: '3-Day Streak', description: 'Maintain a 3-day streak', icon: '🔥', condition: currentStreak >= 3 },
      { id: 'streak_7', name: 'Week Champion', description: 'Maintain a 7-day streak', icon: '👑', condition: currentStreak >= 7 },
      { id: 'streak_30', name: 'Monthly Legend', description: 'Maintain a 30-day streak', icon: '🦸', condition: currentStreak >= 30 },
      { id: 'points_100', name: 'Century Club', description: 'Earn 100 points', icon: '💯', condition: totalPoints >= 100 },
      { id: 'points_500', name: 'High Achiever', description: 'Earn 500 points', icon: '🌟', condition: totalPoints >= 500 },
      { id: 'level_5', name: 'Level 5', description: 'Reach level 5', icon: '🎖️', condition: level >= 5 },
      { id: 'level_10', name: 'Elite Player', description: 'Reach level 10', icon: '💎', condition: level >= 10 }
    ];

    achievements.forEach(achievement => {
      if (achievement.condition && !unlockedAchievements.includes(achievement.id)) {
        unlockAchievement(achievement);
      }
    });
  };

  const unlockAchievement = (achievement) => {
    const updated = [...unlockedAchievements, achievement.id];
    setUnlockedAchievements(updated);
    storage.save('gamification_achievements', updated);
    
    // Show achievement notification
    setNewAchievement(achievement);
    setTimeout(() => setNewAchievement(null), 3000);
  };

  const getPointsToNextLevel = () => {
    const nextLevelPoints = level * LEVEL_MULTIPLIER;
    const currentLevelPoints = (level - 1) * LEVEL_MULTIPLIER;
    const progress = totalPoints - currentLevelPoints;
    const needed = nextLevelPoints - currentLevelPoints;
    return { progress, needed, percentage: (progress / needed) * 100 };
  };

  const getAllAchievements = () => {
    return [
      { id: 'first_habit', name: 'First Steps', description: 'Complete your first habit', icon: '👶' },
      { id: 'habit_master', name: 'Habit Master', description: 'Complete all habits in a day', icon: '🏆' },
      { id: 'task_warrior', name: 'Task Warrior', description: 'Complete 5 tasks in a day', icon: '⚔️' },
      { id: 'streak_3', name: '3-Day Streak', description: 'Maintain a 3-day streak', icon: '🔥' },
      { id: 'streak_7', name: 'Week Champion', description: 'Maintain a 7-day streak', icon: '👑' },
      { id: 'streak_30', name: 'Monthly Legend', description: 'Maintain a 30-day streak', icon: '🦸' },
      { id: 'points_100', name: 'Century Club', description: 'Earn 100 points', icon: '💯' },
      { id: 'points_500', name: 'High Achiever', description: 'Earn 500 points', icon: '🌟' },
      { id: 'level_5', name: 'Level 5', description: 'Reach level 5', icon: '🎖️' },
      { id: 'level_10', name: 'Elite Player', description: 'Reach level 10', icon: '💎' }
    ];
  };

  return {
    totalPoints,
    level,
    unlockedAchievements,
    newAchievement,
    getPointsToNextLevel,
    getAllAchievements
  };
}