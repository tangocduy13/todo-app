import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { toast } from "react-hot-toast";

function ModalContent({ showModal, handleCloseModal, selectedTodo }) {
  const [id, setId] = useState("");
  const [radioValue, setRadioValue] = useState("false");
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");

  const radios = [
    { name: "Yes", value: "true" },
    { name: "No", value: "false" },
  ];
  useEffect(() => {
    if (selectedTodo) {
      setId(selectedTodo.id);
      setUserId(selectedTodo.userId);
      setTitle(selectedTodo.title);
      setRadioValue(selectedTodo.completed.toString());
    }
  }, [selectedTodo]); // run useeffect whenever selectedTodo change

  const handleRadioChange = (value) => {
    setRadioValue(value);
  };

  const handleSave = () => {
    const newTodo = {
      id: id,
      userId: userId,
      title: title,
      completed: radioValue === "true",
    };
    axios
      .post(`http://localhost:5000/api/todos`, newTodo)
      .then((response) => {
        console.log("Data send successfully", response.data);
        toast.success("Created todo");
        handleCloseModal();
      })
      .catch((error) => {
        toast.error("Create fail. Please check data you have inputed!");
        console.error("Failed to send data to the backend:", error);
        // Handle errors
      });
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>New todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text>ID:</InputGroup.Text>
          <Form.Control
            aria-label="id"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>User:</InputGroup.Text>
          <Form.Control
            type="text"
            aria-label="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Title:</InputGroup.Text>
          <Form.Control
            type="text"
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
        <Button className="" variant="success" onClick={handleSave}>
          Save
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default ModalContent;
