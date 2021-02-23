import React, { Component } from "react"
import './components.css'
import StudentDataConnector from '../services/StudentDataConnector'


class FourOhFour extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: {}
        }
    }
/*
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
*/
    render(){
        console.log(Date.now()+": 404: "+window.location.href+" "+this.state.data)
        return (
            <div>
                404 :(
            </div>
        )
    }
}

export default FourOhFour