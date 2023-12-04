import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";

function ModalContent({ showModal, handleCloseModal, selectedTodo }) {
  const [radioValue, setRadioValue] = useState("");
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");

  const radios = [
    { name: "Yes", value: "true" },
    { name: "No", value: "false" },
  ];
  useEffect(() => {
    if (selectedTodo) {
      setUserId(selectedTodo.userId);
      setTitle(selectedTodo.title);
      setRadioValue(selectedTodo.completed.toString());
    }
  }, [selectedTodo]); // Run whenever selectedTodo changes

  const handleRadioChange = (value) => {
    setRadioValue(value);
  };

  const handleSave = () => {
    const updatedTodo = {
      userId: userId,
      title: title,
      completed: radioValue === "true",
    };
    axios
      .put(`http://localhost:5000/api/todos/${selectedTodo.id}`, updatedTodo)
      .then((response) => {
        console.log("Data send successfully", response.data);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Failed to send data to the backend:", error);
        // Handle errors
      });
  };

  const handleDeleteTodo = () => {
    axios
      .delete(`http://localhost:5000/api/todos/${selectedTodo.id}`)
      .then((response) => {
        console.log("Deleted one todo", response.data);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Failed to send data to the backend:", error);
        // Handle errors
      });
  };
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedTodo && (
          <>
            <InputGroup className="mb-3">
              <InputGroup.Text>ID:</InputGroup.Text>
              <Form.Control aria-label="id" value={selectedTodo.id} disabled />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>User:</InputGroup.Text>
              <Form.Control
                aria-label="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Title:</InputGroup.Text>
              <Form.Control
                aria-label="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Done:</InputGroup.Text>
              <ButtonGroup>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={idx % 2 ? "outline-danger" : "outline-success"}
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => handleRadioChange(e.currentTarget.value)}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </InputGroup>
            <div className="d-flex align-items-center justify-content-between">
              <Button className="mr-2" variant="success" onClick={handleSave}>
                Save
              </Button>
              <Button
                className="mr-2"
                variant="danger"
                onClick={handleDeleteTodo}
              >
                Delete
              </Button>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ModalContent;
