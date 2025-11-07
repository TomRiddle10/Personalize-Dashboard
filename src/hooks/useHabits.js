import { useState } from 'react';

export function useHabits() {
  const [habits, setHabits] = useState([
    { id: 'exercise', name: 'Exercise', duration: '30 min', icon: 'dumbbell', completed: false, custom: false },
    { id: 'reading', name: 'Reading', duration: '20 min', icon: 'book', completed: false, custom: false },
    { id: 'water', name: 'Water', target: 8, current: 0, icon: 'droplet', type: 'counter', custom: false }
  ]);

  const toggleHabit = (habitId) => {
    setHabits(prev => prev.map(habit =>
      habit.id === habitId ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  const incrementCounter = (habitId) => {
    setHabits(prev => prev.map(habit =>
      habit.id === habitId && habit.type === 'counter'
        ? { ...habit, current: habit.current + 1 }
        : habit
    ));
  };

  const decrementCounter = (habitId) => {
    setHabits(prev => prev.map(habit =>
      habit.id === habitId && habit.type === 'counter'
        ? { ...habit, current: Math.max(0, habit.current - 1) }
        : habit
    ));
  };

  const addCustomHabit = (name, duration, icon = 'star') => {
    const newHabit = {
      id: `custom-${Date.now()}`,
      name,
      duration,
      icon,
      completed: false,
      custom: true
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const deleteHabit = (habitId) => {
    setHabits(prev => prev.filter(habit => habit.id !== habitId));
  };

  const resetHabits = () => {
    setHabits(prev => prev.map(habit => ({
      ...habit,
      completed: false,
      ...(habit.type === 'counter' && { current: 0 })
    })));
  };

  const getCompletedCount = () => {
    return habits.filter(habit => {
      if (habit.type === 'counter') {
        return habit.current >= habit.target;
      }
      return habit.completed;
    }).length;
  };

  return {
    habits,
    toggleHabit,
    incrementCounter,
    decrementCounter,
    addCustomHabit,
    deleteHabit,
    resetHabits,
    completedHabits: getCompletedCount(),
    totalHabits: habits.length
  };
}