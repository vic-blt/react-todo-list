import React from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

export default function App(props) {
    const taskList = props.tasks.map(({name, completed, id}) => <Todo name={name} completed={completed} id={id} key={id} />)

    return (
        <div className="todoapp stack-large">
            <h1>TodoMatic</h1>
            <Form />
            <div className="filters btn-group stack-exception">
                <FilterButton />
                <FilterButton />
                <FilterButton />
            </div>
            <h2 id="list-heading">3 tasks remaining</h2>
            <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
                {taskList}
            </ul>
        </div>
    );
}
