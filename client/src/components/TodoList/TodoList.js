import React, { useState } from "react";
import useFetchApi from "../hooks/useFetchApi";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axiosTodo from "../helpers/api/axiosTodo";
import NewTodoModal from "../Modal/NewTodoModal";
import Todo from "../Model/Todo";

const TodoList = () => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };
  const addTodo = (newTodo) => {
    setData((prevTodos) => [newTodo, ...prevTodos]);
  };
  const removeTodo = async (id) => {
    console.log(id);
    const response = await axiosTodo.delete(`/todos/${id}`);

    if (response.data.success) {
      const updatedTodo = todos.filter((todo) => todo.id !== id);
      setData(updatedTodo);
    }
  };
  const completeTodo = async (id) => {
    const response = await axiosTodo.patch(`/todos/${id}`);

    if (response.data.success) {
      const updatedTodo = todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
      setData(updatedTodo);
    }
  };

  const { data: todos, setData } = useFetchApi({ url: "/todos" });

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <NewTodoModal
        show={showModal}
        addTodo={addTodo}
        handleCloseModal={handleCloseModal}
      />
      <Table striped bordered hover>
        <tbody striped bordered hover>
          {todos.map((todo) => (
            <Todo
              todo={todo}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
            />
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleShowModal}>
        New Todo
      </Button>
    </div>
  );
};

export default TodoList;
