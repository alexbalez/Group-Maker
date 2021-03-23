import React, { Component } from 'react';
import '../components.css';
import ProfileEditCollegeModal from './ProfileEditCollegeModal'
import ProfileEditAboutMeModal from './ProfileEditAboutMeModal'
import StudentDataConnector from '../../services/StudentDataConnector'

class StudendProfile extends Component {
    constructor(props) {
        super(props)
        // reference to the child component so you we can call specific function from that component
        this.editAboutMe = React.createRef(); 
        this.state = {
            flags: {
                showEditCollege: false,
                showEditAboutMe: false
            },
            data: this.props.data,

            //the below should be dynamically loaded from db
            // ============ user personal info ===================
            firstname: this.props.data.firstname,
            lastname: this.props.data.lastname,
            phone: this.props.data.phone,
            about: this.props.data.aboutme,
            preferences: [], // list of preference IDs that represents skills and interests belonging to user
            interests: [],
            skills: [],

            //=========== user college info ===========================
            campus: "casa loma",
            school: "school of design and technology",
            program: {code: "T127", title: "computer programmer analyst"},
            semester: 2,
            courses: [
                { code: "COMP 1231", title: "Introduction to Javascript" },
                { code: "MATH 1162", title: "College Math" }, 
            ]
            
        }

        this.populatePreferences()
    }

    populatePreferences = () =>{
        // console.log(this.props.data)
        //get all the preferences from the db
        StudentDataConnector.getPreferences()
            .then(res =>{
                //console.log('--populating preferences', this.state.data.preferences, res.data)
                
                const intList = [], skillList = [] 
                this.state.data.preferences.forEach(prefId => {
                    for (let item of res.data){
                        if(item._id === prefId){
                            let prototype = {
                                _id: item._id,
                                type: item.type,
                                category: item.category,
                                description: item.description
                            }
                            if(item.type === "interest") intList.push(prototype)
                            else skillList.push(prototype)
                            break
                        }
                    }
                });

                this.setState({preferences: res.data, interests: intList, skills: skillList})
                
                //refresh the child component once the preferneces data has loaded
                this.editAboutMe.current.populateInterestsAndSkills()
            })
            .catch(err => console.log(err))
    }

