import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Timer } from 'lucide-react';

const WORK_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 5 * 60; // 5 minutes

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft]);

  const handleTimerComplete = () => {
    setIsActive(false);
    
    if (!isBreak) {
      // Work session complete - start break
      setCompletedSessions(prev => prev + 1);
      setIsBreak(true);
      setTimeLeft(BREAK_TIME);
      playSound();
    } else {
      // Break complete - ready for next work session
      setIsBreak(false);
      setTimeLeft(WORK_TIME);
      playSound();
    }
  };

  const playSound = () => {
    // Simple beep using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(WORK_TIME);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isBreak 
    ? ((BREAK_TIME - timeLeft) / BREAK_TIME) * 100
    : ((WORK_TIME - timeLeft) / WORK_TIME) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
      <div className="flex items-center gap-2 mb-4">
        <Timer className="text-red-500" size={24} />
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          Pomodoro Timer
        </h3>
      </div>

      {/* Timer Display */}
      <div className="relative mb-6">
        <svg className="w-full h-48" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 80}`}
            strokeDashoffset={`${2 * Math.PI * 80 * (1 - progress / 100)}`}
            className={isBreak ? 'text-green-500' : 'text-red-500'}
            style={{ transform: 'rotate(-90deg)', transformOrigin: '100px 100px' }}
          />
        </svg>
        
        {/* Timer Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold text-gray-800 dark:text-white mb-2">
            {formatTime(timeLeft)}
          </div>
          <div className="flex items-center gap-2">
            {isBreak ? (
              <>
                <Coffee size={16} className="text-green-500" />
                <span className="text-sm font-medium text-green-500">Break Time</span>
              </>
            ) : (
              <>
                <Timer size={16} className="text-red-500" />
                <span className="text-sm font-medium text-red-500">Focus Time</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          onClick={toggleTimer}
          className={`p-4 rounded-full transition-all transform hover:scale-110 ${
            isActive
              ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isActive ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          onClick={resetTimer}
          className="p-4 rounded-full bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 transition-all transform hover:scale-110"
        >
          <RotateCcw size={24} className="text-gray-700 dark:text-gray-200" />
        </button>
      </div>

      {/* Sessions Counter */}
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Completed Sessions: <span className="font-bold text-indigo-600 dark:text-indigo-400">{completedSessions}</span>
        </p>
        <div className="flex justify-center gap-1 mt-2">
          {[...Array(completedSessions)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-red-500" />
          ))}
        </div>
      </div>
    </div>
  );
}