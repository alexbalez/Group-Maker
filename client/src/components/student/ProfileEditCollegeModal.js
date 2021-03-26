import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import '../components.css';

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

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        // console.log("--handleChange: ", e.target.name, e.target.value)
    };

    removeCourse = () =>{
        console.log('remove course clicked')
    };

    saveData = () => {
        this.props.save({
            test: 'save activated'
        })
    };

    render() {
        console.log(this.state.campusList)
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
                            name="campus" value={this.state.campus} onChange={this.handleChange}>
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
                            name="program" value={this.state.program} onChange={this.handleChange}>
                            <option className="bg-white text-dark" value="">Select a Program</option>
                            {
                                // this.state.interestCatOptions.map((item, index) => (
                                //     <option key={index} className="bg-white text-dark">{item}</option>
                                // ))
                            }
                        </select>
                    </div>

                    {/* ========= Semester dropdown ================ */}
                    <div className="mb-2 form-inline">
                        <span className="inline-label p-2">Semester</span>
                        <select className="inline-content btn text-capitalize p-2 dropdown-toggle"
                            name="semester" value={this.state.semester} onChange={this.handleChange}>
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
