import React, { useState } from "react";
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import axios from "axios";

const NewTodoModal = ({ show, handleCloseModal, addTodo }) => {
    const [title, setTitle] = useState("");

    const handleCreateTodo = async () => {
        try {
            const { data } = await axios.post(("http://localhost:5000/api/todos"), {
                id: Math.floor(Math.random() * (500 - 11 + 1)) + 11,
                title: title,
                completed: false
            })
            addTodo(data.data)
            console.log(data.data)
            handleCloseModal()
            setTitle("")

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Modal show={show} onHide={handleCloseModal}>
            <Modal.Body>
                <Form.Group controlId='title'>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter todo title here"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleCreateTodo}>
                    Save Todo
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default NewTodoModal;