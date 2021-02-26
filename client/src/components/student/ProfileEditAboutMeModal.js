import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import '../components.css';

class ProfileEditAboutMeModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            // data: this.props.data,
            firstname: this.props.data.firstname,
            lastname: this.props.data.lastname,
            phone: this.props.data.phone,
            about: this.props.data.about,
            interests: this.props.data.interests,
            skills: this.props.data.skills
        }

        this.handleChange = this.handleChange.bind(this)
        this.saveData = this.saveData.bind(this)
    }

    handleChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    saveData(){
        this.props.save({
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phone: this.state.phone,
            about: this.state.about,
            interests: this.state.interests,
            skills: this.state.skills
        })
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.toggle}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-row mb-2">
                        <input className="form-control" onChange={this.handleChange} defaultValue={this.state.firstname} name="firstname" />
                    </div>

                    <div className="form-row mb-2">
                        <input className="form-control" onChange={this.handleChange} defaultValue={this.state.lastname} name="lastname" />
                    </div>

                    <div className="form-row mb-2">
                        <input className="form-control" onChange={this.handleChange} defaultValue={this.state.phone} name="phone" />
                    </div>

                    <div className="form-row mb-2">
                        <textarea style={{height: 300}} className="form-control" onChange={this.handleChange} defaultValue={this.state.about} name="about" />
                    </div>
                    
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={this.props.toggle}>Cancel</button>
                    <button className="btn btn-warning" onClick={this.saveData}>Save Changes</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ProfileEditAboutMeModal;
