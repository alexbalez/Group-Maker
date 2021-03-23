import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import '../components.css';
//import StudentDataConnector from '../../services/StudentDataConnector';

class ProfileEditAboutMeModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            firstname: this.props.data.firstname,
            lastname: this.props.data.lastname,
            phone: this.props.data.phone,
            about: this.props.data.about,

            //List of currently selected skills and interests
            interests: [],
            skills: [],

            intCat: "", // currently seclected interestCategory
            interestId: "", // currently selected interest
            
            //options populated by populateInterestsAndSkills
            interestCatOptions: [],
            interestOptions: [],

            skillCat: "", // curr selected skill category
            skillId: "", //currently selected skill
            
            //options populated by populateInterestsAndSkills
            skillCatOptions: [],
            skillOptions: []

        }

    }

    populateInterestsAndSkills = () => {

        const interests = [], skills = [], intCats = [], skillCats = []
        this.props.data.allPreferences.forEach(element => {
            if(element.type === "interest"){
                interests.push(element)
                if(intCats.indexOf(element.category) === -1) intCats.push(element.category)
            }
            else{
                skills.push(element)
                if(skillCats.indexOf(element.category) === -1) skillCats.push(element.category)
            }
        });

        let temp = {
            interestCatOptions: intCats,
            interestOptions: interests,
            skillCatOptions: skillCats, 
            skillOptions: skills,
            interests: [...this.props.data.interests],
            skills: [...this.props.data.skills],
        }

        this.setState(temp)
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    addInterest = () => { 
        if (this.state.intCat !== "" && this.state.interestId !== "") {
            // find the preference object based on selected id
            let prototype = this.state.interestOptions.find(element =>  element._id === this.state.interestId)
            this.state.interests.push(prototype)
            this.setState({interestId: ""})
        }
        else {
            alert("Please select a category and an interest")
        }
    }
    deleteInterest = (e) => {
        const index = e.target.getAttribute("data-index")
        let temp = this.state.interests
        temp.splice(index, 1)
        this.setState({interests: temp})
    }
    addSkill = () => {
        if (this.state.skillCat !== "" && this.state.skill !== "") {
            let temp = this.state.skills
            let prototype = this.state.skillOptions.find(element => element._id === this.state.skillId)
            temp.push(prototype)
            this.setState({skills: temp, skillId: ""})
        }
        else {
            alert("Please select a category and a skill")
        }
    }
    deleteSkill = (e) => {
        const index = e.target.getAttribute("data-index")
        let temp = this.state.skills
        temp.splice(index, 1)
        this.setState({ skills: temp })
    }
    saveData = () => {
        //copy interests and skills into just an array of ids for sending to the db
        const prefsList = this.state.interests.map(interest => interest._id)
        this.state.skills.forEach(skill => prefsList.push(skill._id))
        this.props.save(
            //for sending to db
            {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                phone: this.state.phone,
                aboutme: this.state.about,
                preferences: prefsList
            },
            //just for updating profile state
            {
                interests: [...this.state.interests],
                skills: [...this.state.skills],
            }
        )
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.toggle}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-row mb-2">
                        <input className="form-control" onChange={this.handleChange} 
                            defaultValue={this.state.firstname} name="firstname" />
                    </div>

                    <div className="form-row mb-2">
                        <input className="form-control" onChange={this.handleChange} 
                            defaultValue={this.state.lastname} name="lastname" />
                    </div>

                    <div className="form-row mb-2">
                        <input className="form-control" onChange={this.handleChange} 
                            defaultValue={this.state.phone} name="phone" />
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
                        <select className="btn btn-success dropdown-toggle" style={{maxWidth: 200}}
                            name="intCat" value={this.state.intCat} onChange={this.handleChange}>
                            <option className="bg-white text-dark" value="">Select Category</option>
                            {
                                this.state.interestCatOptions.map((item, index)=>(
                                    <option key={index} className="bg-white text-dark">{item}</option>
                                ))
                            }
                        </select>
                        
                        {/* interest dropdown */}
                        <select className="btn btn-success dropdown-toggle ml-1" style={{ maxWidth: 200 }}
                            name="interestId" value={this.state.interestId} onChange={this.handleChange}>
                            <option className="bg-white text-dark" value="">-</option>
                            {
                                //return the interests whose category matches and who are not already in the list 
                                this.state.interestOptions.filter(interest =>(
                                    interest.category === this.state.intCat &&
                                    this.state.interests.find(item => item.description === interest.description) === undefined 
                                )).map((interest, index) => (
                                    <option key={index} className="bg-white text-dark" 
                                        value={interest._id}>{interest.description}</option>
                                ))
                            }
                        </select>

                        {/* Add interest button */}
                        <button className="btn btn-primary ml-1" onClick={this.addInterest}>Add</button>
                    </div>

                    {/* interests display container */}
                    <div className="form-inline border-grey-round p-2">
                        
                        {
                            this.state.interests.length > 0?
                                this.state.interests.map((interest, index) => {
                                    return (
                                        <div key={index} className="item-pill">
                                            {interest.description}
                                            <button className="btn btn-secondary ml-2 btn-sm" data-index={index} 
                                                onClick={this.deleteInterest}>X</button>
                                        </div>
                                    )
                                })
                                :
                                <div className="text text-secondary text-center">You have no interests</div>
                        }
                    </div>

                    {/* =========== Skills ================= */}

                    <div className="form-inline mt-3 mb-2">
                        <h4>Skills</h4>
                    </div>

                    <div className="form-inline mb-2">

                        {/* category dropdown */}
                        <select className="btn btn-success dropdown-toggle" style={{ maxWidth: 200 }}
                            name="skillCat" value={this.state.skillCat} onChange={this.handleChange}>
                            <option className="bg-white text-dark" value="">Select Category</option>
                            {
                                this.state.skillCatOptions.map((item, index) => (
                                    <option key={index} className="bg-white text-dark">{item}</option>
                                ))
                            }
                        </select>

                        {/* skill dropdown */}
                        <select className="btn btn-success dropdown-toggle ml-1" style={{ maxWidth: 200 }}
                            name="skillId" value={this.state.skill} onChange={this.handleChange}>
                            <option className="bg-white text-dark" value="">-</option>
                            {
                                //return the interests whose category matches and who are not already in the list 
                                this.state.skillOptions.filter(skill => (
                                    skill.category === this.state.skillCat &&
                                    this.state.skills.find(item => item.description === skill.description) === undefined
                                )).map((skill, index) => (
                                    <option key={index} className="bg-white text-dark"
                                        value={skill._id}>{skill.description}</option>
                                ))
                            }
                        </select>

                        {/* Add skill button */}
                        <button className="btn btn-primary ml-1" onClick={this.addSkill}>Add</button>
                    </div>
                    

                    {/* Skills display container */}
                    <div className="form-inline border-grey-round p-2">
                        {   
                            this.state.skills.length > 0 ?
                                this.state.skills.map((skill, index) => {
                                    return (
                                        <div key={index} className="item-pill">
                                            {skill.description}
                                            <button className="btn btn-secondary ml-2 btn-sm" data-index={index} 
                                                onClick={this.deleteSkill}>X</button>
                                        </div>
                                    )
                                })
                                :
                                <div className="text text-secondary text-center">You have no skills</div>
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
