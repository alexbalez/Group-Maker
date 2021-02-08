import React, { Component } from "react";
import AuthDataConnector from "../services/AuthDataConnector";

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: React.createRef(),
            password: React.createRef()
        };

        this.cancel = () =>{
            this.props.history.push('/') // go back to the login screen
        };

        this.submit = (event) =>{
            event.preventDefault();
            const user = {
                email: this.state.email.current.value,
                password: this.state.password.current.value
            };

            console.log(user);

            AuthDataConnector.addUser(user)
                .then((res) =>{
                    console.log('User created', res) // todo: change this to store cookie on success
                })
                .catch(err => {
                    console.log('Could not add user', err)
                });
        }

    }

    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center mt-3">Create Account</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input placeholder="Email" name="email" className="form-control"
                                           ref={this.state.email}/>
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" placeholder="Password" name="password" className="form-control"
                                           ref={this.state.password}/>
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-warning btn-block" onClick={this.cancel}>Cancel</button>
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-success btn-block" onClick={this.submit}>
                                        Create My Account
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default Login
