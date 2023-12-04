import React, { useState } from "react";
import "./App.css";
import useFetchApi from "../../hooks/useFetchApi";
import Table from "react-bootstrap/Table";
import ModalContent from "../Modal/ModalContent";

function App() {
  const { data: todos, loading } = useFetchApi(
    "http://localhost:5000/api/todos"
  );
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleRowClick = (todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
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
