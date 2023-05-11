import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import  toast  from 'react-hot-toast';

const ListTasks = ({ tasks, setTasks }) => {

    const [todos, setTodos] = useState([])
    const [inProgress, setInProgress] = useState([])
    const [closed, setClosed] = useState([])

    useEffect(() => {
        const ftodos = tasks?.filter((task) => task.status === "todo")
        const fInProgress = tasks?.filter((task) => task.status === "inProgress")
        const fClosed = tasks?.filter((task) => task.status === "closed")

        setTodos(ftodos)
        setInProgress(fInProgress)
        setClosed(fClosed)

    }, [tasks])

    const statuses = ["todo", "inProgress", "closed"]

    return (

        <div className='flex gap-16'>
            {statuses.map((status, index) => <Section
                key={index}
                status={status}
                tasks={tasks}
                setTasks={setTasks}
                todos={todos}
                inProgress={inProgress}
                closed={closed} />)}
        </div>
    );
};

export default ListTasks;

const Section = ({ status, setTasks, tasks,
    todos,
    inProgress,
    closed }) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => addItemToSection(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    let text = "Todo"
    let bg = "bg-red-500"
    let tasksToMaps = todos

    if (status === "inProgress") {
        text = "In Progress"
        bg = "bg-red-500"
        tasksToMaps = inProgress
    }

    if (status === "closed") {
        text = "Done"
        bg = "bg-red-500"
        tasksToMaps = closed
    }

    const addItemToSection = (id) => {
        setTasks(prev => {
            const mTasks = prev.map(t => {
                if (t.id === id) {
                    return { ...t, status: status }
                }
                return t
            })
            localStorage.setItem("tasks", JSON.stringify(mTasks))
            toast.success("Task status changed")
            return mTasks
        })
    }

    return (
        <div ref={drop} className={`border-2 bg-white border-black rounded-md mb-20 w-64 ${isOver ? " " : " "}`}>
            <Header text={text} bg={bg} count={tasksToMaps?.length} />
            {tasksToMaps?.length > 0 && tasksToMaps?.map((task) => <Task key={task.id}
                task={task} tasks={tasks} setTasks={setTasks} />)}
        </div>
    )
}

const Header = ({ text, bg, count }) => {
    return (
        <div className={`${bg} flex items-center h-12 pl-4 rounded-md text-sm text-black font-semibold`}>{text} {" "}
            <div className='ml-2 bg-white w-6 h-6 text-black rounded-full flex items-center justify-center '>
                {count}
            </div>
        </div>
    )
}

const Task = ({ task, tasks, setTasks }) => {

    const handleRemove = (id) =>{
        const ftasks = tasks.filter(t => t.id !==id)
        localStorage.setItem("tasks", JSON.stringify(ftasks))
        setTasks(ftasks)
        toast.error("Task removed")
    }

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    console.log(isDragging)

    return (

        <div ref={drag} className={`relative w-60 ml-2 mt-8 p-4 bg-slate-300 rounded-md mb-5 cursor-grab border-2 border-black
         ${isDragging ? "opacity-25" : "opacity-100"}`}>

            <p>{task.name}</p>
            <button className='absolute bottom-3 right-1' onClick={() => handleRemove(task.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

            </button>
        </div>
    )
}
