import React, { useState } from 'react';
import { CheckCircle, Circle, Plus, Trash2 } from 'lucide-react';
import CategoryFilter from './CategoryFilter';

const categoryColors = {
  work: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
  personal: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
  home: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400',
  shopping: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400'
};

export default function TasksCard({ tasks, addTask, toggleTask, deleteTask, selectedCategory, setSelectedCategory, getCategoryCount }) {
  const [newTask, setNewTask] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('personal');

  const handleAddTask = () => {
    addTask(newTask, newTaskCategory);
    setNewTask('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Today's Tasks</h2>
      
      {/* Category Filter */}
      <CategoryFilter 
        selected={selectedCategory}
        onSelect={setSelectedCategory}
        getCategoryCount={getCategoryCount}
      />

      {/* Add Task Input */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          />
          <button
            onClick={handleAddTask}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all transform hover:scale-105"
          >
            <Plus size={20} />
          </button>
        </div>
        
        {/* Category Selector for New Task */}
        <div className="flex gap-2">
          {['work', 'personal', 'home', 'shopping'].map(cat => (
            <button
              key={cat}
              onClick={() => setNewTaskCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                newTaskCategory === cat
                  ? categoryColors[cat]
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-2">
        {tasks.map(task => (
          <div
            key={task.id}
            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg group transition-all hover:bg-gray-100 dark:hover:bg-gray-600 animate-slide-up"
          >
            <button onClick={() => toggleTask(task.id)} className="transition-transform hover:scale-110">
              {task.completed ? 
                <CheckCircle className="text-green-600 dark:text-green-400 animate-bounce-in" size={20} /> : 
                <Circle className="text-gray-400" size={20} />
              }
            </button>
            <div className="flex-1">
              <span className={`transition-all block ${task.completed ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-800 dark:text-gray-200'}`}>
                {task.text}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 ${categoryColors[task.category]}`}>
                {task.category}
              </span>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-all transform hover:scale-110"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        
        {/* Empty State */}
        {tasks.length === 0 && (
          <p className="text-gray-400 dark:text-gray-500 text-center py-8 animate-fade-in">
            {selectedCategory === 'all' 
              ? 'No tasks yet. Add one to get started!'
              : `No ${selectedCategory} tasks yet.`
            }
          </p>
        )}
      </div>
    </div>
  );
}