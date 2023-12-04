import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";

function ModalContent({ showModal, handleCloseModal, selectedTodo }) {
  const [radioValue, setRadioValue] = useState('');

  const radios = [
    { name: 'Yes', value: 'true' },
    { name: 'No', value: 'false' }
  ]
  useEffect(() => {
    if (selectedTodo) {
      setRadioValue(selectedTodo.completed.toString());
    }
  }, [selectedTodo]); // Run whenever selectedTodo changes

  const handleRadioChange = (value) => {
    setRadioValue(value);
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
              <Form.Control aria-label="userId" value={selectedTodo.userId} />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Title:</InputGroup.Text>
              <Form.Control aria-label="userId" value={selectedTodo.title} />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Done:</InputGroup.Text>
              <ButtonGroup>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={idx % 2 ? 'outline-danger' : 'outline-success'}
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
            <Button className="" variant="success">
              Save
            </Button>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ModalContent;
