import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import '../components.css';
import StudentDataConnector from '../../services/StudentDataConnector';

class ProfileEditCollegeModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            
            campus: '',
            program: '',
            semester: this.props.data.semester,
            
            semesterOptions: [1,2,3,4,5,6,7,8,9],
            courseList: [],
            campusList: [],
            programList: [],
        }

    }

    setCampus = (e) => {
        //populate program dropdown from list of programs that belong to a campus
        //add currently selected campus to state
        const campusId = e.target.value;
        StudentDataConnector.getProgramsFromCampus(campusId)
            .then((res) => {
                console.log('set campus', res.data);
                this.setState({ campus: campusId, programList: res.data.programs });
            })
            .catch(err => console.log(err));
    };

    setProgram = (e) => {
        // retrieve list of courses that belong to the selected program
        // add these to state along eith the selected program
        const programId = e.target.value;
        StudentDataConnector.getCoursesFromProgram(programId)
            .then((res)=>{
                console.log('--set program', res.data)
                this.setState({ program: programId, courseList: res.data.courses });
            })
            .catch(err => console.log(err));
    };

    setSemester = (e) => {
        
        
        this.setState({ semester: e.target.value });
    }

    removeCourse = (e) => {
        const index = e.target.getAttribute("data-index");
        console.log('remove course clicked', index)
    };

    resetCourses = () => {
        console.log('Reload the courses that might have been removed');
    };

    saveData = () => {
        this.props.save({
            test: 'save activated'
        })
    };

    render() {
        console.log(this.state.courseList)
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
                            <option className="bg-white text-dark" value="">Select a Semester</option>
                            {
                                this.state.semesterOptions.map((item, index) => (
                                    <option key={index} className="bg-white text-dark">{item}</option>
                                ))
                            }
                        </select>
                    </div>

                    {/* ========= Course List ================= */}
                    <ul className="list-group">
                        {
                            this.state.courseList.map((course, index) => (
                                
                                <li key={index} className="list-group-item text-capitalize">
                                    
                                    <span className="align-middle">{course.semester} - {course.name}</span>
                                    
                                    <button className="btn btn-secondary float-right" data-index={index}
                                        onClick={this.removeCourse} title="Remove Course">X</button>
                                </li>
                            ))
                        }

                    </ul>



                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={this.resetCourses}>
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
