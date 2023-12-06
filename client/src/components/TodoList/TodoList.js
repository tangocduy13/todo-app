import React, { useState } from "react";
import useFetchApi from "../hooks/useFetchApi";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import NewTodoModal from "../Modal/NewTodoModal"
import Todo from "../Model/Todo";

const TodoList = () => {

  const [showModal, setShowModal] = useState(false)
  const handleCloseModal = () => {
    setShowModal(false)
  }
  const handleShowModal = () => {
    setShowModal(true)
  }
  const addTodo = (newTodo) => {
    setData((prevTodos) => [newTodo, ...prevTodos])
  }
  const removeTodo = async (id) => {
    console.log(id)
    const response = await axios.delete(`http://localhost:5000/api/todos/${id}`)

    if (response.data.success) {
      const updatedTodo = todos.filter((todo) => todo.id !== id)
      setData(updatedTodo);
    }
  }
  const completeTodo = async (id) => {
    const response = await axios.put(`http://localhost:5000/api/todos/${id}`)

    if (response.data.success) {
      const updatedTodo = todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo;
      })
      setData(updatedTodo)
    }
  }

  const { data: todos, setData } = useFetchApi(
    "http://localhost:5000/api/todos"
  );

  return (
    <div>
      <Button variant="primary" onClick={handleShowModal}>
        New Todo
      </Button>
      <NewTodoModal
        show={showModal}
        addTodo={addTodo}
        handleCloseModal={handleCloseModal}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <Todo
              todo={todo}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TodoList;
