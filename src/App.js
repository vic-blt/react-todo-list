import React, {useState} from "react";
import {nanoid} from 'nanoid';
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

export default function () {
    const [tasks, setTasks] = useState([])
    const [filter, setFilter] = useState('All')

    const addTask = name => setTasks(prevState => [
        ...prevState,
        {name, completed: false, id: `todo-${nanoid()}`}
    ])

    const removeTask = id => setTasks(prevState => prevState.filter(task => task.id !== id))

    const editTask = (id, name) => {
        let index = tasks.findIndex(task => task.id === id)

        setTasks(prevState => {
            let tasks = [...prevState]
            tasks[index].name = name
            return tasks
        })
    }

    const toggleTaskCompleted = (id, checked) => {
        let index = tasks.findIndex(task => task.id === id)

        setTasks(prevState => {
            let tasks = [...prevState]
            tasks[index].completed = checked
            return tasks
        })
    }

    const taskActions = {removeTask, editTask, toggleTaskCompleted}

    const filterList = FILTER_NAMES
        .map(name =>
            <FilterButton key={name} name={name} setFilter={setFilter} isPressed={name === filter} />
        )

    const taskList = tasks
        .filter(task => FILTER_MAP[filter](task))
        .map(task =>
            <Todo {...task} key={task.id} {...taskActions} />
        )

    return (
        <div className="todoapp stack-large">
            <h1>TodoMatic</h1>
            <Form addTask={addTask} />
            <div className="filters btn-group stack-exception">
                {filterList}
            </div>
            <h2 id="list-heading">{tasks.length} task(s) remaining</h2>
            <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
                {taskList}
            </ul>
        </div>
    )
}
