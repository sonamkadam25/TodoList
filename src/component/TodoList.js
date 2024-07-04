import React, { useState, useEffect } from 'react';
import '../App.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (task.trim() === '') return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask('');
  };

  const handleRemoveTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleToggleComplete = (index) => {
    const newTasks = tasks.map((t, i) => 
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(newTasks);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div className="todo-list">
      <h1 style={{ color: '#ffffff' }}>To-Do List</h1>
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '10px' }}>Filter:</label>
        <select onChange={handleFilterChange} value={filter}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : 'not-completed'}>
            <span>{task.text}</span>
            <div className="task-buttons">
              <button onClick={() => handleToggleComplete(index)}>
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => handleRemoveTask(index)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;