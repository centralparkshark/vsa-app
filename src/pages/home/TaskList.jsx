
import  { useState } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    const taskName = prompt('Enter task name:');
    if (taskName) {
      setTasks([...tasks, { name: taskName, completed: false }]);
    }
  };

  const handleToggleTask = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  //TO-DO: add tasks to db, currently does not save tasks on page refresh
  return (
    <div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(index)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'gray' : 'black' }}>
              {task.name}
            </span>
          </li>
        ))}
      </ul>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  )
}

export default TaskList;
