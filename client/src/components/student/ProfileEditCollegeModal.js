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
            semester: '',
            
            courseList: [],
            campusList: [],
            programList: [],
        }

    }

    setCampus = (e) => {
        //populate program dropdown from list of programs that belong to a campus
        //add currently selected campus to state
        StudentDataConnector.getProgramsFromCampus(e.target.value)
            .then((res)=> {
                this.setState({ campus: e.target.value, programList: res.data.programs});
            })
            .catch(err => console.log(err));
        
    };

    setProgram = (e) => {
       // retrieve list of courses that belong to the selected program
       // add these to state along eith the selected program
        
        // StudentDataConnector.getCoursesFromProgram(e.target.value)
        //     .then((res)=>{

        //         console.log(res.data)
        //         this.setState({ program: e.target.value, courseList: [] })
        //     })
        //     .catch(err => console.log(err));
    };

    setSemester = (e) => {
        console.log()
        
        this.setState({ semester: e.target.value })
    }

    removeCourse = () => {
        console.log('remove course clicked')
    };

    saveData = () => {
        this.props.save({
            test: 'save activated'
        })
    };

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.toggle}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {/* ========= Campus dropdown ================ */}
                    <div className="mb-2 form-inline">
                        <span className="inline-label p-2">Campus</span>
                        <select className="inline-content btn text-capitalize p-2 dropdown-toggle"
                            name="campus" value={this.state.campus} onChange={this.setCampus}>
                            
                            <option className="bg-white text-dark" value="">Select a Campus</option>
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
                        <span className="inline-label p-2">Program</span>
                        <select className="inline-content btn text-capitalize p-2 dropdown-toggle"
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
                        <span className="inline-label p-2">Semester</span>
                        <select className="inline-content btn text-capitalize p-2 dropdown-toggle"
                            name="semester" value={this.state.semester} onChange={this.setSemester}>
                            <option className="bg-white text-dark" value="">Select a Semester</option>
                            {
                                // this.state.interestCatOptions.map((item, index) => (
                                //     <option key={index} className="bg-white text-dark">{item}</option>
                                // ))
                            }
                        </select>
                    </div>

                    {/* ========= Course List ================= */}
                    <ul className="list-group">
                        <div className="list-group-item text-capitalize p-2">
                            <span className="align-middle">ras justo odio</span>
                            <button className="btn btn-secondary float-right" 
                                onClick={this.removeCourse} title="Remove Course">X</button>
                        </div>

                        {
                            // this.state.courses.map((course, index) => (
                            //     <li key={index} className="list-group-item text-capitalize">
                            //         {course.code} - {course.title}
                            //     </li>
                            // ))
                        }

                    </ul>



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
