import React, { Component } from 'react'
import '../components.css'
import Header from '../Header'
import Footer from '../Footer'
import StudentDataConnector from '../../services/StudentDataConnector'

class StudentProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {}
        }
    }

    componentDidMount() {
        StudentDataConnector.getDashboard({})
            .then(res => {
                console.log(res.data) // returning the logged in user for now
                this.setState({ data: res.data })
            })
            .catch(err => {
                console.log(err.response)
                //kick user back to the login screen if the response status is 401 unauthorized
                //if (err.response.status === 401) this.props.history.push('/')
            })
    }

    render() {
        return (
            <div>
                <Header history={this.props.history}/>
                <div style={{ height: "300px" }} className="m-5">
                    <h1>My Profile</h1>
                    <p><strong>ID:</strong> {this.state.data._id}</p>
                    <p><strong>Email:</strong> {this.state.data.email}</p>
                </div>
                <Footer />
            </div>
        );
    }


}

export default StudentProfile;
