import { fetchSourceDocuments } from "./sourceDocumentsSlice";

require("bootstrap-icons/font/bootstrap-icons.css");
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";

export function AddCards() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchSourceDocuments());
  }, [dispatch]);

  return (
    <div className="d-grid gap-0">
      <Button variant={"success"} onClick={handleShow}>
        <i className="bi bi-plus-circle" style={{ paddingRight: 0.5 + "em" }} />
        Add Cards
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Cards</Modal.Title>
        </Modal.Header>
        <Modal.Body>In Progress</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
