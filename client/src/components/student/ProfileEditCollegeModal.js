import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import '../components.css';
import StudentDataConnector from '../../services/StudentDataConnector';

class ProfileEditCollegeModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            
            campus: this.props.data.campus,
            program: this.props.data.program,
            semester: this.props.data.semester,
            
            campusList: [],
            programList: [],
            semesterOptions: [1, 2, 3, 4, 5, 6],
            masterCourseList: [],
            courseList: [],

            changed: false,

            ahSemester: 0,
            ahCourse: ""
        }

    }

    setCampus = (e) => {
         // if(this.state.courseList.length > 0){
        //     if (!window.confirm("Changing campus will clear your selected program, semester and course list")) return;
        // }

        //populate program dropdown from list of programs that belong to a campus
        //add currently selected campus to state
        const campusId = e.target.value;

        if(campusId === ""){
            console.log("campus id was empty")

            this.setState({ campus: campusId, programList: [], courseList: [], masterCourseList: [] });
            return
        }

        StudentDataConnector.getProgramsFromCampus(campusId)
            .then((res) => {
                console.log('set campus', res.data);
                this.setState({ campus: campusId, programList: res.data.programs, courseList: [], masterCourseList: [] });
            })
            .catch(err => console.log(err));
    };

    setProgram = (e) => {
        // if(this.state.courseList.length > 0){
        //     if (!window.confirm("Changing program will clear your selected course list and semester")) return;
        // }
        // retrieve list of courses that belong to the selected program
        // add these to state along eith the selected program
        const programId = e.target.value;
        StudentDataConnector.getCoursesFromProgram(programId)
            .then((res)=>{

                let courses = res.data.courses.filter(course => course.semester === 1); //default semester to 1
                this.setState({ program: programId, masterCourseList: res.data.courses, courseList: courses, semester: 1 });
            })
            .catch(err => console.log(err));
    };

    setSemester = (e) => {

        const semester = parseInt(e.target.value);

        // if(this.state.courseList.length > 0){
        //     if (!window.confirm("Changing semester will reset your course list")) return;
        // }
        
        // make the course list based on selected semester
        let courseList = this.state.masterCourseList.filter(course =>{
            return course.semester === semester;
        });

        this.setState({ courseList, semester})

    }

    removeCourse = (e) => {
        const index = e.target.getAttribute("data-index");
        const temp = this.state.courseList;
        temp.splice(index, 1);
        this.setState({courseList: temp, changed: true});
    };

    resetCourses = () => {
        if(!this.state.changed || this.state.semester === 0) return;
        
        console.log('Reload the courses that might have been removed or remove courses that were added');

        let courseList = this.state.masterCourseList.filter(course => {
            return course.semester === this.state.semester;
        });

        this.setState({ courseList })

    };

    saveData = () => {
        
        const prototype = {
            campuses: [this.state.campus],
            programs: [this.state.program],
            semester: this.state.semester,
            courses: this.state.courseList
        }

        this.props.save(prototype)
    };

    //ad hoc course functions
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    addCourse = () => {
        if (this.state.ahCourse === "") return;

        //get the index of the course to add
        let cList = this.state.masterCourseList;
        let index = -1;
        for (let i = 0; i< cList.length; i++){
            if(cList[i]._id === this.state.ahCourse){
                index = i;
                break;
            }
        }
        if(index === -1) return;
        let temp = this.state.courseList;
        temp.push(cList[index]);
        this.setState({courseList: temp});
    }

    render() {
        console.log(this.state.ahCourse)
        return (
            <Modal show={this.props.show} onHide={this.props.toggle}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {/* ========= Campus dropdown ================ */}
                    <div className="mb-2 form-inline w-100">
                        <span className="inline-label p-2" style={{width: '25%'}}>Campus</span>
                        <select className="inline-content btn text-capitalize p-2 dropdown-toggle" style={{width:'75%'}}
                            name="campus" value={this.state.campus} onChange={this.setCampus}>

                            <option className="bg-white text-dark w-75" value="">Select a Campus</option>
                            {
                                this.state.campusList.map((item, index) => (
                                    <option key={index} value={item._id}
                                        className="bg-white text-dark">{item.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    {/* ========= Program dropdown ================ */}
                    <div className="mb-2 form-inline">
                        <span className="inline-label p-2" style={{ width: '25%' }}>Program</span>
                        <select className="inline-content btn text-capitalize p-2 dropdown-toggle" style={{ width: '75%' }}
                            name="program" value={this.state.program} onChange={this.setProgram}>
                            <option className="bg-white text-dark" value="">Select a Program</option>
                            {
                                this.state.programList.map((item, index) => (
                                    <option key={index} value={item._id}
                                        className="bg-white text-dark">{item.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    {/* ========= Semester dropdown ================ */}
                    <div className="mb-2 form-inline">
                        <span className="inline-label p-2" style={{ width: '25%' }}>Semester</span>
                        <select className="inline-content btn text-capitalize p-2 dropdown-toggle" style={{ width: '75%' }}
                            name="semester" value={this.state.semester} onChange={this.setSemester}>
                            <option className="bg-white text-dark" value="0">Select a Semester</option>
                            {
                                this.state.semesterOptions.map((item, index) => (
                                    <option key={index} className="bg-white text-dark">{item}</option>
                                ))
                            }
                        </select>
                    </div>

                    {/* ========= Course List ================= */}
                    <div className="form-inline mt-3 mb-2">
                        <h4>
                            {this.state.courseList.length > 0? "Course List" : "You have no courses"}
                        </h4>
                    </div>
                    <ul className="list-group">
                        {
                            
                            this.state.courseList.map((course, index) => (
                                <li key={index} className="list-group-item text-capitalize">
                                    <span className="align-middle">{course.code} - {course.name}</span>
                                    
                                    <button className="btn btn-danger float-right" data-index={index}
                                        onClick={this.removeCourse} title="Remove Course">X</button>
                                </li>
                            ))
                        }

                    </ul>

                    <div className="form-inline mt-3 mb-2 text-capitalize">
                        <h4>Add different semester course</h4>
                    </div>
                    <div className="form-inline mb-2">

                        {/* category dropdown */}
                        <select className="btn btn-success dropdown-toggle" style={{ maxWidth: 200 }}
                            name="ahSemester" value={this.state.ahSemester} onChange={this.handleChange}>
                            <option className="bg-white text-dark" value={0}>Select semester</option>
                            {
                                this.state.semesterOptions
                                .filter((item) => item !== this.state.semester)
                                .map((item, index) => (
                                    <option key={index} value={item} className="bg-white text-dark">{item}</option>
                                ))
                            }
                        </select>


                        <select className="btn btn-success dropdown-toggle ml-1" style={{ maxWidth: 200 }}
                            name="ahCourse" value={this.state.ahCourse} onChange={this.handleChange}>
                            <option className="bg-white text-dark" value={{}}>Select course</option>
                            {
                                this.state.masterCourseList
                                .filter(course => {
                                    for (let c of this.state.courseList) {
                                        if (course._id === c._id) return false;
                                    }
                                    return course.semester === parseInt(this.state.ahSemester)
                                })
                                .map((course, index) => (
                                    <option key={index} className="bg-white text-dark"
                                        value={course._id}>{course.code} - {course.name}</option>
                                ))
                            }
                        </select>

                        {/* Add ad hoc course button */}
                        <button className="btn btn-primary ml-1" onClick={this.addCourse}>Add</button>
                    </div>



                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={this.resetCourses} title="Reload list of courses if you removed any">
                        Reset Courses
                    </button>

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
