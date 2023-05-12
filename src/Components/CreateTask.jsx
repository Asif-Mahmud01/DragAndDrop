import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const CreateTask = ({ tasks, setTasks }) => {

    console.log(tasks)

    const [task, setTask] = useState({
        id: "",
        name: "",
        status: "todo" //Can also be progressed and closed
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        if (task?.name?.length < 1) return toast.error("This field cannot be empty")

        setTasks((prev) => {
            console.log(prev)
            const list = [...prev, task]
            localStorage.setItem("tasks", JSON.stringify(list))
            return list
        })

        toast.success("Task created")

        setTask({
            id: "",
            name: "",
            status: "todo"
        })

    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" className='border-2 border-black bg-white rounded-md mr-4 h-12 w-64 px-1'
               placeholder='Write your task' value={task.name}
                onChange={(e) => setTask({ ...task, id: uuidv4(), name: e.target.value })} />
            <button className='text-red-500 rounded-md px-4 h-12 bg-white border-black border-2 text-1xl font-bold'>Add</button>
        </form>
    );
};

export default CreateTask;