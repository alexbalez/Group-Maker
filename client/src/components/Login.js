import React, { Component } from "react";

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.signup = () =>{
            this.props.history.push('/signup')
        };

        this.submit = (event) =>{
            event.preventDefault();
            const user = {
                email: this.state.username,
                password: this.state.password
            }
        }


    }

    render() {
        return (
            <div className="container">
                <h1>Login form</h1>
            </div>
        )
    }


}

export default Login
