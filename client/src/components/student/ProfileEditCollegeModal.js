import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import '../components.css';

class ProfileEditCollegeModal extends Component {

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.toggleShow}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea onChange={this.props.handleChange}
                        name={this.props.name}
                        defaultValue={this.props.text}
                        style={{ width: '100%', height: 500 }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={this.props.toggleShow}>
                        Cancel
                            </button>
                    <button className="btn btn-warning" onClick={this.props.saveChanges}>
                        Save Changes
                            </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ProfileEditCollegeModal;
