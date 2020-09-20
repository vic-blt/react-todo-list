import React, {useState} from "react";
import {nanoid} from 'nanoid';
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

export default function () {
    let [tasks, setTasks] = useState([])

    let addTask = name => setTasks(prevState => [...prevState, {name, completed: false, id: `todo-${nanoid()}`}])

    let removeTask = id => setTasks(prevState => prevState.filter(task => task.id !== id))

    let editTask = (id, name) => {
        let index = tasks.findIndex(task => task.id === id)
        setTasks(prevState => {
            let tasks = [...prevState]
            tasks[index].name = name
            return tasks
        })
    }

    let toggleTaskCompleted = (id, checked) => {
        let index = tasks.findIndex(task => task.id === id)
        setTasks(prevState => {
            let tasks = [...prevState]
            tasks[index].completed = checked
            return tasks
        })
    }

    let taskActions = {removeTask, editTask, toggleTaskCompleted}

    return (
        <div className="todoapp stack-large">
            <h1>TodoMatic</h1>
            <Form addTask={addTask} />
            <div className="filters btn-group stack-exception">
                <FilterButton />
                <FilterButton />
                <FilterButton />
            </div>
            <h2 id="list-heading">{tasks.length} task(s) remaining</h2>
            <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
                {tasks.map(task => <Todo {...task} key={task.id} {...taskActions} />)}
            </ul>
        </div>
    )
}
