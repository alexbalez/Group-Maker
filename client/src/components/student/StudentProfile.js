import React, { Component } from 'react'
import '../components.css'
import { Modal } from 'react-bootstrap';
//import StudentDataConnector from '../../services/StudentDataConnector'

class StudentProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            aboutMe: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            showEditAboutMe: false
        }
        
        this.handleChange = this.handleChange.bind(this)
        this.toggleEditAboutMe = this.toggleEditAboutMe.bind(this)
        this.updateAboutMe = this.updateAboutMe.bind(this)
    }

    handleChange(e){
        //const newData = { [e.target.name]: e.target.value }
        //this.setState({ newUserData: newData })
        this.setState({ [e.target.name]: e.target.value })
        console.log(e.target.name, e.target.value)
    }

    toggleEditAboutMe(){
        console.log('--toggle:', this.state.showEditAboutMe)
        this.setState({showEditAboutMe: !this.state.showEditAboutMe})
    }

    updateAboutMe(){
        this.setState({aboutMe: this.state.aboutMeUpdate})
        this.toggleEditAboutMe()
    }

    submit = (e)=>{
        e.preventDefault()
        console.log('submit')

    }

    render() {
        return (
            <div>
                <div className="col-6 mx-auto mt-4">
              
                    <h1 className="text-center text-capitalize">{this.state.data.username}</h1>
                    <div className="row"><h4>Affiliation</h4></div>
                    <div className="form-group col-md-6">
                        <select className="btn btn-secondary dropdown-toggle w-100-percent mt-1" name="campus" onChange={this.handleChange}>
                            {/* TODO: pull these options from db */}
                            <option value>Select Campus</option>
                            <option value="Casa Loma">Casa Loma</option>
                            <option value="St James">St James</option>
                            <option value="Waterfront">Waterfront</option>
                        </select>
                        <select className="btn btn-secondary dropdown-toggle w-100-percent mt-1" name="school" onChange={this.handleChange}>
                            <option value>Select School</option>
                            <option value="Design and Tech">Design and Tech</option>
                            <option value="Construction engineering">Construction Engineering</option>
                            <option value="Culinary">Culinary</option>
                        </select>
                    </div>

                    <div className="row"><h4>Course List</h4></div>
                    <p>Need to figure out how we want to do this element</p>
                    
                    <div className="row"><h4>About Me</h4>
                        <button className="btn btn-primary ml-3" onClick={this.toggleEditAboutMe}>Edit</button>
                    </div>
                    <div className="">
                        {this.state.aboutMe}
                    </div>


                    <Modal show={this.state.showEditAboutMe} onHide={this.toggleEditAboutMe}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit About Me</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <textarea onChange={this.handleChange} 
                            name="aboutMeUpdate" 
                            defaultValue={this.state.aboutMe}
                            style={{width: '100%', height:500}}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-primary" onClick={this.toggleEditAboutMe}>
                                Cancel
                            </button>
                            <button className="btn btn-warning" onClick={this.updateAboutMe}>
                                Save Changes
                            </button>
                        </Modal.Footer>
                    </Modal>

                    <h4>Phone</h4>
                    <h4>Interests</h4>
                    <h4>Skills</h4>





                    <input type="text" onChange={this.handleChange} />
                
               
                    
                    


                    {/*<p><strong>ID:</strong> {this.state.data._id}</p>*/}
                    {/* <p><strong>Username:</strong> {this.state.data.username}</p>
                    <p><strong>Email:</strong> {this.state.data.email}</p>
                    <h1>My Data</h1>
                    <p><strong>Colleges:</strong> {this.state.data.colleges}</p>
                    <p><strong>Campuses:</strong> {this.state.data.campuses}</p> */}
                </div>
            </div>
        );
    }


}

export default StudentProfile;
