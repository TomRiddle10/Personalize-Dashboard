import React, { useState, useEffect } from 'react';
import { LayoutDashboard, BarChart3, Trophy, Timer } from 'lucide-react';
import StatsOverview from './StatsOverview';
import HabitsCard from './HabitsCard';
import TasksCard from './TasksCard';
import StreakCounter from './StreakCounter';
import ProgressRing from './ProgressRing';
import ThemeToggle from './ThemeToggle';
import Analytics from './Analytics';
import LevelProgress from './LevelProgress';
import Achievements from './Achievements';
import AchievementNotification from './AchievementNotification';
import PomodoroTimer from './PomodoroTimer';
import { useHabits } from '../hooks/useHabits';
import { useTasks } from '../hooks/useTasks';
import { useStreak } from '../hooks/useStreak';
import { useGamification } from '../hooks/useGamification';

export default function Dashboard() {
  const [mood, setMood] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard', 'analytics', 'achievements', 'timer'

  // Use custom hooks
  const {
    habits,
    toggleHabit,
    incrementCounter,
    decrementCounter,
    addCustomHabit,
    deleteHabit,
    completedHabits,
    totalHabits
  } = useHabits();

  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    selectedCategory,
    setSelectedCategory,
    getCategoryCount,
    completedTasks,
    totalTasks
  } = useTasks();

  // Use streak hook
  const { currentStreak, bestStreak } = useStreak(
    completedHabits,
    totalHabits,
    completedTasks,
    totalTasks
  );

  // Use gamification hook
  const {
    totalPoints,
    level,
    unlockedAchievements,
    newAchievement,
    getPointsToNextLevel,
    getAllAchievements
  } = useGamification(completedHabits, completedTasks, currentStreak);

  // Show confetti when all habits are complete
  useEffect(() => {
    if (completedHabits === totalHabits && totalHabits > 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [completedHabits, totalHabits]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6 transition-colors duration-300">
      <ThemeToggle />
      
      {/* Achievement Notification */}
      <AchievementNotification achievement={newAchievement} />
      
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <span className="text-2xl">🎉</span>
            </div>
          ))}
        </div>
      )}

      <div className="max-w-6xl mx-auto animate-fade-in">
        {/* Header with View Toggle */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2 transition-colors">
              My Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 transition-colors">
              Track your day, one habit at a time
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-md">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded transition-all ${
                activeView === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <LayoutDashboard size={18} />
              <span className="font-medium hidden sm:inline">Dashboard</span>
            </button>
            <button
              onClick={() => setActiveView('analytics')}
              className={`flex items-center gap-2 px-4 py-2 rounded transition-all ${
                activeView === 'analytics'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <BarChart3 size={18} />
              <span className="font-medium hidden sm:inline">Analytics</span>
            </button>
            <button
              onClick={() => setActiveView('achievements')}
              className={`flex items-center gap-2 px-4 py-2 rounded transition-all ${
                activeView === 'achievements'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Trophy size={18} />
              <span className="font-medium hidden sm:inline">Rewards</span>
            </button>
            <button
              onClick={() => setActiveView('timer')}
              className={`flex items-center gap-2 px-4 py-2 rounded transition-all ${
                activeView === 'timer'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Timer size={18} />
              <span className="font-medium hidden sm:inline">Timer</span>
            </button>
          </div>
        </div>

        {/* Conditional Rendering */}
        {activeView === 'dashboard' && (
          <>
            {/* Level Progress */}
            <div className="mb-6 animate-slide-up">
              <LevelProgress 
                level={level} 
                totalPoints={totalPoints} 
                getPointsToNextLevel={getPointsToNextLevel} 
              />
            </div>

            {/* Streak Counter */}
            <div className="animate-slide-up">
              <StreakCounter currentStreak={currentStreak} bestStreak={bestStreak} />
            </div>

            {/* Stats Overview with Progress Ring */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center justify-center transition-colors">
                <h3 className="text-sm text-gray-600 dark:text-gray-300 mb-3">Overall Progress</h3>
                <ProgressRing 
                  completed={completedHabits + completedTasks} 
                  total={totalHabits + totalTasks}
                  size={100}
                  strokeWidth={8}
                  color="#4F46E5"
                />
              </div>
              <div className="md:col-span-3">
                <StatsOverview 
                  completedTasks={completedTasks}
                  totalTasks={totalTasks}
                  completedHabits={completedHabits}
                  mood={mood}
                  setMood={setMood}
                />
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <HabitsCard 
                habits={habits}
                toggleHabit={toggleHabit}
                incrementCounter={incrementCounter}
                decrementCounter={decrementCounter}
                addCustomHabit={addCustomHabit}
                deleteHabit={deleteHabit}
              />
              <TasksCard 
                tasks={tasks}
                addTask={addTask}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                getCategoryCount={getCategoryCount}
              />
            </div>
          </>
        )}

        {activeView === 'analytics' && <Analytics />}
        
        {activeView === 'achievements' && (
          <Achievements 
            unlockedAchievements={unlockedAchievements}
            getAllAchievements={getAllAchievements}
          />
        )}

        {activeView === 'timer' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PomodoroTimer />
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                How to use Pomodoro
              </h3>
              <div className="space-y-3 text-gray-600 dark:text-gray-300">
                <p className="flex items-start gap-2">
                  <span className="text-2xl">🍅</span>
                  <span><strong>1.</strong> Choose a task to work on</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-2xl">⏰</span>
                  <span><strong>2.</strong> Work for 25 minutes (Focus Time)</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-2xl">☕</span>
                  <span><strong>3.</strong> Take a 5-minute break</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-2xl">🔁</span>
                  <span><strong>4.</strong> Repeat and stay productive!</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}