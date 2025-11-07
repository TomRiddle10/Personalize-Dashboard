import { useState, useEffect } from 'react';
import { calculateStreak, getBestStreak, saveTodayToHistory } from '../utils/storage';

export function useStreak(completedHabits, totalHabits, completedTasks, totalTasks) {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  // Calculate streaks on mount and when data changes
  useEffect(() => {
    const streak = calculateStreak();
    const best = getBestStreak();
    
    setCurrentStreak(streak);
    setBestStreak(best);
  }, [completedHabits, totalHabits]);

  // Save today's data to history whenever it changes
  useEffect(() => {
    saveTodayToHistory(completedHabits, totalHabits, completedTasks, totalTasks);
  }, [completedHabits, totalHabits, completedTasks, totalTasks]);

  return {
    currentStreak,
    bestStreak
  };
}