import React, { Component } from 'react';
import '../components.css';
import ProfileEditCollegeModal from './ProfileEditCollegeModal';
import ProfileEditAboutMeModal from './ProfileEditAboutMeModal';
import StudentDataConnector from '../../services/StudentDataConnector';

class StudendProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flags: {
                showEditCollege: false,
                showEditAboutMe: false
            },

            //the below should be dynamically loaded from db
            // ============ user personal info ===================
            firstname: this.props.data.firstname,
            lastname: this.props.data.lastname,
            phone: this.props.data.phone,
            about: this.props.data.aboutme,
            allPreferences: [], //list of all preference options from DB
            interests: [],
            skills: [],

            //=========== user college info ===========================
            campus: this.props.data.campuses[0],
            program: this.props.data.programs[0],
            campusName: "",
            programName: "",

            semester: this.props.data.semester,
            courses: [],

        };

        this.populatePreferences();
        this.populateCollegeInfo();
        //console.log(this.props.data);
    }

    // ================about me ================

    populatePreferences = () =>{
        //get all the preferences from the db
        StudentDataConnector.getPreferences()
            .then(res =>{
                //seperate preferences by type
                const intList = [], skillList = [];
                this.props.data.preferences.forEach(prefId => {
                    for (let item of res.data){
                        if(item._id === prefId){
                            let prototype = {
                                _id: item._id,
                                type: item.type,
                                category: item.category,
                                description: item.description
                            };
                            if(item.type === "interest")
                                intList.push(prototype);
                            else
                                skillList.push(prototype);
                            break
                        }
                    }
                });
                this.setState({allPreferences: res.data, interests: intList, skills: skillList});
                this.editAboutMe.populateInterestsAndSkills();
            })
            .catch(err => console.log(err));
    };
    
    toggleEditAboutMe = () => {
        this.setState({ flags: {showEditAboutMe: !this.state.flags.showEditAboutMe} });
    };
    saveEditAboutMe = (data, intsSkills) => {
        StudentDataConnector.updateStudentAbout(this.props.data._id, data)
            .then(res => {
                console.log(res);
                this.setState({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    phone: data.phone,
                    about: data.aboutme,
                    interests: intsSkills.interests,
                    skills: intsSkills.skills
                })
            })
            .catch(err => console.log(err));

        this.toggleEditAboutMe();
    };

    // ========college==============

    //TODO: combine this function with populatePreferences so that only one call to server and setState is made
    populateCollegeInfo() {
        // console.log('--populate college info')
        let temp = this.props.data;

        //update these to still pull a list to select from even when one is selected

        if (temp.campuses[0] === undefined) {
            
            console.log('we need to load a list campuses to choose from');
            //send the college ID
            //lookup the college, get its campus ids, then get all those campuses
            StudentDataConnector.getCampusesFromCollege(this.props.data.colleges[0])
            .then((res)=>{
                //console.log(res.data)
                this.editCollege.setState({campusList: res.data.campuses})
            })
            .catch(err => console.log(err));
        }
        else if (temp.programs[0] === undefined) {
            //send the campus ID
            //need the campus, a list of campuses and list of programs
            console.log('we need to load the campus name, a list of campuses, and list of programs to that belong to the selected campus');
            const campusId = this.props.data.campuses[0];
            
            
            StudentDataConnector.getCampusesAndPrograms(campusId)
            .then((res)=>{
                
                this.setState({ campusName: res.data.campus.name, campus: campusId })
                this.editCollege.setState({ 
                    //campus: campusId, 
                    programList: res.data.programs, 
                    campusList: res.data.campuses 
                })

            }).catch(err => console.log(err));

        }
        else {
            console.log('we need to load a campus name, program name, a list of all campuses, a list of programs that belong to the selected campus, and a list of courses that belong to the selected program');
            //send the campus, and program IDs
            //need a list of campuses, programs, and courses
            const campusId = this.props.data.campuses[0];
            const programId = this.props.data.programs[0];
            StudentDataConnector.getCampusesProgramsAndColleges(campusId, programId)
            .then((res) =>{

                this.setState({
                    // campus: campusId,
                    // program: programId,
                    campusName: res.data.campus.name,
                    programName: res.data.program.name
                })

                this.editCollege.setState({
                    // campus: campusId,
                    // program: programId,
                    programList: res.data.programs,
                    campusList: res.data.campuses,
                    courseList: res.data.courses
                })


            }).catch(err => console.log(err));
            
        }

    }

    toggleEditCollege = () => {

        //load extra data only when showing the component
        // if(this.state.flags.showEditCollege === false){
        //     console.log('-- show edit college');
        // }

        this.setState({ flags: { showEditCollege: !this.state.flags.showEditCollege } });
    };

    saveEditCollege = (data) => {
        console.log("--saveEditCollege", data);
        this.toggleEditCollege();
    };

    render() {
        //console.log(this.props.data)
        return (
            <div>
                <div className="col-sm-8 mx-auto mt-4">
                    <h1 className="text-center text-capitalize">{this.props.data.username}</h1>

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
                        //ref allows calling methods from the parent that belong to the child
                        ref={ref => (this.editAboutMe = ref)}
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
                            <span className="inline-content text-capitalize p-2">
                                { this.state.campusName !== ""? this.state.campusName : "No campus selected" }
                            </span>
                        </div>

                        <div className="mb-2 form-inline">
                            <span className="inline-label p-2">Program</span>
                            <span className="inline-content text-capitalize p-2">
                                { this.state.programName !== ""? this.state.programName : "No program selected" }
                            </span>
                        </div>

                        <div className="mb-2 form-inline">
                            <span className="inline-label p-2">Semester</span>
                            <span className="inline-content p-2">
                                { this.state.semester !== undefined? this.state.semester : "No semester selected"}
                            </span>
                        </div>

                        {/* Class list  */}
                        <div className="form-inline mt-3 mb-3">
                            <h4>Current Courses</h4>
                        </div>

                        <ul className="list-group">
                            {/* <li className="list-group-item text-capitalize">Cras justo odio</li> */}
                            {
                                this.state.courses.length > 0 ?
                                    this.state.courses.map((course, index)=>(
                                        <li key={index} className="list-group-item text-capitalize">
                                            {course.code} - {course.name}
                                        </li>
                                    ))
                                :
                                    <li className="list-group-item text-capitalize">No courses selected</li>
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
                        ref={ref => (this.editCollege = ref)}
                    />

                </div>
            </div>
        );
    }
}

export default StudendProfile;
