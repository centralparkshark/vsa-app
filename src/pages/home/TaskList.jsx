
import  { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase-config';

const TaskList = () => {
  const [task, setTask] = useState({taskName: '', completed: false})
  const [displayInput, setDisplayInput] = useState({displayed: false, text: 'Add Task'})
  const [taskList, setTaskList] = useState([])

  const tasksInDb = collection(db, 'tasks');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tasks'));
        const fetchedTasks = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          const newTask = {
            id: doc.id,
            taskName: data.taskName,
            completed: data.completed,
            }
            fetchedTasks.push(newTask);
          });
          setTaskList(fetchedTasks)
        } catch (error) {
          console.error('Error retrieving items:', error);
        }
      };
      fetchData();
    }, []);

  //shows/hides input box
  const handleDisplay = () => {
      if (displayInput.displayed === true) {
        handleAdd();
      }
      setDisplayInput(prevState => ({
        ...prevState,
        displayed: !prevState.displayed, 
        text: prevState.displayed ? 'Add Task' : 'Add'
      }));
  };
  
  const handleChange = (e) => {
    const {name, value} = e.target
    setTask({
        ...task,
        [name]: value
    })
  }

  //adds item to DB
  const handleAdd = async () => {
    const newTask = {
      taskName: task.taskName,
      completed: task.completed,
    };
    try {
      const docRef = await addDoc(tasksInDb, newTask);
      newTask.id = docRef.id; // Update id after adding to Firestore
      setTaskList(prevTaskList => [...prevTaskList, newTask]);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDelete = async () => {
    const completedTasks = taskList.filter(task => task.completed);
    if (completedTasks.length > 0) {
      completedTasks.forEach(async task => {
        try {
          await deleteDoc(doc(db, 'tasks', task.id));
          setTaskList(prevTaskList => prevTaskList.filter(item => item.id !== task.id));
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      });
    }
  };

const handleToggleTask = async (taskId) => {
  const updatedTaskList = taskList.map(task => {
    if (task.id === taskId) {
      const updatedTask = { ...task, completed: !task.completed };
      updateDoc(doc(db, 'tasks', taskId), updatedTask); // Update in Firestore
      return updatedTask;
    }
    return task;
  });
  setTaskList(updatedTaskList);
};

  return (
    <div>
      <ul className=' pb-2'>
        {taskList.map((task) => (
          <li key={task.id} className=' flex gap-2 py-2'>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(task.id)}
            />
            <span className=' text-lg' style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'gray' : 'white' }}>
              {task.taskName}
            </span>
          </li>
        ))}
      </ul>
      <div className=' flex place-content-between'>
        {displayInput.displayed && <input 
          type="text"
          className=' card h-6 text-left'
          placeholder='Start typing task..'
          onChange={handleChange}
          name='taskName'
          value={task.taskName}
          autoFocus
        />}
        <div className="addButton card max-w-fit px-2 py-1" onClick={handleDisplay} style={{ background: displayInput.displayed ? '#D31145' : ''}}>{displayInput.text}</div>
        {taskList.length > 0 && <div className="deleteButton card max-w-fit px-2 py-1" onClick={handleDelete}>Clear Completed Tasks</div>}      </div>
      </div>
  )
}

export default TaskList;
