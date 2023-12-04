import React, { useState } from "react";
import useFetchApi from "../../hooks/useFetchApi";
import Table from "react-bootstrap/Table";
import ModalContent from "../Modal/ModalContent";

function ToDoTable() {
    const { data: todos, loading } = useFetchApi(
        "http://localhost:5000/api/todos"
    );
    const [showModal, setShowModal] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
}