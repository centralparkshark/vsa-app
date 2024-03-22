
import  { useState } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [displayInput, setDisplayInput] = useState({displayed: false, text: 'Add Task'})

  const handleAddTask = () => {
      setDisplayInput(prevState => ({
        ...prevState,
        displayed: !prevState.displayed, 
        text: prevState.displayed ? 'Add Task' : 'Add'
      }));
   
    // const taskName = prompt('Enter task name:');
    // if (taskName) {
    //   setTasks([...tasks, { name: taskName, completed: false }]);
    // }
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
      <ul className=' pb-2'>
        {tasks.map((task, index) => (
          <li key={index} className=' flex gap-2 py-2'>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(index)}
            />
            <span className=' text-lg' style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'gray' : 'white' }}>
              {task.name}
            </span>
          </li>
        ))}
      </ul>
      <div className=' flex place-content-between'>
        {displayInput.displayed && <input 
          type="text"
          className=' card h-6 text-left'
        />}
        <div className=" card max-w-fit px-2 py-1" onClick={handleAddTask} style={{ background: displayInput.displayed ? '#D31145' : ''}}>{displayInput.text}</div>
      </div>
      </div>
  )
}

export default TaskList;
