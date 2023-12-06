import React, { useEffect, useState } from "react";
import "./App.css";
import useFetchApi from "../../hooks/useFetchApi";
import Table from "react-bootstrap/Table";
import ModalContent from "../Modal/ModalContent";
import Button from "react-bootstrap/esm/Button";
import ModalAddContent from "../Modal/NewTodoContent";

function App() {
  const {
    data: todos,
    loading,
    refetchData,
  } = useFetchApi("http://localhost:5000/api/todos");
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showNewTodoModal, setShowNewTodoModal] = useState(false);

  const handleRowClick = (todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    refetchData();
  };

  const handleNewTodo = () => {
    setShowNewTodoModal(true);
  };

  const handleCloseNewTodoModal = async () => {
    setShowNewTodoModal(false);
    return await refetchData();
  };

  return (
    <div>
      <Button onClick={handleNewTodo}>New Todo</Button>
      <ModalAddContent
        showModal={showNewTodoModal}
        handleCloseModal={handleCloseNewTodoModal}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Title</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id} onClick={() => handleRowClick(todo)}>
              <td>{todo.id}</td>
              <td>{todo.userId}</td>
              <td>{todo.title}</td>
              <td>{todo.completed ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ModalContent
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        selectedTodo={selectedTodo}
      />
    </div>
  );
}

export default App;
