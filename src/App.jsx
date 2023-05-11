import './App.css';
import { useEffect, useState } from 'react';
import CreateTask from './Components/CreateTask';
import ListTasks from './Components/ListTasks';
import { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")))
  }, [])

  return (

    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <div className='main-box border-x-8 border-y-2  border-black min-h-[50%] mt-11 w-5/6 m-auto flex flex-col items-center pt-32 gap-16'>
        <CreateTask tasks={tasks} setTasks={setTasks}></CreateTask>
        <ListTasks tasks={tasks} setTasks={setTasks}></ListTasks>
      </div>
    </DndProvider>
  );
}

export default App;
