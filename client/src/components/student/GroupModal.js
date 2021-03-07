import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import '../components.css';
import UserList from './UserList';

class JoinGroupModal extends Component {

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.toggle} onEntered={this.modalShown}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.data.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>College: {this.props.data.college}</p>
                    <p>Campus: {this.props.data.campus}</p>
                    <p>Program: {this.props.data.program}</p>
                    <p>Course: {this.props.data.course}</p>
                    <p>Project: {this.props.data.project}</p>
                    <p>Preferences: {this.props.data.preferences}</p>
                    <p>In this group:</p>
                    {/** need to check if users are loaded before listing */}
                    { this.props.data.users ? <UserList users={this.props.data.users} /> : null}
                    <hr/>
                    <p>{this.props.data.description}</p>
                    <hr/>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={this.props.toggle}>
                        Cancel
                            </button>
                    <button className="btn btn-success" onClick={this.props.handleJoinGroup}>
                        Join Group
                            </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default JoinGroupModal;
