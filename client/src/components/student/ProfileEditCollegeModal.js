import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import '../components.css';

class ProfileEditCollegeModal extends Component {
    constructor(props){
        super(props)
        this.state = {

        }

    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        // console.log("--handleChange: ", e.target.name, e.target.value)
    }

    saveData = () => {
        // this.props.save({
            
        // })
        console.log(this.props.data)
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.toggle}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea onChange={this.handleChange}
                        name={this.props.name}
                        defaultValue={this.props.text}
                        style={{ width: '100%', height: 500 }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={this.props.toggle}>
                        Cancel
                            </button>
                    <button className="btn btn-warning" onClick={this.saveData}>
                        Save Changes
                            </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ProfileEditCollegeModal;
