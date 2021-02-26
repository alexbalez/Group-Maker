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

        this.addInterest = this.addInterest.bind(this)
        this.deleteInterest = this.deleteInterest.bind(this)

        this.addSkill = this.addSkill.bind(this)
        this.deleteSkill = this.deleteSkill.bind(this)
    }

    handleChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    addInterest(e){
        
    }
    deleteInterest(e){
        const index = e.target.getAttribute("data-index")
        let  temp = this.state.interests
        temp.splice(index, 1)
        this.setState({interests: temp})
    }

    addSkill(){

    }
    deleteSkill(e){
        const index = e.target.getAttribute("data-index")
        let temp = this.state.skills
        temp.splice(index, 1)
        this.setState({ skills: temp })
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

                    {/* Interests */}

                    <div className="form-inline mt-3 mb-2">
                        <h4>Interests</h4>
                    </div>
                    <div className="form-inline border-grey-round p-2">
                        {
                            this.state.interests.map((interest, index) => {
                                return (
                                    <div key={index} className="item-pill">
                                        {interest.secondary}
                                        <button className="btn btn-secondary ml-2 btn-sm" data-index={index} onClick={this.deleteInterest}>X</button>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {/* Skills */}

                    <div className="form-inline mt-3 mb-2">
                        <h4>Skills</h4>
                    </div>
                    <div className="form-inline border-grey-round p-2">
                        {
                            this.state.skills.map((skill, index) => {
                                return (
                                    <div key={index} className="item-pill">
                                        {skill.secondary}
                                        <button className="btn btn-secondary ml-2 btn-sm" data-index={index} onClick={this.deleteSkill}>X</button>
                                    </div>
                                )
                            })
                        }
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
