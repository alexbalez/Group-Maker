import React, { Component } from 'react'
import '../components.css'
//import { Modal } from 'react-bootstrap';
//import StudentDataConnector from '../../services/StudentDataConnector'
import EditTextModal from '../EditTextModal'

class StudentProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            aboutMe: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            showEditAboutMe: false,
            editPhone: false
        }
        
        this.handleChange = this.handleChange.bind(this)
        this.toggleEditAboutMe = this.toggleEditAboutMe.bind(this)
        this.updateAboutMe = this.updateAboutMe.bind(this)
        this.toggleEditPhone = this.toggleEditPhone.bind(this)
        this.saveEditPhone = this.saveEditPhone.bind(this)

        this.phoneInput = React.createRef()
    }

    handleChange(e){
        //const newData = { [e.target.name]: e.target.value }
        //this.setState({ newUserData: newData })
        this.setState({ [e.target.name]: e.target.value })
        console.log(e.target.name, e.target.value)
    }

    toggleEditAboutMe(){
        //console.log('--toggle:', this.state.showEditAboutMe)
        this.setState({showEditAboutMe: !this.state.showEditAboutMe})
    }

    updateAboutMe(){
        if(this.state.aboutMeUpdate){
            this.setState({aboutMe: this.state.aboutMeUpdate, aboutMeUpdate: null})
        }
        this.toggleEditAboutMe()
    }

    toggleEditPhone(){
        console.log("edit phone")
        if(!this.state.editPhone){
            this.phoneInput.current.focus()
        }
        this.setState( {editPhone: !this.state.editPhone} )
    }

    saveEditPhone(){
        // TODO: transform the string here and do some validation to make sure it's a phone number
        this.setState({phone: this.phoneInput})
        this.toggleEditPhone()
    }

    submit = (e)=>{
        e.preventDefault()
        console.log('submit')

    }

    render() {
        return (
            <div>
                <div className="col-8 mx-auto mt-4">
              
                    <h1 className="text-center text-capitalize">{this.state.data.username}</h1>
                    
                    {/* College Level Affiliations */}
                    
                    <div className="form-group">
                        <div className="row"><h4>Affiliation</h4></div>

                        <select className="btn btn-light dropdown-toggle w-100-percent mt-1" name="campus" onChange={this.handleChange}>
                            {/* TODO: pull these options from db */}
                            <option className="bg-white text-dark" value>Select Campus</option>
                            <option className="bg-white text-dark" value="Casa Loma">Casa Loma</option>
                            <option className="bg-white text-dark" value="St James">St James</option>
                            <option className="bg-white text-dark" value="Waterfront">Waterfront</option>
                        </select>
                        <select className="btn btn-light dropdown-toggle w-100-percent mt-1" name="school" onChange={this.handleChange}>
                            <option className="bg-white text-dark" value>Select School</option>
                            <option className="bg-white text-dark" value="Design and Tech">Design and Tech</option>
                            <option className="bg-white text-dark" value="Construction engineering">Construction Engineering</option>
                            <option className="bg-white text-dark" value="Culinary">Culinary</option>
                        </select>
                    </div>

                    {/* List of courses available based on selected levels above */}
                    <div className="form-group">
                        <div className="row"><h4>Course List</h4></div>
                        <p>Need to figure out how we want to do this element</p>
                    </div>
                    
                    {/* About Me */}
                    <div className="form-group">
                        <div className="row">
                            <h4>About Me</h4>
                            <div>
                                <button className="btn btn-warning btn-sm ml-3" onClick={this.toggleEditAboutMe}>Edit</button>
                            </div>
                        </div>
                    
                        <div className="">
                            {this.state.aboutMe}
                        </div>

                        <EditTextModal
                            title="Edit About Me"
                            text={this.state.aboutMe}
                            show={this.state.showEditAboutMe}
                            name="aboutMeUpdate"
                            toggleShow={this.toggleEditAboutMe}
                            handleChange={this.handleChange}
                            saveChanges={this.updateAboutMe}
                        />
                    </div>

                    {/* Phone */}
                    <div className="form-group">
                        <div className="row">
                            <h4>Phone</h4>
                            <input className="ml-3" type="text" ref={this.phoneInput} readOnly={!this.state.editPhone} />
                            {
                                !this.state.editPhone ? 
                                
                                <div>
                                    <button className="btn btn-warning btn-sm ml-3" onClick={this.toggleEditPhone}>Edit</button>
                                </div>
                                :
                                <div>
                                        <button className="btn btn-primary btn-sm ml-3" onClick={this.toggleEditPhone}>Cancel</button>
                                        <button className="btn btn-success btn-sm ml-1" onClick={this.saveEditPhone}>Save</button>
                                </div>
                            }
                        </div>
                        
                    </div>


                    <div className="row"><h4>Interests</h4></div>
                    <div className="row"><h4>Skills</h4></div>
                
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
