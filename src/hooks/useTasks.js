import { useState } from 'react';

export function useTasks() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review project proposal', completed: false, category: 'work' },
    { id: 2, text: 'Call dentist', completed: false, category: 'personal' }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const addTask = (text, category = 'personal') => {
    if (text.trim()) {
      setTasks(prev => [...prev, {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        category
      }]);
    }
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    if (newText.trim()) {
      setTasks(prev => prev.map(task =>
        task.id === id ? { ...task, text: newText.trim() } : task
      ));
    }
  };

  const updateTaskCategory = (id, category) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, category } : task
    ));
  };

  const clearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  const getFilteredTasks = () => {
    if (selectedCategory === 'all') {
      return tasks;
    }
    return tasks.filter(task => task.category === selectedCategory);
  };

  const getCompletedCount = () => {
    return tasks.filter(task => task.completed).length;
  };

  const getCategoryCount = (category) => {
    return tasks.filter(task => task.category === category).length;
  };

  return {
    tasks: getFilteredTasks(),
    allTasks: tasks,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    updateTaskCategory,
    clearCompleted,
    selectedCategory,
    setSelectedCategory,
    getCategoryCount,
    completedTasks: getCompletedCount(),
    totalTasks: tasks.length
  };
}