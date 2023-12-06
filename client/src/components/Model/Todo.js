import React from "react";
import Button from "react-bootstrap/Button";

const Todo = ({ todo, completeTodo, removeTodo }) => {

    const handleComplte = () => {
        completeTodo(todo.id)
    }

    const handDelete = () => {
        removeTodo(todo.id)
    }

    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.title}</td>
            <td>
                <Button
                    variant={todo.completed ? "success" : "danger"}
                    onClick={handleComplte}
                >
                    {todo.completed ? "Completed" : "Mark Complete"}
                </Button>
            </td>
            <td>
                <Button
                    variant="danger"
                    onClick={handDelete}
                >
                    Delete
                </Button>
            </td>
        </tr>
    )
}

export default Todo;
