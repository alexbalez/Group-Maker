import React, { Component } from 'react';
import '../components.css';

class StudendProfile2 extends Component {
    constructor(props) {
       super(props)
       this.state = {
           data: this.props.data,
           bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
           interests: [
               { primary: "gaming", secondary: "fps games" },
               { primary: "gaming", secondary: "board games" },
               { primary: "sports", secondary: "hockey" },
               { primary: "sports", secondary: "soccer" },
               { primary: "computer programming", secondary: "andoid development" },
           ],
           skills: [
               { primary: "backend", secondary: "database design" },
               { primary: "backend", secondary: "express.js" },
               { primary: "backend", secondary: "rest api" },
               { primary: "planning", secondary: "uml diagram" },
               { primary: "teamwork", secondary: "communication" },
               { primary: "teamwork", secondary: "friendly" },
           ]
       }
    }

    

    render() {
        return (
            <div>
                <div className="col-sm-8 mx-auto mt-4">
                    <h1 className="text-center text-capitalize">{this.state.data.username}</h1>

                    {/* First edit group */}
                    <div className="border border-primary p-3 ">
                        <div className="form-inline mb-2">
                            <h4>Basic Information</h4>
                            <button className="btn btn-warning ml-auto">Edit</button>
                        </div>

                        {/* Names and contact */}
                        <div className="mb-2 form-inline">
                            <span className="inline-label p-2">First Name</span>
                            <span className="inline-content p-2">Barrington</span>
                        </div>

                        <div className="mb-2 form-inline">
                            <span className="inline-label p-2">Last Name</span>
                            <span className="inline-content p-2">Venables</span>
                        </div>

                        <div className="mb-2 form-inline">
                            <span className="inline-label p-2">Phone</span>
                            <span className="inline-content p-2">420-698-0085</span>
                        </div>

                        {/* bio */}
                        <div className="form-inline mt-3 mb-2">
                            <h4>About Me</h4>
                        </div>
                        <div className="border-grey-round p-2">{this.state.bio}</div>


                        {/* Interests and skills */}
                        <div className="form-inline mt-3 mb-2">
                            <h4>Interests</h4>
                        </div>
                        <div className="form-inline border-grey-round p-2">
                            {/* <div className="item-pill">Video games</div> */}
                            {this.state.interests.map((interest, index) =>{
                                return <div key={index} className="item-pill">{interest.secondary}</div>
                            })}
                        </div>

                        <div className="form-inline mt-3 mb-2">
                            <h4>Skills</h4>
                        </div>
                        <div className="form-inline border-grey-round p-2">
                            {this.state.skills.map((skill, index) => {
                                return <div key={index} className="item-pill">{skill.secondary}</div>
                            })}
                        </div>
                    </div>


                    {/* Second edit group */}
                    <div className="border border-primary p-3 mt-4">
                        <div className="form-inline mb-3">
                            <h4>College Information</h4>
                            <button className="btn btn-warning ml-auto">Edit</button>
                        </div>

                        {/* Affiliations */}
                        <div className="mb-2 form-inline">
                            <span className="inline-label p-2">Campus</span>
                            <span className="inline-content p-2">Casa Loma</span>
                        </div>
                    
                        <div className="mb-2 form-inline">
                            <span className="inline-label p-2">School</span>
                            <span className="inline-content p-2">Design and Technology</span>
                        </div>
                    
                        <div className="mb-2 form-inline">
                            <span className="inline-label p-2">Program</span>
                            <span className="inline-content p-2">T127</span>
                        </div>
                        
                        <div className="mb-2 form-inline">
                            <span className="inline-label p-2">Semester</span>
                            <span className="inline-content p-2">6</span>
                        </div>

                        {/* Class list  */}
                        <div className="form-inline mt-3 mb-3">
                            <h4>Current Courses</h4>
                        </div>

                        <ul class="list-group">
                            <li class="list-group-item">Cras justo odio</li>
                            <li class="list-group-item">Dapibus ac facilisis in</li>
                            <li class="list-group-item">Morbi leo risus</li>
                            <li class="list-group-item">Porta ac consectetur ac</li>
                            <li class="list-group-item">Vestibulum at eros</li>
                        </ul>

                    </div>

                    
                    

                </div>
            </div>
        );
    }
}

export default StudendProfile2;
