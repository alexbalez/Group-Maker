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
            skills: this.props.data.skills,

            //pull this from db interests collection and skills collection
            // interestOptions: {
            //     gaming: ["fps games", "board games"],
            //     sports: ["hockey", "soccer"],
            //     "computer programming": ["android development", "javascript"]
            // }
            interestCatOptions: ["gaming", "sports", "computer programming"],
            intCat: "",
            interest: "",
            interestOptions: [
                { category: "gaming", interest: "fps games" },
                { category: "gaming", interest: "board games" },
                { category: "gaming", interest: "rpg games"},
                { category: "sports", interest: "hockey" },
                { category: "sports", interest: "football" },
                { category: "sports", interest: "soccer" },
                { category: "computer programming", interest: "andoid development" },
                { category: "computer programming", interest: "ios development" },
                { category: "computer programming", interest: "restful api" },
            ]
        }

        this.handleChange = this.handleChange.bind(this)
        this.saveData = this.saveData.bind(this)

        this.addInterest = this.addInterest.bind(this)
        this.deleteInterest = this.deleteInterest.bind(this)
        //this.handleIntCatChange = this.handleIntCatChange.bind(this)

        this.addSkill = this.addSkill.bind(this)
        this.deleteSkill = this.deleteSkill.bind(this)
    }

    handleChange(e){
        this.setState({ [e.target.name]: e.target.value })
        console.log("--handleChange: ", e.target.name, e.target.value)
    }

    addInterest(){
        //get the value from both category and subcategory
        //make the object and add to the array (this.state.interests)
        console.log('--add interest')

        if (this.state.intCat !== "" && this.state.interest !== "") {
            let temp = this.state.interests
            temp.push({ category: this.state.intCat, interest: this.state.interest })
            this.setState(temp)
        }
        else {
            alert("Please select a category and an interest")
        }
    }
    deleteInterest(e){
        const index = e.target.getAttribute("data-index")
        let  temp = this.state.interests
        temp.splice(index, 1)
        this.setState({interests: temp})
    }
    // handleIntCatChange(e){
    //     console.log("--int cat changed" ,e.target.name, e.target.value)
    //     //switch the secondary options
    // }

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
                        <textarea 
                            style={{height: 300}} 
                            className="form-control" 
                            onChange={this.handleChange} 
                            defaultValue={this.state.about} name="about" 
                        />
                    </div>

                    {/* ======== Interests ============= */}

                    <div className="form-inline mt-3 mb-2">
                        <h4>Interests</h4>
                    </div>
                    <div className="form-inline mb-2">

                        {/* category dropdown */}
                        <select className="btn btn-success dropdown-toggle" name="intCat" onChange={this.handleChange}>
                            <option className="bg-white text-dark" value="">Select Category</option>
                            {
                                this.state.interestCatOptions.map((item, index)=>(
                                    <option key={index} className="bg-white text-dark">{item}</option>
                                ))
                            }
                        </select>
                        
                        {/* interest dropdown */}
                        <select className="btn btn-success dropdown-toggle ml-1" name="interest" onChange={this.handleChange}>
                            <option className="bg-white text-dark" value="">-</option>
                            {
                                //return the interests whose category matches and who are not already in the list 
                                this.state.interestOptions.filter(interest =>(
                                    interest.category === this.state.intCat &&
                                    this.state.interests.find(item => item.interest === interest.interest) === undefined 
                                )).map((interest, index) => (
                                    <option key={index} className="bg-white text-dark" value={interest.interest}>{interest.interest}</option>
                                ))
                            }
                        </select>

                        {/* Add interest button */}
                        <button className="btn btn-primary ml-1" onClick={this.addInterest}>Add</button>
                    </div>

                    {/* interests display container */}
                    <div className="form-inline border-grey-round p-2">
                        {
                            this.state.interests.map((interest, index) => {
                                return (
                                    <div key={index} className="item-pill">
                                        {interest.interest}
                                        <button className="btn btn-secondary ml-2 btn-sm" data-index={index} onClick={this.deleteInterest}>X</button>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {/* =========== Skills ================= */}

                    <div className="form-inline mt-3 mb-2">
                        <h4>Skills</h4>
                    </div>
                    <div className="form-inline border-grey-round p-2">
                        {
                            this.state.skills.map((skill, index) => {
                                return (
                                    <div key={index} className="item-pill">
                                        {skill.skill}
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
