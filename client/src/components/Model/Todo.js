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
            <td>{todo.title}</td>
            <td>
                <Button
                    size="sm"
                    variant={todo.completed ? "success" : "danger"}
                    onClick={handleComplte}
                >
                    {todo.completed ? "Completed" : "Mark Complete"}
                </Button>
            </td>
            <td>
                <Button
                    size="sm"
                    variant="danger"
                    onClick={handDelete}
                >
                    X
                </Button>
            </td>
        </tr>
    )
}

export default Todo;
