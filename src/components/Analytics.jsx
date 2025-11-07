import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Award, Target, BarChart3, LineChart as LineChartIcon } from 'lucide-react';
import WeeklyChart from './WeeklyChart';
import { getRecentHistory } from '../utils/storage';

export default function Analytics() {
  const [chartType, setChartType] = useState('line');
  const [weeklyData, setWeeklyData] = useState([]);
  const [stats, setStats] = useState({
    totalDays: 0,
    avgHabits: 0,
    avgTasks: 0,
    bestDay: null
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = () => {
    const history = getRecentHistory(7); // Last 7 days
    
    if (history.length === 0) {
      // Generate sample data for display
      const sampleData = generateSampleData();
      setWeeklyData(sampleData);
      return;
    }

    // Process real history data
    const chartData = history.reverse().map(entry => {
      const date = new Date(entry.timestamp);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      return {
        day: dayName,
        habits: entry.completedHabits,
        tasks: entry.completedTasks,
        date: entry.date
      };
    });

    // Calculate statistics
    const totalDays = history.length;
    const avgHabits = history.reduce((sum, h) => sum + h.completedHabits, 0) / totalDays;
    const avgTasks = history.reduce((sum, h) => sum + h.completedTasks, 0) / totalDays;
    
    const bestDayEntry = history.reduce((best, current) => {
      const currentScore = current.completedHabits + current.completedTasks;
      const bestScore = best.completedHabits + best.completedTasks;
      return currentScore > bestScore ? current : best;
    }, history[0]);

    setWeeklyData(chartData);
    setStats({
      totalDays,
      avgHabits: avgHabits.toFixed(1),
      avgTasks: avgTasks.toFixed(1),
      bestDay: new Date(bestDayEntry.timestamp).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
    });
  };

  const generateSampleData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      day,
      habits: Math.floor(Math.random() * 3) + 1,
      tasks: Math.floor(Math.random() * 5) + 2
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Weekly Analytics</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Track your progress over the last 7 days</p>
        </div>
        
        {/* Chart Type Toggle */}
        <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <button
            onClick={() => setChartType('line')}
            className={`p-2 rounded transition-all ${
              chartType === 'line' 
                ? 'bg-white dark:bg-gray-700 shadow-md' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            title="Line Chart"
          >
            <LineChartIcon size={20} className="text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`p-2 rounded transition-all ${
              chartType === 'bar' 
                ? 'bg-white dark:bg-gray-700 shadow-md' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            title="Bar Chart"
          >
            <BarChart3 size={20} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={20} />
            <span className="text-sm font-medium">Days Tracked</span>
          </div>
          <div className="text-3xl font-bold">{stats.totalDays}</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Target size={20} />
            <span className="text-sm font-medium">Avg Habits/Day</span>
          </div>
          <div className="text-3xl font-bold">{stats.avgHabits}</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={20} />
            <span className="text-sm font-medium">Avg Tasks/Day</span>
          </div>
          <div className="text-3xl font-bold">{stats.avgTasks}</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Award size={20} />
            <span className="text-sm font-medium">Best Day</span>
          </div>
          <div className="text-sm font-bold">{stats.bestDay || 'N/A'}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Completion Trend
        </h3>
        <WeeklyChart data={weeklyData} type={chartType} />
      </div>

      {/* Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          📊 Insights
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💪</span>
            <div>
              <p className="font-medium text-gray-800 dark:text-white">Keep up the momentum!</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You're averaging {stats.avgHabits} habits per day. Try to maintain consistency!
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <p className="font-medium text-gray-800 dark:text-white">Task completion</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You're completing {stats.avgTasks} tasks daily. Great productivity!
              </p>
            </div>
          </div>

          {stats.bestDay && (
            <div className="flex items-start gap-3">
              <span className="text-2xl">⭐</span>
              <div>
                <p className="font-medium text-gray-800 dark:text-white">Best performance</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your best day was {stats.bestDay}. What made it special?
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}