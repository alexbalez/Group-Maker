import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default class ConfirmModal extends Component {

    render() {
        return (
            <>
                <Modal
                    show={this.props.show}
                    onHide={this.props.onHide}
                    backdrop="static"
                    keyboard={false}
                    id={this.props.id}
                >
                    <Modal.Body>
                        Are you sure you want to delete {this.props.id}?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.onHide}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={this.props.delete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}
