
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
  const handleDisplay = (submit) => {
    submit.preventDefault();
    if (displayInput.displayed === true) {
        handleAdd();
        setTask({ taskName: '', completed: false });
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
    if (task.taskName.length > 1) {
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
      <form onSubmit={handleDisplay} className="max-w-screen mx-auto">
        <div className=' flex gap-4 flex-wrap w-full justify-end'>
          <div className='inputAdd flex gap-4 w-full'>
            {displayInput.displayed && <input 
              type="text"
              className=' card h-6 text-left w-full'
              placeholder='Start typing task..'
              onChange={handleChange}
              name='taskName'
              value={task.taskName}
              autoFocus
              autoComplete='off'
            />}
            <button className="addButton card max-w-fit px-2 py-1 text-hhcWhite" 
              type="submit" style={{ background: displayInput.displayed ? '#D31145' : '#494949'}}>
                {displayInput.text}
              </button>
          </div>
          {taskList.length > 0 && <button className="deleteButton card max-w-fit px-2 py-1 text-hhcWhite justify-end" type="button" onClick={handleDelete} style={{ background: '#353535'}}>Clear Completed Tasks</button>}      
        </div>
      </form>
    </div>
  )
}

export default TaskList;