    // ================about me ================
    toggleEditAboutMe = () => {
        this.setState({ flags: {showEditAboutMe: !this.state.flags.showEditAboutMe} })
        console.log("--toggle edit About me")
    }
    saveEditAboutMe = (data, intsSkills) => {
        console.log("--saveEditAboutMe ", data)
        // TODO: send update to db here
        this.setState({ 
            firstname: data.firstname,
            lastname: data.lastname,
            phone: data.phone,
            about: data.about,
            interests: intsSkills.interests,
            skills: intsSkills.skills
        })
        StudentDataConnector.updateStudent(this.props.data._id, data)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))

        this.toggleEditAboutMe()
    }

    // ========college==============
    toggleEditCollege = () => {
        this.setState({ flags: { showEditCollege: !this.state.flags.showEditCollege } })
        console.log("--toggleEditCollege")
    }
    saveEditCollege = (data) => {
        console.log("--saveEditCollege", data)
        this.toggleEditCollege()
    }

    render() {
        //console.log('--rendering profile', this.state.preferences)
        return (
            <div>
                <div className="col-sm-8 mx-auto mt-4">
                    <h1 className="text-center text-capitalize">{this.state.data.username}</h1>

                    {/* =============== Personal information group ================== */}
                    <div className="border border-primary p-3 ">
                        <div className="form-inline mb-2">
                            <h4>Basic Information</h4>
                            <button className="btn btn-warning ml-auto" onClick={this.toggleEditAboutMe}>Edit</button>
                        </div>

                        {/* Names and contact */}
                        <div className="mb-2 form-inline">
                            <span className="inline-label p-2">First Name</span>
                            <span className="inline-content p-2 text-capitalize">{this.state.firstname}</span>
                        </div>

                        <div className="mb-2 form-inline">
                            <span className="inline-label p-2">Last Name</span>
                            <span className="inline-content p-2 text-capitalize">{this.state.lastname}</span>
                        </div>

                        <div className="mb-2 form-inline">
                            <span className="inline-label p-2">Phone</span>
                            <span className="inline-content p-2">{this.state.phone}</span>
                        </div>

                        {/* bio */}
                        <div className="form-inline mt-3 mb-2">
                            <h4>About Me</h4>
                        </div>
                        <div className="border-grey-round p-2">{this.state.about}</div>


                        {/* Interests and skills */}
                        <div className="form-inline mt-3 mb-2">
                            <h4>Interests</h4>
                        </div>
                        <div className="form-inline border-grey-round p-2">
                            {
                                this.state.interests.length > 0?
                                    this.state.interests.map((interest, index) =>{
                                        return <div key={index} className="item-pill">{interest.description}</div>
                                    })
                                    :
                                    <div className="text text-secondary text-center">You have no interests</div>
                            }
                        </div>

                        <div className="form-inline mt-3 mb-2">
                            <h4>Skills</h4>
                        </div>
                        <div className="form-inline border-grey-round p-2">
                            {
                                this.state.skills.length > 0 ?
                                    this.state.skills.map((skill, index) => {
                                        return <div key={index} className="item-pill">{skill.description}</div>
                                    })
                                    :
                                    <div className="text text-secondary text-center">You have no skills</div>
                            }
                        </div>
                    </div>

                    {/* =========== Edit Personal Information modal ================== */}
                    <ProfileEditAboutMeModal
                        title="Edit Your Personal Information"
                        show={this.state.flags.showEditAboutMe}
                        toggle={this.toggleEditAboutMe}
                        data={this.state}
                        save={this.saveEditAboutMe}
                        ref={this.editAboutMe}
                    />


                    {/* ================== College Information group =========================== */}
                    <div className="border border-primary p-3 mt-4">
                        <div className="form-inline mb-3">
                            <h4>College Information</h4>
                            <button className="btn btn-warning ml-auto" onClick={this.toggleEditCollege}>Edit</button>
                        </div>

                        {/* Affiliations */}
                        <div className="mb-2 form-inline">
                            <span className="inline-label p-2">Campus</span>
                            <span className="inline-content text-capitalize p-2">{this.state.campus}</span>
                        </div>
                    
                        <div className="mb-2 form-inline">
                            <span className="inline-label p-2">School</span>
                            <span className="inline-content text-capitalize p-2">{this.state.school}</span>
                        </div>
                    
                        <div className="mb-2 form-inline">
                            <span className="inline-label p-2">Program</span>
                            <span className="inline-content text-capitalize p-2">{this.state.program.code}</span>
                        </div>
                        
                        <div className="mb-2 form-inline">
                            <span className="inline-label p-2">Semester</span>
                            <span className="inline-content p-2">{this.state.semester}</span>
                        </div>

                        {/* Class list  */}
                        <div className="form-inline mt-3 mb-3">
                            <h4>Current Courses</h4>
                        </div>

                        <ul className="list-group">
                            {/* <li className="list-group-item text-capitalize">Cras justo odio</li> */}
                            {
                                this.state.courses.map((course, index)=>(
                                    <li key={index} className="list-group-item text-capitalize">
                                        {course.code} - {course.title}
                                    </li>
                                ))
                            }
                            
                        </ul>

                    </div>

                    {/* =================== Edit college info modal ========================== */}

                    <ProfileEditCollegeModal
                        title="Edit Your College Information"
                        show={this.state.flags.showEditCollege}
                        toggle={this.toggleEditCollege}
                        data={this.state}
                        save={this.saveEditCollege}
                    />

                </div>
            </div>
        );
    }
}

export default StudendProfile;
