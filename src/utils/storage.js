// Storage utility functions for persisting dashboard data

const STORAGE_KEYS = {
  HABITS: 'dashboard_habits',
  TASKS: 'dashboard_tasks',
  MOOD: 'dashboard_mood',
  LAST_RESET: 'dashboard_last_reset',
  HISTORY: 'dashboard_history' // NEW: Track daily history
};

// Generic storage functions
export const storage = {
  // Save data to localStorage
  save: (key, data) => {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },

  // Load data from localStorage
  load: (key, defaultValue = null) => {
    try {
      const serialized = localStorage.getItem(key);
      if (serialized === null) {
        return defaultValue;
      }
      return JSON.parse(serialized);
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return defaultValue;
    }
  },

  // Remove data from localStorage
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  // Clear all dashboard data
  clearAll: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
};

// Specific storage functions for dashboard data
export const saveHabits = (habits) => {
  return storage.save(STORAGE_KEYS.HABITS, habits);
};

export const loadHabits = () => {
  return storage.load(STORAGE_KEYS.HABITS, {
    exercise: false,
    reading: false,
    water: 0
  });
};

export const saveTasks = (tasks) => {
  return storage.save(STORAGE_KEYS.TASKS, tasks);
};

export const loadTasks = () => {
  return storage.load(STORAGE_KEYS.TASKS, []);
};

export const saveMood = (mood) => {
  return storage.save(STORAGE_KEYS.MOOD, mood);
};

export const loadMood = () => {
  return storage.load(STORAGE_KEYS.MOOD, null);
};

export const saveLastResetDate = () => {
  const today = new Date().toDateString();
  return storage.save(STORAGE_KEYS.LAST_RESET, today);
};

export const loadLastResetDate = () => {
  return storage.load(STORAGE_KEYS.LAST_RESET, null);
};

// Check if data should be reset (new day)
export const shouldResetDailyData = () => {
  const lastReset = loadLastResetDate();
  const today = new Date().toDateString();
  return lastReset !== today;
};

// Reset daily data (habits and mood, keep tasks)
export const resetDailyData = () => {
  saveHabits({
    exercise: false,
    reading: false,
    water: 0
  });
  saveMood(null);
  saveLastResetDate();
};

// NEW: History tracking functions
export const saveHistory = (history) => {
  return storage.save(STORAGE_KEYS.HISTORY, history);
};

export const loadHistory = () => {
  return storage.load(STORAGE_KEYS.HISTORY, {});
};

// Save today's completion data to history
export const saveTodayToHistory = (completedHabits, totalHabits, completedTasks, totalTasks) => {
  const today = new Date().toDateString();
  const history = loadHistory();
  
  history[today] = {
    date: today,
    completedHabits,
    totalHabits,
    completedTasks,
    totalTasks,
    allHabitsComplete: completedHabits === totalHabits,
    timestamp: Date.now()
  };
  
  return saveHistory(history);
};

// Get history for last N days
export const getRecentHistory = (days = 30) => {
  const history = loadHistory();
  const entries = Object.values(history);
  
  // Sort by timestamp (most recent first)
  entries.sort((a, b) => b.timestamp - a.timestamp);
  
  return entries.slice(0, days);
};

// Calculate current streak
export const calculateStreak = () => {
  const history = loadHistory();
  const entries = Object.values(history);
  
  // Sort by date (most recent first)
  entries.sort((a, b) => b.timestamp - a.timestamp);
  
  let streak = 0;
  let checkDate = new Date();
  
  for (let i = 0; i < entries.length; i++) {
    const entryDate = checkDate.toDateString();
    const entry = history[entryDate];
    
    if (!entry || !entry.allHabitsComplete) {
      break;
    }
    
    streak++;
    checkDate.setDate(checkDate.getDate() - 1);
  }
  
  return streak;
};

// Get best streak ever
export const getBestStreak = () => {
  const history = loadHistory();
  const entries = Object.values(history);
  
  // Sort by date
  entries.sort((a, b) => a.timestamp - b.timestamp);
  
  let currentStreak = 0;
  let bestStreak = 0;
  let previousDate = null;
  
  entries.forEach(entry => {
    if (entry.allHabitsComplete) {
      const entryDate = new Date(entry.timestamp);
      
      if (previousDate) {
        const dayDiff = Math.floor((entryDate - previousDate) / (1000 * 60 * 60 * 24));
        
        if (dayDiff === 1) {
          currentStreak++;
        } else {
          bestStreak = Math.max(bestStreak, currentStreak);
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
      }
      
      previousDate = entryDate;
    } else {
      bestStreak = Math.max(bestStreak, currentStreak);
      currentStreak = 0;
      previousDate = null;
    }
  });
  
  return Math.max(bestStreak, currentStreak);
};